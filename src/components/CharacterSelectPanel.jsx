import { useState, useEffect } from 'react';
import characters from '../data/characters.json'
import elements from '../data/elements.json';
import CharacterPortrait from './CharacterPortrait';
import FilterButton from './FilterButton';

const CharacterSelectPanel = () => {
  const [characterList, setCharacterList] = useState([]);
  const [activeElements, setActiveElements] = useState(elements.map(element => element['Element']))

  const onPortraitClick = (charName) => {
    if (characterList.length < 4) {
      setCharacterList([...characterList, characters.find(character => character['Character Name'] === charName)]);
    }
  }

  useEffect(() => {
    console.log(characterList);
  }, [characterList]);

  const changeActiveElements = (element) => {
    if (activeElements.includes(element)) {
      setActiveElements(activeElements.filter(activeElement => activeElement !== element));
    }
    else {
      setActiveElements([...activeElements, element])
    }
  }

  useEffect(() => {
    console.log(activeElements)
  }, [activeElements]);

  return (
    <div className='bg-slate-300 flex flex-col justify-center items-center p-5'>
      <div className='flex flex-row'>
      {elements.map((element) => (
        <div key={element['Element']}>
          <FilterButton 
            imageLink={element['Image Link']} 
            onClick={() => changeActiveElements(element['Element'])}
          />
        </div>
      ))}
      </div>
      <div className='flex flex-wrap gap-3 justify-center'> {/* character panel div */}
      {characters.map((character) => (
        activeElements.includes(character['Element']) &&
        <div key={character['Character Name']}>
          <CharacterPortrait 
            charName={character['Character Name']} 
            imgLink={character['Image Link']} 
            rarity={character['Rarity']} 
            onClick={() => onPortraitClick(character['Character Name'])}
          />
        </div>
      ))}
      </div>
    </div>
  )
}

export default CharacterSelectPanel;