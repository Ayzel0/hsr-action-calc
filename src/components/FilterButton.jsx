import { useState } from 'react';

const FilterButton = ({ imageLink, onClick, iconType, isActive }) => {
  const backgroundClass = isActive === true ? 'bg-zinc-800' : 'bg-slate-600'
  const defaultClasses = `rounded-xl cursor-pointer ${backgroundClass}`
  const imageClasses = `w-16 ${iconType === 'path' && 'p-2'}`

  return (
    <>
      <div className={defaultClasses} onClick={onClick}>
        <img 
          src={imageLink} 
          className={imageClasses}
        />
      </div>
    </>
  )
}

export default FilterButton;