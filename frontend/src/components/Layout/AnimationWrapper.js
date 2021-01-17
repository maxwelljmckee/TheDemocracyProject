import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderMain from './HeaderMain';
import FooterMain from './FooterMain';
import Loader from '../Loader/Loader';
import { restoreUser } from '../../store/session';


const AnimationWrapper = ({ Component }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  // LOADING CONDITIONALLY TRIGGERS THE LOADER VIEW OR THE MAIN PAGE CONTENT
  const [loading, setLoading] = useState(true);

  // ANIMATE_CLEANUP TRIGGERS LOADER FADE-OUT BEFORE ANIMATING PAGE CONTENT
  const [animateCleanup, setAnimateCleanup] = useState(false);

  // ANIMATE_MAIN_CONTENT TRIGGERS PAGE CONTENT SLIDE-IN
  const [animateMainContent, setAnimateMainContent] = useState(false);
  
  // FORWARD_ANIMATE TRIGGERS CLEANUP ANIMATION BEFORE LOADING NEXT PAGE
  const [forwardAnimate, setForwardAnimate] = useState(false);

  // BACK_ANIMATE TRIGGERS CLEANUP ANIMATION BEFORE LOADING NEXT PAGE
  const [backAnimate, setBackAnimate] = useState(false);


  // const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setTimeout(() => {
        setAnimateCleanup(true); // initiate loader fade out
        setTimeout(() => {
          setLoading(false); // load next page
          setTimeout(() => {
            setAnimateMainContent(true); //slide in main content
          }, 1000) // slide in main content
        }, 100) // fade out time
      }, 1000) // extra loading time
    })
  }, [])

  return (
    <>
      { loading ? <Loader animateCleanup={animateCleanup} /> :
        <>
          <HeaderMain fromLoader={true} />
          <div className={`${ forwardAnimate && 'slide-out-left' }`}>
            <div className={`${ backAnimate && 'slide-out-right' }`}>
              <div className={`main-page-content
              ${ !animateMainContent && 'hidden'}
              ${ animateMainContent && 'slide-in-bottom-rebound' }`}>
                { Component({user, setForwardAnimate, setBackAnimate}) }
              </div>
            </div>
          </div>
          <FooterMain fromLoader={true} />
        </>
      }
    </>
  )
}


export default AnimationWrapper;