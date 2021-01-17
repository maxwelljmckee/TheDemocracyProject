import React from 'react';
import { useHistory } from 'react-router-dom';

import BillCategoryBadge from './BillCategoryBadge';
import billCategories from '../Bills/billCategories';


const BillFollowBadges = ({ setForwardAnimate }) => {
  const history = useHistory();

  return (
    <div className='bill-follow-badge__container'>
      { billCategories.map(category => {
        return <BillCategoryBadge 
                key={`category-badge-${category.shortTitle}`}
                title={category.title}
                imageUrl={category.imageUrl}
                handleClick={() =>
                  setTimeout(() => {
                    setForwardAnimate(true)
                    setTimeout(() => {
                      history.push(`/bills/${category.shortTitle}`)
                    }, 600)
                  }, 0)} />
      })}
    </div>
  )
}


export default BillFollowBadges;