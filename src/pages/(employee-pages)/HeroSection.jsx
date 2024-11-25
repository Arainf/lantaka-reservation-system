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
import { Toaster } from "@/components/ui/toaster";
import { useToastContext } from "@/context/toastContext";

const Reservation = () => {
  const { bookingSummary } = useReservations();
  const navigate = useNavigate();
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [checkOutModalOpen, setCheckOutModalOpen] = useState(false);
  const [ paymentModalOpen, setPaymentModalOpen ] = useState(false);
  const [ paymentOpen , setPaymentOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const { reservationsData,  fetchReservationsWaiting, fetchReservationsReady, fetchReservationsOnUse } = useReservationsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [ data, setData] = useState([]);
  const { toast } = useToastContext()

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (!searchTerm) return [];

    return reservationsData.filter((reservation) =>
      reservation.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.guest_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reservationsData, searchTerm]);


  useEffect(() => {
    const initialDate = new Date();
    setSelectedDate(initialDate);
    setDateTranslate(formatDateToYYYYMMDD(initialDate));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const newDate = formatDateToYYYYMMDD(date);
    setDateTranslate(newDate);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsGrabbing(true);
    }
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  const toggleFormSidebar = () => {
    setButtonClicked(!buttonClicked);
  };

  const resetState = () => {
    setResetTrigger(true);
    setTimeout(() => {
      setResetTrigger(false);
    }, 0);
  };  



  // const filteredGuests = guests.filter((guest) =>
  //   guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const handleCheckIn = (guestId) => {
  //   console.log(`Checking in guest with ID: ${guestId}`);
  //   setCheckInModalOpen(false); 
  // };
 
 

  // const handleCheckOut = (guestId) => {
  //   console.log(`Checking out guest with ID: ${guestId}`);
  //   setCheckOutModalOpen(false);
  // };

  // const handlePayment = (guestId, amount) => {
  //   console.log(
  //     `Processing payment of $${amount} for guest with ID: ${guestId}`
  //   );
  //   setPaymentModalOpen(false);
  // };



  const handlePaymentReservationData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getReservationsWaiting`);
      if (response.status === 404) {
        // No reservations, set state to an empty array
        setData([]);
        console.warn("No reservations found for 'Waiting'.");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch reservations for 'Waiting'.");
      }
      const reservationsData = await response.json();
      setData(reservationsData);
    } catch (error) {
      console.error("Error fetching 'Waiting' reservations", error);
    }
  };

  const handleCheckInReservationData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getReservationsReady`);
      if (response.status === 404) {
        // No reservations, set state to an empty array
        setData([]);
        console.warn("No reservations found for 'Ready'.");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch reservations for 'Ready'.");
      }
      const reservationsData = await response.json();
      setData(reservationsData);
    } catch (error) {
      console.error("Error fetching 'Ready' reservations", error);
    } finally {
      console.log(data)
    }
  };

  const handleCheckOutReservationData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getReservationsOnUse`);
      if (response.status === 404) {
        // No reservations, set state to an empty array
        setData([]);
        console.warn("No reservations found for 'On Use'.");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch reservations for 'On Use'.");
      }
      const reservationsData = await response.json();
      setData(reservationsData);
    } catch (error) {
      console.error("Error fetching 'On Use' reservations", error);
    } finally {
      console.log(data)
    }
  };

  const handleOpenPaymentModal = () => {
    setPaymentModalOpen(true);
  };

  const handleCheckOut = (guestId) => {
    console.log(`Checking out guest with ID: ${guestId}`);
    setCheckOutModalOpen(false);
  };

  const handlePayment = (guestId, amount) => {
    console.log(`Processing payment of $${amount} for guest with ID: ${guestId}`);
    setPaymentModalOpen(false);
    setCheckInModalOpen(false);
    setCheckOutModalOpen(false);
  };

  return (
    <>
    <div
      className="relative flex flex-col h-screen w-screen overflow-y-auto bg-background"
      id="reservation"
    >
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

              {/* Process Payment */}
              <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
                <DialogTrigger asChild onClick={handlePaymentReservationData}>
                  <Button className="w-full justify-start" variant="outline">
                    <MdOutlinePayment className="mr-2 h-4 w-4" /> 
                    Process Payment
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col bg-transparent border-none" showCloseButton={false}>
                  <ProcessPayment data={data} onClose={handleClosePaymentModal} />
                </DialogContent>
              </Dialog>

              <Dialog open={checkInModalOpen} onOpenChange={setCheckInModalOpen}>
                <DialogTrigger asChild onClick={handleCheckInReservationData}>
                  <Button className="w-full justify-start" variant="outline">
                    <FaCalendarCheck className="mr-2 h-4 w-4" /> Check-in Guest
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col bg-transparent border-none shadow-none"  showCloseButton={false} >
                    <CheckinTable data={data} onClose={handleClosePaymentModal} />
                </DialogContent>
              </Dialog>

              <Dialog open={checkOutModalOpen} onOpenChange={setCheckOutModalOpen}>
                <DialogTrigger asChild onClick={handleCheckOutReservationData}>
                  <Button className="w-full justify-start" variant="outline">
                    <FaCalendarTimes className="mr-2 h-4 w-4" /> Check-out Guest
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col bg-transparent border-none shadow-none" showCloseButton={false}>
                    <CheckoutTable data={data} onClose={handleClosePaymentModal} />
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
 