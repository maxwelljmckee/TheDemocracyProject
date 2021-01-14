import React from 'react';
import { useHistory } from 'react-router-dom';

import BillCategoryBadge from './BillCategoryBadge';


const BillFollowBadges = () => {
  const history = useHistory();

  const categories = [
    {
      shortTitle: 'all',
      title: 'All',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Diploma_icon.svg/1024px-Diploma_icon.svg.png'
    },
    {
      shortTitle: 'economy',
      title: 'Economy & Finance',
      imageUrl: 'https://i.dlpng.com/static/png/6934068_preview.png'
    },
    {
      shortTitle: 'education',
      title: 'Education',
      imageUrl: 'https://www.nicepng.com/png/full/196-1969734_icon-education-circle-icon.png'
    },
    {
      shortTitle: 'science',
      title: 'Science, Technology & Energy',
      imageUrl: 'https://i1.wp.com/sciencemarchgoe.de/wp-content/uploads/2019/03/cropped-sciencegoeREDcircle_small-1.png?fit=512%2C512&ssl=1'
    },
    {
      shortTitle: 'security',
      title: 'National Security & Law Enforcement',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNjZ3HR4b6U6Q-ZSdT7uzwtOL3wvMaRDXc6g&usqp=CAU'
    },
    {
      shortTitle: 'environment',
      title: 'Environment & Public Lands',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxw_LIpvQUkMyu1-q1W4iznLVW5MW_-VJi8w&usqp=CAU'
    },
    {
      shortTitle: 'health',
      title: 'Health & Public Works',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGTZ8tDc6h0Xb4LqalYpMpafzP3WbeXzsKqg&usqp=CAU'
    },
    {
      shortTitle: 'international',
      title: 'International Affairs',
      imageUrl: 'https://vectorflags.s3-us-west-2.amazonaws.com/flags/org-un-circle-01.png'
    },
    {
      shortTitle: 'taxes',
      title: 'Taxes & Government Operations',
      imageUrl: 'https://image.flaticon.com/icons/png/512/1466/1466739.png'
    },
    {
      shortTitle: 'civil-rights',
      title: 'Civil Rights & Immigration',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Toicon-icon-pictogram-equal.svg/1200px-Toicon-icon-pictogram-equal.svg.png'
    },
  ]

  return (
    <div className='bill-follow-badge__container'>
      { categories.map(category => {
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