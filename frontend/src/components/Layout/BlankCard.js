import React from 'react';


const BlankCard = ({ text, subtext }) => {
  return (
    <div className='blank-card'>
      {text}
      {subtext &&
        <div className='blank-card__subtext'>
          {subtext}
        </div>
      }
    </div>
  )
}


export default BlankCard