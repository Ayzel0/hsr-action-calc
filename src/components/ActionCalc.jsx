import { useState, useEffect } from 'react'
import CharacterSelectPanel from "./CharacterSelectPanel";
import SelectedCharacters from './SelectedCharacterDisplay';
import ActionStack from './ActionStack';
import characters from '../data/characters.json';

const ActionCalc = () => {
  const [characterList, setCharacterList] = useState([]);

  const onPortraitClick = (charName) => {
    // check whether character is in list
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
        />
        <ActionStack />
      </div>
      {characters &&
      <CharacterSelectPanel 
        onPortraitClick={onPortraitClick}
        characters={characters}
      />
      }
    </div>
  )
}

export default ActionCalc;