import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import HeaderMain from '../Layout/HeaderMain';
import FooterMain from '../Layout/FooterMain';
import BackArrow from '../Buttons&Icons/BackArrow';
import SectionBreak from '../Layout/SectionBreak';
import SectionFooter from '../Layout/SectionFooter';
import RepFollowButton from '../Buttons&Icons/RepFollowButton';
import UpvoteDownvoteCard from '../Buttons&Icons/UpvoteDownvoteCard';
import VotesPctChart from './VotesPctChart';
import RepApprovalChart from './RepApprovalChart';
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
        <img src='https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-icon-with-png-and-vector-format-for-unlimited-22.png' alt='website' />
        </a>
      }
      { rep.contactUrl &&
        <a target='_blank' href={rep.contactUrl} rel="noopener noreferrer">
          <img src='https://www.pngkit.com/png/full/152-1528166_phone-icon-circle-ltblue-mail-web-logo.png' alt='email' />
        </a>
      }
      { rep.phone &&
        <a target='_blank' href={rep.phone} rel="noopener noreferrer">
          <img src='https://www.pikpng.com/pngl/m/13-130814_phone-icon-circle-ltblue-png-call-icon-vector.png' alt='phone' />
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
      user.repVotes.forEach(vote => {
        if (vote.representative.id === parseInt(repId, 10) && !vote.isDownvote) {
          setSelected(1)
        } else if (vote.representative.id === parseInt(repId, 10) && vote.isDownvote) {
          setSelected(2)
        }
      })
      const res = await fetch(`/api/representatives/${repId}`);
      const data = await res.json();
      setRep(data);
      setLoaded(true);
    })()
  }, [repId, user.repVotes]) 



  // ==================== VOTE ASYNC HANDLERS ====================
  // ELEMENT MUST HAVE SELECTED STATE TO IMPLEMENT UPVOTE-DOWNVOTE-CARD
  const [selected, setSelected] = useState(0);

  const handleUpvote = async () => {
    if (!selected) {
      setSelected(1);
      const res = await fetch('/api/representatives/post-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repId, userId: user.id, isDownvote: false })
      })
      const data = await res.json();
      return data
    } else if (selected === 1) {
      setSelected(0);
      const res = await fetch('/api/representatives/delete-vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repId, userId: user.id })
      })
      const data = await res.json();
      return data
    } else if (selected === 2) {
      setSelected(1);
      const res = await fetch('/api/representatives/update-vote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repId, userId: user.id, isDownvote: false })
      })
      const data = await res.json();
      return data
    }
  }

  const handleDownvote = async () => {
    if (!selected) {
      setSelected(2);
      const res = await fetch('/api/representatives/post-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repId, userId: user.id, isDownvote: true })
      })
      const data = await res.json();
      return data
    }
    if (selected === 1) {
      setSelected(2);
      const res = await fetch('/api/representatives/update-vote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repId, userId: user.id, isDownvote: true })
      })
      const data = await res.json();
      return data
    } else if (selected === 2) {
      setSelected(0);
      const res = await fetch('/api/representatives/delete-vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repId, userId: user.id })
      })
      const data = await res.json();
      return data
    }
  }
  // ==================== END VOTE ASYNC HANDLERS ====================



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
                {rep.party} – {rep.state.abbreviation}
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

            <SectionBreak sectionTitle='Approval Ratings' rep={rep} />
            {rep.repVotes.length ? <RepApprovalChart repVotes={rep.repVotes} /> : <SectionFooter footerText='vote data unavailable' />}

            <SectionBreak sectionTitle='cast your vote' rep={rep} />
            <UpvoteDownvoteCard
              handleUpvote={handleUpvote}
              handleDownvote={handleDownvote}
              selected={selected} />

            <SectionBreak />
          </div>
        </div>
        <FooterMain fromLoader={false} />
      </>
    }
    </>
  )
}


export default RepDetail;