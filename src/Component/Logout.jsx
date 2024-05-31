import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import logoutimg from '../asset/logout.png'

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <img src={logoutimg} alt="logout" width={30} style={{ position:'absolute', top:'75px', left:'88%'}} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}/>
    // <button style={{ position:'absolute', top:'300px', left:'40%'}} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
    //   Log Out
    // </button>
  );
};

export default LogoutButton;