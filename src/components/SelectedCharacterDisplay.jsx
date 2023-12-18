import CharacterPortrait from "./CharacterPortrait";

//TODO: add a removal function to ActionCalc so that characters can be removed when they're clicked

const SelectedCharacters = ({ selectedCharacterList }) => {
  return (
    <div>
      {selectedCharacterList.map((character) => {
        <CharacterPortrait 
          charName={character['Character Name']}
          imgLink={character['Image Link']}
          rarity={character['Rarity']}
        />
      })}
    </div>
  )
}

export default SelectedCharacters;