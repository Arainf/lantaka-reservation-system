import React, { useState } from 'react';
import AppRoutes from './routes/routes';  // Import the routing setup
import { UserProvider, AccountProvider } from './context/contexts';


function App() {


  return (
    <>
    <UserProvider>
      <AccountProvider>
        <AppRoutes />
      </AccountProvider>
    </UserProvider> 
    </>
  );
}

export default App;
