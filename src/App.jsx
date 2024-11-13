import React, { useState } from 'react';
// import { lazyLoad } from './utils/lazyLoad';
import AppRoutes from './routes/routes';  // Import the routing setup
import { UserProvider, AccountProvider, ReservationProvider, RoomandVenueProvider } from './context/contexts';
import { PriceProvider } from './context/priceContext';
import { GuestProvider } from './context/guestContext';
import { ReservationsProvider } from './context/reservationContext';


function App() {
  return (
    <>
    <UserProvider>
      <AccountProvider>
        <ReservationProvider>
          <RoomandVenueProvider>
            <PriceProvider>
              <GuestProvider>
                <ReservationsProvider>
                  <AppRoutes />
                </ReservationsProvider>
              </GuestProvider>
            </PriceProvider>
          </RoomandVenueProvider>
        </ReservationProvider>
      </AccountProvider>
    </UserProvider> 
    </>
  );
}

export default App;
