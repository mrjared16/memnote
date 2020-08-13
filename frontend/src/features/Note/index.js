import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeToken } from "../Auth/authSlice";
import LeftSidebar from './components/LeftSidebar';

function Note() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeToken());
  };

  return (
    <>
      <LeftSidebar logout={logout} />
      <Switch>
      </Switch>
    </>
  );
}

export default Note;