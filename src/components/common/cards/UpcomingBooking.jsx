import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from 'lucide-react';

export default function ReservationsTable({ data = [] }) {
  const [filter, setFilter] = useState("all");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const { toast } = useToast();

  const filteredData = useMemo(() => {
    let dataToFilter = data;
   
    const groupedData = dataToFilter.reduce((acc, reservation) => {
      const key = `${reservation.reservation_checkin}-${reservation.guest_name}-${reservation.guest_email}-${reservation.reservation_type}-${reservation.reservation_checkout}-${reservation.receipt_total_amount}`;

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
          reservationCheckin: reservation.check_in_date,
          reservationCheckout: reservation.check_out_date,
        };
      }

      reservation.receipt_discounts.forEach((discount) => {
        if (
          discount &&
          !acc[key].receiptDiscounts.some(
            (d) => d.discount_id === discount.discount_id
          )
        ) {
          acc[key].receiptDiscounts.push(discount);
        }
      });

      if (reservation.reservation_type === "room") {
        acc[key].reservationRoomID.push(reservation.reservation_id);
      } else if (reservation.reservation_type === "venue") {
        acc[key].reservationVenueID.push(reservation.reservation_id);
      }

      acc[key].reservations.push(reservation);

      return acc;
    }, {});

    return Object.values(groupedData).sort((a, b) => {
      const dateA = new Date(a.reservationCheckin);
      const dateB = new Date(b.reservationCheckin);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [data, filter, sortOrder]);
  const checkInOutDates = filteredData.map(reservation => ({
    checkIn: new Date(reservation.reservationCheckin),
    checkOut: new Date(reservation.reservationCheckout)
  }));
  const toSentenceCase = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const Modal = ({ isOpen, reservation, onClose }) => {
    if (!isOpen || !reservation) return null;
  };

  if (filteredData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No upcoming reservations found.
      </div>
    );
  }

  return (
    <>
      <Card
        className="mb-4 shadow-md cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Upcoming Reservations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Click to view all upcoming reservations.
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-[75px] right-[30px] text-white text-lg font-bold bg-red-500"
          >
            X
          </button>
          <ScrollArea className="h-[80%] w-[1300px] overflow-auto bg-white rounded-lg p-6 relative">
            <div className="space-y-4 p-6">
              {filteredData.map((reservation, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold">
                      <div className="text-sm text-gray-500">
                    {new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }).format(
                            new Date(
                              reservation.reservationCheckin
                            )
                          )}
                    </div>
                        {toSentenceCase(reservation.guestName)} -{" "}
                        {toSentenceCase(reservation.reservationType)}
                      </div>
                    </div>
                   
                    
                  </CardContent>
                  <h4 className="font-semibold p-2 my-2">
                    Reservations ({reservation.reservations.length}):
                  </h4>
                  <ScrollArea className="h-[200px] w-full p-2 border rounded">
                    {reservation.reservations.map((res, index) => (
                      <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                        <p className="font-medium">
                          {res.reservation || `Reservation ${index + 1}`}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        reservation={selectedReservation}
        onClose={closeModal}
      />

      <Toaster />
    </>
  );
}

