import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const SplashAbout = () => {
  const history = useHistory();
  const [animate, setAnimate] = useState(false);
  const [unhide, setUnhide] = useState(false);
  const [unhide2, setUnhide2] = useState(false);
  const [unhide3, setUnhide3] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUnhide(true)
      setTimeout(() => {
        setUnhide2(true)
        setTimeout(() => {
          setUnhide3(true)
          // setTimeout(() => {
            setAnimate(true)
            setTimeout(() => {
              history.push('/splash/register')
            }, 480)
          // }, 1200)
        }, 1200)
      }, 1200)
    }, 1200)
  }, [])

  useEffect(() => {
    
  }, [])
  
  useEffect(() => {
    
  }, [])
  
  useEffect(() => {
    
  }, [])

  return (
    <div className={`.splash-about__wrapper ${animate && 'slide-out-top' }`}>
      <div className={`splash-about__container slide-in-bottom
      ${ animate && 'slide-out-top' }`}>
        <div className='splash-about__header'>
          Imagine
        </div>
        { unhide && 
          <div className='splash-about__body slide-in-bottom'>
            Civic Engagement
          </div>
        }
        { unhide2 && 
          <div className='splash-about__footer slide-in-bottom'>
            Made Easy.
          </div>
        }
        {/* { unhide3 && 
          <div className='splash-about__img-container'>
            <img className='slide-in-bottom' src='https://miro.medium.com/max/400/1*q6gzHA3kEeaBEMIFIjtuIQ.jpeg' alt='phew' />
          </div>
        } */}
      </div>
    </div>
  )
}


export default SplashAbout;

