import React from 'react';
import { useHistory } from 'react-router-dom';


const BackArrow = ({ setAnimation }) => {
  const history = useHistory();

  const handleClick = () => {
    if (setAnimation) {
      setAnimation(true)
      setTimeout(() => {
        history.goBack();
      }, 600)
    } else {
      history.goBack();
    }
  }

  return (
    <i className="fas fa-arrow-left" onClick={handleClick}></i>
  )
}


export default BackArrow;