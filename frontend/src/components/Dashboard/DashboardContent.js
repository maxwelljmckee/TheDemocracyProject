import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

import SectionBreak from '../Layout/SectionBreak';
import SectionFooter from '../Layout/SectionFooter';
import dashboardIcon from './Dashboard-icon.png';
import FollowRepsBadges from './FollowRepsBadges';
import RepCard from '../Representatives/RepCard';
import { useHistory } from 'react-router-dom';


const DashboardContent = ({ user, animate }) => {
  const history = useHistory();

  const [forwardAnimate, setForwardAnimate] = useState(false);
  
  const repCardFooterClick = () => {
    setForwardAnimate(true);
    setTimeout(() => {
      history.push('/representatives/following')
    }, 600)
  }


  return (
    <div className={`${ forwardAnimate && 'slide-out-left'}`}>
      <div className={`dashboard__container 
      ${ !animate && 'hidden' }
      ${ animate && 'slide-in-bottom-rebound'}`} >
        
        {/* HEADER */}
        <div className='dashboard__icon-container'>
          <img className='dashboard__icon' src={dashboardIcon} alt='dashboard' />
        </div>
        <div className='dashboard__welcome'>
          Welcome {user.firstName}
        </div>

        {/* SECTIONS */}
        <SectionBreak sectionTitle='Meet Your Representatives' />
        {/* for rep in followedReps, map RepCard */}
        { user.repFollows.map(repFollow => {
          if (repFollow.isConstituent) {
            return <RepCard rep={repFollow.representative} user={user} key={`repCard-${repFollow.representative.id}`}
            setForwardAnimate={setForwardAnimate} />
          }
        })}
        <SectionFooter 
          footerText='See All Following'
          handleClick={repCardFooterClick} />
        

        <SectionBreak sectionTitle='Follow Other Representatives' />
        <FollowRepsBadges />

        <SectionBreak sectionTitle="Bills You're Following" />
        {/* for bill in followedBills, map BillCard */}

        <SectionBreak sectionTitle='Find More Bills' />
        {/* load 4 unfollowed bills */}

        <SectionBreak sectionTitle='Community' />
        {/* Community Forum */}

        <SectionBreak />
      </div>
    </div>
  )
}


export default DashboardContent;