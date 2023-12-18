import { useState, useEffect } from 'react'
import CharacterSelectPanel from "./CharacterSelectPanel";
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

  // debug
  useEffect(() => {
    console.log(characterList);
  }, [characterList]);
  
  return (
    <div>
      <CharacterSelectPanel 
        onPortraitClick={onPortraitClick}
        characters={characters}
      />
    </div>
  )
}

export default ActionCalc;