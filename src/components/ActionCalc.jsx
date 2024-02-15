import { useState, useEffect } from 'react'
import SelectedCharacters from './SelectedCharacterDisplay';
import ActionStack from './ActionStack';
import characters_raw from '../data/characters_releasedate.json';
import summons_raw from '../data/summons.json';

const ActionCalc = () => {
  const [characters, setCharacters] = useState(characters_raw);
  const [summonsList, setSummonsList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [simStarted, setSimStarted] = useState(false);

  const changeCharSelectDisplay = () => {
    setSimStarted(!simStarted);
  }

  // add a "speed" attribute to all characters to represent the speed w/ relics but without buffs
  useEffect(() => {
    const updatedCharacters = characters.map(character => ({
      ...character,
      Speed: character['Base Speed']
    }))

    setCharacters(updatedCharacters);
  }, [])

  const onPortraitClick = (charName) => {
    const charListNames = characterList.map(character => character['Character Name']);

    if (characterList.length < 4 && !charListNames.includes(charName)) {
      setCharacterList([...characterList, characters.find(character => character['Character Name'] === charName)]);
      if (summons_raw.find(summon => summon['summonerChar'] === charName)) {
        setSummonsList([...summonsList, summons_raw.find(summon => summon['summonerChar'] === charName)]);
      }
    }

    if (charListNames.includes(charName)) {
      setCharacterList(characterList.filter(character => character['Character Name'] !== charName));
      setSummonsList(summonsList.filter(summon => summon['summonerChar'] !== charName));
    }
  }
  
  return (
    <div>
      <div className={`grid ${!simStarted ? 'grid-cols-2' : 'grid-cols-1'} bg-blue-950`}>
        <div className={`${simStarted && 'hidden'} z-20`}>
          <SelectedCharacters 
            characters={characters}
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
            summonsList={summonsList}
            simStarted={simStarted}
          />
        </div>
      </div>
    </div>
  )
}

export default ActionCalc;