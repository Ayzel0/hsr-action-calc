import { useState, useEffect } from 'react';
import ActionValueIcon from './ActionValueIcon';

const ActionStack = ({ characterList, simStarted=false }) => {
  const [actionValueList, setActionValueList] = useState([]);
  const [currentActionState, setCurrentActionState] = useState('advancing');

  useEffect(() => {
    const newActionValueList = characterList.map(char => ({
      'name': char['Character Name'],
      'baseSpd': parseInt(char['Speed']),
      'currentAV': 10000 / char['Speed'],
      'icon': char['Image Path']
    })).sort((a, b) => a['currentAV'] - b['currentAV']);
    setActionValueList(newActionValueList);
  }, [characterList]);

  const sortedActionValueList = [...actionValueList].sort((a, b) => a['currentAV'] - b['currentAV']);

  // advances to the next action
  const nextAction = () => {
    if (currentActionState == 'advancing') {
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
      const newAVList = [
        ...sortedActionValueList.slice(1),
        {
          ...sortedActionValueList[0],
          'currentAV': 10000 / sortedActionValueList[0]['baseSpd']
        }
      ];
      console.log(newAVList);
      setActionValueList(newAVList);
      setCurrentActionState('advancing');
    }
  }

  return (
    <div>
      <div className='bg-inherit'>
        {!simStarted && <h1 className='text-4xl font-semibold text-white px-5 pt-5'>Action Stack</h1>}
        <div className='bg-zinc-800 m-5 p-8'>
          <h2 className='text-2xl font-semibold text-white'>Actions</h2>
          <div className='flex flex-row'>
            <div> { /* icon list */ }
              {actionValueList.map((action, index) => (
              <div 
                key={`${action['Name']} ${index + 1}`}
              >
                <ActionValueIcon 
                  currentActionState={currentActionState}
                  avListObj={action}
                  actionIndex={index}
                  simStarted={simStarted}
                />
              </div>
            ))}
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
    </div>
  )
}

export default ActionStack;