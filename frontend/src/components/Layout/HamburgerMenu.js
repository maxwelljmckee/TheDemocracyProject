import React from 'react';
import { useHistory } from 'react-router-dom';

import HamburgerCard from './HamburgerCard';


const HamburgerMenu = ({ showHamburger, hideHamburger }) => {
  const history = useHistory();

  return (
    <div className={`hamburger-menu 
    ${hideHamburger && 'scale-out-tr'}
    ${showHamburger && 'scale-in-tr'}`}>

      <HamburgerCard text='Settings' 
      handleClick={() => history.push('/logout')} />

      <HamburgerCard text='Logout' 
      handleClick={() => history.push('/logout')} />

    </div>
  )
}


export default HamburgerMenu;


// !!!!!!!!!STILL NEED TO RUN FLASK DB UPGRADE AND FLAK SEED ALL!!!!!!!!!!!