import React from 'react';
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

  return (
    <>
      <HeaderMain fromLoader={false} />
      <div className='bill-detail__container'>
        <BackArrow />
        <div className='bill-detail__avatar'>
          <img src={avatarUrl} alt='bill' />
        </div>

        <SectionBreak sectionTitle="see who you're following" />

        { user.billsFollowed.map(bill => {
          return <BillCard bill={bill} />
        })}

        <SectionBreak />
      </div>
      <FooterMain fromLoader={false} />
    </>
  )
}


export default BillsFollowing;