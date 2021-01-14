import React from 'react';


const BillCategoryBadge = ({ title, imageUrl, handleClick }) => {
  return (
    <>
      <div className='bill-category-badge__title'>{title}</div>
      <div className='bill-category-badge'>
        <img src={imageUrl} alt='bill category' onClick={handleClick} />
      </div>
    </>
  )
}


export default BillCategoryBadge;