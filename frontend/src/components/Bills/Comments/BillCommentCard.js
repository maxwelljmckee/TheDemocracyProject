import React from 'react';
import BillCommentForm from './BillCommentForm';


const BillCommentCard = ({ comment }) => {
  return (
    <div bill-comment-card__container>
      <div className='bill-comment-card__user'>
        {console.log(comment)}
      </div>
    </div>
  )
}


export default BillCommentCard;