import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2, X, Files } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { PinIcon as PushPin } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Slogo from "@/assets/images/SchoolLogo.png";
import { Separator } from "@/components/ui/separator";
import { usePriceContext } from "@/context/PriceContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useReservationsContext } from "@/context/reservationContext"

// Helper function to calculate number of nights
const calculateNumberOfNights = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const nightsDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return nightsDiff;
};

export default function Component({ data = [] }) {
  // State declarations
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [venueRates, setVenueRates] = useState({});
  const [roomRates, setRoomRates] = useState({
    "Double Bed": 0,
    "Triple Bed": 0,
    "Matrimonial Room": 0,
  })
  const { price, setClientType, } = usePriceContext();
  const { setDeleteData } = useReservationsContext()
  const { toast } = useToast();

// Group data by guest
const groupedData = useMemo(() => {
  return data.reduce((acc, reservation) => {
    const key = `${reservation.guest_name}-${reservation.guest_email}`;
    
    // Initialize the group if it doesn't exist yet
    if (!acc[key]) {
      acc[key] = {
        guestId: reservation.guest_id,
        guestName: reservation.guest_name,
        guestEmail: reservation.guest_email,
        guestType: reservation.guest_type,
        receiptDate: reservation.receipt_date,
        receiptTotal: reservation.receipt_total,
        receiptSubTotal: reservation.receipt_initial_total,
        roomReservations: [],
        venueReservations: [],
        reservationID: [],
      };
    }
    
    // Add the reservation ID to the reservationID array
    acc[key].reservationID.push(reservation.reservation_id);
    
    // Categorize the reservation based on its type
    if (reservation.reservation_type === "room") {
      acc[key].roomReservations.push(reservation);
    } else if (reservation.reservation_type === "venue") {
      acc[key].venueReservations.push(reservation);
    }

    return acc;
  }, {});
}, [data]);




  console.log("roomReservation Grouped:", groupedData);

  // Set venue rates
  useEffect(() => {
    if (Array.isArray(price.venue_Holder)) {
      const venues = price.venue_Holder.reduce((acc, venue) => {
        acc[venue.venue_id] = venue.venue_price_internal || venue.venue_price_external;
        return acc;
      }, {});
      setVenueRates(venues);
    } else {
      setVenueRates({});
    }
  }, [price]);

  useEffect(() => {
    setRoomRates({
      "Double Bed": price.double_price || 0,
      "Triple Bed": price.triple_price || 0,
      "Matrimonial Room": price.matrimonial_price || 0,
    })
  }, [price])

  // Helper functions
  const getStatusColor = (status) => {
    const statusColors = {
      ready: "bg-green-100 text-green-800",
      waiting: "bg-yellow-100 text-yellow-800",
      onuse: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      done: "bg-purple-100 text-purple-800",
      oncleaning: "bg-orange-100 text-orange-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  // Event handlers
  const handleCellClick = (guest) => {
    setSelectedGuest(guest);
    setIsDialogOpen(true);
  };

  const handleEdit = () => {
    console.log("Edit clicked for guest:", selectedGuest);
    // Implement edit functionality here
  };

  const handleDelete = (guest) => {
    setAccountToDelete(guest);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!accountToDelete) return;

    try {
      // Prepare data to send to the backend
      const dataToDelete = {
        guest_id: accountToDelete.guestId,
        reservation_ids: accountToDelete.reservationID,
      };

      console.log("deleted to pass", dataToDelete);

      const response = await fetch('http://localhost:5000/api/delete_reservations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToDelete),
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      const result = await response.json();
      console.log(result.message);

      // Update UI
      onDeleteSuccess(accountToDelete.guest_id);

      // Show success message
      toast({
        title: "Deletion Failed",
        description: "There was an error deleting the reservation data. Please try again.",
        variant: "destructive",
      });


      setDeleteModalOpen(false);
      setAccountToDelete(null);
    } catch (error) {
      console.error('Error deleting guest:', error);

      // Show error message
      toast({
        title: "Deletion Successful",
        description: "Reservations have been deleted.",
        variant: "success",
      });

      setDeleteModalOpen(false);
      setIsDialogOpen(false);
      setDeleteData(true);
        
    }
  };

  const confirmStatus = async () => {
    if (!accountToDelete) return;

    try {
      // Prepare data to send to the backend
      const dataToDelete = {
        guest_id: accountToDelete.guestId,
        reservation_ids: accountToDelete.reservationID,
      };

      console.log("deleted to pass", dataToDelete);

      const response = await fetch('http://localhost:5000/api/delete_reservations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToDelete),
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      const result = await response.json();
      console.log(result.message);

      // Update UI
      onDeleteSuccess(accountToDelete.guest_id);

      // Show success message
      toast({
        title: "Deletion Failed",
        description: "There was an error deleting the reservation data. Please try again.",
        variant: "destructive",
      });


      setDeleteModalOpen(false);
      setAccountToDelete(null);
    } catch (error) {
      console.error('Error deleting guest:', error);

      // Show error message
      toast({
        title: "Deletion Successful",
        description: "Reservations have been deleted.",
        variant: "success",
      });

      setDeleteModalOpen(false);
      setIsDialogOpen(false);
      setDeleteData(true);
        
    }
  };

  

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleStatusChange = (value) => {
    if (selectedGuest) {
      setSelectedGuest((prevGuest) => ({
        ...prevGuest,
        roomReservations: prevGuest.roomReservations.map((res) => ({
          ...res,
          status: value,
        })),
        venueReservations: prevGuest.venueReservations.map((res) => ({
          ...res,
          status: value,
        })),
      }));
    }
  };

  // Render component
  return (
    <>
    <Card className="w-full">
      <CardContent className="p-0">
        <Table>
          {/* Table header */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[35%]">Guest Details</TableHead>
              <TableHead className="w-[20%]">No. of Reservations</TableHead>
              <TableHead className="w-[25%]">Check-in (Room/Venue)</TableHead>
              <TableHead className="w-[20%]">Status</TableHead>
            </TableRow>
          </TableHeader>
          {/* Table body */}
          <TableBody>
            {Object.values(groupedData).map((guest, index) => (
              <TableRow
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  handleCellClick(guest);
                  setClientType(guest.guestType);
                }}
                
              >
                {/* Guest details */}
                <TableCell className="flex items-center space-x-3 py-4">
                  <img
                    src={Slogo}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{guest.guestName}</div>
                    <div className="text-sm text-gray-500">
                      {guest.guestEmail}
                    </div>
                  </div>
                </TableCell>
                {/* Number of reservations */}
                <TableCell>
                  {guest.roomReservations.length +
                    guest.venueReservations.length}
                </TableCell>
                {/* Check-in date */}
                <TableCell>
                  {guest.roomReservations.length > 0
                    ? `Room (${new Date(
                        guest.roomReservations[0].check_in_date
                      ).toLocaleDateString()})`
                    : guest.venueReservations.length > 0
                    ? `Venue (${new Date(
                        guest.venueReservations[0].check_in_date
                      ).toLocaleDateString()})`
                    : "N/A"}
                </TableCell>
                {/* Status */}
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(
                      guest.roomReservations[0]?.status ||
                        guest.venueReservations[0]?.status ||
                        "default"
                    )}
                  >
                    {guest.roomReservations[0]?.status ||
                      guest.venueReservations[0]?.status ||
                      "N/A"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Guest details dialog */}
      {selectedGuest && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className="bg-transparent p-0 max-w-4xl border-none flex flex-row gap-3"
            showCloseButton={false}
          >
            {/* Guest Details */}
            <div className="w-3/6 flex flex-col gap-2">
              {/* Guest info card */}
              <Card className="flex-1">
                <CardContent className="p-4">
                  {/* Guest details */}
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
                        {selectedGuest.guestName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {selectedGuest.guestEmail}
                      </div>
                    </div>
                  </div>
                  <Separator />

                  {/* Room Reservations */}
                  {selectedGuest.roomReservations.length > 0 && (
                    <div>
                      <h4 className="font-semibold my-2">
                        Room Reservations ({selectedGuest.roomReservations.length}):
                      </h4>
                      <ScrollArea className="h-[calc(30vh-4rem)] w-[95%] p-2">
                        {selectedGuest.roomReservations.map(
                          (reservation, index) => (
                            <div
                              key={index}
                              className="mb-2 p-2 bg-gray-50 rounded"
                            >
                              <p className="font-medium">
                                {reservation.reservation}
                              </p>
                            </div>
                          )
                        )}
                      </ScrollArea>
                      {/* Check-in and Check-out dates */}
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between">
                          <p>Check In:</p>
                          <p>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }).format(
                              new Date(
                                selectedGuest.roomReservations[0].check_in_date
                              )
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p>Check Out:</p>
                          <p>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }).format(
                              new Date(
                                selectedGuest.roomReservations[0].check_out_date
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Venue Reservations */}
                  {selectedGuest.venueReservations.length > 0 && (
                    <div>
                      <h4 className="font-semibold my-2">
                        Venue Reservations ({selectedGuest.venueReservations.length}):
                      </h4>
                      <ScrollArea className="h-[calc(25vh-4rem)] w-[95%] p-2">
                        {selectedGuest.venueReservations.map(
                          (reservation, index) => (
                            <div
                              key={index}
                              className="mb-2 p-2 bg-gray-50 rounded"
                            >
                              <p className="font-medium">
                                {reservation.reservation}
                              </p>
                            </div>
                          )
                        )}
                      </ScrollArea>
                      {/* Start and End dates */}
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between">
                          <p>Start:</p>
                          <p>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }).format(
                              new Date(
                                selectedGuest.venueReservations[0].check_in_date
                              )
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p>End:</p>
                          <p>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }).format(
                              new Date(
                                selectedGuest.venueReservations[0].check_out_date
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Status Change */}
              <Card className="p-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex-1 flex-row flex gap-2">
                    <Select
                      value={
                        selectedGuest.roomReservations[0]?.status ||
                        selectedGuest.venueReservations[0]?.status ||
                        "default"
                      }
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger
                        id="status"
                        className={getStatusColor(
                          selectedGuest.roomReservations[0]?.status ||
                            selectedGuest.venueReservations[0]?.status ||
                            "default"
                        )}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="onuse">On Use</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                        <SelectItem value="oncleaning">On Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={() => console.log("Save status changes")}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Fees and Receipt */}
            <div className="w-2/6 flex flex-col gap-2">
              {/* Additional Fees */}
              <Card className="w-full bg-yellow-50 border-yellow-200 shadow-md relative">
                <div className="absolute -top-3 -right-3 text-red-500 transform rotate-12">
                  <PushPin className="w-6 h-6" />
                </div>
                <CardContent className="p-4">
                  <Label
                    htmlFor="notes"
                    className="text-lg font-semibold mb-2 block"
                  >
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Type your notes here..."
                    className="w-full h-32 bg-yellow-50 border-yellow-200 focus:border-yellow-300 focus:ring-yellow-200"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Partial Receipt */}
              <ScrollArea className="h-[calc(3/4vh-8rem)] w-full ">
                <Card className="bg-white text-gray-800 rounded-xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-xl font-bold">Partial Receipt</h3>
                        <p className="text-sm text-gray-500">{selectedGuest.guestType}</p>
                        <p className="text-sm text-gray-500">
                          Date: {new Date(selectedGuest.receiptDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-2 text-sm">
                      <h4 className="font-semibold">Room Charges:</h4>
                      {Object.entries(
                        selectedGuest.roomReservations.reduce((acc, reservation) => {
                          const roomType = reservation.room_type;
                          const numberOfNights = calculateNumberOfNights(
                            reservation.check_in_date,
                            reservation.check_out_date
                          );
                         

                          if (!acc[roomType]) {
                            acc[roomType] = { count: 0, nights: numberOfNights, total: 0 };
                          }
                          acc[roomType].count += 1;
                          

                          return acc;
                        }, {})
                      ).map(([roomType, data]) => (
                        <div key={roomType} className="flex justify-between">
                          <span>
                            {roomType} ({data.count}) x {data.nights} nights
                          </span>
                          <span>{formatCurrency(data.count * data.nights * roomRates[roomType] )}</span>
                        </div>
                      ))}
                      </div>
                      <div className="space-y-2 text-sm">
                        <h4 className="font-semibold">Venue Charges:</h4>
                        {selectedGuest.venueReservations.map((venue, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{venue.reservation}</span>
                            <span>{formatCurrency(venueRates[venue.venue_id] || 0)}</span>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatCurrency(selectedGuest.receiptSubTotal)}</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-baseline">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold">
                          {formatCurrency(selectedGuest.receiptTotal)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>

            {/* Action Buttons */}
            <div className="relative bottom-0">
              <div className="flex justify-between flex-col h-full items-center gap-2">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClose}
                    className="bg-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="bg-white"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClose}
                    className="bg-white"
                  >
                    <Files className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex relative bottom-0">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(selectedGuest)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this guest's reservations?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
    <Toaster />
    </>
  );
}