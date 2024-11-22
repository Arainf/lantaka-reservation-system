import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ReservationsTable({ data = [] }) {
  const [filter, setFilter] = useState("all");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const { toast } = useToast();

  const filteredData = useMemo(() => {
    let dataToFilter = data;
    if (filter !== "all") {
      dataToFilter = data.filter((reservation) =>
        filter === "room"
          ? reservation.reservation_type === "room"
          : filter === "venue"
          ? reservation.reservation_type === "venue"
          : true
      );
    }

    const groupedData = dataToFilter.reduce((acc, reservation) => {
      const key = `${reservation.guest_name}-${reservation.guest_email}-${reservation.reservation_type}-${reservation.reservation_checkin}-${reservation.reservation_checkout}-${reservation.receipt_total_amount}`;

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
          reservationCheckin: reservation.reservation_checkin,
          reservationCheckout: reservation.reservation_checkout,
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
      const dateA = new Date(a.receiptDate);
      const dateB = new Date(b.receiptDate);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [data, filter, sortOrder]);

  const getStatusColorBadge = (status) => {
    const statusColors = {
      ready: "bg-green-200 text-green-800",
      waiting: "bg-yellow-200 text-yellow-800",
      onUse: "bg-blue-200 text-blue-800",
      cancelled: "bg-red-200 text-red-800",
      done: "bg-purple-200 text-purple-800",
      onCleaning: "bg-orange-200 text-orange-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Modal = ({ isOpen, reservation, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto">
        <button
            onClick={onClose}
            className="absolute top-[80px] right-[320px] bg-red-500 text-white"
          >
            X
          </button>
          <h2 className="text-xl font-bold mb-4">Reservation Details</h2>
          <div className="space-y-2 ">
            
          <p><strong className="font-semibold ">Guest Name:</strong> {toSentenceCase(reservation.guestName)}</p>
          <p><strong className="font-semibold ">Guest Email:</strong> {toSentenceCase(reservation.guestEmail)}</p>
          <p><strong className="font-semibold ">Guest Type:</strong> {toSentenceCase(reservation.guestType)}</p>
          <p><strong className="font-semibold ">Reservation Type:</strong> {toSentenceCase(reservation.reservationType)}</p>
          <p><strong className="font-semibold ">Receipt Date:</strong> {new Date(reservation.receiptDate).toLocaleDateString()}</p>
          <p><strong className="font-semibold ">Receipt Total:</strong> ${reservation.receiptTotal}</p>
          <p><strong className="font-semibold ">Receipt Subtotal:</strong> ${reservation.receiptSubTotal}</p>
          <p><strong className="font-semibold ">Additional Notes:</strong> {reservation.additionalNotes ? toSentenceCase(reservation.additionalNotes) : 'N/A'}</p>


            <div>
              <h4 className="font-semibold my-2">
                {toSentenceCase(reservation.reservationType)} Reservations ({reservation.reservations.length}):
              </h4>
              <ScrollArea className="h-[200px] w-full p-2 border rounded">
                {reservation.reservations.map((res, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                    <p className="font-medium">{res.reservation || `Reservation ${index + 1}`}</p>
                    
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <CardContent className="p-6">
        <div className="mb-4 flex space-x-2">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("room")}
            variant={filter === "room" ? "default" : "outline"}
          >
            Room
          </Button>
          <Button
            onClick={() => setFilter("venue")}
            variant={filter === "venue" ? "default" : "outline"}
          >
            Event
          </Button>
          <Button
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            variant="outline"
          >
            Sort {sortOrder === "newest" ? "Oldest" : "Newest"}
          </Button>
        </div>

        <div className="space-y-4">
          {filteredData.map((reservation, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openModal(reservation)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold">
                    {toSentenceCase(reservation.guestName)} - {toSentenceCase(reservation.reservationType)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(reservation.receiptDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {reservation.guestEmail}
                </div>
                <div className="mt-2">
                  <Badge variant="secondary">{reservation.guestType}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      <Modal
        isOpen={isModalOpen}
        reservation={selectedReservation}
        onClose={closeModal}
      />

      <Toaster />
    </>
  );
}

