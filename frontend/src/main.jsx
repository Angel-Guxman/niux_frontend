import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
/* Login Google */
import { GoogleOAuthProvider } from '@react-oauth/google';
/* Login Microsoft */
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

const clientGoogleId = import.meta.env.VITE_CLIENT_GOOGLE_ID;
const msalInstance = new PublicClientApplication(msalConfig);

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    msalInstance.setActiveAccount(event.payload.account);
  }
});

const optionsPaypal = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: 'MXN',
  intent: 'capture',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <GoogleOAuthProvider clientId={clientGoogleId}>
        <PayPalScriptProvider options={optionsPaypal}>
          <App />
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </MsalProvider>
  </React.StrictMode>,
);
