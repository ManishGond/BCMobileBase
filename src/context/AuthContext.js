import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState(null); // Example state

  return (
    <AuthContext.Provider value={{authState}}>{children}</AuthContext.Provider>
  );
};
