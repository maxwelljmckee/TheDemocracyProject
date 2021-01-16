import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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

  const history = useHistory();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  let bills = useSelector(state => state.bills);

  if (searchTerm) {
    bills = bills.filter(bill => {
      return bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.primarySubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.summary.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  useEffect(() => {
    dispatch(fetchBillsByCategory(category)).then(() => setLoaded(true));
  }, [])



  // ${ !animateMainContent && 'hidden' }
  // ${ animateMainContent && 'slide-in-bottom-rebound' }
  return (
    <>
    { !loaded ?
      <Loader />
      :
      <>
        <HeaderMain fromLoader={true} />
        { bills &&
          <div className={`bill-index__container`}>
            <BackArrow />
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
                        bill={bill} />
              })}
              <SectionBreak />
            </div>
          </div>
        }
        <FooterMain fromLoader={true} />
      </>
    }
    </>
  )
}


export default BillIndex;