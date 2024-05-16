import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import logo from '../asset/logo.png';
import '../App.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Logo" className="scanpageimgae"/>
      </div>
      <button className="loginbutton" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
