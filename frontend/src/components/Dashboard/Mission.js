import React from 'react';

import SectionBreak from '../Layout/SectionBreak';
import BlankCard from '../Layout/BlankCard';
import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import { useHistory } from 'react-router-dom';


const Mission = () => {
  const history = useHistory();
  return (
    <>
      <HeaderMain fromLoader={false} />
      <div className='mission__container'>
        <div className='mission__icon'>
          <img src='https://crystaltechnologies.com/wp-content/uploads/2015/10/our-mission-icon.png' alt='mountains' />
        </div>

        <SectionBreak sectionTitle='Mission' />

        <BlankCard text="Democracy is a responsibility that we are born into as Americans. But so many of us shirk our civic duty because simply put, it's a pain. Most of us hardly have time to cook a decent dinner, much less dig up our senator's contacts and give them a call. That's where The Democracy Project comes in. Our purpose is to offer streamlined solutions to a few simple questions:" />


        <div className='mission__icon'>
          <img src='https://motivatewellness.com/wp-content/uploads/2016/12/roadblock.png' alt='roadblock' />
        </div>
        <SectionBreak sectionTitle='Why are there so many roadblocks to civic engagement?' />

        <BlankCard text="In a world where we all walk around with computers in out pockets, there's no good reason it should be so hard to engage with your elected representatives. Instead of digging around the internet searching for your representatives and their contacts, The Democracy Project offers you all their information in one centralized hub. When you register, you are automatically connected with your state and district representatives, giving you easy access to all of their socials and contacts. You can follow other representatives too, track how they're voting, and vote with realtime approval ratings!" />

        <div className='mission__icon'>
          <img src='https://www.galaxgazette.com/sites/www.galaxgazette.com/files/imagecache/slide-600/vote_icon_16.jpg' alt='roadblock' />
        </div>
        <SectionBreak sectionTitle="Why do we only vote every 2-4 years? Why isn't every vote a referendum?" />

        <BlankCard text="The internet has revolutionized our lives, so why hasn't it revolutionized politics? With The Democracy Project, you can follow active bills as they move through congress. You'll have access to summaries and discussion boards to make informed decisions on the issues, and then you can let your representatives know how you feel with realtime voting." />

        <div className='mission__icon'>
          <img src='https://pbs.twimg.com/profile_images/1219756472151601153/iKrwqrSJ_400x400.jpg' alt='roadblock' />
        </div>
        <SectionBreak sectionTitle="Why are we still trusting polls for political insights?" />

        <BlankCard text="In recent years it has become apparent that our polling system is deeply flawed. Many question whether it can be trusted at all to yield meaningful insight about the electorate. Instead of polling 10 or 30 thousand people, The Democracy Project gives millions a way to express their positions directly and in real time." />

        <div className='mission__icon'>
          <img src='https://www.pngjoy.com/pngm/300/5670893_solution-icon-solution-green-icon-png-transparent-png.png' alt='roadblock' />
        </div>
        <SectionBreak sectionTitle='The Solution' />
        <BlankCard text="With The Democracy Project, you have a realtime connection to your elected officials. You can follow representatives and active bills, cast your approval, and engage in civic discourse on our discussion boards. Citizenship has never been so easy." />

        <div className='mission__icon'>
          <img src='https://www.pinclipart.com/picdir/big/44-448449_information-symbol-icon-driverlayer-search-engine-information-icon.png' alt='roadblock' />
        </div>
        <SectionBreak sectionTitle="Get More Info" />
        <BlankCard text="Are you new to politics? Or maybe just looking to beef up on your civics knowledge before diving into the bills? Learn more our government and how it works at TDP Academy!" />

        <div className='mission__academy-link'>
          <i className="fas fa-arrow-alt-circle-right" 
          onClick={() => history.push('/academy')}></i>
        </div>

        <SectionBreak />
      </div>
      <FooterMain fromLoader={false} />
    </>
  )
}


export default Mission;