import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import staticLogo from '../../static/image-only_logo.png';


const HeaderMain = ({ fromLoader }) => {
  const history = useHistory();
  console.log('from loader =', fromLoader);
  console.log('not from loader =', !fromLoader);

  const [animate1, setAnimate1] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  const [animate3, setAnimate3] = useState(false);

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
  }, [])

  const handleHomeRedirect = () => {
    history.push('/dashboard');
  }

  const handleHamburgerMenu = () => {

  }

  return (
    <>
      {/* WITHOUT ANIMATIONS */}
      { !fromLoader && 
        <div className='header-main__container'>
          <img src={staticLogo} alt='logo' onClick={handleHomeRedirect} />
          <i className='fas fa-bars' onClick={handleHamburgerMenu} ></i>
        </div>
      }

      {/* WITH ANIMATIONS */}
      { animate1 && 
        <div className='header-main__container slide-in-top-linear'>

          { animate2 && <img src={staticLogo} onClick={handleHomeRedirect} alt='logo' className='slide-in-left-linear' />}

          { animate3 && <i className='fas fa-bars slide-in-right'
            onClick={handleHamburgerMenu} ></i> }

        </div>
      }
    </>
  )
}


export default HeaderMain;