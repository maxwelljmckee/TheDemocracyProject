import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from './store/session';

// SPLASH COMPONENTS
import LoginForm from "./components/Splash/auth/LoginForm";
import SignUpForm from './components/Splash/auth/SignUpForm';
import SplashMain from './components/Splash/SplashMain';
import SplashAbout from './components/Splash/SplashAbout';

// DASHBOARD COMPONENTS
import DashboardContent from './components/Dashboard/DashboardContent';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Mission from './components/Dashboard/Mission';

// REPRESENTATIVE COMPONENTS
import RepIndex from './components/Representatives/RepIndex';
import RepDetail from './components/Representatives/RepDetail';

// BILL COMPONENTS
import BillIndex from './components/Bills/BillIndex';
import BillDetail from './components/Bills/BillDetail';
import BillFullDetail from './components/Bills/BillFullDetail';
import BillsFollowing from './components/Bills/BillsFollowing';

// STORE DISPATCH FUNCTIONS
import { deleteSession } from './store/session';
import ComponentWithWrapper from './components/TestWrapper'



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
          { user ? <Redirect to='/dashboard' /> : <SplashMain /> }
        </Route>
        <Route path='/splash/about'>
          { user ? <Redirect to='/dashboard' /> : <SplashAbout /> }
        </Route>
        <Route path='/splash/register'>
          { user ? <Redirect to='/dashboard' /> : <SignUpForm /> }
        </Route>
        <Route path="/login" exact={true}>
          { user ? <Redirect to='/dashboard' /> : <LoginForm /> }
        </Route>
        <Route path='/logout' render={() => {
          dispatch(deleteSession());
          return <Redirect to='/' />
        }} />


        {/* ===== USER DASHBOARD ROUTES ===== */}
        <Route path='/dashboard'>
          { user ? <DashboardLayout /> : <Redirect to='/' /> }
        </Route>
        <Route path='/mission'>
          { user ? <Mission /> : <Redirect to='/' /> }
        </Route>


        {/* ===== REPRESENTATIVES ROUTES ===== */}
        <Route path='/representatives/:repId/detail'>
          { user ? <RepDetail /> : <Redirect to='/' /> }
        </Route>
        <Route path='/representatives/:chamber'>
          { user ? <RepIndex /> : <Redirect to='/' /> }
        </Route>


        {/* ===== BILLS ROUTES ===== */}
        <Route path='/bills/:billId/detail'>
          {user ? <BillDetail /> : <Redirect to='/' />}
        </Route>
        <Route path='/bills/:billId/full-detail'>
          {user ? <BillFullDetail /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/bills/following'>
          {user ? <BillsFollowing /> : <Redirect to='/' />}
        </Route>
        <Route path='/bills/:category'>
          {user ? <BillIndex /> : <Redirect to='/' />}
        </Route>


        {/* ===== COMMUNITY ROUTES ===== */}
        <Route path='/test'>
          <ComponentWithWrapper />
        </Route>


      </Switch>
    </BrowserRouter>
  );
}

export default App;



