import './LoginBtn.scss'

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className={'navbar__link button'} onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;