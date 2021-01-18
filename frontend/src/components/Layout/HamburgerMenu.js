import React from 'react';
import { useHistory } from 'react-router-dom';

import HamburgerCard from './HamburgerCard';


const HamburgerMenu = ({ showHamburger, setShowHamburger, hideHamburger, setHideHamburger }) => {
  const history = useHistory();
  // const [forwardAnimate, setForwardAnimate] = useState(false);

  // const handleHome = () => {
  //   setShowHamburger(!showHamburger);
  //   setHideHamburger(!hideHamburger);
  //   setTimeout(() => {
  //     setForwardAnimate(true);
  //     setTimeout(() => {
  //       history.push('/dashboard');
  //     }, 600)
  //   }, 500)
  // }

  return (
    // <div className={`${forwardAnimate && 'slide-out-left'}`}>
      <div className={`hamburger-menu 
      ${hideHamburger && 'scale-out-tr'}
      ${showHamburger && 'scale-in-tr'}
      ${!showHamburger && 'hidden'}`}>

        <HamburgerCard text='Home' 
        handleClick={() => history.push('/dashboard')} />

        <HamburgerCard text='Mission' 
        handleClick={() => history.push('/mission')} />

        <HamburgerCard text='TDP Academy' 
        handleClick={() => history.push('/glossary')} />

        <HamburgerCard text='Settings' 
        handleClick={() => history.push('/settings')} />

        <HamburgerCard text='Logout' 
        handleClick={() => history.push('/logout')} />

      </div>
    // </div>
  )
}


export default HamburgerMenu;


// !!!!!!!!!STILL NEED TO RUN FLASK DB UPGRADE AND FLAK SEED ALL!!!!!!!!!!!