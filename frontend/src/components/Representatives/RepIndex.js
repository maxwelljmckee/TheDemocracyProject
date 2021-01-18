import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import Loader from '../Loader/Loader';
import RepCard from '../Representatives/RepCard';
import { fetchRepsByChamber } from '../../store/representatives';
import SectionBreak from '../Layout/SectionBreak';
import RepSearch from './RepSearch';
import BackArrow from '../Buttons&Icons/BackArrow';
import { fetchUnitedStates } from '../../store/states';


const RepIndex = () => {

  // UTILITY HOOKS AND ANIMATION STATES
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [animateCleanup, setAnimateCleanup] = useState(false);
  const [animateMainContent, setAnimateMainContent] = useState(false);
  const [forwardAnimate, setForwardAnimate] = useState(false);
  const [backAnimate, setBackAnimate] = useState(false);
  
  // REDUX GLOBAL STATE // LOCAL STATE // PARAMS
  const { chamber } = useParams();
  const user = useSelector(state => state.session.user);
  let reps = useSelector(state => state.reps);
  const unitedStates = useSelector(state => state.states);
  const [following, setFollowing] = useState([]);

  // QUERY PARAMETERS FOR SEARCH BAR
  const [searchTerm, setSearchTerm] = useState('');
  const [selectValue, setSelectValue] = useState('');

  // ON RERENDER, FILTER REPS-LIST BY QUERY PARAMETERS
  if (searchTerm) {
    reps = reps.filter(rep => {
      const fullName = `${rep.firstName} ${rep.lastName}`
      return fullName.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  if (selectValue) {
    reps = reps.filter(rep => rep.stateId === selectValue)
  }


  // ON PAGE LOAD, CONDITIONALLY LOAD REPS FROM USER.REP_FOLLOWS OR REDUX GLOBAL STATE, ALONG WITH UNITED STATES DATA
  useEffect(() => {
    if (chamber === 'following') {
      setFollowing(user.repFollows.map(follow => follow.representative));
      setLoaded(true);
    } else {
      dispatch(fetchRepsByChamber(chamber)).then(() => {
        dispatch(fetchUnitedStates()).then(() => {
          setTimeout(() => {
            setAnimateCleanup(true); // initiate loader fade out
            setTimeout(() => {
              setLoaded(true); // load next page
              setTimeout(() => {
                setAnimateMainContent(true); //slide in main content
              }, 1000) // slide in main content
            }, 100) // fade out time
          }, 500) // extra loading time
        })
      })
    }
  }, [chamber, dispatch, user.repFollows])

  return (
    <>
      { !loaded ?
        <Loader animateCleanup={animateCleanup}/>
      :
      <div className={`${ backAnimate && 'slide-out-right' }`}>
        <div className={`${forwardAnimate && 'slide-out-left'}`}>
          <HeaderMain fromLoader={chamber !== 'following'}/>
          
          {/* 'FOLLOWING' RENDERS A DIFFERENT VIEW THAN OTHER CHAMBERS*/}
          { chamber === 'following' ?
            <div className='rep-index__container slide-in-right'>
              <div className='rep-index__header'>
                <BackArrow setAnimation={setBackAnimate} />
                <i className="fas fa-search"></i>
                <SectionBreak sectionTitle="See who you're following" />
              </div>
              <div className='rep-index__body'>
                { following.map(follow => {
                  return <RepCard 
                          key={`representative-${follow.id}`} 
                          user={user} rep={follow} 
                          setForwardAnimate={setForwardAnimate} />
                })}
                <SectionBreak />
              </div>
            </div>
          :
          // VIEW FOR ALL OTHER CHAMBERS
          <>
          { reps && 
            <div className={`rep-index__container 
            ${ !animateMainContent && 'hidden' }
            ${ animateMainContent && 'slide-in-bottom-rebound' }`}>
              <div className='rep-index__header'>
                <BackArrow setAnimation={setBackAnimate} />
                <i className="fas fa-search"></i>
                <RepSearch
                  chamber={chamber}
                  unitedStates={unitedStates}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setSelectValue={setSelectValue} />
              </div>
              <div className='rep-index__body'>
                {reps.map(rep => {
                  return <RepCard 
                          key={`representative-${rep.id}`} 
                          user={user} rep={rep} 
                          setForwardAnimate={setForwardAnimate} />
                })}
                <SectionBreak />
              </div>
            </div>
          }
          </>
          }

          <FooterMain fromLoader={chamber !== 'following'} />
        </div>
      </div>
      }
    </>
  )
}


export default RepIndex;