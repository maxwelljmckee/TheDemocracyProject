import React from 'react';


const RepCard = ({ user, rep }) => {
  let chamber;
  switch (rep.shortTitle) {
    case 'Rep.':
      chamber = 'House of Representatives';
      break;
    case 'Sen.':
      chamber = 'Senate';
      break;
    case 'Pres.' || 'VP':
      chamber = 'Executive';
      break;
  }

  const isConstituent = () => {
    
  }

  const handleClick = () => {

  }

  return (
    <div className='rep-card__container' onClick={handleClick}>
      <div className='rep-card__img-container'>
        <img src={rep.imageUrl ? rep.imageUrl : 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png' } alt='representative' />
      </div>
      <div className='rep-card__text'>
        <div className='rep-card__title'>{rep.firstName} {rep.lastName}</div>
        <div className='rep-card__chamber'>{chamber}</div>
        <div className='rep-card__party-state'>{rep.party} – {rep.stateId}</div>
      </div>
      <div className='rep-card__follow'>

      </div>
    </div>
  )
}


export default RepCard;