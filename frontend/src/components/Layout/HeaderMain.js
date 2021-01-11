import React from 'react';

import staticLogo from '../../static/image-only_logo.png';


const HeaderMain = () => {
  return (
    <div className='header-main__container'>
      <img src={staticLogo} alt='logo' />
      <i className="fas fa-bars"></i>
    </div>
  )
}


export default HeaderMain;