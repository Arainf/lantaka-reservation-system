import React, { useState } from 'react';
// import { lazyLoad } from './utils/lazyLoad';
import AppRoutes from './routes/routes';  // Import the routing setup
import { UserProvider, AccountProvider, ReservationProvider, RoomandVenueProvider } from './context/contexts';
import { PriceProvider } from './context/priceContext';
import { GuestProvider } from './context/guestContext';
import { ReservationsProvider } from './context/reservationContext';
import { DashboardProvider } from './context/dashboardContext';
import  { RoomVenueContentsProvider } from './context/roomandVenueContext';
import { RegistrationProvider } from './context/registrationContext';
import { RoomTypeProvider } from './context/RoomTypeContext';
import { DiscountProvider } from './context/discountContext';
import { AdditionalFeeProvider } from './context/additionalFeeContext';




function App() {
  return (
    <>
    <RegistrationProvider>
    <UserProvider>
      <AccountProvider>
        <ReservationProvider>
          <RoomandVenueProvider>
            <PriceProvider>
              <GuestProvider>
                <DashboardProvider>
                  <ReservationsProvider>
                    <RoomVenueContentsProvider>
                      <DiscountProvider>
                      <RoomTypeProvider>
                        < AdditionalFeeProvider>
                          <AppRoutes />
                        </AdditionalFeeProvider>
                      </RoomTypeProvider>
                      </DiscountProvider>
                    </RoomVenueContentsProvider>
                  </ReservationsProvider>
                </DashboardProvider>
              </GuestProvider>
            </PriceProvider>
          </RoomandVenueProvider>
        </ReservationProvider>
      </AccountProvider>
    </UserProvider> 
    </RegistrationProvider>
    </>
  );
}

export default App;
