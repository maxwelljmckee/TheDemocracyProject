import React, { useEffect, useState } from 'react';


const BillFollowButton = ({ user, bill }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // ON PAGE LOAD, CHECK IF CURRENT BILL IS FOLLOWED BY SESSION USER
  useEffect(() => {
    user.billsFollowed.forEach(follow => {
      if (follow.billId === bill.billId) {
        setIsFollowing(true)
      }
    })
  }, [])

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);
    const res = await fetch('/api/bills/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId: bill.id, userId: user.id })
    })
    const data = await res.json();
    return data
  }

  const handleUnfollow = async () => {
    setIsFollowing(!isFollowing);
    const res = await fetch('/api/bills/unfollow', {
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