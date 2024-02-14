import { useState, useEffect } from 'react';
import ActionValueIcon from './ActionValueIcon';
import spdIcon from '../../public/misc_icons/spd_icon.png';

const ActionStack = ({ characterList, simStarted=false }) => {
  const [actionValueList, setActionValueList] = useState([]);
  const [currentActionState, setCurrentActionState] = useState('advancing');
  const [avElapsed, setAVElapsed] = useState(0);
  const [actionHistory, setActionHistory] = useState([]);
  const [actionGroups, setActionGroups] = useState({});
  const [firstGroupSize, setFirstGroupSize] = useState(150);
  const [subsequentGroupSize, setSubsequentGroupSize] = useState(100);

  useEffect(() => {
    const newActionValueList = characterList.map(char => ({
      'name': char['Character Name'],
      'baseSpd': parseInt(char['Base Speed']),
      'unbuffedSpd': parseInt(char['Speed']),
      'buffedSpd': parseInt(char['Speed']),
      'spdBuffDuration': 0,
      'currentAV': 10000 / char['Speed'],
      'turnCounter': 0,
      'icon': char['Image Path']
    })).sort((a, b) => a['currentAV'] - b['currentAV']);
    setActionValueList(newActionValueList);
  }, [characterList]);

  const resetActionValueList = () => {
    const newActionValueList = characterList.map(char => ({
      'name': char['Character Name'],
      'baseSpd': parseInt(char['Base Speed']),
      'unbuffedSpd': parseInt(char['Speed']),
      'buffedSpd': parseInt(char['Speed']), // as a note, buffedSpd == unbuffedSpd without speed buffs
      'spdBuffDuration': 0,
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
      // move top character to bottom of stack and update speed buffs
      let newAVList = [
        ...sortedActionValueList.slice(1),
        {
          ...sortedActionValueList[0],
          'spdBuffDuration': (sortedActionValueList[0]['spdBuffDuration'] === 0 ? 0 : sortedActionValueList[0]['spdBuffDuration'] - 1),
          'buffedSpd': [0, 1].includes(sortedActionValueList[0]['spdBuffDuration']) ? sortedActionValueList[0]['unbuffedSpd'] : sortedActionValueList[0]['buffedSpd'],
          'currentAV': 10000 / ([0, 1].includes(sortedActionValueList[0]['spdBuffDuration']) ? sortedActionValueList[0]['unbuffedSpd'] : sortedActionValueList[0]['buffedSpd']),
          'turnCounter': sortedActionValueList[0]['turnCounter'] + 1,
        }
      ];
      newAVList = newAVList.sort((a, b) => a['currentAV'] - b['currentAV']);
      console.log(newAVList);
      setActionValueList(newAVList);
      setCurrentActionState('advancing');
    }
  }

  // for creating action groups for action history
  const groupActions = (actions) => {
    const groups = {};

    actions.forEach(action => {
      const actionValue = action.currentAV;
      let groupKey = 0;
      if (!(actionValue <= 150)) {
        let adjustedAV = actionValue - 50;
        if (adjustedAV % 100 === 0) {
          groupKey = adjustedAV/100 - 1;
        } else {
          groupKey = Math.floor(adjustedAV/100);
        }
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }

      groups[groupKey].push(action);
    });

    return groups;
  }

  useEffect(() => {
    setActionGroups(groupActions(actionHistory));
  }, [actionHistory]);

  return (
    <div>
      {!simStarted && <h1 className='text-4xl font-semibold text-white px-5 pt-5'>Action Stack</h1>}
      <div className={`grid ${simStarted && 'grid-cols-3'}`}>
        <div className={`bg-inherit ${simStarted && 'col-span-2'} relative`}> { /* simulating */ }
          <div className='bg-zinc-800 m-5 p-8'>
            <h2 className='text-2xl font-semibold text-white'>Actions</h2>
            <div className='flex flex-row'>
              <div className='flex flex-col'> { /* icon list */ }
                {actionValueList.map((action, index) => (
                <div 
                  key={`${action['Name']} ${index + 1}`}
                  className='flex flex-row'
                >
                  <ActionValueIcon 
                    currentActionState={currentActionState}
                    avListObj={action}
                    actionValueList={actionValueList}
                    setActionValueList={setActionValueList}
                    actionIndex={index}
                    simStarted={simStarted}
                  />
                  <div
                    className='w-[8vw] ml-5'
                  > { /* section for buffs */ }
                    {action['spdBuffDuration'] > 0 &&
                    <div className='flex flex-row ml-0 relative'> { /* speed buffs  */ }
                      <img 
                        src={spdIcon}
                        className='w-[3vw]'
                      />
                      <p className='absolute left-[2.1vw] text-emerald-400 font-mono font-extrabold text-2xl'>^</p>
                      <div className='p-1 flex flex-col justify-center'>
                        <p className='text-white'><span className='font-semibold text-emerald-200'>{action['spdBuffDuration']}</span> turns left</p>
                      </div>
                    </div>
                    }
                  </div>
                </div>
              ))}
              <button
                className={`text-white p-4 mt-5 w-[59%] rounded-xl bg-emerald-600 hover:bg-emerald-800 ${characterList.length === 0 && 'hidden'}`}
                onClick={resetActionValueList}
              >Reset Actions</button>
              </div>
              {simStarted &&
              <div className='absolute right-[3vw]'>
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
        <div className='bg-zinc-800 m-5 p-8'> { /* displaying results */ }
          <h2 className='text-2xl font-semibold text-white'>Action History</h2>
          {Object.entries(actionGroups).map(([groupNumber, actions]) => (
            <div key={groupNumber} className='bg-neutral-600 text-white p-3 my-5 inline-block'>
              <h3 className='text-lg font-semibold'><span className='font-bold text-blue-200'>Cycle {groupNumber}:</span> {groupNumber == 0 ? 0 : firstGroupSize + subsequentGroupSize*(groupNumber-1)} to {firstGroupSize + subsequentGroupSize*groupNumber} AV</h3>
              {actions.map((action, index) => (
                <div key={`${action['name']} ${index}`}>
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActionStack;