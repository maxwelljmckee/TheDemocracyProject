import React from 'react';

import Upvote from './Upvote';
import Downvote from './Downvote';

const UpvoteDownvoteCard = ({ handleUpvote, handleDownvote }) => {

  return (
    <div className='upvote-downvote-card'>
      <Upvote handleUpvote={handleUpvote} />
      <Downvote handleDownvote={handleDownvote} />
    </div>
  )
}


export default UpvoteDownvoteCard;