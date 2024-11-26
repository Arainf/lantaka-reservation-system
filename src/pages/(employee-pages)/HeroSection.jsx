'use client'

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoomTypeSelector from "@/components/common/cards/RoomTypeSelector";
import Clock from "@/components/common/time/clock";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReservations } from "@/context/contexts";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useReservationsContext } from "@/context/reservationContext";
import CheckinTable from "@/components/common/cards/CheckinTable";
import CheckoutTable from "@/components/common/cards/CheckoutTable";
import ProcessPayment from "@/components/common/cards/ProcessPayment";
import { Toaster } from "@/components/ui/toaster";
import { useToastContext } from "@/context/toastContext";
import { Calendar2 } from "@/components/ui/calendar2";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { useHero } from "@/context/heroContext";

const Reservation = () => {
  const { bookingSummary } = useReservations();
  const navigate = useNavigate();
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [checkOutModalOpen, setCheckOutModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const { reservationsData } = useReservationsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const { toast } = useToastContext();
  const { selectedDate, updateSelectedDate } = useHero();

  const filteredData = useMemo(() => {
    if (!searchTerm) return reservationsData;

    return reservationsData.filter((reservation) =>
      reservation.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.guest_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reservationsData, searchTerm]);

  const fetchReservationData = async (status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/getReservations${status}`);
      if (response.status === 404) {
        setData([]);
        console.warn(`No reservations found for '${status}'.`);
        return;
      }
      if (!response.ok) {
        throw new Error(`Failed to fetch reservations for '${status}'.`);
      }
      const reservationsData = await response.json();
      setData(reservationsData);
    } catch (error) {
      console.error(`Error fetching '${status}' reservations`, error);
      toast({
        title: "Error",
        description: `Failed to fetch ${status} reservations. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handlePaymentReservationData = () => fetchReservationData("Waiting");
  const handleCheckInReservationData = () => fetchReservationData("Ready");
  const handleCheckOutReservationData = () => fetchReservationData("OnUse");

  const handleCloseModal = () => {
    setPaymentModalOpen(false);
    setCheckInModalOpen(false);
    setCheckOutModalOpen(false);
  };

  return (
    <>
      <div className="relative flex flex-col h-screen w-screen overflow-y-auto bg-background" id="reservation">
        <main className="flex flex-col md:flex-row h-full">
          <div className="flex flex-col md:w-2/3 h-full p-4 space-y-4">
            <Card className="flex h-full flex-col flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 mb-1">
                <CardTitle>Available Rooms</CardTitle>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full sm:w-[280px] justify-start text-left font-normal`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar2
                      mode="single"
                      selected={selectedDate}
                      onSelect={(newDate) => newDate && updateSelectedDate(newDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <RoomTypeSelector />
              </CardContent>
            </Card>
          </div>

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

                <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline" onClick={handlePaymentReservationData}>
                      <MdOutlinePayment className="mr-2 h-4 w-4" /> 
                      Process Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col bg-transparent border-none" showCloseButton={false}>
                    <ProcessPayment data={data} onClose={handleCloseModal} />
                  </DialogContent>
                </Dialog>

                <Dialog open={checkInModalOpen} onOpenChange={setCheckInModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline" onClick={handleCheckInReservationData}>
                      <FaCalendarCheck className="mr-2 h-4 w-4" /> Check-in Guest
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col bg-transparent border-none shadow-none" showCloseButton={false}>
                    <CheckinTable data={data} onClose={handleCloseModal} />
                  </DialogContent>
                </Dialog>

                <Dialog open={checkOutModalOpen} onOpenChange={setCheckOutModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline" onClick={handleCheckOutReservationData}>
                      <FaCalendarTimes className="mr-2 h-4 w-4" /> Check-out Guest
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col bg-transparent border-none shadow-none" showCloseButton={false}>
                    <CheckoutTable data={data} onClose={handleCloseModal} />
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

      <Toaster 
        containerClassName="z-[10000]" 
        toastOptions={{
          className: "z-[10000]",
        }}
      />
    </>
  );
};

export default Reservation;