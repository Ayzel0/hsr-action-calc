import CharacterPortrait from "./CharacterPortrait";
import CharacterSelectPanel from "./CharacterSelectPanel";
import characters from '../data/characters_releasedate.json';
import { useState, useEffect } from 'react';

const SelectedCharacters = ({ characterList, setCharacterList, onPortraitClick, changeCharSelectDisplay }) => {
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    if (characterList.length == 4) {
      setShowSelect(false);
    }
  }, [characterList])

  const handleShowSelect = () => {
    setShowSelect(!showSelect);
  }

  const resetBaseSpeeds = () => {
    const newCharacterList = characterList.map(char => {
      return characters.find(character => character['Character Name'] === char['Character Name']);
    });
  
    setCharacterList(newCharacterList);
  }

  const resetSelectedCharacters = () => {
    setCharacterList([]);
  }

  return (
    <div className='bg-inherit'>
      <h1 className='text-4xl font-semibold text-white px-5 pt-5'>Selected Characters</h1>
      {characterList.length > 0 ?
      <div>
        <div className='inline-block bg-zinc-800 rounded-2xl ml-5 my-5'>
          <div className='flex flex-row gap-4 p-5 items-center'> {/* selected characters panel */}
            {characterList && characterList.map((character) => (
              <div key={character['Character Name']}>
                <CharacterPortrait
                  character={character}
                  selected={true}
                  characterList={characterList}
                  setCharacterList={setCharacterList}
                  onPortraitClick={onPortraitClick}
                />
                <div className='flex flex-row justify-center'>
                  <p className='text-black p-2 bg-stone-400 rounded-3xl font-semibold mt-2'>Speed: {character['Speed']}</p>
                </div>
              </div>
            ))}
            {characterList.length < 4 &&
              <div 
                className='bg-slate-600 h-[270px] w-32 rounded-2xl flex flex-col justify-center items-center cursor-pointer'
                onClick={handleShowSelect}
              >
                <h1 className='text-3xl text-white'>+</h1>
              </div>
            }
          </div>
        </div>
        {showSelect && 
        <div className='absolute w-[80%] px-5 rounded-2xl'>
          <CharacterSelectPanel 
            onPortraitClick={onPortraitClick}
            characters={characters}
          />
        </div>
        }
      </div>
      :
      <div className='bg-inherit'> {/* shows when character list length is 0*/}
        <div className='bg-slate-800 inline-block rounded-2xl my-5 ml-5'>
          <div 
            className='bg-slate-600 h-[270px] w-32 p-5 m-5 rounded-2xl flex flex-col justify-center items-center cursor-pointer'
            onClick={handleShowSelect}
          >
            <h1 className='text-3xl text-white'>+</h1>
          </div>
        </div>
        <div className='absolute w-[80%] px-5 rounded-2xl'>
          {showSelect && 
          <CharacterSelectPanel 
            onPortraitClick={onPortraitClick}
            characters={characters}
          />}
        </div>
      </div>
      }
      <div className='ml-5 mb-5 text-white'>
        <button className='p-5 bg-slate-700 rounded-2xl' onClick={resetBaseSpeeds}>Reset Base Speeds</button>
        <button className='p-5 bg-slate-700 rounded-2xl ml-5' onClick={resetSelectedCharacters}>Reset Selected Characters</button>
      </div>
      {
      <div className='flex flex-col items-center mt-5'>
        <button 
          className='bg-emerald-600 p-5 rounded-full w-[60%] text-lg font-medium'
          onClick={changeCharSelectDisplay}
        >Start Simulation</button>
      </div>
      }
    </div>
  )
}

export default SelectedCharacters;