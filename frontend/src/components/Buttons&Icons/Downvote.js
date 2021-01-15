import React from 'react';


const Downvote = ({ selected, handleDownvote }) => {
  return (
    <i className={`fas fa-times-circle ${ selected === 2 && 'active jello-horizontal' }`} onClick={handleDownvote} />
  )
}


export default Downvote;