import React from 'react';


const SectionFooter = ({ footerText, handleClick }) => {
  return (
    <div className='section-footer' onClick={handleClick}>
      { footerText }
    </div>
  )
}


export default SectionFooter;