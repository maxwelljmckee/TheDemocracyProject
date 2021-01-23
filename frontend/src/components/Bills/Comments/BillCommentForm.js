import React, { useState } from 'react';


const BillCommentForm = ({ user, billId, comments, setComments }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/bills/post-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, billId, message })
    })
    const data = await res.json();
    setComments([data, ...comments]);
    setMessage('')
    return data
  }

  return (
    <div className='bill-comment-form__container'>
      <form className='bill-comment-form' onSubmit={handleSubmit}>
        <textarea 
          name='commentText'
          type='text'
          placeholder='Post a Comment'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          />
        <button type='submit'>Post</button>
      </form>
    </div>
  )
}


export default BillCommentForm;