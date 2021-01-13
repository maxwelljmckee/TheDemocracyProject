import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import Loader from '../Loader/Loader';
import RepCard from '../Representatives/RepCard';
import { fetchRepsByChamber } from '../../store/representatives';
import SectionBreak from '../Layout/SectionBreak';
import BackArrow from '../Buttons&Icons/BackArrow';


const RepIndex = () => {
  const { chamber } = useParams();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [animateCleanup, setAnimateCleanup] = useState(false);
  const [animateMainContent, setAnimateMainContent] = useState(false);
  const [forwardAnimate, setForwardAnimate] = useState(false);

  const user = useSelector(state => state.session.user);
  const reps = useSelector(state => state.representatives.reps);
  const [following, setFollowing] = useState([])


  // ON PAGE LOAD, CONDITIONALLY LOAD FOLLOWED REPS INTO STATE FROM USER.REP_FOLLOWS OR DISPATCH A REP_FETCH_BY_CHAMBER TO REDUX STORE
  useEffect(() => {
    if (chamber === 'following') {
      setFollowing(user.repFollows.map(follow => follow.representative));
      setLoaded(true);
    } else {
      dispatch(fetchRepsByChamber(chamber)).then(() => {
        setTimeout(() => {
          setAnimateCleanup(true); // initiate loader fade out
          setTimeout(() => {
            setLoaded(true); // load next page
            setTimeout(() => {
              setAnimateMainContent(true); //slide in main content
            }, 1000) // slide in main content
          }, 100) // fade out time
        }, 1500) // extra loading time
      })
    }
  }, [])


  return (

    <>
      { !loaded ?
        <Loader animateCleanup={animateCleanup}/>
      :
        <div className={`${forwardAnimate && 'slide-out-left'}`}>
          <HeaderMain fromLoader={chamber !== 'following'}/>
          
          {/* RENDER PAGE CONDITIONALLY DEPENDENT ON WHETHER IT'S A FOLLOWERS LIST OR A FULL CONGRESSIONAL MEMBER LIST */}
          { chamber === 'following' ?
            <div className='rep-index__container slide-in-right'>
              <BackArrow />
              <i className="fas fa-search"></i>
              <SectionBreak sectionTitle="Here's who you're following" />
              { following.map(follow => {
                return <RepCard user={user} rep={follow} setForwardAnimate={setForwardAnimate} />
              })}
            </div>
          :
            <div className={`rep-index__container 
            ${ !animateMainContent && 'hidden' }
            ${ animateMainContent && 'slide-in-bottom-rebound' }`}>
              
            </div>
          }

          <FooterMain fromLoader={chamber !== 'following'} />
        </div>
      }
    </>
  )
}


export default RepIndex;