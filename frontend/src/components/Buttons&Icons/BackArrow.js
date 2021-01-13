import React from 'react';
import { useHistory } from 'react-router-dom';


const BackArrow = ({ setAnimation }) => {
  const history = useHistory();

  const handleClick = () => {
    setAnimation(true)
    setTimeout(() => {
      history.goBack();
    }, 600)
  }

  return (
    <i className="fas fa-arrow-left" onClick={handleClick}></i>
  )
}


export default BackArrow;