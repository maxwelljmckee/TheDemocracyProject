import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import BackArrow from '../Buttons&Icons/BackArrow';
import SectionBreak from '../Layout/SectionBreak';
import BlankCard from '../Layout/BlankCard';
import billIdParser from '../../utils/billIdParser';
import billCategories from './billCategories';


const BillDetail = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState({});
  const [billType, setBillType] = useState('');
  const avatarUrl = billCategories[0].imageUrl
  const [backAnimate, setBackAnimate] = useState(false);

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
      <div className={`${backAnimate && 'slide-out-right'}`}>
        <div className='bill-detail__container slide-in-right'>
          <BackArrow setAnimation={setBackAnimate} />
          <div className='bill-detail__avatar'>
            <img src={avatarUrl} alt='bill' />
          </div>
          <div className='bill-detail__bill-type'>
            <span className='bill-type'>{billType[0]} {billType[1]}</span>
          </div>

          <SectionBreak sectionTitle='Full Title' />
          <BlankCard text={bill.title} />

          <SectionBreak sectionTitle='Full Summary' />
          <BlankCard text={bill.summary || 'Summary not available'} />

          <SectionBreak />
        </div>
      </div>
      }
      <FooterMain fromLoader={false} />
    </>
  )
}


export default BillDetail;