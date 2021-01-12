import React from 'react';
import { useSelector } from 'react-redux';


const BillFollowButton = ({ billId }) => {
  const user = useSelector(state => state.session.user);
  
  const handleClick = () => {
    // dispatch follow post
  }

  return (
    <div>follow button</div>
  )
}


export default BillFollowButton;