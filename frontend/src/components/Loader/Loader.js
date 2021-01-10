import React, { useEffect, useState } from 'react';

import buildingOnly from './building_only.png';
import starsOnly from './stars_only.png';
import ProPublicaCenter from './ProPublicaCenter';


const DynamicLogo = () => {
  const [animate, setAnimate] = useState(true)

  const toggleAnimate = () => {
    setTimeout(() => {
      setAnimate(!animate)
    }, 1200)
  }

  useEffect(() => {
    toggleAnimate()
  }, [animate])

  return (
    <div className='loader__dynamic-logo'>
      { animate && <div className='loader__stars'>
        <img className='rotate-center' src={starsOnly} alt='stars' />
      </div>}
      { !animate && <div className='loader__stars'>
        <img className='rotate-center' src={starsOnly} alt='stars' />
      </div>}
      <div className='loader__building'>
        <img src={buildingOnly} alt='building' />
      </div>
      <div className='loader__whitespace'>   </div>
    </div>
  )
}


const Loader = () => {
  return (
    <div className='loader__container fade-in-fast'>
      <DynamicLogo />
      <ProPublicaCenter />
    </div>
  )
}


export default Loader;