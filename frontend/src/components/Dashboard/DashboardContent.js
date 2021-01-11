import React from 'react';

import SectionBreak from '../Layout/SectionBreak';
import dashboardIcon from './Dashboard-icon.png';


const DashboardContent = ({ user }) => {
  return (
    <div className='dashboard__container slide-in-bottom-rebound' >
      <div className='dashboard__icon-container'>
        <img className='dashboard__icon' src={dashboardIcon} alt='dashboard' />
      </div>
      <SectionBreak sectionTitle='Meet Your Representatives' />
      <SectionBreak sectionTitle='Follow Other Representatives' />
      <SectionBreak sectionTitle='Follow Active Bills' />
      <SectionBreak sectionTitle='See what people are saying' />
    </div>
  )
}


export default DashboardContent;