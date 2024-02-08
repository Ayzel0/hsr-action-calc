import { useState, useEffect } from 'react';
import ActionValueIcon from './ActionValueIcon';

const ActionStack = ({ characterList, simStarted=false }) => {
  const [actionValueList, setActionValueList] = useState([]);
  const [currentActionState, setCurrentActionState] = useState('advancing');
  const [avElapsed, setAVElapsed] = useState(0);
  const [actionHistory, setActionHistory] = useState([]);
  console.log(characterList.length);

  useEffect(() => {
    const newActionValueList = characterList.map(char => ({
      'name': char['Character Name'],
      'baseSpd': parseInt(char['Speed']),
      'currentAV': 10000 / char['Speed'],
      'turnCounter': 0,
      'icon': char['Image Path']
    })).sort((a, b) => a['currentAV'] - b['currentAV']);
    setActionValueList(newActionValueList);
  }, [characterList]);

  const resetActionValueList = () => {
    const newActionValueList = characterList.map(char => ({
      'name': char['Character Name'],
      'baseSpd': parseInt(char['Speed']),
      'currentAV': 10000 / char['Speed'],
      'turnCounter': 0,
      'icon': char['Image Path']
    })).sort((a, b) => a['currentAV'] - b['currentAV']);
    setActionValueList(newActionValueList);
    setAVElapsed(0);
    setCurrentActionState('advancing');
    setActionHistory([]);
  }

  const sortedActionValueList = [...actionValueList].sort((a, b) => a['currentAV'] - b['currentAV']);

  // advances to the next action
  const nextAction = () => {
    if (currentActionState == 'advancing') {
      // for history changes
      setAVElapsed(prevAVElapsed => {
        const newAVElapsed = prevAVElapsed + sortedActionValueList[0]['currentAV'];
        
        // update actionHistory
        setActionHistory(prevActionHistory => {
          const newActionHistory = {...sortedActionValueList[0], currentAV: newAVElapsed};
          return [...prevActionHistory, newActionHistory];
        })

        return newAVElapsed;
      })

      // update stack
      const newAVList = sortedActionValueList.map(action => ({
        ...action,
        'currentAV': action['currentAV'] - sortedActionValueList[0]['currentAV']
      }));
      setActionValueList(newAVList);
      setCurrentActionState('acting');
    }
  };

  const takeAction = () => {
    if (currentActionState == 'acting') {
      let newAVList = [
        ...sortedActionValueList.slice(1),
        {
          ...sortedActionValueList[0],
          'currentAV': 10000 / sortedActionValueList[0]['baseSpd'],
          'turnCounter': sortedActionValueList[0]['turnCounter'] + 1
        }
      ];
      newAVList = newAVList.sort((a, b) => a['currentAV'] - b['currentAV']);
      setActionValueList(newAVList);
      setCurrentActionState('advancing');
    }
  }

  // for creating action groups for action history
  const groupActions = (actions) => {
    const groups = {};

    actions.forEach(action => {
      const actionValue = action.currentAV;
    }) 
  }

  return (
    <div>
      {!simStarted && <h1 className='text-4xl font-semibold text-white px-5 pt-5'>Action Stack</h1>}
      <div className='grid grid-cols-2'>
        <div className='bg-inherit'> { /* simulating */ }
          <div className='bg-zinc-800 m-5 p-8'>
            <h2 className='text-2xl font-semibold text-white'>Actions</h2>
            <div className='flex flex-row'>
              <div className='flex flex-col'> { /* icon list */ }
                {actionValueList.map((action, index) => (
                <div 
                  key={`${action['Name']} ${index + 1}`}
                >
                  <ActionValueIcon 
                    currentActionState={currentActionState}
                    avListObj={action}
                    actionValueList={actionValueList}
                    setActionValueList={setActionValueList}
                    actionIndex={index}
                    simStarted={simStarted}
                  />
                </div>
              ))}
              <button
                className={`text-white p-4 mt-5 w-[86%] rounded-xl bg-emerald-600 hover:bg-emerald-800 ${characterList.length === 0 && 'hidden'}`}
                onClick={resetActionValueList}
              >Reset Actions</button>
              </div>
              {simStarted &&
              <div>
                {currentActionState === 'advancing' ?
                <button 
                  className='text-white p-4 ml-8 rounded-xl bg-emerald-600 hover:bg-emerald-800'
                  onClick={nextAction}
                >Advance to Next Action</button>
                :
                <button 
                  className='text-white p-4 ml-8 rounded-xl bg-emerald-600 hover:bg-emerald-800'
                  onClick={takeAction}
                >Take Action
                </button>
                }
              </div>
              }
            </div>
          </div>
        </div>
        <div> { /* displaying results */ }
          <div className='bg-zinc-800 m-5 p-8'>
            <h2 className='text-2xl font-semibold text-white'>Action History</h2>
            {actionHistory.map((action, index) => (
              <div key={`${action['name']} ${index + 1}`}>
                <ActionValueIcon 
                  displayOnly={true}
                  avListObj={action}
                  actionValueList={actionValueList}
                  setActionValueList={setActionValueList}
                  actionIndex={index}
                  simStarted={simStarted}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActionStack;