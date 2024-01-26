import ActionIconHoverMenu from "./ActionIconHoverMenu";
import { useState } from 'react';

const ActionValueIcon = ({ avListObj, actionValueList, setActionValueList, actionIndex, currentActionState, simStarted }) => {
  const [displayHoverMenu, setDisplayHoverMenu] = useState(false);

  const handleMouseEnter = () => {
    setDisplayHoverMenu(true);
  }

  const handleMouseLeave = () => {
    setDisplayHoverMenu(false);
  }
  
  const isCurrentAction = actionIndex === 0;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='my-2'
    >
      {(simStarted && displayHoverMenu && (actionIndex === 2 || actionIndex === 3)) &&
      <div className='absolute z-10 -translate-y-[100%]'>
        <ActionIconHoverMenu 
          avListObj={avListObj}
          actionValueList={actionValueList}
          setActionValueList={setActionValueList}
        />
      </div>
      }
      <div 
        className={`relative bg-gradient-to-r from-cyan-800 to-blue-800 inline-block z-0 border-4 border-slate-400 transition-transform ${(currentActionState === 'advancing' && isCurrentAction) && 'opacity-80 translate-x-[15px]'}`}
      >
        <p className='text-white font-bold absolute bg-black p-2 left-0 rounded-br-2xl z-10'>{avListObj['currentAV']}</p>
        <div className={`${isCurrentAction ? 'h-48' : 'h-32'} overflow-hidden`}>
          <img 
            src={avListObj['icon']}
            className={`top-1/2 ${isCurrentAction ? 'w-100 -translate-y-[50px]' : 'w-80 -translate-y-[60px]'}`}
          />
        </div>
      </div>
      {(simStarted && displayHoverMenu && (actionIndex === 0 || actionIndex === 1)) &&
      <div className='absolute z-10'>
        <ActionIconHoverMenu 
          avListObj={avListObj}
          actionValueList={actionValueList}
          setActionValueList={setActionValueList}
        />
      </div>
      }
    </div>
  )
}

export default ActionValueIcon;