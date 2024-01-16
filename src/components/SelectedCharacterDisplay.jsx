import CharacterPortrait from "./CharacterPortrait";
import characters from '../data/characters.json';

const SelectedCharacters = ({ characterList, setCharacterList, onPortraitClick }) => {
  const resetBaseSpeeds = () => {
    let charNames = characterList.map(char => {
      return char['Character Name'];
    });

    /*
    const newCharacterList = characterList.map(char => {
      if (charNames.includes(char['Character Name'])) {
        return characters.find(character => charNames.includes(character['Character Name']));
      }
    });
    setCharacterList(characters);
    */
  }

  return (
    <div className='bg-inherit'>
      <h1 className='text-4xl font-semibold text-white px-5 pt-5'>Selected Characters</h1>
      {characterList.length > 0 &&
        <div className='inline-block bg-slate-800 rounded-2xl m-5'>
        <div className='flex flex-row gap-4 p-8 items-center'> {/* selected characters panel */}
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
        </div>
      </div>
      }
      <div className='ml-5 mb-5 text-white'>
        <button className='p-5 bg-slate-700 rounded-2xl' onClick={resetBaseSpeeds}>Reset Base Speeds</button>
      </div>
    </div>
  )
}

export default SelectedCharacters;['Character']