import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchBillsByCategory } from '../../store/bills';
import Loader from '../Loader/Loader';
import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import BackArrow from '../Buttons&Icons/BackArrow';
import SectionBreak from '../Layout/SectionBreak';
import billCategories from './billCategories';
import BillCard from './BillCard';
import BillSearch from './BillSearch';


const BillIndex = () => {
  const { category } = useParams();
  const categoryObj = billCategories.filter(item => item.shortTitle === category)[0]

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [animateCleanup, setAnimateCleanup] = useState(false);
  const [animateMainContent, setAnimateMainContent] = useState(false);
  const [forwardAnimate, setForwardAnimate] = useState(false);
  const [backAnimate, setBackAnimate] = useState(false);
  
  useEffect(() => {
    dispatch(fetchBillsByCategory(category)).then(() => {
      setTimeout(() => {
        setAnimateCleanup(true); // initiate loader fade out
        setTimeout(() => {
          setLoaded(true); // load next page
          setTimeout(() => {
            setAnimateMainContent(true); //slide in main content
          }, 1000) // slide in main content
        }, 100) // fade out time
      }, 500)}) // extra loading time
  }, [category, dispatch])

  const [searchTerm, setSearchTerm] = useState('');
  let bills = useSelector(state => state.bills);

  if (searchTerm) {
    bills = bills.filter(bill => {
      return bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.primarySubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.summary.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }


  return (
    <>
    { !loaded ?
        <Loader animateCleanup={animateCleanup} />
      :
      <div className={`${backAnimate && 'slide-out-right'}`}>
          <div className={`${forwardAnimate && 'slide-out-left'}`}>
          <HeaderMain fromLoader={true} />
          { bills &&
            <div className={`bill-index__container
            ${!animateMainContent && 'hidden'}
            ${animateMainContent && 'slide-in-bottom-rebound'}`}>
              <BackArrow setAnimation={setBackAnimate} />
              <div className='bill-index__header'>
                <img className='bill-index__image' src={categoryObj.imageUrl} alt='category image' />
              </div>
              <BillSearch
                category={categoryObj}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} />
              <div className='bill-index__body'>
                {bills.map(bill => {
                  return <BillCard 
                          key={`bill-${bill.id}`}
                          bill={bill}
                          setAnimation={setForwardAnimate} />
                })}
                <SectionBreak />
              </div>
            </div>
          }
          <FooterMain fromLoader={true} />
        </div>
      </div>
    }
    </>
  )
}


export default BillIndex;