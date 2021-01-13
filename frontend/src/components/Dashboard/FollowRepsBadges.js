import React from 'react';
import { useHistory } from 'react-router-dom';


const FollowRepsBadges = () => {
  const history = useHistory();

  const executiveUrl = 'https://miro.medium.com/max/1200/0*ysaO9dlLm4ElKcMK.png';
  const houseUrl = 'https://radiotv.house.gov/sites/radiotv.house.gov/files/Seal_of_the_United_States_House_of_Representatives.png';
  const senateUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/President_Pro_Tempore_US_Senate_Seal.svg/1200px-President_Pro_Tempore_US_Senate_Seal.svg.png';

  const handleExecutiveClick = () => {
    history.push('/representatives/executive')
  }
  
  const handleHouseClick = () => {
    history.push('/representatives/house')
  }
  
  const handleSenateClick = () => {
    history.push('/representatives/senate')
  }

  return (
    <div className='follow-reps-badge__container'>
      <div className='follow-reps-badge__title'>Executive</div>
      <div className='follow-reps-badge'>
        <img src={executiveUrl} alt='executive' onClick={handleExecutiveClick} />
      </div>

      <div className='follow-reps-badge__title'>House</div>
      <div className='follow-reps-badge'>
        <img src={houseUrl} alt='house' onClick={handleHouseClick} />
      </div>

      <div className='follow-reps-badge__title'>Senate</div>
      <div className='follow-reps-badge'>
        <img src={senateUrl} alt='senate' onClick={handleSenateClick} />
      </div>
    </div>
  )
}


export default FollowRepsBadges;