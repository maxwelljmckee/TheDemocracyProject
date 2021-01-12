import React from 'react';


const FollowRepsBadges = () => {
  const executiveUrl = 'https://miro.medium.com/max/1200/0*ysaO9dlLm4ElKcMK.png';
  const houseUrl = 'https://radiotv.house.gov/sites/radiotv.house.gov/files/Seal_of_the_United_States_House_of_Representatives.png';
  const senateUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/President_Pro_Tempore_US_Senate_Seal.svg/1200px-President_Pro_Tempore_US_Senate_Seal.svg.png';

  const handleExecutiveClick = () => {
    
  }
  
  const handleHouseClick = () => {

  }

  const handleSenateClick = () => {

  }

  return (
    <div className='follow-reps-badge__container'>
      <div className='follow-reps-badge'>
        <img src={executiveUrl} alt='executive' />
      </div>
      <div className='follow-reps-badge'>
        <img src={houseUrl} alt='house' />
      </div>
      <div className='follow-reps-badge'>
        <img src={senateUrl} alt='senate' />
      </div>
    </div>
  )
}


export default FollowRepsBadges;