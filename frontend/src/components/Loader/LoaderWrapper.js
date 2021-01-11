import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Loader from './Loader';


const LoaderWrapper = ({ Component, fetchAction }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAction).then(() => {
      setTimeout(() => {
        setLoading(false)
      }, 2500)
    })
  }, [])
  
  return (
    <>
      { loading ? <Loader /> : <Component /> }
    </>
  )
}


export default LoaderWrapper;