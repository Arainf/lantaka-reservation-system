"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Edit,
  Trash2,
  X,
  Download,
  Eye,
  Save,
  PhilippinePeso,
  PlusCircle,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { PinIcon as PushPin } from "lucide-react";
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
  DialogDescription,
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
import { ChevronLeft, ChevronRight } from "lucide-react";

const calculateNumberOfNights = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const nightsDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return Math.max(nightsDiff, 1);
};

export default function ReservationsTable({ data = [], keys }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [venueRates, setVenueRates] = useState({});
  const [roomRates, setRoomRates] = useState({
    "Double Bed": 0,
    "Triple Bed": 0,
    "Matrimonial Bed": 0,
  });
  const { price, setClientType, fetchPrice, clientType } = usePriceContext();
  const { setDeleteData, setSaveNote } = useReservationsContext();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [userRole, setUserRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [feeDescription, setFeeDescription] = useState("");
  const [feeAmount, setFeeAmount] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [fees, setFees] = useState([]);
  const [newFee, setNewFee] = useState("");

  // Add fee to the fees list
  const addFee = () => {
    if (feeDescription && feeAmount) {
      const newFee = `${feeDescription}: ₱${feeAmount}`;
      setFees([...fees, newFee]);
      setFeeDescription('');
      setFeeAmount('');
    }
  };

  // Save the fees
  const saveFees = () => {
    // Logic to save the fees (e.g., sending to an API or updating the state)
    console.log("Fees saved:", fees);
    setIsOpen(false); // Close the modal after saving
  };

  useEffect(() => {
    // Get the user role from local storage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (selectedGuest?.guestType && setClientType) {
      setClientType(selectedGuest.guestType);
      console.log(selectedGuest.guestType);
      fetchPrice(selectedGuest.guestType); // Pass the correct value to fetchPrice
    }
  }, [selectedGuest, setClientType]);

  useEffect(() => {
    if (price) {
      setRoomRates({
        "Double Bed": price.double_price || 0,
        "Triple Bed": price.triple_price || 0,
        "Matrimonial Bed": price.matrimonial_price || 0,
      });
    }
  }, [price]);

  const groupedData = useMemo(() => {
    const result = data.reduce((acc, reservation) => {
      // Use `timestamp` explicitly in the key to group by timestamp
      const key = reservation.timestamp;

      // Initialize the grouping if it's not already done
      if (!acc[key]) {
        acc[key] = {
          timestamp: reservation.timestamp,
          reservations: [],
          guestId: reservation.guest_id,
          guestName: reservation.guest_name,
          guestEmail: reservation.guest_email,
          guestType: reservation.guest_type,
          reservationType: reservation.reservation_type,
          receiptId: reservation.receipt_id,
          receiptDate: reservation.receipt_date,
          receiptTotal: reservation.receipt_total_amount,
          receiptSubTotal: reservation.receipt_initial_total,
          additionalNotes: reservation.additional_notes,
          receiptDiscounts: [],
          reservationRoomID: [],
          reservationVenueID: [],
        };
      }

      // Process receipt discounts
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

      // Group reservations by type (room, venue, or both)
      if (reservation.reservation_type === "room") {
        acc[key].reservationRoomID.push(reservation.reservation_id);
      } else if (reservation.reservation_type === "venue") {
        acc[key].reservationVenueID.push(reservation.reservation_id);
      } else if (reservation.reservation_type === "both") {
        if (reservation.room_type) {
          acc[key].reservationRoomID.push(reservation.reservation_id);
        } else {
          acc[key].reservationVenueID.push(reservation.reservation_id);
        }
      }

      // Add the current reservation to the group
      acc[key].reservations.push(reservation);

      return acc;
    }, {});

    // Convert the result object into an array and paginate
    const groupedArray = Object.values(result);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = groupedArray.slice(indexOfFirstItem, indexOfLastItem);

    return {
      allItems: groupedArray,
      currentItems: currentItems,
      totalPages: Math.ceil(groupedArray.length / itemsPerPage),
    };
  }, [data, currentPage, itemsPerPage]);

  console.log("grouped data", groupedData);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= itemsPerPage) {
      setCurrentPage(newPage);
    }
  };

  // console.log("grouped data:" , groupedData);

  // const handleGeneratePDF = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/generate-pdf", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         guest_id: selectedGuest.guestId,
  //         reservation_ids:
  //           selectedGuest.reservationType === "both"
  //             ? [
  //                 ...selectedGuest.reservationRoomID,
  //                 ...selectedGuest.reservationVenueID,
  //               ]
  //             : selectedGuest.reservationType === "room"
  //             ? selectedGuest.reservationRoomID
  //             : selectedGuest.reservationVenueID,
  //         type: selectedGuest.reservationType,
  //       }),
  //     });

  //     // Check if response is not OK
  //     if (!response.ok) {
  //       const contentType = response.headers.get("content-type");
  //       if (contentType && contentType.includes("application/json")) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.error || "Failed to generate PDF");
  //       }
  //       throw new Error("Failed to generate PDF");
  //     }

  //     // Process the response if it's a PDF
  //     const contentType = response.headers.get("content-type");
  //     if (contentType && contentType.includes("application/pdf")) {
  //       // Convert response to blob
  //       const blob = await response.blob();

  //       // Create URL for the blob
  //       const url = window.URL.createObjectURL(blob);

  //       // Create a temporary anchor element to trigger the download
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", `guestFolio_${selectedGuest.guestName}.pdf`);
  //       document.body.appendChild(link);

  //       // Trigger download
  //       link.click();

  //       // Cleanup: remove the anchor element and revoke the blob URL
  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(url);

  //       // Show success toast
  //       toast({
  //         title: "PDF Generated",
  //         description: "Your PDF has been generated and downloaded successfully.",
  //         variant: "default",
  //       });
  //     } else {
  //       throw new Error("Server did not return a PDF");
  //     }
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);

  //     // Handle errors and show failure toast
  //     toast({
  //       title: "PDF Generation Failed",
  //       description:
  //         error instanceof Error
  //           ? error.message
  //           : "There was an error generating the PDF. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleGeneratePDF = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guest_id: selectedGuest.guestId,
          reservation_ids:
            selectedGuest.reservationType === "both"
              ? [
                  ...selectedGuest.reservationRoomID,
                  ...selectedGuest.reservationVenueID,
                ]
              : selectedGuest.reservationType === "room"
              ? selectedGuest.reservationRoomID
              : selectedGuest.reservationVenueID,
          type: selectedGuest.reservationType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Generate a filename based on guest information and current date
      const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
      const fileName = `${selectedGuest.firstName}_${selectedGuest.lastName}_reservation_${currentDate}.pdf`;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();

      // Show success toast
      toast({
        title: "PDF Generated Successfully",
        description: `The PDF has been generated and downloaded as ${fileName}`,
        variant: "default",
      });
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
    } else {
      setVenueRates({});
    }
  }, [price]);

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

  const handleCellClick = (guest) => {
    setSelectedGuest(guest);
    setNotes(guest.additionalNotes || "");
    setIsDialogOpen(true);
  };

  const handleDelete = (guest) => {
    if (userRole === "Administrator") {
      setAccountToDelete(guest);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = async (type) => {
    if (!accountToDelete) return;

    try {
      const dataToDelete = {
        guest_id: accountToDelete.guestId,
        type: type,
      };

      if (type === "room") {
        dataToDelete.reservation_ids = selectedGuest.reservationRoomID;
      } else if (type === "venue") {
        dataToDelete.reservation_ids = selectedGuest.reservationVenueID;
      } else if (type === "both") {
        dataToDelete.reservation_ids = [
          ...selectedGuest.reservationRoomID,
          ...selectedGuest.reservationVenueID,
        ];
      } else {
        throw new Error("Invalid reservation type.");
      }

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
    if (selectedGuest && selectedGuest.reservations[0]?.status !== "done") {
      setSelectedGuest((prevGuest) => ({
        ...prevGuest,
        reservations: prevGuest.reservations.map((res) => ({
          ...res,
          status: value,
        })),
      }));
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    setSaveNote(false);
  };

  const handleSaveNotes = async () => {
    if (selectedGuest) {
      try {
        const response = await fetch("http://localhost:5000/api/update_notes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            guest_id: selectedGuest.guestId,
            notes: notes,
            reservation_ids:
              selectedGuest.reservationType === "both"
                ? [
                    ...selectedGuest.reservationRoomID,
                    ...selectedGuest.reservationVenueID,
                  ]
                : selectedGuest.reservationType === "room"
                ? selectedGuest.reservationRoomID
                : selectedGuest.reservationVenueID,
            type: selectedGuest.reservationType,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update notes");
        }

        const result = await response.json();
        console.log(result.message);

        setSelectedGuest((prevGuest) => ({
          ...prevGuest,
          additionalNotes: notes,
        }));

        const updatedGroupedData = { ...groupedData };
        const guestKey = Object.keys(updatedGroupedData).find(
          (key) => updatedGroupedData[key].guestId === selectedGuest.guestId
        );
        if (guestKey) {
          updatedGroupedData[guestKey].additionalNotes = notes;
        }
        setNotes(updatedGroupedData.additionalNotes);
        toast({
          title: "Notes Updated",
          description: `Additional notes for ${selectedGuest.reservationType} have been updated successfully.`,
          variant: "success",
        });

        setDeleteData((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("Error updating notes:", error);

        toast({
          title: "Update Failed",
          description: `Failed to update the additional notes for ${selectedGuest.reservationType}. Please try again.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveStatus = async (type) => {
    if (!selectedGuest) return;

    try {
      const reservation = selectedGuest.reservations[0];
      if (!reservation) {
        throw new Error("No reservation found for the selected guest.");
      }

      const statusToUpdate = reservation.status;

      let payload = {
        guest_id: selectedGuest.guestId,
        status: statusToUpdate,
        type: type,
      };

      if (type === "room") {
        payload.reservation_room_ids = selectedGuest.reservationRoomID;
      } else if (type === "venue") {
        payload.reservation_venue_ids = selectedGuest.reservationVenueID;
      } else if (type === "both") {
        payload.reservation_room_ids = selectedGuest.reservationRoomID;
        payload.reservation_venue_ids = selectedGuest.reservationVenueID;
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

      if (!response.ok) {
        throw new Error("Failed to update reservation status.");
      }

      const result = await response.json();
      console.log(result.message);

      toast({
        title: "Status Updated",
        description: "Reservation status has been updated successfully.",
        variant: "success",
      });

      setDeleteData((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error updating status:", error);

      toast({
        title: "Update Failed",
        description:
          "Failed to update the reservation status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getGuestTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "internal":
        return "bg-blue-100 text-blue-800";
      case "external":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReservationTypeBadge = (type, status) => {
    switch (type.toLowerCase()) {
      case "room":
        return (
          <Badge
            variant="secondary"
            className={`${getStatusColorBadge(status || "default")}`}
          >
            Room
          </Badge>
        );
      case "venue":
        return (
          <Badge
            variant="secondary"
            className={`${getStatusColorBadge(status || "default")}`}
          >
            Venue
          </Badge>
        );
      case "both":
        return (
          <div className="flex space-x-1">
            <Badge
              variant="secondary"
              className={`${getStatusColorBadge(status || "default")}`}
            >
              Room
            </Badge>
            <Badge
              variant="secondary"
              className={`${getStatusColorBadge(status || "default")}`}
            >
              Venue
            </Badge>
          </div>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className={`${getStatusColorBadge(status || "default")}`}
          >
            {type}
          </Badge>
        );
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-bg-[#0f172a]">
            <TableHead className="w-[25%] text-white">Guest Details</TableHead>
            <TableHead className="w-[15%] text-white">Guest Type</TableHead>
            <TableHead className="w-[15%] text-white">
              Reservation Type
            </TableHead>
            <TableHead className="w-[20%] text-white">Check-in</TableHead>
            <TableHead className="w-[15%] text-white">Total Amount</TableHead>
            <TableHead className="w-[10%] text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupedData.currentItems.map((guest, index) => (
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
                  alt={keys}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <div
                    className={`font-medium ${
                      guest.reservations[0]?.status === "done"
                        ? "line-through"
                        : ""
                    }`}
                  >
                    {guest.guestName}
                  </div>
                  <div
                    className={`text-sm text-gray-500 ${
                      guest.reservations[0]?.status === "done"
                        ? "line-through"
                        : ""
                    }`}
                  >
                    {guest.guestEmail}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getStatusColorBadge(
                    guest.reservations[0]?.status || "default"
                  )} text-${guest.reservations[0]?.status || "gray"}-600`}
                >
                  {guest.guestType}
                </Badge>
              </TableCell>
              <TableCell>
                {getReservationTypeBadge(
                  guest.reservationType,
                  guest.reservations[0]?.status || "default"
                )}
              </TableCell>
              <TableCell
                className={
                  guest.reservations[0]?.status === "done" ? "line-through" : ""
                }
              >
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(guest.reservations[0].check_in_date))}
              </TableCell>
              <TableCell
                className={
                  guest.reservations[0]?.status === "done" ? "line-through" : ""
                }
              >
                {formatCurrency(guest.receiptTotal)}
              </TableCell>
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

      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, groupedData.allItems.length)} of{" "}
          {groupedData.allItems.length} entries
        </div>
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {/* Dynamic Pagination */}
          {Array.from({ length: groupedData.totalPages }, (_, index) => {
            const page = index + 1;
            const isEllipsis =
              (page > 2 && page < currentPage - 1) ||
              (page < groupedData.totalPages - 1 && page > currentPage + 1);

            if (isEllipsis) {
              return (
                <span
                  key={`ellipsis-${page}`}
                  className="text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            if (
              page === 1 ||
              page === groupedData.totalPages ||
              Math.abs(currentPage - page) <= 1
            ) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            }

            return null;
          })}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === groupedData.totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedGuest && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className="bg-transparent p-0 max-w-4xl border-none flex flex-row gap-3 shadow-none"
            showCloseButton={false}
          >
            <div className="w-3/6 flex flex-col gap-3">
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
                    {selectedGuest.reservationType === "both" ? (
                      <>
                        <h4 className="font-semibold my-2">
                          Room Reservations (
                          {selectedGuest.reservationRoomID.length}):
                        </h4>
                        <ScrollArea className="max-h-[200px] overflow-y-auto w-[95%] p-2">
                          {selectedGuest.reservations
                            .filter(
                              (reservation) =>
                                reservation.reservation &&
                                reservation.reservation.includes("Room")
                            )
                            .map((reservation, index) => (
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
                        <h4 className="font-semibold my-2">
                          Venue Reservations (
                          {selectedGuest.reservationVenueID.length}):
                        </h4>
                        <ScrollArea className="max-h-[15  0px] overflow-y-auto w-[95%] p-2">
                          {selectedGuest.reservations
                            .filter(
                              (reservation) =>
                                reservation.reservation &&
                                !reservation.reservation.includes("Room")
                            )
                            .map((reservation, index) => (
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
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold my-2">
                          {selectedGuest.reservationType} Reservations (
                          {selectedGuest.reservations.length}):
                        </h4>
                        <ScrollArea className="max-h-[150px] overflow-y-auto w-[95%] p-2">
                          {selectedGuest.reservations.map(
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
                      </>
                    )}
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
                <div className="flex flex-col gap-3">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex-1 flex-row flex gap-3">
                    <Select
                      value={selectedGuest.reservations[0]?.status || "default"}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger
                        id="status"
                        className={getStatusColorBadge(
                          selectedGuest.reservations[0]?.status || "default"
                        )}
                        disabled={
                          selectedGuest.reservations[0]?.status === "done"
                            ? true
                            : userRole !== "Administrator"
                        }
                      >
                        <SelectValue
                          placeholder={
                            selectedGuest.reservations[0]?.status ||
                            "Please select"
                          }
                        />
                      </SelectTrigger>
                      {selectedGuest.reservations[0]?.status === "done" ? (
                        <SelectContent>
                          {/* Exclude "done" from selectable options */}
                          {["done"].map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      ) : (
                        <SelectContent>
                          {/* Exclude "done" from selectable options */}
                          {[
                            "ready",
                            "waiting",
                            "onUse",
                            "cancelled",
                            "onCleaning",
                          ].map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      )}
                    </Select>
                    {userRole === "Administrator" && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleSaveStatus(selectedGuest.reservationType)
                        }
                        disabled={
                          selectedGuest.reservations[0]?.status === "done"
                            ? true
                            : false
                        }
                      >
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className="w-2/6 flex flex-col gap-3">
              <Card className="w-full bg-yellow-50 border-yellow-200 shadow-md relative">
                <div className="absolute -top-3 -right-3 text-red-500 transform rotate-12">
                  <PushPin className="w-6 h-6" />
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="notes" className="text-lg font-semibold">
                      Additional Notes
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSaveNotes}
                      className="bg-white"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="notes"
                    placeholder="Type your notes here..."
                    className="w-full h-28 bg-yellow-50 border-yellow-200 focus:border-yellow-300 focus:ring-yellow-200"
                    value={notes}
                    onChange={handleNotesChange}
                  />
                </CardContent>
              </Card>

              <ScrollArea className="h-[calc(2/4vh-8rem)] w-full">
                <Card className="bg-white text-gray-800 rounded-xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-xl font-bold">Partial Receipt</h3>
                        <p className="text-sm text-gray-500">
                          {selectedGuest.guestType}
                        </p>
                        <p className="text-sm text-gray-500">
                          Date:{" "}
                          {new Date(
                            selectedGuest.receiptDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <Separator />
                      <ScrollArea className="h-[calc(3/4vh-8rem)] w-full">
                        {(selectedGuest.reservationType === "room" ||
                          selectedGuest.reservationType === "both") && (
                          <div className="space-y-2 text-sm">
                            <h4 className="font-semibold">Room Charges:</h4>
                            {Object.entries(
                              selectedGuest.reservations.reduce(
                                (acc, reservation) => {
                                  if (reservation.room_type) {
                                    const roomType = reservation.room_type;
                                    const numberOfNights =
                                      calculateNumberOfNights(
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
                                  }
                                  return acc;
                                },
                                {}
                              )
                            ).map(([roomType, data]) => (
                              <div
                                key={roomType}
                                className="flex justify-between"
                              >
                                <span>
                                  {roomType} ({data.count}) x {data.nights}{" "}
                                  nights
                                </span>
                                <span>
                                  {formatCurrency(
                                    data.count *
                                      data.nights *
                                      roomRates[roomType]
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {(selectedGuest.reservationType === "venue" ||
                          selectedGuest.reservationType === "both") && (
                          <div className="space-y-2 text-sm">
                            <h4 className="font-semibold">Venue Charges:</h4>
                            {Object.entries(
                              selectedGuest.reservations.reduce(
                                (acc, venue) => {
                                  if (!venue.reservation.includes("Room")) {
                                    const venueType = venue.reservation;
                                    const venueRate =
                                      venueRates[venueType] || 0;

                                    if (!acc[venueType]) {
                                      acc[venueType] = {
                                        count: 0,
                                        total: 0,
                                      };
                                    }
                                    acc[venueType].count += 1;
                                    acc[venueType].total += venueRate;
                                  }
                                  return acc;
                                },
                                {}
                              )
                            ).map(([venueType, data]) => (
                              <div
                                key={venueType}
                                className="flex justify-between"
                              >
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
                          <span>
                            {formatCurrency(selectedGuest.receiptSubTotal)}
                          </span>
                        </div>
                        {selectedGuest.receiptDiscounts.map(
                          (discount, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-green-600"
                            >
                              <span>{discount.discount_name}:</span>
                              <span>
                                -
                                {formatCurrency(
                                  (selectedGuest.receiptSubTotal *
                                    discount.discount_percentage) /
                                    100
                                )}
                              </span>
                            </div>
                          )
                        )}
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>
                            {formatCurrency(selectedGuest.receiptTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
            {/* buttons */}
            <div className="relative bottom-0">
              <div className="flex flex-col h-full items-center gap-3">
                {/* Close Button */}
                <div className="relative group">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClose}
                    className="bg-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute left-full ml-2 bottom-0.5 transform opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-xs p-2 rounded-md whitespace-nowrap">
                    Close
                  </div>
                </div>

                {/* Generate PDF Button */}
                <div className="relative group">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGeneratePDF}
                    className="bg-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <div className="absolute left-full ml-2 bottom-0.5 transform opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-xs p-2 rounded-md whitespace-nowrap">
                    Generate PDF
                  </div>
                </div>

                <div className="relative group ">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openModal}
                    className="bg-white flex items-center justify-center"
                  >
                    <PhilippinePeso className="h-4 w-4" />
                  </Button>

                  <div className="absolute left-full ml-3 bottom-1/2 transform translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
                    Additional Fees
                  </div>

                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogContent className="2xl:left-[75%] xl:left-[81.5%] 2xl:top-[55%] xl:top-[56%] w-[300px] h-auto z-50">
                  <DialogHeader>
                        <DialogTitle>Additional Fees</DialogTitle>
                        <DialogDescription>Fee Breakdown:</DialogDescription>
                      </DialogHeader>

                      <ScrollArea className="h-[100px] overflow-hidden">
    <ScrollArea className="h-full">
      <ul className="list-disc list-inside">
        {fees.map((fee, index) => (
          
          <li key={index}> {fee} </li>
        ))}
      </ul>
    </ScrollArea>
    <ScrollArea orientation="vertical" className="w-2 bg-gray-300 rounded-full" />
    <ScrollArea />
  </ScrollArea>

                      {/* Input Fields to Add Fee Name and Amount */}
                      <div className=" flex flex-col gap-2">
                        {/* Fee Description */}
                        <input
                          type="text"
                          value={feeDescription}
                          onChange={(e) => setFeeDescription(e.target.value)}
                          placeholder="Enter fee description"
                          className="border px-2 py-1 rounded-md flex-grow bg-white text-black"
                        />

                        {/* Fee Amount */}
                        <input
                          type="number"
                          value={feeAmount}
                          onChange={(e) => setFeeAmount(e.target.value)}
                          placeholder="Enter fee amount"
                          className="border px-2 py-1 rounded-md flex-grow bg-white text-black"
                        />

                        {/* Button to Add Fee */}
                        <Button
                          onClick={addFee}
                          className="bg-blue-500 text-white mt-2"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Fee
                        </Button>

                        {/* Save Button */}
                        <Button
                          onClick={saveFees} // Define the save function for your logic
                          className="bg-green-500 text-white mt-2"
                        >
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {userRole === "Administrator" && (
                  <div className="absolute group bottom-0">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(selectedGuest)}
                      className="flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="absolute left-full ml-2 bottom-1/2 transform translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                      Delete Guest
                    </div>
                  </div>
                )}
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
          <p>
            Are you sure you want to delete the reservation for{" "}
            {accountToDelete?.guestName}?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete(selectedGuest.reservationType)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
}
