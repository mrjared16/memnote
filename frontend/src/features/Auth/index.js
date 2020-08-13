import React from 'react';
import LoginPage from './pages/LoginPage';
import { Route, Redirect, Switch } from 'react-router-dom';

function Auth() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginPage}/>
      <Redirect to='/login'/>
    </Switch>
  );
}

export default Auth;