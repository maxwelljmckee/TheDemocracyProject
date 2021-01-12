import React from 'react';
import { useParams } from 'react-router-dom';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import BackArrow from '../Buttons&Icons/BackArrow';


const RepDetail = () => {
  const { repId } = useParams();

  return (
    <>
      <HeaderMain fromLoader={false} />
      <div className='rep-detail__container slide-in-right'>
        <BackArrow />
        <div className='rep-detail__image'>
          
        </div>
        <div className='rep-detail__title'>

        </div>
        <div className='rep-detail__subtitle'>

        </div>
        <div className='rep-detail__socials'>

        </div>
        <div className='rep-detail__conventionals'>

        </div>
        <div className='rep-detail__vote-graphs'>

        </div>
      </div>
      <FooterMain fromLoader={false} />
    </>
  )
}


export default RepDetail;