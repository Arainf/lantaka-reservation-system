import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ReservationsTable({ data = [] }) {
  const [filter, setFilter] = useState("all");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(0);
  const reservationsPerPage = 3; // Adjust the number of reservations per page
  const { toast } = useToast();

  // Get today's date for filtering
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight for date comparison

  const filteredData = useMemo(() => {
    let dataToFilter = data;

    // Filter for reservations on today's date
    dataToFilter = dataToFilter.filter((reservation) => {
      const reservationCheckout = new Date(reservation.check_out_date);
      return reservationCheckout.setHours(0, 0, 0, 0) === today.getTime(); // Compare dates ignoring time
    });

    // Group the filtered data
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

    // Return grouped data, sorted by check-in date
    return Object.values(groupedData).sort((a, b) => {
      const dateA = new Date(a.reservationCheckout);
      const dateB = new Date(b.reservationCheckout);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [data, filter, sortOrder, today]);

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

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / reservationsPerPage);
  const currentReservations = filteredData.slice(
    currentPage * reservationsPerPage,
    (currentPage + 1) * reservationsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (filteredData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No upcoming reservations for today.
      </div>
    );
  }

  return (
    <>
      <Card
        className="mb-3 h-[200px] shadow-md cursor-pointer flex flex-col justify-center items-center hover:bg-blue-300 hover:shadow-lg transition-all duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap">
            <CalendarIcon className="w-5 h-5" />
            Today's due Reservations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Click to view today's reservations.
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-[150px] right-[230px] text-white text-lg font-bold bg-red-500 hover:bg-red-600 hover:shadow-lg transition-all duration-200"
          >
            X
          </button>
          <ScrollArea className="space-y-4 p-6 h-[60vh] w-[80%] sm:w-[70%] lg:w-[60%] bg-white rounded-lg p-6">
            <div className="space-y-4 ">
              {currentReservations.map((reservation, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-bold text-lg text-gray-900">
                        <div className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }).format(new Date(reservation.reservationCheckout))}
                        </div>
                        <span className="font-semibold text-blue-600">
                          {toSentenceCase(reservation.guestName)} -{" "}
                          {toSentenceCase(reservation.reservationType)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {reservation.reservationStatus}
                      </div>
                    </div>

                    <h4 className="font-semibold text-lg my-3 text-gray-800">
                      Reservations ({reservation.reservations.length}):
                    </h4>
                    <ScrollArea className="h-[200px] w-full p-3 border rounded-lg bg-gray-50 overflow-auto">
                      {reservation.reservations.map((res, index) => (
                        <div
                          key={index}
                          className="mb-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          <p className="font-medium text-gray-700">
                            {res.reservation || `Reservation ${index + 1}`}
                          </p>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className="absolute bottom-[100px] right-[295px] gap-4 flex justify-between mt-4 ">
            <Button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="bg-blue-500 text-white"
            >
              {" "}
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="bg-blue-500 text-white"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
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
