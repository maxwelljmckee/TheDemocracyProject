import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, deleteSession } from './store/session';

import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import SplashMain from './components/Splash/SplashMain'
import SplashAbout from './components/Splash/SplashAbout'
import NavBar from './components/NavBar'
// import { authenticate } from "./services/auth";

function App() {
  const dispatch = useDispatch();
  // const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setLoaded(true))
  }, [dispatch])

  const user = useSelector(state => state.session.user)

  // useEffect(() => {
  //   (async() => {
  //     const user = await authenticate();
  //     if (!user.errors) {
  //       setAuthenticated(true);
  //     }
  //     setLoaded(true);
  //   })();
  // }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {!user && <h1>no session user</h1>}
      {/* <NavBar /> */}
      <Switch>
        <Route path='/dashboard'><h1>Authorized!!</h1></Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/" exact={true}>
          <SplashMain />
        </Route>
        <Route path='/about'>
          <SplashAbout />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
