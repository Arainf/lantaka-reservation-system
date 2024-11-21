import React, { createContext, useContext, useState, useEffect } from 'react';

const RegistrationContext = createContext();

export const useRegistrationContext = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [ renders , setRenderers] = useState()


  const contextValue = {
    renders,
    setRenderers,
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
    </RegistrationContext.Provider>
  );
};
