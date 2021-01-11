import React, { useState, useEffect } from 'react';


const FooterMain = ({ fromLoader }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (fromLoader) {
      setTimeout(() => {
        setAnimate(true); // slide in left - footer
      }, 1300)
    }
  })

  return (
    <>
    {/* WITHOUT ANIMATION */}
    { !fromLoader &&
      <div className='footer-main__container'>
        <div className='propublica-footer'>
          <div className='propublica-footer__text'>Powered By</div>
          <img src='https://assets.classy.org/5379137/6682f1f4-8841-11e7-95b9-0aae2908d2a6.jpg' alt='ProPublica' />
        </div>
      </div>
    }
    {/* WITH ANIMATION */}
    { animate &&
      <div className='footer-main__container slide-in-left-linear'>
        <div className='propublica-footer'>
          <div className='propublica-footer__text'>Powered By</div>
          <img src='https://assets.classy.org/5379137/6682f1f4-8841-11e7-95b9-0aae2908d2a6.jpg' alt='ProPublica' />
        </div>
      </div>
    }
    </>
  )
}


export default FooterMain;