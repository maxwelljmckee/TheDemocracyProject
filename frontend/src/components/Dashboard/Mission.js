import React from 'react';

import SectionBreak from '../Layout/SectionBreak';
import BlankCard from '../Layout/BlankCard';
import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';


const Mission = () => {
  return (
    <>
      <HeaderMain fromLoader={false} />
      <SectionBreak sectionTitle='Mission' />
      <BlankCard text={"The Democracy Project seeks to answer a few simple questions: why, when we all walk around every day with computers in our pockets, do we only get to vote every 2-4 years? Why isn't every single issue a referendum issue? And why are there so many roadblocks to civic engagement? In an effort to break down these road blocks, The Democracy Project gathers together all of the political data you need together into one central hub.When you register with a zip code, you are automatically connected to your state / district's congressional officials. From there, you can follow any active member in the house, senate, or executive branch, reach out to them on any available social or messaging platform, and track how they are voting. In addition, you can search currently active bills in the house and senate and express your views by Upvote/Downvoting the issues, providing a realtime, direct line of feedback from a representative to their constituency. Finally, The Democracy Project also offers users a number of social features such as comment threads and community discussion boards where they can parse apart difficult language, share opinions, and come to a deeper understanding of the issues and each other."} />
      <FooterMain fromLoader={false} />
    </>
  )
}


export default Mission;