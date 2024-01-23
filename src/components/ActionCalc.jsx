import { useState, useEffect } from 'react'
import CharacterSelectPanel from "./CharacterSelectPanel";
import SelectedCharacters from './SelectedCharacterDisplay';
import ActionStack from './ActionStack';
import characters from '../data/characters.json';

const ActionCalc = () => {
  const [characterList, setCharacterList] = useState([]);
  const [displayCharSelect, setDisplayCharSelect] = useState(true);

  const changeCharSelectDisplay = () => {
    setDisplayCharSelect(!displayCharSelect);
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
      <div className='grid grid-cols-2 bg-blue-950'>
        <SelectedCharacters 
          characterList={characterList} 
          setCharacterList={setCharacterList}
          onPortraitClick={onPortraitClick}
          changeCharSelectDisplay={changeCharSelectDisplay}
        />
        <ActionStack 
          characterList={characterList}
        />
      </div>
    </div>
  )
}

export default ActionCalc;