import React, { useState, useEffect } from 'react';


const IsRegistered = ({ setIsRegistered, handleSubmit }) => {
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
        }, 800)
      }, 800)
    }, 800)
  }, [])

  const handleGreenClick = () => {
    setIsRegistered(true)
    handleSubmit()
  }

  const handleRedClick = () => {
    handleSubmit()
  }

  return (
    <div className='slide-in-bottom'>
      <div className='is-registered__header'>
        One More Thing!
          </div>
      { unhide1 &&
        <div className='is-registered__body slide-in-bottom'>
          Are you a registered voter?
        </div>
      }
      <div className='is-registered__button-container'>
        { unhide2 &&
          // <div className='is-registered__btn1 slide-in-fwd-center' onClick={handleGreenClick}>
          <i 
            className="fas fa-check-circle is-registered__btn1 slide-in-fwd-center"
            onClick={handleGreenClick}
          />
          // {/* </div> */}
        }
        { unhide3 &&
          // <div className='is-registered__btn2 slide-in-bottom' onClick={handleRedClick}>
            <i 
              className="fas fa-times-circle is-registered__btn2 slide-in-bottom"
              onClick={handleRedClick}
            />
          // {/* </div> */}
        }
      </div>
    </div>
  )
}


export default IsRegistered;