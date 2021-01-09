import React, { useState, useEffect } from 'react';


const IsRegistered = ({ transition, setIsRegistered }) => {
  const [unhide1, setUnhide1] = useState(false);
  const [unhide2, setUnhide2] = useState(false);
  const [unhide3, setUnhide3] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUnhide1(true)
      setTimeout(() => {
        setUnhide2(true)
        setTimeout(() => {
          setUnhide3(true)
        }, 350)
      }, 1000)
    }, 400)
  }, [])

  const handleUpvote = () => {
    setIsRegistered(true)
  }

  const handleDownvote = () => {
    setIsRegistered(false)
  }

  return (
    <div className={`slide-in-bottom
         ${ transition && 'slide-out-left'}`}>
      <div className='is-registered__header'>
        One More Thing!
          </div>
      { unhide1 &&
        <div className='is-registered__body slide-in-bottom'>
          Are you a registered voter?
        </div>
      }
      { unhide2 &&
        <i 
          className="fas fa-check-circle bounce-in-fwd"
          onClick={handleUpvote}
        />
      }
      { unhide3 &&
          <i 
            className="fas fa-times-circle bounce-in-fwd"
            onClick={handleDownvote}
          />
      }
    </div>
  )
}


export default IsRegistered;