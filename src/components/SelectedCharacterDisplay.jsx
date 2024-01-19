import CharacterPortrait from "./CharacterPortrait";
import CharacterSelectPanel from "./CharacterSelectPanel";
import characters from '../data/characters.json';
import { useState, useEffect } from 'react';

const SelectedCharacters = ({ characterList, setCharacterList, onPortraitClick }) => {
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
    let charNames = characterList.map(char => {
      return char['Character Name'];
    });

    const newCharacterList = characterList.map(char => {
      if (charNames.includes(char['Character Name'])) {
        const character = characters.find(character => charNames.includes(character['Character Name']));
        let idx = charNames.indexOf(char['Character Name']);
        if (idx > -1) {
          charNames.splice(idx, 1);
        }
        return character;
      }
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
        <div className='inline-block bg-slate-800 rounded-2xl ml-5 my-5'>
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
        <div>
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
            className='bg-slate-600 h-64 w-32 p-5 m-5 rounded-2xl flex flex-col justify-center items-center cursor-pointer'
            onClick={handleShowSelect}
          >
            <h1 className='text-3xl text-white'>+</h1>
          </div>
        </div>
        {showSelect && <CharacterSelectPanel 
          onPortraitClick={onPortraitClick}
          characters={characters}
        />}
      </div>
      }
      {characterList.length > 0 &&
      <div className='ml-5 mb-5 text-white'>
        <button className='p-5 bg-slate-700 rounded-2xl' onClick={resetBaseSpeeds}>Reset Base Speeds</button>
        <button className='p-5 bg-slate-700 rounded-2xl ml-5' onClick={resetSelectedCharacters}>Reset Selected Characters</button>
      </div>
      }
    </div>
  )
}

export default SelectedCharacters;