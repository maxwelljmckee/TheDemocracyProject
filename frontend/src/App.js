import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from './store/session';

// SPLASH COMPONENTS
import LoginForm from "./components/Splash/auth/LoginForm";
import SignUpForm from './components/Splash/auth/SignUpForm';
import SplashMain from './components/Splash/SplashMain';
import SplashAbout from './components/Splash/SplashAbout';

// DASHBOARD COMPONENTS
import DashboardLayout from './components/Dashboard/DashboardLayout'

// import Loader from './components/Loader/Loader'

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
      <Switch>
        {/* ===== SPLASH && AUTH ROUTES ===== */}
        <Route path="/" exact={true}>
          <SplashMain />
        </Route>
        <Route path='/splash/about'>
          <SplashAbout />
        </Route>
        <Route path='/splash/register'>
          <SignUpForm />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>


        {/* ===== USER DASHBOARD ROUTES ===== */}
        <Route path='/dashboard'><DashboardLayout /></Route>


        {/* ===== REPRESENTATIVES ROUTES ===== */}


        {/* ===== BILLS ROUTES ===== */}


        {/* ===== COMMUNITY ROUTES ===== */}


      </Switch>
    </BrowserRouter>
  );
}

export default App;
