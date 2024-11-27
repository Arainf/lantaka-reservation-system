import React, { useState } from 'react';
// import { lazyLoad } from './utils/lazyLoad';
import AppRoutes from './routes/routes';  // Import the routing setup
import { UserProvider, AccountProvider, ReservationProvider, RoomandVenueProvider } from './context/contexts';
import { PriceProvider } from './context/priceContext';
import { GuestProvider } from './context/guestContext';
import { ReservationsProvider } from './context/reservationContext';
import { DashboardProvider } from './context/dashboardContext';
import  { RoomVenueContentsProvider } from './context/roomandVenueContext';
import { RegistrationProvider } from './context/utilContext';
import { RoomTypeProvider } from './context/RoomTypeContext';
import { DiscountProvider } from './context/discountContext';
import { AdditionalFeeProvider } from './context/additionalFeeContext';
import { ToastProvider } from './context/toastContext';
import { NotificationProvider } from './context/notificationContext';
import { HeroProvider } from './context/heroContext';




function App() {
  return (
    <>
    <NotificationProvider>
    <ToastProvider>
    <RegistrationProvider>
    <UserProvider>
      <AccountProvider>
        <HeroProvider>
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
        </HeroProvider>
      </AccountProvider>
    </UserProvider> 
    </RegistrationProvider>
    </ToastProvider>
    </NotificationProvider>
    </>
  );
}

export default App;
