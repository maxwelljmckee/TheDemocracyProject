import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { fetchBillsByCategory } from '../../store/bills';


const BillIndex = () => {
  const { category } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const bills = useSelector(state => state.bills)

  useEffect(() => {
    dispatch(fetchBillsByCategory(category)).then(() => setLoaded(true))
  }, [])

  return (
    <div>bill index</div>
  )
}


export default BillIndex;