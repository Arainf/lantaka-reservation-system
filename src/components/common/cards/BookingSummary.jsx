import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReservations } from "@/context/contexts";

export default function ReservationsTable({ data = [] }) {
  const { bookingSummary } = useReservations();

  

 

  return (
    <>
      <Card className="mb-3 h-[200px]  shadow-md  flex flex-col justify-center items-center">
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
