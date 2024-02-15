import { useState, useEffect } from 'react';

const ActionIconHoverMenu = ({ avListObj, actionValueList, setActionValueList }) => {
  const [speed, setSpeed] = useState(avListObj['buffedSpd']);
  const [spdBuffDuration, setSpdBuffDuration] = useState(avListObj['spdBuffDuration']);
  const [av, setAV] = useState(avListObj['currentAV']);

  // local states
  const [speedPercentChange, setSpeedPercentChange] = useState(0);
  const [speedFlatChange, setSpeedFlatChange] = useState(0);
  const [avPercentChange, setAVPercentChange] = useState(0);
  const [avFlatChange, setAVFlatChange] = useState(0);
  const [buffDurationChange, setBuffDurationChange] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // new speed value
    const baseSpd = avListObj['baseSpd'];
    const newSpd = baseSpd * (1+(speedPercentChange/100)) + speedFlatChange;
    
    // speed buffed/debuffed av - updating speed effect on AV first then direct AV change
    let newAV = (av * speed/newSpd);

    // update av based on user input AV change
    newAV = newAV - avFlatChange - (avPercentChange/100)*(10000/newSpd);
    if (newAV < 0) {
      newAV = 0;
    }

    setSpeed(newSpd);
    setAV(newAV);
    setSpdBuffDuration(buffDurationChange);
  }

  useEffect(() => {
    // update av list
    const newAVList = actionValueList.map(avObj => {
      if (avListObj['name'] === avObj['name']) {
        return {
          ...avObj, 
          'buffedSpd': speed, 
          'currentAV': av,
          'spdBuffDuration': parseInt(spdBuffDuration),
        };
      }
      return avObj;
    })

    // sort the av list
    const sortedAVList = newAVList.sort((a, b) => a['currentAV'] - b['currentAV']);
    setActionValueList(sortedAVList);
  }, [speed, av, spdBuffDuration]);

  const handleSpeedChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    if (name === 'speedPercentChange') {
      setSpeedPercentChange(numericValue);
    } else if (name === 'speedFlatChange') {
      setSpeedFlatChange(numericValue);
    }
  }

  const handleAVChange = (e) => {
    const { name, value } = e.target;
    if (name === 'avPercentChange') {
      setAVPercentChange(value);
    } else if (name === 'avFlatChange') {
      if (av - value > 0) {
        setAVFlatChange(value);
      } else {
        setAVFlatChange(av);
      }
    }
  }

  const handleBuffDurationChange = (e) => {
    setBuffDurationChange(e.target.value);
  }

  return (
    <div className='grid grid-cols-2 bg-emerald-800 rounded-2xl'>
      <div className='py-2 px-5 text-white'>
        <h1 className='text-xl font-bold'>Action Information</h1>
      </div>
      <div className='py-2 px-5 text-white w-[300px]'>
        <h1 className='text-xl font-bold'>Action/Speed Change</h1>
        <div>
          <h2 className='text-lg mt-4 font-semibold'>Action Advance</h2>
          <form 
            className='flex flex-col my-2'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-row'>
              <p>% Change</p>
              <input 
                type='number'
                name='avPercentChange'
                className='absolute right-2 text-black w-[20%]'
                onChange={handleAVChange}
              />
            </div>
            <div className='flex flex-row mt-2'>
              <p>AV Change</p>
              <input 
                type='number'
                name='avFlatChange'
                className='absolute right-2 text-black w-[20%]'
                onChange={handleAVChange}
              />
            </div>
            <h2 className='text-lg mt-4 font-semibold'>Speed Change</h2>
            <div className='flex flex-row mt-2'>
              <p>% Change</p>
              <input 
                type='number'
                name='speedPercentChange'
                className='absolute right-2 text-black w-[20%]'
                onChange={handleSpeedChange}
              />
            </div>
            <div className='flex flex-row mt-2'>
              <p>Flat Change</p>
              <input 
                type='number'
                name='speedFlatChange'
                className='absolute right-2 text-black w-[20%]'
                onChange={handleSpeedChange}
              />
            </div>
            <div className='flex flex-row mt-2'>
              <p>Buff Duration</p>
              <input 
                min={0}
                type='number'
                name='speedBuffDuration'
                className='absolute right-2 text-black w-[13%]'
                value={buffDurationChange}
                onChange={handleBuffDurationChange}
              />
            </div>
            <button 
              type='submit'
              className='bg-indigo-950 rounded-xl p-2 mt-4'
            >Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ActionIconHoverMenu;