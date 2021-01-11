import React from 'react';


const Downvote = ({ handleDownvote }) => {
  return (
    <i className="fas fa-times-circle" onClick={handleDownvote} />
  )
}


export default Downvote;