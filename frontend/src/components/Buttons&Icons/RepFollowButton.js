import React, { useEffect, useState } from 'react';


const RepFollowButton = ({ user, rep }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConstituent, setIsConstituent] = useState(false);
  
  // ON PAGE LOAD, CHECK IF CURRENT REP IS FOLLOWED BY SESSION USER
  useEffect(() => {
    user.repFollows.forEach(follow => {
      if (follow.representative.id == rep.id) {
        setIsFollowing(true)
        if (follow.isConstituent) setIsConstituent(true)
      }
    })
  })

  const handleFollow = async () => {
    setIsFollowing(!isFollowing)
    const res = await fetch('/api/representatives/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ representativeId: rep.id, userId: user.id })
    })
    const data = await res.json();
    return data
  }
  
  const handleUnfollow = async () => {
    setIsFollowing(!isFollowing)
    const res = await fetch('/api/representatives/unfollow', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ representativeId: rep.id, userId: user.id })
    })
    const data = await res.json();
    return data
  }

  return (
    <>
    {/* IF USER IS CONSTITUENT, NO BUTTON RENDERS */}
      { isConstituent ? 
        <div></div>
        :
        <>
        {/* ELSE THE APPROPRIATE BUTTON DEPENDS ON THEIR FOLLOWER STATUS */}
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
      }
    </>
  )
}


export default RepFollowButton;