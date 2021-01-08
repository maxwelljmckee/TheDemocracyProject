import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { logout } from "../../services/auth";
import { deleteSession } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async (e) => {
    dispatch(deleteSession())
    history.push('/')
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
