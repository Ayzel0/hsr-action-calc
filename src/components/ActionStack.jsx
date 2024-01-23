import { useState, useEffect } from 'react';

const ActionStack = ({ characterList }) => {
  const [actionValueList, setActionValueList] = useState(characterList.map(char => {
    return {
      'name': char['Character Name'],
      'baseSpd': char['Speed'],
      'currentAV': 10000/char['Speed']
    }
  }));

  useEffect(() => {
    setActionValueList(characterList.map(char => {
      return {
        'name': char['Character Name'],
        'baseSpd': parseInt(char['Speed']),
        'currentAV': 10000/char['Speed']
      }
    }))
  }, [characterList]);

  useEffect(() => {
    console.log(actionValueList);
  }, [actionValueList]);

  // updates the AV for each character
  /*
  const updateAV = () => {
    let newAVList = actionValueList;
    newAVList.sort((a, b) => a['currentAV'] - b['currentAV']);
    let subtractAV = newAVList[0]['currentAV'];
    for (char of newAVList) {
      newAVList['currentAV'] = newAVList['currentAV'] - subtractAV;
    }
    setActionValueList(newAVList);
  };
  */

  return (
    <div className='bg-inherit'>
      <h1 className='text-4xl font-semibold text-white px-5 pt-5'>Action Stack</h1>
      <div className='bg-zinc-800 m-5'>
        <h2 className='text-2xl font-semibold text-white p-5'>Turn 1</h2>
      </div>
    </div>
  )
}

export default ActionStack;