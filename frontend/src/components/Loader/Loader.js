import React, { useEffect, useState } from 'react';

import buildingOnly from './building_only.png';
import starsOnly from './stars_only.png';
import ProPublicaCenter from './ProPublicaCenter';


const DynamicLogo = () => {
  const [animateRotation, setAnimateRotation] = useState(true)

  useEffect(() => {
    let toggleAnimateRotation = () => {
      setTimeout(() => {
        setAnimateRotation(!animateRotation)
      }, 1200)
    }
    toggleAnimateRotation()
  }, [animateRotation])


  return (
    <div className='loader__dynamic-logo__container'>
      <div className='loader__dynamic-logo'>

        { animateRotation && <div className='loader__stars'>
          <img className='rotate-center' src={starsOnly} alt='stars' />
        </div>}

        { !animateRotation && <div className='loader__stars'>
          <img className='rotate-center' src={starsOnly} alt='stars' />
        </div>}

        <div className='loader__building'>
          <img src={buildingOnly} alt='building' />
        </div>

        <div className='loader__whitespace'>   </div>

      </div>
    </div>
  )
}


const Loader = ({ animateCleanup }) => {
  return (
    <div className={`${ animateCleanup && 'fade-out-fast'}`}>
      <div className='loader__container fade-in-fast'>
        <DynamicLogo />
        <ProPublicaCenter />
      </div>
    </div>
  )
}


export default Loader;