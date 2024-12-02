import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Slogo from "@/assets/images/SchoolLogo.png";

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
        filter === "internal"
          ? reservation.guest_type === "internal"
          : filter === "external"
          ? reservation.guest_type === "external"
          : true
      );
    }

    const groupedData = dataToFilter.reduce((acc, reservation) => {
      const key = `${reservation.timestamp}-${reservation.userData }`;

      if (!acc[key]) {
        acc[key] = {
          timestamp: reservation.timestamp,
          guestId: reservation.guest_id,
          guestName: reservation.guest_name,
          guestEmail: reservation.guest_email,
          guestType: reservation.guest_type,
          receiptDate: reservation.receipt_date,
          receiptTotal: reservation.receipt_total_amount,
          receiptSubTotal: reservation.receipt_initial_total,
          additionalNotes: reservation.additional_notes,
          receiptDiscounts: [],
          reservationCheckin: reservation.reservation_checkin,
          reservationCheckout: reservation.reservation_checkout,
          reservations: [],
          reservationType: reservation.reservation_type,

          reservationRoomID: [],
          reservationVenueID: [],
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const Modal = ({ isOpen, reservation, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <button
          onClick={onClose}
          className="absolute top-[115px] right-[360px] text-white text-lg font-bold bg-red-500"
        >
          X
        </button>

        <div className="bg-white p-2 rounded-lg absolute left-[360px] top-[115px]">
          <h2 className="text-2xl font-bold">Reservation Details</h2>
        </div>

        <div className="p-6 rounded-lg flex gap-4 w-2/3 overflow-y-auto relative mx-auto justify-center ">
          {/* Left Section */}
          <div className="bg-white p-4 rounded-lg flex-[2] min-w-[10%] max-w-[40%]">
            <div className="space-y-4">
              <p>
                <div className="flex items-center space-x-3 py-3">
                  <img
                    src={Slogo}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">
                      {toSentenceCase(reservation.guestName)} -{" "}
                      <Badge>{toSentenceCase(reservation.guestType)}</Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.guestEmail}
                    </div>
                    
                 
                  </div>
                </div>
              </p>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <strong className="font-semibold text-gray-700">
                    Receipt Total:
                  </strong>
                  <span className="text-lg font-medium text-gray-900">
                    ₱{reservation.receiptTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <strong className="font-semibold text-gray-700">
                    Receipt Subtotal:
                  </strong>
                  <span className="text-lg font-medium text-gray-900">
                    ₱{reservation.receiptSubTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <strong className="font-semibold text-gray-700">
                    Additional Notes:
                  </strong>
                  <span className="text-gray-600">
                    {reservation.additionalNotes || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <strong className="font-semibold text-gray-700">
                    Receipt Date:
                  </strong>
                  <span className="text-gray-600">
                    {new Date(reservation.receiptDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <strong className="font-semibold text-gray-700">
                    Check-In:
                  </strong>
                  <span className="text-gray-600">
                    {formatDate(reservation.reservationCheckin)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <strong className="font-semibold text-gray-700">
                    Check-Out:
                  </strong>
                  <span className="text-gray-600">
                    {formatDate(reservation.reservationCheckout)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-4 rounded-lg flex-[1] min-w-[30%] max-w-[40%]">
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <CardContent className="p-1">
        <div className="mb-4 flex space-x-1">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("internal")}
            variant={filter === "internal" ? "default" : "outline"}
          >
            Internal
          </Button>
          <Button
            onClick={() => setFilter("external")}
            variant={filter === "external" ? "default" : "outline"}
          >
            External
          </Button>
          <Button
            onClick={() =>
              setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
            }
            variant="outline"
          >
            Sort {sortOrder === "newest" ? "Oldest" : "Newest"}
          </Button>
        </div>
        <ScrollArea className="h-[48vh]">
        <div className="space-y-4">
          {filteredData.map((reservation, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openModal(reservation)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold">
                    {toSentenceCase(reservation.guestName)} -{" "}
                    {toSentenceCase(reservation.reservationType)}

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
        </ScrollArea>
      </CardContent>
      <Modal isOpen={isModalOpen} reservation={selectedReservation} onClose={closeModal} />
    </>
  );
}
