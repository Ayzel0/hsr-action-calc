const ActionIconHoverMenu = () => {
  return (
    <div className='bg-emerald-600 py-2 px-5 rounded-2xl text-white'>
      <h1 className='text-xl font-bold'>Action/Speed Change</h1>
      <div>
        <h2 className='text-lg mt-2'>Action Advance</h2>
        <form className='text-black'>
          <input 
            type='number'
          />
        </form>
        <h2 className='text-lg mt-2'>Speed Change</h2>
        <form className='text-black mb-2'>
          <input 
            type='number'
          />
        </form>
      </div>
    </div>
  );
}

export default ActionIconHoverMenu;