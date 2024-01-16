import { useState } from 'react';

const HoverMenu = ({ character, characterList, setCharacterList }) => {
  const [speed, setSpeed] = useState(character['Speed']);

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const charName = character['Character Name'];
    
    const newCharacterList = characterList.map(char => {
      if (char['Character Name'] === charName) {
        return {...char, 'Speed': speed};
      }
      return char;
    });

    setCharacterList(newCharacterList);
  }

  return (
    <div className='bg-transparent absolute pt-2 z-10'>
      <div className='bg-emerald-700 text-white rounded-2xl pb-5'>
        <h1 className='font-semibold text-xl p-5'>Individual Character Portrait Options</h1>
        <div className='pl-5 flex flex-row relative'>
          <h2 className='text-lg'>Adjust Base Speed</h2>
          <form className='absolute right-5 text-black' onSubmit={handleSubmit}>
            <input 
              type='number'
              value={speed}
              onChange={handleSpeedChange}
            />
            <button type="submit" className='hidden'></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HoverMenu;