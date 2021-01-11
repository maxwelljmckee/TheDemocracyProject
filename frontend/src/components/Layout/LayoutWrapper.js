import React from 'react';

import HeaderMain from './HeaderMain';
import FooterMain from './FooterMain';


const LayoutWrapper = (Component) => {
  return (
    <>
      <HeaderMain />
      <Component />
      <FooterMain />
    </>
  )
}


export default LayoutWrapper;