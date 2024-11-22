import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReservationsTable({ data = [] }) {

  const bookingSummary = useMemo(() => {
    const total = data.length;
    const rooms = data.filter((reservation) => reservation.reservation_type === "room").length;
    const venues = data.filter((reservation) => reservation.reservation_type === "venue").length;
    return { total, rooms, venues };
  }, [data]);

 

  return (
    <>
      <Card className="mb-4 shadow-md">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{bookingSummary.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{bookingSummary.rooms}</div>
              <div className="text-sm text-muted-foreground">Rooms</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{bookingSummary.venues}</div>
              <div className="text-sm text-muted-foreground">Venues</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </>
  );
}

// import React, { useMemo } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function ReservationsTable({ data = [] }) {

//   // Get today's date in 'YYYY-MM-DD' format
//   const today = new Date().toISOString().split('T')[0];
  
//   console.log("Today's Date:", today); // Debugging today's date
//   console.log("Data:", data); // Check if data is passed properly

//   const bookingSummary = useMemo(() => {
//     // Filter reservations for today
//     const todayReservations = data.filter((reservation) => {
//       // Check if reservation.date exists and print it for debugging
//       console.log("Reservation Date:", reservation.date);
      
//       if (!reservation.date) return false;
//       const reservationDate = new Date(reservation.date).toISOString().split('T')[0];
      
//       console.log("Parsed Reservation Date:", reservationDate); // Debugging parsed date
      
//       return reservationDate === today;
//     });

//     // Count the number of rooms and venues for today's reservations
//     const total = todayReservations.length;
//     const rooms = todayReservations.filter((reservation) => reservation.reservation_type === "room").length;
//     const venues = todayReservations.filter((reservation) => reservation.reservation_type === "venue").length;

//     return { total, rooms, venues };
//   }, [data, today]);

//   return (
//     <Card className="mb-4 shadow-md">
//       <CardHeader>
//         <CardTitle>Booking Summary</CardTitle>
//         {/* Display today's date */}
//         <p className="text-sm text-muted-foreground">Today: {today}</p>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-3 gap-4 text-center">
//           <div>
//             <div className="text-2xl font-bold">{bookingSummary.total}</div>
//             <div className="text-sm text-muted-foreground">Total</div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold">{bookingSummary.rooms}</div>
//             <div className="text-sm text-muted-foreground">Rooms</div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold">{bookingSummary.venues}</div>
//             <div className="text-sm text-muted-foreground">Events</div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


