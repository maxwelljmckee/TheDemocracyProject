import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import BackArrow from '../Buttons&Icons/BackArrow';
import SectionBreak from '../Layout/SectionBreak';
import billCategories from './billCategories';
import BillCard from './BillCard'


const BillsFollowing = () => {
  const user = useSelector(state => state.session.user);
  const avatarUrl = billCategories[0].imageUrl;
  const [forwardAnimate, setForwardAnimate] = useState(false)
  const [backAnimate, setBackAnimate] = useState(false)

  return (
    <>
      <div className={`${backAnimate && 'slide-out-right'}`}>
        <HeaderMain fromLoader={false} />
        <div className={`bill-detail__container
        ${!forwardAnimate && 'slide-in-right'}
        ${forwardAnimate && 'slide-out-left'}`}>

          <BackArrow setAnimation={setBackAnimate} />
          <div className='bill-detail__avatar'>
            <img src={avatarUrl} alt='bill' />
          </div>

          <SectionBreak sectionTitle="see bills you're following" />

          { user.billsFollowed.map(bill => {
            return <BillCard bill={bill} setAnimation={setForwardAnimate} />
          })}

          <SectionBreak />
        </div>
        <FooterMain fromLoader={false} />
      </div>
    </>
  )
}


export default BillsFollowing;