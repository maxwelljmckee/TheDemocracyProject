import React, { useState } from 'react';


const BillCommentForm = ({ userId, billId }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('HIT FETCH');
    const res = await fetch('/api/bills/post-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, billId, message: commentText })
    })
    const data = await res.json();
    return data
  }

  return (
    <div className='bill-comment-form__container'>
      <form className='bill-comment-form' onSubmit={handleSubmit}>
        <textarea 
          name='commentText'
          type='text'
          placeholder='Post a Comment'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          />
        <button type='submit'>Post</button>
      </form>
    </div>
  )
}


export default BillCommentForm;