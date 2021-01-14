import React from 'react';


const BillCard = ({ bill }) => {
  

  const handleClick = () => {
    
  }

  return (
    <div className='bill-card__container'>
      <div className='bill-card__img-container' onClick={handleClick}>
        <img />
      </div>
      <div className='bill-card__text' onClick={handleClick}>
        
      </div>

      {/* FOLLOW BUTTON TEMPORARILY HIDDEN DUE TO BUG */}
      {/* <div className='rep-card__follow'>
        <RepFollowButton user={user} rep={rep} />
      </div> */}
    </div>
  )
}


export default BillCard;