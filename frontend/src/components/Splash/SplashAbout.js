import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const SplashAbout = () => {
  const history = useHistory()
  const [animate, setAnimate] = useState(false)
  const [unhide, setUnhide] = useState(false);
  const [unhide2, setUnhide2] = useState(false)
  const [unhide3, setUnhide3] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setUnhide(true)
    }, 1500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setUnhide2(true)
    }, 3000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setUnhide3(true)
    }, 4500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true)
      setTimeout(() => {
        history.push('/splash/demo')
      }, 490)
    }, 8000)
  }, [])

  return (
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
          Made Easy
        </div>
      }
      { unhide3 && 
        <div className='splash-about__img-container'>
          <img className='slide-in-bottom' src='https://miro.medium.com/max/400/1*q6gzHA3kEeaBEMIFIjtuIQ.jpeg' alt='phew' />
        </div>
      }
    </div>
  )
}


export default SplashAbout;

