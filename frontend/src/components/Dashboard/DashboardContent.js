import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

import SectionBreak from '../Layout/SectionBreak';
import dashboardIcon from './Dashboard-icon.png';
import FollowRepsBadges from './FollowRepsBadges';
import RepCard from '../Representatives/RepCard';


const DashboardContent = ({ user, animate }) => {
  const [forwardAnimate, setForwardAnimate] = useState(false);
  // const [followedReps, setFollowedReps] = useState([]);
  // const [followedBills, setFollowedBills] = useState([]);

  // FETCH FOLLOWED REPS AND STORE IN STATE
  // useEffect(() => {
    
  // }, [])

  // // FETCH FOLLOWED BILLS AND STORE IN STATE
  // useEffect(() => {
    
  // }, [])

  return (
    <div className={`${ forwardAnimate && 'slide-out-left'}`}>
      <div className={`dashboard__container 
      ${ !animate && 'hidden' }
      ${ animate && 'slide-in-bottom-rebound'}`} >
        <div className='dashboard__icon-container'>
          <img className='dashboard__icon' src={dashboardIcon} alt='dashboard' />
        </div>
        <SectionBreak sectionTitle='Meet Your Representatives' />
        {/* for rep in followedReps, map RepCard */}
        { user.repFollows.map(repFollow => {
          return <RepCard rep={repFollow.representative} user={user} key={`repCard-${repFollow.representative.id}`}
          setForwardAnimate={setForwardAnimate} />
        })}
        <SectionBreak sectionTitle='Follow Other Representatives' />
        <FollowRepsBadges />
        <SectionBreak sectionTitle="Bills You're Following" />
        {/* for bill in followedBills, map BillCard */}
        <SectionBreak sectionTitle='See More Bills' />
        {/* load 4 unfollowed bills */}
        <SectionBreak sectionTitle='See what people are saying' />
        {/* Community Forum */}
      </div>
    </div>
  )
}


export default DashboardContent;