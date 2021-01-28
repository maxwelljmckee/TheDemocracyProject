import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../static/main_logo.png'
import secondaryLogo from '../../static/secondary_logo.png'


const SplashMain = () => {
  const history = useHistory();
  const [verticalAnimation, setVerticalAnimation] = useState(false);
  const [lateralAnimation, setLateralAnimation] = useState(false);

  const handleLogin = () => {
    setLateralAnimation(true)
    setTimeout(() => {
      history.push('/login')
    }, 600)
  }

  const handleLearnMore = () => {
    setVerticalAnimation(true)
    setTimeout(() => {
      history.push('/splash/about')
    }, 600)
  }

  return (
    <>
    <div className='fade-in-slow splash-main__wrapper'>
        <div 
          className={`splash-main__container
          ${ verticalAnimation && 'slide-out-top' } 
          ${ lateralAnimation && 'slide-out-left' }`}
        >
          <div className='splash-main__main-logo'>
            <img src={logo} alt='The Democracy Project' />
          </div>
          <div className='splash-main__btn-container'>
            <div className='splash-main__btn' onClick={handleLogin}>Login</div>
          </div>
          <div className='splash-main__btn-container'>
            <div className='splash-main__btn'onClick={handleLearnMore}>
              Sign Up
            </div>
          </div>
          <div className='splash-main__secondary-logo'>
            <img className='poweredBy' src={secondaryLogo} alt='Powered by' />
            <img className='propublicaLogo' src='https://www.adweek.com/wp-content/uploads/2018/06/propublica-10years-CONTENT-2018.gif' alt='ProPublica' />
          </div>
        </div>
    </div>
    </>
  )
}


export default SplashMain;