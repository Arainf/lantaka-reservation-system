import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, User, DollarSign, X } from 'lucide-react';

const ReservationsTable = ({ data = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const { toast } = useToast();

  const filteredData = useMemo(() => {
    return data.filter((reservation) =>
      reservation.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.guest_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const groupedData = useMemo(() => {
    return filteredData.reduce((acc, reservation) => {
      const key = `${reservation.guest_name}-${reservation.guest_email}-${reservation.reservation_type}-${reservation.reservation_checkin}-${reservation.reservation_checkout}-${reservation.receipt_total_amount}`;

      if (!acc[key]) {
        acc[key] = {
          ...reservation,
          receiptDiscounts: [],
          reservations: [],
          reservationRoomID: [],
          reservationVenueID: [],
        };
      }

      reservation.receipt_discounts.forEach((discount) => {
        if (discount && !acc[key].receiptDiscounts.some((d) => d.discount_id === discount.discount_id)) {
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
  }, [filteredData]);

  const sortedData = useMemo(() => {
    return Object.values(groupedData).sort((a, b) => new Date(b.receipt_date).getTime() - new Date(a.receipt_date).getTime());
  }, [groupedData]);

  const ReservationCard = ({ reservation }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <User className="text-gray-400" size={24} />
            <div>
              <h3 className="font-bold text-lg">{reservation.guest_name}</h3>
              <p className="text-sm text-gray-500">{reservation.guest_email}</p>
            </div>
          </div>
          <Badge variant={reservation.reservation_type === "room" ? "default" : "secondary"}>
            {reservation.reservation_type.charAt(0).toUpperCase() + reservation.reservation_type.slice(1)}
          </Badge>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-2" size={16} />
            {new Date(reservation.receipt_date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2" size={16} />
            {reservation.receipt_total_amount.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ReservationModal = ({ reservation, onClose }) => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reservation Details</DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {reservation.guest_name}</p>
              <p><strong>Email:</strong> {reservation.guest_email}</p>
              <p><strong>Type:</strong> {reservation.guest_type}</p>
              <p><strong>Check-in:</strong> {reservation.reservation_checkin}</p>
              <p><strong>Check-out:</strong> {reservation.reservation_checkout}</p>
              <p><strong>Total Amount:</strong> ${reservation.receipt_total_amount.toFixed(2)}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {reservation.reservations.map((res, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                    <p className="font-medium">
                      {res.reservation || `Reservation ${index + 1}`}
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="discounts">
          <Card>
            <CardHeader>
              <CardTitle>Discounts Applied</CardTitle>
            </CardHeader>
            <CardContent>
              {reservation.receiptDiscounts.length > 0 ? (
                <ul>
                  {reservation.receiptDiscounts.map((discount, index) => (
                    <li key={index}>Discount ID: {discount.discount_id}</li>
                  ))}
                </ul>
              ) : (
                <p>No discounts applied to this reservation.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-4 flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedData.map((reservation, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div onClick={() => setSelectedReservation(reservation)}>
                <ReservationCard reservation={reservation} />
              </div>
            </DialogTrigger>
            <ReservationModal 
              reservation={reservation}
              onClose={() => setSelectedReservation(null)}
            />
          </Dialog>
        ))}
      </div>

      <Toaster />
    </div>
  );
};

export default ReservationsTable;

