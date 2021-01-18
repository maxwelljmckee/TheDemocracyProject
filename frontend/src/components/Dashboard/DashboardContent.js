import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SectionBreak from '../Layout/SectionBreak';
import SectionFooter from '../Layout/SectionFooter';
import dashboardIcon from './Dashboard-icon.png';
import FollowRepsBadges from './FollowRepsBadges';
import BillFollowBadges from './BillFollowBadges';
import BillCard from '../Bills/BillCard';
import RepCard from '../Representatives/RepCard';
import AnimationWrapper from '../Layout/AnimationWrapper';


const DashboardContent = ({ user, animate }) => {
  const history = useHistory();
  // const [animate, setAnimate] = useState(false)
  const [forwardAnimate, setForwardAnimate] = useState(false);
  
  const repCardFooterClick = () => {
    setForwardAnimate(true);
    setTimeout(() => {
      history.push('/representatives/following')
    }, 600)
  }
  
  const billCardFooterClick = () => {
    setForwardAnimate(true);
    setTimeout(() => {
      history.push('/bills/following')
    }, 600)
  }


  return (
    <div className={`${ forwardAnimate && 'slide-out-left'}`}>
      <div className={`dashboard__container 
      ${ !animate && 'hidden' }
      ${ animate && 'slide-in-bottom-rebound'}`} >
        <>
        {/* HEADER */}
        <div className='dashboard__icon-container'>
          <img className='dashboard__icon' src={dashboardIcon} alt='dashboard' />
        </div>
        <div className='dashboard__welcome'>
          Welcome {user.firstName}
        </div>

        {/* REPRESENTATIVES IN FOLLOWING */}
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
        

        {/* FOLLOW MORE REPRESENTATIVES */}
        <SectionBreak sectionTitle='Follow Other Representatives' />
        <FollowRepsBadges setForwardAnimate={setForwardAnimate} />


        {/* BILLS IN FOLLOWING */}
        <SectionBreak sectionTitle="Bills You're Following" />
        { user.billsFollowed.length ? 
          <>
            { user.billsFollowed.slice(0, 3).map(bill => {
              return <BillCard bill={bill} setAnimation={setForwardAnimate} />
            })}
            <SectionFooter 
              footerText='See All Following'
              handleClick={billCardFooterClick} />
          </>
          :
          <SectionFooter footerText='not following any bills' />
        }


        {/* FOLLOW MORE BILLS */}
        <SectionBreak sectionTitle='Follow More Bills' />
        <BillFollowBadges setForwardAnimate={setForwardAnimate} />


        {/* COMMUNITY FEATURES */}
        <SectionBreak sectionTitle='Community' />
        {/* Community Forum */}

        <SectionBreak />
        </>
      </div>
    </div>
  )
}


// const DashboardWithAnimation = () => {
//   return <AnimationWrapper Component={DashboardContent} />
// }


export default DashboardContent;