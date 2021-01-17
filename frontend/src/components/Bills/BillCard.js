import React from 'react';
import { useHistory } from 'react-router-dom';

import billIdParser from '../../utils/billIdParser';


const BillCard = ({ bill, setAnimation }) => {
  const history = useHistory();
  const billType = billIdParser(bill.billId)

  const handleClick = () => {
    setAnimation(true);
    setTimeout(() => {
      history.push(`/bills/${bill.id}/detail`)
    }, 600)
  }

  return (
    <div className='bill-card__container'>
      {/* <div className='bill-card__img-container' onClick={handleClick}>
        <img src='' alt='bill avatar' />
      </div> */}
      <div className='bill-card__text' onClick={handleClick}>
        <div className='bill-card__bill-type'>
          {billType[0]} {billType[1]}
        </div>
        <div className='bill-card__title'>
          {bill.shortTitle}
        </div>
      </div>

    </div>
  )
}


export default BillCard;