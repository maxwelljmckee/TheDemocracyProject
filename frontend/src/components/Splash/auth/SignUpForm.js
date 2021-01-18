import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import logo_img from '../../../static/image-only_logo.png';
import IsRegistered from '../IsRegistered';
import { registerUser } from '../../../store/session';


const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [animate, setAnimate] = useState(false);
  const [transition, setTransition] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [isRegistered, setIsRegistered] = useState(null);

  const [errors, setErrors] = useState([]);
  // const [formValidated, setFormValidated] = useState(false);

  // const handleValidations = () => {
  //   if (firstName && lastName && email && zipCode && passwordMatch()) {
  //     setFormValidated(true)
  //   }
  // }

  const handleClick = async (e) => {
    e.preventDefault();
    setAnimate(true)
    setTimeout(() => {
      setIsHidden(true)
    }, 480)
  };

  const handleSubmit = () => {
    const newUser = {
      firstName,
      lastName,
      email,
      zipCode,
      password,
      isRegistered
    }
    setTransition(true)
    setTimeout(() => {
    dispatch(registerUser(newUser)).then(res => {
      if (res && res.errors) setErrors(res.errors)
      if (!res.errors) {
          history.push('/dashboard')
        }
      })
    }, 300) // extra time for slide-out transition before rerouting
  }

  useEffect(() => {
    if (isRegistered !== null) handleSubmit()
  }, [isRegistered])

  return (
    <>
      <div className={`
        ${ animate && 'slide-out-top' }
        ${ isHidden && 'hidden' }`}
      >
        <div className='signup-form__container slide-in-bottom'>
          <img src={logo_img} />
          <form className='signup-form'>
            <input
              type="text"
              name="firstName"
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required={true}
            ></input>
            <input
              type="text"
              name="lastName"
              placeholder='Last Name'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required={true}
            ></input>
            <input
              type="text"
              name="email"
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required={true}
            ></input>
            <input
              type="number"
              name="zipCode"
              placeholder='5-Digit Zip Code'
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
              required={true}
            ></input>
            <input
              type="password"
              name="password"
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required={true}
            ></input>
            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required={true}
            ></input>
            <button 
              type="button" 
              onClick={handleClick}
            >
              Make an Account
            </button>
          </form>
        </div>
      </div>
      {/* <div> */}
      { isHidden &&
        <IsRegistered
          setIsRegistered={setIsRegistered}
          transition={transition}
        />
      }
      {/* </div> */}
    </>
  );
};

export default SignUpForm;