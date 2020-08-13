import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import { useDispatch } from "react-redux";
import { removeToken } from "../../Auth/authSlice";

function HomePage(props) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeToken());
  };
  
  return (
    <div>
      <LeftSidebar logout={logout} />
    </div>
  );
}

export default HomePage;
