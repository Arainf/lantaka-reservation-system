import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react"; // Make sure to import Search icon

export default function ReservationsTable({ data = [] }) {
  const [filter, setFilter] = useState("all");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const { toast } = useToast();

  const filteredData = useMemo(() => {
    let dataToFilter = data;

    // Apply search filter
    if (searchTerm) {
      dataToFilter = dataToFilter.filter((reservation) =>
        reservation.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.guest_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filter !== "all") {
      dataToFilter = dataToFilter.filter((reservation) =>
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
  }, [data, filter, sortOrder, searchTerm]);

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
       
        <div className="bg-white p-6 rounded-lg w-1/2  w-[1000px] max-h-[90vh] overflow-y-auto">
        <button
  onClick={() => setIsModalOpen(false)}
  className="absolute top-[90px] left-[360px] text-white text-sm font-bold bg-red-500 p-4 w-10 h-10  flex items-center justify-center"
>
  X
</button>

          <h2 className="text-xl font-bold">Reservation Details</h2>
          <div className="space-y-2 ">
                    <div>
              <h4 className="font-semibold my-2">
                {toSentenceCase(reservation.reservationType)} Reservations ({reservation.reservations.length}):
              </h4>
              <ScrollArea className="h-[200px] p-2 border rounded">
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
      <div className="fixed top- left-[50px] mb-4">
  <input
    type="text"
    placeholder="Search by name or account..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-blue-500"
  />
  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
    <Search className="text-gray-900" size={18} />
  </div>
</div>


      <CardContent className="pt-[50px]">
        <div className="space-y-4">
          {filteredData.map((reservation, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openModal(reservation)}>
              <CardContent className="p-4">
              <div className="flex items-center justify-between relative">
                <div className="font-bold">
                    {toSentenceCase(reservation.guestName)} - {toSentenceCase(reservation.reservationType)}
                    <div className="mt-2 -py-[50px]">
                    {new Date(reservation.receiptDate).toLocaleDateString()}
                    </div>
                </div>

                {/* Absolute positioning for the button */}
                <div className="absolute top-[px] right-0 text-sm px-[0px] text-gray-500">
                    <Button>pay then hm yun</Button>
                </div>
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
