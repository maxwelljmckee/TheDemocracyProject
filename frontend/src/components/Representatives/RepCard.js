import React from 'react';
import { useHistory } from 'react-router-dom';

import RepFollowButton from '../Buttons&Icons/RepFollowButton';


const RepCard = ({ user, rep, setForwardAnimate }) => {
  const history = useHistory();

  const avatarUrl = 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png';

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

  const handleClick = (() => {
    setForwardAnimate(true);
    setTimeout(() => {
      history.push(`/representatives/${rep.id}/detail`)
    }, 600)
  })

  return (
    <div className='rep-card__container' onClick={handleClick}>
      <div className='rep-card__img-container'>
        { rep.imageUrl ? 
          <img className='rep-card__img' src={rep.imageUrl} alt='representative' />
          :
          <img className='rep-card__avatar' src={avatarUrl} alt='representative' />
        }
      </div>
      <div className='rep-card__text'>
        <div className='rep-card__title'>{rep.firstName} {rep.lastName}</div>
        <div className='rep-card__chamber'>{chamber}</div>
        <div className='rep-card__party-state'>{rep.party} – {rep.stateId}</div>
      </div>
      <div className='rep-card__follow'>
        <RepFollowButton user={user} rep={rep} />
      </div>
    </div>
  )
}


export default RepCard;