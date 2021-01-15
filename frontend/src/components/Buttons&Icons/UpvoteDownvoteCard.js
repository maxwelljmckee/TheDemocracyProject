import React from 'react';

import Upvote from './Upvote';
import Downvote from './Downvote';

const UpvoteDownvoteCard = ({ selected, handleUpvote, handleDownvote }) => {
  return (
    <div className='upvote-downvote-card'>
      <Upvote handleUpvote={handleUpvote} selected={selected} />
      <Downvote handleDownvote={handleDownvote} selected={selected} />
    </div>
  )
}


export default UpvoteDownvoteCard;