import * as React from 'react';

export type AuthContextType = {
  authenticated: boolean;  // to check if authenticated or not
  user: object; // store all the user details
  accessToken: string;  // accessToken of user for Auth0
  initiateLogin: any; // to start the login process
  handleAuthentication: any; // handle Auth0 login process
  logout: any; // logout the user
};

export const AuthContext  = React.createContext<AuthContextType>(
  {
      authenticated: false, // to check if authenticated or not
      user: {}, // store all the user details
      accessToken: '', // accessToken of user for Auth0
      initiateLogin: () => {}, // to start the login process
      handleAuthentication: () => {}, // handle Auth0 login process
      logout: () => {} // logout the user
  }
);

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
