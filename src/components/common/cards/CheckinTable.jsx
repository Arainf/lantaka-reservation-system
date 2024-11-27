import React, { useState, useMemo, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToastContext } from "@/context/toastContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import { useNotifications } from "@/context/notificationContext";
import { UserContext } from "@/context/contexts";

export default function ReservationsTable({ data = [], onClose }) {
  const [filter, setFilter] = useState("all");
  const [selectedReservationIndex, setSelectedReservationIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToastContext();
  const { createNotification } = useNotifications();
  const { userData  } = useContext(UserContext);
  const filteredData = useMemo(() => {
    let dataToFilter = data.filter(reservation => reservation.status === "ready")


    if (searchTerm) {
      dataToFilter = dataToFilter.filter(
        (reservation) =>
          reservation.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reservation.guest_email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filter !== "all") {
      dataToFilter = dataToFilter.filter((reservation) =>
        filter === "room"
          ? reservation.reservation_type === "room"
          : filter === "venue"
          ? reservation.reservation_type === "venue"
          : true
      )
    }

    const groupedData = dataToFilter.reduce((acc, reservation) => {
      const key = `${reservation.guest_name}-${reservation.guest_email}-${reservation.reservation_type}-${reservation.receipt_total_amount}-${reservation.receipt_id}-${reservation.timestamp}`;

      if (!acc[key]) {
        acc[key] = {
          guestId: reservation.guest_id,
          guestName: reservation.guest_name,
          guestEmail: reservation.guest_email,
          guestType: reservation.guest_type,
          reservationType: reservation.reservation_type,
          receiptDate: reservation.receipt_date,
          receiptTotal: reservation.receipt_total_amount,
          receiptSubTotal: reservation.receipt_initial_total,
          additionalNotes: reservation.additional_notes,
          receiptDiscounts: [],
          reservations: [],
          reservationRoomID: [],
          reservationVenueID: [],
        }
      }

      reservation.receipt_discounts.forEach((discount) => {
        if (
          discount &&
          !acc[key].receiptDiscounts.some(
            (d) => d.discount_id === discount.discount_id
          )
        ) {
          acc[key].receiptDiscounts.push(discount)
        }
      })

      if (reservation.reservation_type === "room") {
        acc[key].reservationRoomID.push(reservation.reservation_id)
      } else if (reservation.reservation_type === "venue") {
        acc[key].reservationVenueID.push(reservation.reservation_id)
      } else if (reservation.reservation_type === "both") {
        if (reservation.room_type) {
          acc[key].reservationRoomID.push(reservation.reservation_id)
        } else {
          acc[key].reservationVenueID.push(reservation.reservation_id)
        }
      }

      acc[key].reservations.push(reservation)
      
      return acc
    }, {})

    return Object.values(groupedData).sort((a, b) => {
      const dateA = new Date(a.receiptDate)
      const dateB = new Date(b.receiptDate)
      return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
    })
  }, [data, filter, sortOrder, searchTerm])

  const goToNextReservation = () => {
    if (selectedReservationIndex < filteredData.length - 1) {
      setSelectedReservationIndex(selectedReservationIndex + 1)
    }
  }

  const goToPreviousReservation = () => {
    if (selectedReservationIndex > 0) {
      setSelectedReservationIndex(selectedReservationIndex - 1)
    }
  }

  const handleCloseModal = () => {
    console.log("Clicked")
    setPaymentModalOpen(true)
  }

  const handleProceedToPayment = async () => {
    console.log("Clicked")
    if (!filteredData[selectedReservationIndex]) return;

    const reservation = filteredData[selectedReservationIndex];
    if (!reservation) return;

    try {
      const payload = {
        guest_id: reservation.guestId,
        status: "onUse",
        type: reservation.reservationType,
      };

      if (reservation.reservationType === "room") {
        payload.reservation_room_ids = reservation.reservationRoomID;
      } else if (reservation.reservationType === "venue") {
        payload.reservation_venue_ids = reservation.reservationVenueID;
      } else if (reservation.reservationType === "both") {
        payload.reservation_room_ids = reservation.reservationRoomID;
        payload.reservation_venue_ids = reservation.reservationVenueID;
      } else {
        throw new Error("Invalid reservation type.");
      }

      console.log("Sending status update:", payload);

      const response = await fetch("http://localhost:5000/api/change_status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update reservation status.");

      const result = await response.json();
      toast({
        title: "Check In Successful",
        description: "Reservation has been successfully checked-in.",
        variant: "success",
      });

      let fullName = userData.first_name + " " + userData.last_name;

      // Create a formatted timestamp
      const timestamp = new Date().toLocaleString('en-US', {
        weekday: 'long', // Day of the week
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // 12-hour format (AM/PM)
      });

      createNotification({
        type: 'Modified',
        description: `Employee account "${fullName}" has check-in reservation ids: {"${reservation.reservationRoomID || reservation.reservationVenueID}" } - Timestamp: "${timestamp}".`,
        role: 'Administrator',
      });
      // Close the dialog
    onClose();
    } catch (error) {
      toast({
        title: "Check In Failed",
        description: "Failed to check-in. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
    <div className="flex flex-col gap-4">
    <Card>
        <CardContent className="p-4">
          <div className="flex flex-row gap-10 justify-between">
            <div className="bg-white rounded-lg border border-white/30 ">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or account..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-60 md:w-80 border-2 text-black border-black bg-transparent rounded-3xl focus:outline-none focus:border-black"
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search className="text-black" size={18} />
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white text-lg font-bold bg-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pl-6 pb-2">
          <CardTitle> Check-In Guest {" "}
          <span className="ml-2 text-sm text-gray-500">
                ({filteredData.length} to check-in)
              </span> </CardTitle>
        </CardHeader>
        <CardContent>
          {searchTerm ? (
            <div className="space-y-4">
              {filteredData.length > 0 ? (
                <>
                  {/* Show the current reservation */}
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                          <div className="font-semibold">
                            {filteredData[selectedReservationIndex].guestName}
                          </div>
                          <Button onClick={handleProceedToPayment}>
                            Check-In
                          </Button>
                      </div>
                    </CardContent>
                    <ScrollArea className="h-[100px] m-2 border rounded">
                      {filteredData[selectedReservationIndex].reservations.map(
                        (res, index) => (
                          <div
                            key={index}
                            className="mb-2 p-2 bg-gray-50 rounded"
                          >
                            <p className="font-medium">
                              {res.reservation || `Reservation ${index + 1}`}
                            </p>
                          </div>
                        )
                      )}
                    </ScrollArea>
                    <div className="text-sm text-muted-foreground m-2 ">
                      {Math.min(selectedReservationIndex + 1, filteredData.length)} of{" "}
                      {filteredData.length} entries
                    </div>
                  </Card>

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={goToPreviousReservation}
                      disabled={selectedReservationIndex === 0}
                    >
                      Prev
                    </Button>
                    <Button
                      onClick={goToNextReservation}
                      disabled={
                        selectedReservationIndex === filteredData.length - 1
                      }
                    >
                      Next
                    </Button>
                  </div>
                </>
              ) : (
                <div className="border-dashed h-auto w-auto rounded-xl  border-2 border-gray-300">
                  <p className="text-gray-500 text-center m-20">
                    No reservations found for "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="border-dashed h-auto w-auto rounded-xl  border-2 border-gray-300">
              <p className="text-gray-500 text-center m-20 ">
                Start searching to view reservations.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      
      </div>

    </>
  );
}
