import React from 'react';
import HamburgerMenu from './HamburgerMenu';


const HamburgerCard = ({ text, handleClick }) => {
  return (
    <div className='hamburger-card' onClick={handleClick} >
      {text}
    </div>
  )
}


export default HamburgerCard;