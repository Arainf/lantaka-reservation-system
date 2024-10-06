import React, { useState } from 'react';
import AppRoutes from './routes/routes';  // Import the routing setup
import { UserProvider } from './context/contexts';

function App() {


  return (
    <>
    <UserProvider>
      <AppRoutes />
    </UserProvider> 
    </>
  );
}

export default App;
