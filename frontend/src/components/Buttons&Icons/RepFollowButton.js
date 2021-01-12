import React from 'react';


const RepFollowButton = ({ user, rep }) => {
  const isFollowing = () => {
    let isFollowing = false;
    user.repFollows.forEach(follow => {
      if (follow.representative.id == rep.id) isFollowing = true;
    })
    return isFollowing;
  }

  const isConstituent = () => {
    let isConstituent = false;
    user.repFollows.forEach()
  }
  
  const handleClick = () => {
    // dispatch follow post
  }

  return (
    <>
    { isConstituent ? 
      <div className='following-button'>Following</div>
      :
      <>
        { isFollowing ? 
          <div className='follow-button'>
            follow button
          </div>
        :
          <div className='unfollow-button'>
            follow button
          </div>
        }
      </>
    }
    </>
  )
}


export default RepFollowButton;