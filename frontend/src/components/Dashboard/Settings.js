import React from 'react';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import SectionBreak from '../Layout/SectionBreak';


const AcademySplash = () => {
  return (
    <>
      <HeaderMain fromLoader={false} />
      <div className='settings__container'>
        <SectionBreak sectionTitle='Settings Content Coming Soon' />
      </div>
      <FooterMain fromLoader={false} />
    </>
  )
}


export default AcademySplash;