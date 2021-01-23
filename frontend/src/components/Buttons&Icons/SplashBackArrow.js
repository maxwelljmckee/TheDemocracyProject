import React from 'react';
import { useHistory } from 'react-router-dom';


const SplashBackArrow = ({ setAnimation }) => {
  const history = useHistory();

  const handleClick = () => {
    if (setAnimation) {
      setAnimation(true)
      setTimeout(() => {
        history.push('/');
      }, 600)
    } else {
      history.push('/');
    }
  }

  return (
    <i className="fas fa-arrow-left splash-back-arrow" onClick={handleClick}></i>
  )
}


export default SplashBackArrow;