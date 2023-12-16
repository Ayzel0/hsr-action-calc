const CharacterPortrait = ({ charName, imgLink }) => {
  return (
    <div className='inline-flex flex-col items-center bg-blue-400 border-slate-950'>
      <img src={imgLink} className='w-64'/>
      <div className='bg-blue-700 w-64'>
        <p className='text-2xl font-medium text-center'>{charName}</p>
      </div>
    </div>
  )
}

export default CharacterPortrait;