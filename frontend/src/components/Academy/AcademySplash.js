import React from 'react';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import SectionBreak from '../Layout/SectionBreak';


const AcademySplash = () => {
  return (
    <>
      <HeaderMain fromLoader={false} />
      <div className='academy-splash__container'>
        <SectionBreak sectionTitle='Academy Content Coming Soon' />
      </div>
      <FooterMain fromLoader={false} />
    </>
  )
}


export default AcademySplash;