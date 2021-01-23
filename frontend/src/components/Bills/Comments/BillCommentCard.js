import React, { useState } from 'react';


const BillCommentCard = ({ user, comment, comments, setComments }) => {
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState(`${comment.message}`);

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleDelete = async () => {
    const res = await fetch('/api/bills/delete-comment', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId: comment.id })
    })
    const data = await res.json();
    setComments(comments.filter(item => item.id !== comment.id))
    return data
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/bills/update-comment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentId: comment.id,
        message
      })
    })
    const data = await res.json();
    setEdit(false)
    return data
  }
  
  return (
    <div className='bill-comment-card__container'>
      <div className='bill-comment-card__header'>
        <div className='bill-comment-card__header-group1'>
          {comment.user.firstName} {comment.user.lastName}
        </div>
        { user.id === comment.user.id &&
          <div className='bill-comment-card__header-group2'>
              <i className="far fa-edit" onClick={handleEdit}></i>
              <i className="far fa-trash-alt" onClick={handleDelete}></i>
          </div>
        }
      </div>
      { edit ?
        <form className='bill-comment-update' onSubmit={handleUpdate}>
          <textarea
            name='commentText'
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit'>Update</button>
        </form>
      :
        <div className='bill-comment-card__message'>
          {message}
        </div>
      }
    </div>
  )
}


export default BillCommentCard;