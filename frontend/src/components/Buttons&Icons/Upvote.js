import React from 'react';


const Upvote = ({ selected, handleUpvote }) => {
  return (
    <i className={`fas fa-check-circle ${ selected === 1 && 'active' }`}
    onClick={handleUpvote} />
  )
}


export default Upvote;