import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import BackArrow from '../Buttons&Icons/BackArrow';
import RepFollowButton from '../Buttons&Icons/RepFollowButton';
import VotesPctChart from './VotesPctChart';
import { useSelector } from 'react-redux';


const RepSocials = ({ rep }) => {
  return (
    <div className='rep-detail__socials'>
      { rep.facebookHandle &&
        <a target='_blank' href={`https://www.facebook.com/${rep.facebookHandle}`} rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
      }
      { rep.twitterHandle &&
        <a target='_blank' href={`https://twitter.com/${rep.twitterHandle}`} rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
      }
      { rep.youtubeHandle &&
        <a target='_blank' href={`https://www.youtube.com/
        ${rep.youtubeHandle}`} rel="noopener noreferrer">
          <i className="fab fa-youtube"></i>
        </a>
      }
      </div>
  )
}

const RepConventionals = ({ rep }) => {
  return (
    <div className='rep-detail__conventionals'>
      { rep.websiteUrl &&
        <a target='_blank' href={rep.websiteUrl} rel="noopener noreferrer">
        <img src='https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-icon-with-png-and-vector-format-for-unlimited-22.png' />
        </a>
      }
      { rep.contactUrl &&
        <a target='_blank' href={rep.contactUrl} rel="noopener noreferrer">
          <img src='https://www.pngkit.com/png/full/152-1528166_phone-icon-circle-ltblue-mail-web-logo.png' />
        </a>
      }
      { rep.phone &&
        <a target='_blank' href={rep.phone} rel="noopener noreferrer">
          <img src='https://www.pikpng.com/pngl/m/13-130814_phone-icon-circle-ltblue-png-call-icon-vector.png' />
        </a>
      }
    </div>
  )
}


const RepDetail = () => {
  const { repId } = useParams();
  const user = useSelector(state => state.session.user)

  const [animateBack, setAnimateBack] = useState(false);
  const [rep, setRep] = useState({});
  const [loaded, setLoaded] = useState(false);

  const avatarUrl = 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png';

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/representatives/${repId}`);
      const data = await res.json();
      setRep(data);
      setLoaded(true);
    })()
  }, []) 

  return (
    <>
    { loaded && 
      <>
        <HeaderMain fromLoader={false} />
        <div className={`${animateBack && 'slide-out-right'}`}>
          <div className='rep-detail__container slide-in-right'>
            <BackArrow setAnimation={setAnimateBack} />

            {/* PROFILE IMAGE */}
            <div className='rep-detail__image'>
              {rep.imageUrl ?
                <img className='rep-detail__img' src={rep.imageUrl} alt='representative' />
                :
                <img className='rep-detail__avatar' src={avatarUrl} alt='representative' />
              }
            </div>
            
            {/* FOLLOW BUTTON */}
            <div className='rep-detail__follow'>
              <RepFollowButton user={user} rep={rep} />
            </div>

            {/* TITLE */}
            <div className={`rep-detail__title-group__${rep.party}`}>
              <div className='rep-detail__title'>
                <div className='rep-card__text'>
                  {rep.shortTitle} {rep.firstName} {rep.lastName}
                </div>
              </div>

              {/* SUBTITLE */}
              <div className='rep-detail__subtitle'>
                {rep.party} – {rep.stateId}
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <RepSocials rep={rep} />

            {/* CONVENTIONAL LINKS */}
            <RepConventionals rep={rep} />
            
            {/* STATISTICS */}
            <div className={`rep-detail__stats-title__${rep.party}`}>
              Congressional Voting Stats
            </div>
            <div className='rep-detail__votes-pct-chart'>
              <VotesPctChart rep={rep} />
            </div>
          </div>
        </div>
        <FooterMain fromLoader={false} />
      </>
    }
    </>
  )
}


export default RepDetail;