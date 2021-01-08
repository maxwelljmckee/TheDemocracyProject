import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, deleteSession } from './store/session';

import LoginForm from "./components/auth/LoginForm";
import LogoutButton from "./components/auth/LogoutButton";
import SignUpForm from "./components/auth/SignUpForm";
import SplashMain from './components/Splash/SplashMain'
import SplashAbout from './components/Splash/SplashAbout'

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setLoaded(true))
  }, [dispatch])

  const user = useSelector(state => state.session.user)

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {!user && <h1>no session user</h1>}
      <Switch>
        <Route path='/dashboard'><LogoutButton /></Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/" exact={true}>
          <SplashMain />
        </Route>
        <Route path='/splash/about'>
          <SplashAbout />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
