import { useState, useEffect } from 'react';
import HoverMenu from './HoverMenu';

const CharacterPortrait = ({ character, onPortraitClick, characterList, setCharacterList, selected=false, minimized=false }) => {
  let name = character['Character Name'];
  let displayName = name;
  let imgLink = character['Image Link'];
  let rarity = character['Rarity'];

  // fix long names
  if (name.includes('Imbibitor Lunae')) {
    displayName = 'Dan Heng IL';
  } else if (name.includes('Trailblazer')) {
    displayName = 'Trailblazer';
  }

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const bg_color = rarity === 5 
    ? 'bg-gradient-to-b from-five-star-gold-light to-five-star-gold-dark' 
    : 'bg-gradient-to-b from-four-star-purple-light to-four-star-purple-dark'
  const bg_classes = `inline-flex flex-col items-center border-slate-950 rounded-2xl cursor-pointer overflow-hidden relative ${bg_color}`;
  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        onClick={() => onPortraitClick(name)} 
        className={bg_classes}
      >
        <img src={imgLink} className={`${minimized ? 'w-[110px]' : 'w-32'} relative`}/>
        <div className={`${minimized ? 'w-[110px]' : 'w-32'} bg-amber-50`}>
          <p className={`${minimized ? 'text-sm font-normal text-center py-2' : 'text-m font-medium text-center py-3'}`}>{displayName}</p>
        </div>
      </div>
      {(isHovered && selected) &&
      <div>
        <HoverMenu 
          character={character}
          characterList={characterList}
          setCharacterList={setCharacterList}
        />
      </div>
      }
    </div>
  )
}

export default CharacterPortrait;