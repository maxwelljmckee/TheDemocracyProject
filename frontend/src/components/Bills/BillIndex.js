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


const BillIndex = () => {
  const { category } = useParams();
  let categoryImageUrl;
  billCategories.filter(item => item.shortTitle === category)

  const history = useHistory();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const bills = useSelector(state => state.bills);

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
          <div className={`bill-index__container `}>
            <div className='bill-index__header'>
              <BackArrow />
              <img src={categoryImageUrl} alt='category image' />
            </div>
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