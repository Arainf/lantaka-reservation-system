"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2, X, Files, Eye } from 'lucide-react';
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
import { Separator } from "@/components/ui/separator";
import { usePriceContext } from "@/context/PriceContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useReservationsContext } from "@/context/reservationContext";
import Slogo from "@/assets/images/SchoolLogo.png";

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
  });
  const { price, setClientType } = usePriceContext();
  const { setDeleteData } = useReservationsContext();
  const { toast } = useToast();

  // Group data by guest and reservation type
  const groupedData = useMemo(() => {
    const result = data.reduce((acc, reservation) => {
      const key = `${reservation.guest_name}-${reservation.guest_email}-${reservation.reservation_type}`;

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
          reservationType: reservation.reservation_type,
          receiptDiscounts: [],
          reservations: [],
          reservationRoomID: [],
          reservationVenueID: [],
        };
      }

     

      // Add unique discounts
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

          // Separate room and venue reservations
    if (reservation.reservation_type === "room") {
      acc[key].reservationRoomID.push(reservation.reservation_id);
    } else if (reservation.reservation_type === "venue") {
      acc[key].reservationVenueID.push(reservation.reservation_id);
    }

      // Add reservation to the reservations array
      acc[key].reservations.push(reservation);

      return acc;
    }, {});

    console.log("Grouped Data:", result);
    return result;
  }, [data]);

  const handleGeneratePDF = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/generate-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedGuest),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reservation.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(price.venue_Holder)) {
      const venues = price.venue_Holder.reduce((acc, venue) => {
        acc[venue.venue_id] =
          venue.venue_price_internal || venue.venue_price_external;
        return acc;
      }, {});
      setVenueRates(venues);
      console.log("Venue Rates:", venues);
    } else {
      setVenueRates({});
    }
  }, [price]);

  useEffect(() => {
    setRoomRates({
      "Double Bed": price.double_price || 0,
      "Triple Bed": price.triple_price || 0,
      "Matrimonial Room": price.matrimonial_price || 0,
    });
  }, [price]);

  // Helper functions
  const getStatusColor = (status) => {
    const statusColors = {
      ready: "bg-green-50",
      waiting: "bg-yellow-50",
      onUse: "bg-blue-50",
      cancelled: "bg-red-50",
      done: "bg-purple-50",
      onCleaning: "bg-orange-50",
    };
    return statusColors[status] || "bg-gray-50";
  };

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
    toast({
      title: "Edit Functionality",
      description: "Edit functionality is not yet implemented.",
      variant: "default",
    });
  };

  const handleDelete = (guest) => {
    setAccountToDelete(guest);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!accountToDelete) return;

    try {
      const dataToDelete = {
        guest_id: accountToDelete.guestId,
        reservation_ids: accountToDelete.reservationID,
      };

      const response = await fetch(
        "http://localhost:5000/api/delete_reservations",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToDelete),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      const result = await response.json();
      console.log(result.message);

      toast({
        title: "Deletion Successful",
        description: "Reservations have been deleted.",
        variant: "success",
      });

      setDeleteModalOpen(false);
      setIsDialogOpen(false);
      setDeleteData(true);
    } catch (error) {
      console.error("Error deleting guest:", error);

      toast({
        title: "Deletion Failed",
        description:
          "There was an error deleting the reservation data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteModalOpen(false);
      setAccountToDelete(null);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleStatusChange = (value) => {
    if (selectedGuest) {
      setSelectedGuest((prevGuest) => ({
        ...prevGuest,
        reservations: prevGuest.reservations.map((res) => ({
          ...res,
          status: value,
        })),
      }));
    }
  };

  const handleSaveStatus = async (type) => {
    if (!selectedGuest) return;
  
    try {
      // Ensure that reservations exist and get the status to update
      const reservation = selectedGuest.reservations[0];
      if (!reservation) {
        throw new Error("No reservation found for the selected guest.");
      }
  
      const statusToUpdate = reservation.status;
      
      // Create the payload object
      let payload = {
        guest_id: selectedGuest.guestId,
        status: statusToUpdate,
        type: type,
      };
  
      // Add different reservation IDs based on the type (room or venue)
      if (type === "room") {
        payload.reservation_ids = selectedGuest.reservationRoomID;
      } else if (type === "venue") {
        payload.reservation_ids = selectedGuest.reservationVenueID;
      } else {
        throw new Error("Invalid reservation type.");
      }
  
      console.log("Sending status update:", payload);
  
      // Send the PUT request to update the status
      const response = await fetch("http://localhost:5000/api/change_status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to update reservation status.");
      }
  
      const result = await response.json();
      console.log(result.message);
  
      // Notify the user that the update was successful
      toast({
        title: "Status Updated",
        description: "Reservation status has been updated successfully.",
        variant: "success",
      });
  
      // Trigger the deleteData update if necessary
      setDeleteData((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error updating status:", error);
  
      // Notify the user that something went wrong
      toast({
        title: "Update Failed",
        description: "Failed to update the reservation status. Please try again.",
        variant: "destructive",
      });
    }
  };


    const getGuestTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'internal':
        return 'bg-blue-100 text-blue-800'
      case 'external':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  
  return (
    <>
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Guest Details</TableHead>
                <TableHead className="w-[15%]">Guest Type</TableHead>
                <TableHead className="w-[15%]">Reservation Type</TableHead>
                <TableHead className="w-[20%]">Check-in</TableHead>
                <TableHead className="w-[15%]">Total Amount</TableHead>
                <TableHead className="w-[10%]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(groupedData).map((guest, index) => (
                <TableRow
                  key={index}
                  className={`cursor-pointer ${getStatusColor(
                    guest.reservations[0]?.status || "default"
                  )}`}
                  onClick={() => {
                    handleCellClick(guest);
                    setClientType(guest.guestType);
                  }}
                >
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
                  
                  <TableCell>
                  <Badge variant="secondary" className={getGuestTypeColor(guest.guestType)}>
                      {guest.guestType}
                    </Badge>
                      </TableCell>
                  <TableCell>{guest.reservationType}</TableCell>
                  <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }).format(
                              new Date(guest.reservations[0].check_in_date)
                            )}
                    
                  </TableCell>
                  <TableCell>{formatCurrency(guest.receiptTotal)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${getStatusColorBadge(
                        guest.reservations[0]?.status || "default"
                      )} text-${guest.reservations[0]?.status || "gray"}-600`}
                    >
                      {guest.reservations[0]?.status || "N/A"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {selectedGuest && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-transparent p-0 max-w-4xl border-none flex flex-row gap-3" showCloseButton={false}>
            <div className="w-3/6 flex flex-col gap-2">
              <Card className="flex-1 flex flex-col">
                <CardContent className="p-4 flex flex-col h-full">
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

                  <div className="flex-grow">
                    <h4 className="font-semibold my-2">
                      {selectedGuest.reservationType} Reservations ({selectedGuest.reservations.length}):
                    </h4>
                    <ScrollArea className="h-[calc(40vh-8rem)] w-[95%] p-2">
                      {selectedGuest.reservations.map((reservation, index) => (
                        <div
                          key={index}
                          className="mb-2 p-2 bg-gray-50 rounded"
                        >
                          <p className="font-medium">
                            {reservation.reservation}
                          </p>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>

                  <Separator className="my-2" />

                  <div className="mt-auto text-sm text-gray-600">
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
                          new Date(selectedGuest.reservations[0].check_in_date)
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
                          new Date(selectedGuest.reservations[0].check_out_date)
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

                <Card className="p-4">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="status">Status</Label>
                    <div className="flex-1 flex-row flex gap-2">
                      <Select
                        value={selectedGuest.reservations[0]?.status || "default"}
                        onValueChange={handleStatusChange}
                      >
                        <SelectTrigger
                          id="status"
                          className={getStatusColorBadge(
                            selectedGuest.reservations[0]?.status || "default"
                          )}
                        >
                          <SelectValue placeholder={selectedGuest.reservations[0]?.status || "Please select"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="waiting">Waiting</SelectItem>
                          <SelectItem value="onUse">On Use</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                          <SelectItem value="onCleaning">On Cleaning</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" onClick={(e) => handleSaveStatus(selectedGuest.reservationType)}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="w-2/6  flex flex-col gap-2">
                <Card className="w-full bg-yellow-50  border-yellow-200 shadow-md relative">
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
                      className="w-full h-28 bg-yellow-50 border-yellow-200 focus:border-yellow-300 focus:ring-yellow-200"
                      value={selectedGuest.additionalNotes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <ScrollArea className="h-[calc(2/4vh-8rem)] w-full">
                  <Card className="bg-white text-gray-800  rounded-xl shadow-lg">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <h3 className="text-xl font-bold">Partial Receipt</h3>
                          <p className="text-sm text-gray-500">
                            {selectedGuest.guestType}
                          </p>
                          <p className="text-sm text-gray-500">
                            Date: {new Date(selectedGuest.receiptDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Separator />
                        <ScrollArea className="h-[calc(3/4vh-8rem)] w-full">
                          {selectedGuest.reservationType === "room" && (
                            <div className="space-y-2 text-sm">
                              <h4 className="font-semibold">Room Charges:</h4>
                              {Object.entries(
                                selectedGuest.reservations.reduce((acc, reservation) => {
                                  const roomType = reservation.room_type;
                                  const numberOfNights = calculateNumberOfNights(
                                    reservation.check_in_date,
                                    reservation.check_out_date
                                  );

                                  if (!acc[roomType]) {
                                    acc[roomType] = {
                                      count: 0,
                                      nights: numberOfNights,
                                      total: 0,
                                    };
                                  }
                                  acc[roomType].count += 1;

                                  return acc;
                                }, {})
                              ).map(([roomType, data]) => (
                                <div key={roomType} className="flex justify-between">
                                  <span>
                                    {roomType} ({data.count}) x {data.nights} nights
                                  </span>
                                  <span>
                                    {formatCurrency(
                                      data.count * data.nights * roomRates[roomType]
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {selectedGuest.reservationType === "venue" && (
                            <div className="space-y-2 text-sm">
                              <h4 className="font-semibold">Venue Charges:</h4>
                              {Object.entries(
                                selectedGuest.reservations.reduce((acc, venue) => {
                                  const venueType = venue.reservation;
                                  const venueRate = venueRates[venueType] || 0;

                                  if (!acc[venueType]) {
                                    acc[venueType] = {
                                      count: 0,
                                      total: 0,
                                    };
                                  }
                                  acc[venueType].count += 1;
                                  acc[venueType].total += venueRate;

                                  return acc;
                                }, {})
                              ).map(([venueType, data]) => (
                                <div key={venueType} className="flex justify-between">
                                  <span>{venueType}</span>
                                  <span>{formatCurrency(data.total)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </ScrollArea>

                        <Separator />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(selectedGuest.receiptSubTotal)}</span>
                          </div>
                        </div>
                        {selectedGuest.receiptDiscounts.map((discount, index) => {
                          if (discount) {
                            const discountAmount =
                              (selectedGuest.receiptSubTotal * discount.discount_percentage) / 100;

                            return (
                              <div
                                key={`${index}-${discount.discount_id}`}
                                className="flex justify-between text-sm text-green-600"
                              >
                                <span>
                                  {discount.discount_name} ({discount.discount_percentage}%):
                                </span>
                                <span>{formatCurrency(discountAmount)}</span>
                              </div>
                            );
                          }
                          return null;
                        })}

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
                      onClick={handleGeneratePDF}
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

        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this guest&apos;s reservations?</p>
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