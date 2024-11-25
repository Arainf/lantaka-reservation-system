"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoomTypeSelector from "../../components/common/cards/RoomTypeSelector"; // Adjust the path based on your folder structure
import Clock from "@/components/common/time/clock";
import { X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReservations, useRoomVenueProvider } from "@/context/contexts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useReservationsContext } from "@/context/reservationContext";
import CheckinTable from "@/components/common/cards/CheckinTable";
import CheckoutTable from "@/components/common/cards/CheckoutTable";
import ProcessPayment from "@/components/common/cards/ProcessPayment";

const Reservation = () => {
  const { bookingSummary } = useReservations();
  const navigate = useNavigate();
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [checkOutModalOpen, setCheckOutModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const { reservationsData } = useReservationsContext();

  const toggleFormSidebar = () => {
    setButtonClicked(!buttonClicked);
  };

  const handleCheckIn = (guestId) => {
    console.log(`Checking in guest with ID: ${guestId}`);
    setCheckInModalOpen(false);
  };

  const handleCheckOut = (guestId) => {
    console.log(`Checking out guest with ID: ${guestId}`);
    setCheckOutModalOpen(false);
  };

  const handlePayment = (guestId, amount) => {
    console.log(`Processing payment of $${amount} for guest with ID: ${guestId}`);
    setPaymentModalOpen(false);
  };

  return (
    <div className="relative flex flex-col h-screen w-screen bg-background" id="reservation">
      <main className="flex flex-col md:flex-row h-full">
        {/* Left Side: Room Selector */}
        <div className="flex flex-col md:w-2/3 h-full p-4 space-y-4">
          <Card className="flex h-full flex-col flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Available Rooms</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              {/* Room Type Selector */}
              <RoomTypeSelector />
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Quick Actions & Summary */}
        <div className="flex flex-col md:w-1/3 h-auto p-6 space-y-3 border-l">
          <Card>
            <CardContent className="p-0">
              <div className="h-1/4 bg-[#143774] border flex border-gray-200 rounded-lg overflow-hidden">
                <Clock />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button className="w-full justify-start" onClick={() => navigate("/Reservation")}>
                <Plus className="mr-2 h-4 w-4" /> New Reservation
              </Button>
              <Dialog open={checkInModalOpen} onOpenChange={setCheckInModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start" variant="outline">
                    <FaCalendarCheck className="mr-2 h-4 w-4" /> Check-in Guest
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Check-in Guest</DialogTitle>
                  </DialogHeader>
                  <CheckinTable data={reservationsData} />
                </DialogContent>
              </Dialog>
              <Dialog open={checkOutModalOpen} onOpenChange={setCheckOutModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start" variant="outline">
                    <FaCalendarTimes className="mr-2 h-4 w-4" /> Check-out Guest
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Check-out Guest</DialogTitle>
                  </DialogHeader>
                  <CheckoutTable data={reservationsData} />
                </DialogContent>
              </Dialog>
              <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start" variant="outline">
                    <MdOutlinePayment className="mr-2 h-4 w-4" /> Process Payment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Process Payment</DialogTitle>
                  </DialogHeader>
                  <ProcessPayment data={reservationsData} />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto">
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
        </div>
      </main>
    </div>
  );
};

export default Reservation;
 