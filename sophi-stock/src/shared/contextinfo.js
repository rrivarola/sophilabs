import React from "react";

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const AuthenticationContext = React.createContext({
  userName: "",
  isAuthenticated: true,
  setAuthenticatedInfo: (userName) => {
    console.log('Valor '+userName);
  },
});
