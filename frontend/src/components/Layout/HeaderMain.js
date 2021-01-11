import React, { useEffect, useState } from 'react';

import staticLogo from '../../static/image-only_logo.png';


const HeaderMain = ({ fromLoader }) => {
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

  return (
    <>
      {/* WITHOUT ANIMATIONS */}
      { !fromLoader && 
        <div className='header-main__container'>
          <img src={staticLogo} alt='logo' />
          <i className={`fas fa-bars ${ animate3 && 'slide-in-right'}`}></i>
        </div>
      }

      {/* WITH ANIMATIONS */}
      <div className={`header-main__container
        ${ animate1 && 'slide-in-top-linear'}`}>

        { animate2 && <img src={staticLogo} alt='logo' className='slide-in-left-linear' />}

        { animate3 && <i className='fas fa-bars slide-in-right'></i> }

      </div>
    </>
  )
}


export default HeaderMain;