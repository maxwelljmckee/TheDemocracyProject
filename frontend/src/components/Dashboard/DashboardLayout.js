import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import LayoutWrapper from '../Layout/LayoutWrapper';
// import LoaderWrapper from '../Loader/LoaderWrapper';
import Loader from '../Loader/Loader'
import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import DashboardContent from './DashboardContent';
import { restoreUser } from '../../store/session';


const DashboardLayout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [animateMainContent, setAnimateMainContent] = useState(false);
  // const [animateFooter, setAnimateFooter] = useState(false)
  const [animateCleanup, setAnimateCleanup] = useState(false);

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setTimeout(() => {
        setAnimateCleanup(true); // initiate loader fade out
        setTimeout(() => {
          setLoading(false); // load next page
          setTimeout(() => {
            setAnimateMainContent(true); //slide in main content
          }, 900) // slide in main content
        }, 100) // fade out time
      }, 2500) // extra loading time
    })
  }, [])
  
  return (
    <>
      { loading ? <Loader animateCleanup={animateCleanup} /> :
        <>
          <HeaderMain fromLoader={true} />
          { animateMainContent && <DashboardContent /> }
          <FooterMain fromLoader={true} />
        </>
        }
      </>
  )
}

// const DashboardWithLayout = () => {
//   return <LayoutWrapper Component={DashboardMain()} />
// }


export default DashboardLayout;