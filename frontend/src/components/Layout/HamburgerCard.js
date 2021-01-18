import React from 'react';


const HamburgerCard = ({ text, handleClick }) => {
  return (
    <div className='hamburger-card' onClick={handleClick} >
      {text}
    </div>
  )
}


export default HamburgerCard;