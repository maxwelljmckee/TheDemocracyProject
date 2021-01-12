import React from 'react';


const Upvote = ({ handleUpvote }) => {
  return (
    <i className="fas fa-check-circle" onClick={handleUpvote} />
  )
}


export default Upvote;