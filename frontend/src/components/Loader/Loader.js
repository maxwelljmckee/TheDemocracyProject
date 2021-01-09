import React from 'react';

import buildingOnly from './building_only.png';
import starsOnly from './stars_only.png';


const Loader = () => {
  return (
    <div className='loader__container slide-in-right'>
      <div className='loader__dynamic-logo'>
        <div className='loader__stars'>
          <img src={starsOnly} alt='stars' />
        </div>
        <div className='loader__building'>
          <div className='loader__whitespace'>
            <img src={buildingOnly} alt='building' />
          </div>
        </div>
      </div>
      <div className='loader__propublica'>
        <div>propublica logo</div>
      </div>
    </div>
  )
}


export default Loader;