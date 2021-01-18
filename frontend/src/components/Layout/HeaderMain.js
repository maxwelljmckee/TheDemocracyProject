import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import staticLogo from '../../static/image-only_logo.png';
import HamburgerMenu from './HamburgerMenu'


const HeaderMain = ({ fromLoader }) => {
  const history = useHistory();

  const [animate1, setAnimate1] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  const [animate3, setAnimate3] = useState(false);

  const [showHamburger, setShowHamburger] = useState(false);
  const [hideHamburger, setHideHamburger] = useState(true);

  useEffect(() => {
    if (fromLoader) {
      setAnimate1(true); // header container
      setTimeout(() => {
        setAnimate2(true); // logo-left
        setTimeout(() => {
          setAnimate3(true); // hamburger-right
        }, 150) //slide in right - hamburger
      }, 200); //slide in left - logo
    }
  }, [fromLoader])

  const handleHomeRedirect = () => {
    history.push('/dashboard');
  }

  const handleHamburgerMenu = () => {
    setTimeout(() => {
      setShowHamburger(!showHamburger)
    }, 300)
    setHideHamburger(!hideHamburger)
  }

  return (
    <>
      {/* WITHOUT ANIMATIONS */}
      { !fromLoader && 
        <div className='header-main__container'>
          <img src={staticLogo} alt='logo' onClick={handleHomeRedirect} />
          <i className='fas fa-bars' onClick={handleHamburgerMenu} ></i>

          <HamburgerMenu
            showHamburger={showHamburger}
            hideHamburger={hideHamburger} />

        </div>
      }

      {/* WITH ANIMATIONS */}
      { animate1 && 
        <div className='header-main__container slide-in-top-linear'>

          { animate2 && <img src={staticLogo} onClick={handleHomeRedirect} alt='logo' className='slide-in-left-linear' />}

          { animate3 && <i className='fas fa-bars slide-in-right'
            onClick={handleHamburgerMenu} ></i> }

          <HamburgerMenu 
          showHamburger={showHamburger}
          setShowHamburger={setShowHamburger}
          hideHamburger={hideHamburger}
          setHideHamburger={setHideHamburger} />

        </div>
      }
    </>
  )
}


export default HeaderMain;