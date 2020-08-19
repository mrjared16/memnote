import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Route, Redirect, Switch } from 'react-router-dom';

function Auth() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginPage}/>
      <Route exact path='/register' component={RegisterPage}/>
      <Redirect to='/login'/>
    </Switch>
  );
}

export default Auth;