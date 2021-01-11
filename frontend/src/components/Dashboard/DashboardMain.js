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
  const [animateCleanup, setAnimateCleanup] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      console.log('inside dashboard timeout', animateCleanup);
      setTimeout(() => {
        setAnimateCleanup(true);
        console.log('after setting animation', animateCleanup);
        setTimeout(() => {
          console.log('inside 2nd timeout', animateCleanup);
          setLoading(false);
        }, 1000)
      }, 2500)
    })
  }, [])
  
  return (
    <>
      { loading ? <Loader animateCleanup={animateCleanup} /> :
        <>
          <HeaderMain fromLoader={true} />
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
          <div> dashboard main</div>
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