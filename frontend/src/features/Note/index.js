import React from 'react';
import HomePage from './pages/HomePage';
import { Switch, Route } from 'react-router-dom';

function Note() {
  return (
    <Switch>
      <Route component={HomePage}/>
    </Switch>
  );
}

export default Note;