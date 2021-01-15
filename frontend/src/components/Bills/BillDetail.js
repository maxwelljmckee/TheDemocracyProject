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
import UpvoteDownvoteCard from '../Buttons&Icons/UpvoteDownvoteCard';


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

  const handleUpvote = () => {
    
  }

  const handleDownvote = () => {

  }

  return (
    <>
      <HeaderMain fromLoader={false} />
      { billType &&
        <div className='bill-detail__container'>

          {/* HEADER */}
          <BackArrow />
          <div className='bill-detail__avatar'>
            <img  src={avatarUrl} alt='bill' />
          </div>
          <UpvoteDownvoteCard 
            handleUpvote={handleUpvote} 
            handleDownvote={handleDownvote}/>
          <div className='bill-detail__bill-type'>
            <span className='bill-type'>{billType[0]} {billType[1]}</span>
          </div>

          {/* FOLLOW BUTTON */}
          <div className='bill-detail__follow'>
            <BillFollowButton user={user} bill={bill} />
          </div>

          {/* TITLE */}
          <SectionBreak sectionTitle='Title' />
          <BlankCard text={bill.shortTitle} />

          {/* SUMMARY */}
          <SectionBreak sectionTitle='Summary' />
          <BlankCard text={bill.shortSummary || 'Summary not available'} />
          <SectionFooter 
            footerText='See Full Title and Summary' 
            handleClick={() => history.push(`/bills/${billId}/full-detail`)} />

          {/* PRIMARY SUBJECT (TOPIC) */}
          <SectionBreak sectionTitle='topic' />
          <BlankCard text={bill.primarySubject} />

          {/* COMMITTEES */}
          <SectionBreak sectionTitle='Committees' />
          <BlankCard text={bill.committees} />

          {/* LATEST MAJOR ACTION */}
          <SectionBreak sectionTitle='latest major action' />
          <BlankCard text={bill.latestMajorAction} subtext={`Action date: ${bill.latestMajorActionDate.split(' ').slice(0, 4).join(' ')}`} />


          <SectionBreak />
        </div>
      }
      <FooterMain fromLoader={false} />
    </>
  )
}


export default BillDetail;