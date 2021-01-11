import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// import LayoutWrapper from '../Layout/LayoutWrapper';
// import LoaderWrapper from '../Loader/LoaderWrapper';
import Loader from '../Loader/Loader'
import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import { restoreUser } from '../../store/session';


const DashboardMain = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [animateMainContent, setAnimateMainContent] = useState(false);
  // const [animateFooter, setAnimateFooter] = useState(false)
  const [animateCleanup, setAnimateCleanup] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setTimeout(() => {
        setAnimateCleanup(true); // initiate loader fade out
        setTimeout(() => {
          setLoading(false); // load next page
          setTimeout(() => {
            setAnimateMainContent(true); //slide in main content
          }, 1000) // slide in main content
        }, 300) // fade out time
      }, 2500) // extra loading time
    })
  }, [])
  
  return (
    <>
      { loading ? <Loader animateCleanup={animateCleanup} /> :
        <>
          <HeaderMain fromLoader={true} />
          { animateMainContent && 
            <div className='dashboard__container slide-in-bottom-rebound' >
              <h1>Main Page Content</h1>
            </div>
          }
          <FooterMain fromLoader={true} />
        </>
        }
      </>
  )
}

// const DashboardWithLayout = () => {
//   return <LayoutWrapper Component={DashboardMain()} />
// }


export default DashboardMain;