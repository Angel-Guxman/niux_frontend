import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import { TfiMicrosoftAlt } from 'react-icons/tfi';

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package
 */

export const RegisterButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <button onClick={() => handleLogin('popup')} className="flex items-center gap-2 hover:bg-purple-400 hover:text-white transition-colors hover:border-purple-400 bg-gray-200 py-2 px-4 rounded-lg shadow-lg">
      <TfiMicrosoftAlt />
      Registrarse con Microsoft
    </button>
  );
};
