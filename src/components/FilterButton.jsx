import { useState } from 'react';

const FilterButton = ({ imageLink, onClick }) => {
  const [isActive, setIsActive] = useState(true);

  const backgroundClass = isActive === true ? 'bg-zinc-800' : 'bg-slate-600'
  const defaultClasses = `rounded-xl cursor-pointer ${backgroundClass}`

  const setActive = () => {
    if (isActive) {
      setIsActive(false);
    }
    else {
      setIsActive(true);
    }
    onClick && onClick();
  }

  return (
    <>
      <div className={defaultClasses} onClick={() => setActive()}>
        <img src={imageLink} />
      </div>
    </>
  )
}

export default FilterButton;