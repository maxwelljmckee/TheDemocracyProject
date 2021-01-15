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
import BillVoteChart from './BillVoteChart';


const BillDetail = () => {
  const history = useHistory();
  const { billId } = useParams();
  const user = useSelector(state => state.session.user);
  const avatarUrl = billCategories[0].imageUrl

  const [bill, setBill] = useState({});
  const [billType, setBillType] = useState('');
  // const [chartRender, setChartRender] = useState(false);
  
  // ON PAGE LOAD, PARSE VOTE INFO FROM USER OBJECT && FETCH BILL DATA FROM BACKEND USING BILL-ID PARAM
  useEffect(() => {
    (async () => {
      user.billVotes.forEach(vote => {
        console.log('hit useEffect');
        if (vote.billId === parseInt(billId, 10) && !vote.isDownvote) {
          console.log('conditin 1');
          setSelected(1)
        } else if (vote.billId === parseInt(billId, 10) && vote.isDownvote) {
          console.log('condition 2');
          setSelected(2)
        }
      })
      const res = await fetch(`/api/bills/${billId}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json();
      setBill(data);
      setBillType(billIdParser(data.billId));
    })()
  }, [])
  
  // ==================== VOTE ASYNC HANDLERS ====================
  const [selected, setSelected] = useState(0);

  const handleUpvote = async () => {
    if (!selected) {
      setSelected(1);
      const res = await fetch('/api/bills/post-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, userId: user.id, isDownvote: false })
      })
      const data = await res.json();
      return data
    } else if (selected === 1) {
      setSelected(0);
      const res = await fetch('/api/bills/delete-vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, userId: user.id })
      })
      const data = await res.json();
      return data
    } else if (selected === 2) {
      setSelected(1);
      const res = await fetch('/api/bills/update-vote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, userId: user.id, isDownvote: false })
      })
      const data = await res.json();
      return data
    }
  }

  const handleDownvote = async () => {
    if (!selected) {
      setSelected(2);
      const res = await fetch('/api/bills/post-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, userId: user.id, isDownvote: true })
      })
      const data = await res.json();
      return data
    }
    if (selected === 1) {
      setSelected(2);
      const res = await fetch('/api/bills/update-vote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, userId: user.id, isDownvote: true })
      })
      const data = await res.json();
      return data
    } else if (selected === 2) {
      setSelected(0);
      const res = await fetch('/api/bills/delete-vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billId, userId: user.id })
      })
      const data = await res.json();
      return data
    }
  }
  // ==================== END VOTE ASYNC HANDLERS ====================


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

          {/* VOTING STATS AND VOTE BUTTONS */}
          <SectionBreak sectionTitle='how others are voting' />
          { bill.billVotes.length ? <BillVoteChart billVotes={bill.billVotes} /> : <SectionFooter footerText='no vote data available' /> }
          
          <SectionBreak sectionTitle='cast your vote' />
          <UpvoteDownvoteCard 
            handleUpvote={handleUpvote} 
            handleDownvote={handleDownvote}
            selected={selected} />

          <SectionBreak sectionTitle='Comments' />
          {/* Comments */}

          <SectionBreak />
        </div>
      }
      <FooterMain fromLoader={false} />
    </>
  )
}


export default BillDetail;