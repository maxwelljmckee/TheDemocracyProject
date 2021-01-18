import React, { useState } from 'react';


const BillCommentForm = ({ userId, billId }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className='bill-comment-form__container'>
      <form onSubmit={handleSubmit}>
        <textarea 
          name='commentText'
          type='text'
          placeholder='Leave a Comment'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          />
      </form>
    </div>
  )
}


export default BillCommentForm;