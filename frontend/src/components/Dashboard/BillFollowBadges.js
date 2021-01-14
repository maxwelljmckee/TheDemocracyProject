import React from 'react';
import { useHistory } from 'react-router-dom';

import BillCategoryBadge from './BillCategoryBadge';
import billCategories from '../Bills/billCategories';


const BillFollowBadges = () => {
  const history = useHistory();

  return (
    <div className='bill-follow-badge__container'>
      { billCategories.map(category => {
        return <BillCategoryBadge 
                key={`category-badge-${category.shortTitle}`}
                title={category.title}
                imageUrl={category.imageUrl}
                handleClick={() => history.push(`/bills/${category.shortTitle}`)} />
      })}
    </div>
  )
}


export default BillFollowBadges;