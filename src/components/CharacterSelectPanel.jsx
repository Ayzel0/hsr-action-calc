import { useState } from 'react';
import characters from '../data/characters.json'
import CharacterPortrait from './CharacterPortrait';

const CharacterSelectPanel = () => {
  return (
    <>
      {characters.map((character) => (
        <div key={character['Character Name']}>
          <CharacterPortrait charName={character['Character Name']} imgLink={character['Image Link']} />
        </div>
      ))}
    </>
  )
}

export default CharacterSelectPanel;