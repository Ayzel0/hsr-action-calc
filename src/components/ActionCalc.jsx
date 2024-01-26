import { useState, useEffect } from 'react'
import SelectedCharacters from './SelectedCharacterDisplay';
import ActionStack from './ActionStack';
import characters from '../data/characters_releasedate.json';

const ActionCalc = () => {
  const [characterList, setCharacterList] = useState([]);
  const [simStarted, setSimStarted] = useState(false);

  const changeCharSelectDisplay = () => {
    setSimStarted(!simStarted);
  }

  const onPortraitClick = (charName) => {
    const charListNames = characterList.map(character => character['Character Name']);

    if (characterList.length < 4 && !charListNames.includes(charName)) {
      setCharacterList([...characterList, characters.find(character => character['Character Name'] === charName)]);
    }

    if (charListNames.includes(charName)) {
      setCharacterList(characterList.filter(character => character['Character Name'] !== charName));
    }
  }
  
  return (
    <div>
      <div className={`grid ${!simStarted ? 'grid-cols-2' : 'grid-cols-1'} bg-blue-950`}>
        <div className={`${simStarted && 'hidden'} z-20`}>
          <SelectedCharacters 
            characterList={characterList} 
            setCharacterList={setCharacterList}
            onPortraitClick={onPortraitClick}
            changeCharSelectDisplay={changeCharSelectDisplay}
          />
        </div>
        <div className='z-0'>
          <button 
            className={`fixed bg-emerald-600 top-1/2 transform -translate-y-1/2 -translate-x-3/4 hover:translate-x-0 font-bold text-3xl font-mono p-6 rounded-r-2xl transition-transform	z-30 ${!simStarted && 'hidden'}`}
            onClick={changeCharSelectDisplay}
          >&gt;</button>
          <ActionStack 
            characterList={characterList}
            simStarted={simStarted}
          />
        </div>
      </div>
    </div>
  )
}

export default ActionCalc;