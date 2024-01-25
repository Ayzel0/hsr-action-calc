const ActionValueIcon = ({ avListObj }) => {
  return (
    <div className='relative bg-gradient-to-r from-cyan-800 to-blue-800 inline-block z-0 my-2 border-4 border-slate-400'>
      <p className='text-white font-bold absolute bg-black p-2 left-0 rounded-br-2xl z-10'>{avListObj['currentAV'].toFixed(0)}</p>
      <div className='h-[150px] overflow-hidden'>
        <img 
          src={avListObj['icon']}
          className='top-1/2 -translate-y-[100px] scale-75'
        />
      </div>
    </div>
  )
}

export default ActionValueIcon;