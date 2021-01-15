import React, { useEffect, useState } from 'react';


const BillFollowButton = ({ user, bill }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConstituent, setIsConstituent] = useState(false);

  // ON PAGE LOAD, CHECK IF CURRENT bill IS FOLLOWED BY SESSION USER
  useEffect(() => {
    
  
  }, [])

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);
    const res = await fetch('/api/bill/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId: bill.id, userId: user.id })
    })
    const data = await res.json();
    return data
  }

  const handleUnfollow = async () => {
    setIsFollowing(!isFollowing);
    const res = await fetch('/api/bill/unfollow', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId: bill.id, userId: user.id })
    })
    const data = await res.json();
    return data
  }

  return (
    <>
      { !isFollowing ?
        <div className='follow-button' onClick={handleFollow}>
          follow
        </div>
        :
        <div className='unfollow-button' onClick={handleUnfollow}>
          unfollow
        </div>
      }
    </>
  )
}


export default BillFollowButton;