import React from 'react';


const SectionBreak = ({ sectionTitle, rep }) => {
  let style = { backgroundColor: '#1761a0' }
  if (rep && rep.party === 'R') style.backgroundColor = '#ec4c4c'
  
  return (
    <div className='section-break' style={style}>
      { sectionTitle }
    </div>
  )
}


export default SectionBreak;