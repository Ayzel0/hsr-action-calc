import CharacterPortrait from "./CharacterPortrait";

const SelectedCharacters = ({ characterList, setCharacterList, onPortraitClick }) => {
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
    </div>
  )
}

export default SelectedCharacters;