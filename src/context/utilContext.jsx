import React, { createContext, useContext, useState, useEffect } from 'react';

const RegistrationContext = createContext();

export const useRegistrationContext = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [ renders , setRenderers] = useState(0)
  const [PaymentModalOpen , setPaymentModalOpen] = useState(false)


  const contextValue = {
    renders,
    setRenderers,
    PaymentModalOpen ,
    setPaymentModalOpen
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
    </RegistrationContext.Provider>
  );
};
