import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import BackArrow from '../Buttons&Icons/BackArrow';
import SectionBreak from '../Layout/SectionBreak';
import SectionFooter from '../Layout/SectionFooter';
import BlankCard from '../Layout/BlankCard';
import billIdParser from '../../utils/billIdParser';
import billCategories from './billCategories';
import BillFollowButton from '../Buttons&Icons/BillFollowButton';


const BillDetail = () => {
  const history = useHistory();
  const { billId } = useParams();
  const user = useSelector(state => state.session.user);
  const [bill, setBill] = useState({});
  const [billType, setBillType] = useState('');
  const avatarUrl = billCategories[0].imageUrl
  
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/bills/${billId}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json();
      setBill(data);
      setBillType(billIdParser(data.billId));
    })()
  }, [])

  return (
    <>
      <HeaderMain fromLoader={false} />
      { billType &&
        <div className='bill-detail__container'>
          <BackArrow />
          <div className='bill-detail__avatar'>
            <img  src={avatarUrl} alt='bill' />
          </div>
          {/* <BillFollowButton user={user} bill={bill} /> */}
          <div className='bill-detail__bill-type'>
            <span className='bill-type'>{billType[0]} {billType[1]}</span>
          </div>

          <SectionBreak sectionTitle='Title' />
          <BlankCard text={bill.shortTitle} />

          <SectionBreak sectionTitle='Summary' />
          <BlankCard text={bill.shortSummary} />
          <SectionFooter 
            footerText='See Full Title and Summary' 
            handleClick={() => history.push(`bills/${billId}/full-detail`)} />

          <SectionBreak sectionTitle='topic' />
          <BlankCard text={bill.primarySubject} />

          <SectionBreak sectionTitle='Committees' />
          <BlankCard text={bill.committees} />

          <SectionBreak sectionTitle='latest major action' />
          <BlankCard text={bill.latestMajorAction} />
          <BlankCard text={bill.latestMajorActionDate} />

          <SectionBreak />
        </div>
      }
      <FooterMain fromLoader={false} />
    </>
  )
}


export default BillDetail;