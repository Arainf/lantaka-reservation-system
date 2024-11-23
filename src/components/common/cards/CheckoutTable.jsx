import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export default function ReservationsTable({ data = [] }) {
  const [filter, setFilter] = useState("all");
  const [selectedReservationIndex, setSelectedReservationIndex] = useState(0); // Default to the first reservation
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  
  // Memoized filtered data
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

  // Group data by guest details (excluding reservation type)
  const groupedData = dataToFilter.reduce((acc, reservation) => {
    const key = `${reservation.guest_name}-${reservation.guest_email}`;

    if (!acc[key]) {
      acc[key] = {
        guestName: reservation.guest_name,
        guestEmail: reservation.guest_email,
        reservations: [],
        receiptDate: reservation.receipt_date,
        reservationCheckout: reservation.check_out_date,

      };
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


  // Handle next and previous navigation
  const goToNextReservation = () => {
    if (selectedReservationIndex < filteredData.length - 1) {
      setSelectedReservationIndex(selectedReservationIndex + 1);
    }
  };

  const goToPreviousReservation = () => {
    if (selectedReservationIndex > 0) {
      setSelectedReservationIndex(selectedReservationIndex - 1);
    }
  };

  return (
    <>
      <Card>
        <div className="fixed -top-[100px] left-[80px] mb-4 bg-white  rounded-lg border border-white/30 p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 text-black border-black bg-transparent rounded-3xl focus:outline-none focus:border-black"
            />
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <Search className="text-black" size={18} />
            </div>
          </div>
        </div>
      </Card>

      {searchTerm ? (
        <div className="space-y-4 mt-4">
          {filteredData.length > 0 ? (
            <>
              {/* Show the current reservation */}
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">
                      {filteredData[selectedReservationIndex].guestName} 
                      {filteredData[selectedReservationIndex].reservationType}
                      <div className="mt-2">
                        {/* dapat checkin date ito */}
                        {new Date(
                          filteredData[selectedReservationIndex].reservationCheckout
                        ).toLocaleDateString()}
                      </div>
                      <div className="absolute top-[100px] right-[40px] text-sm px-[0px] text-gray-500">
                      <Button>Check-out</Button>
                    </div>
                    </div>
                  </div>
                </CardContent>
                <ScrollArea className="h-[200px] p-2 border rounded">
                  {filteredData[selectedReservationIndex].reservations.map((res, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                      <p className="font-medium">
                        {res.reservation || `Reservation ${index + 1}`}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
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
                  disabled={selectedReservationIndex === filteredData.length - 1}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">
              No reservations found for "{searchTerm}"
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">
          Start searching to view reservations.
        </p>
      )}

      <Toaster />
    </>
  );
}
