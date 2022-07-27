import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider
    domain="dev-wz8em98m.us.auth0.com"
    clientId="Jxk7X2taB8U0Wdz3N14elt1oiEEyWpZm"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>

);

