import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './features/Auth';
import Note from './features/Note';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.auth.token);
  const isAuth = token ? true : false;
  return (
    <BrowserRouter>
      <Switch>
        {!isAuth && <Route path="/" component={Auth} />}
        <Route exact path="/" component={Note} />
        {/* <Route exact path="/user" component={User} /> */}
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
