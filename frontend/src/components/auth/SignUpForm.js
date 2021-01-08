import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';

import logo_img from '../../static/image-only_logo.png';
import { registerUser } from '../../store/session';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registeredVoter, setRegisteredVoter] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className='signup-form__container slide-in-bottom'>
      <img src={logo_img} />
      <form className='signup-form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
        <input
          type="text"
          name="lastName"
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
        <input
          type="text"
          name="email"
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <input
          type="password"
          name="password"
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <input
          type="password"
          name="confirmPassword"
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required={true}
        ></input>
        <button type="submit">Make an Account</button>
      </form>
    </div>
  );
};

export default SignUpForm;
