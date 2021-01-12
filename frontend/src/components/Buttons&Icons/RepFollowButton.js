import React, { useEffect, useState } from 'react';


const RepFollowButton = ({ user, rep }) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const [isConstituent, setIsConstituent] = useState(false);
  
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
    // TEST FETCH REQUEST TO FOLLOW
    // const res = await fetch('/api/representatives/follow', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: { representative_id: rep.id, user_id: user.id }
    // })
  }
  
  const handleUnfollow = async () => {
    setIsFollowing(!isFollowing)
    // TEST FETCH REQUEST TO UNFOLLOW
    // s = await fetch('/api/representatives/unfollow', {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' }
    // })
  }

  return (
    <>
      { isConstituent ? 
        <div></div>
        :
        <>
          { isFollowing ? 
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