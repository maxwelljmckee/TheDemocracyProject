import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../../store/session';
import logo_img from '../../../static/image-only_logo.png';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [transition, setTransition] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTransition(true);
    setTimeout(() => {
    dispatch(loginUser(email, password)).then(res => {
      if (res && res.errors) setErrors(res.errors)
      if (!res.errors) {
          history.push('/dashboard')
        }
      })
    }, 600) // extra time for slide-out transition before rerouting
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setTransition(true);
    setTimeout(() => {
    dispatch(loginUser('demo@user.com', 'password')).then(res => {
      if (!res.errors) {
          history.push('/dashboard');
        }
      })
    }, 600) // extra time for slide-out transition before rerouting
  }

  return (
    <div className={`${ transition && 'slide-out-left'}`}>
      <div className='login-form__container slide-in-right'>
        <img src={logo_img} />
        <form className='login-form' onSubmit={handleSubmit}>
          <div>
            {errors.map((error, i) => (
              <div key={`error-${i}`}>{error}</div>
            ))}
          </div>
          <input
            name="email"
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <button type="button" onClick={handleDemo}>Demo Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
