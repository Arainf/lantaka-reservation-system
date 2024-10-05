import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dummyData = [
  {
    reservationID: "R101",
    customer: "John Doe",
    email: "johndoe@example.com",
    reservationType: "room",
    roomID: "101",
    checkInDate: "2024-10-01",
    checkOutDate: "2024-10-05",
    reservationStatus: "confirmed",
    paymentStatus: "paid",
    numberOfGuests: 2,
    specialRequests: "Late check-in",
  },
  {
    reservationID: "V201",
    customer: "Jane Smith",
    email: "janesmith@example.com",
    reservationType: "venue",
    roomID: "201",
    checkInDate: "2024-10-10",
    checkOutDate: "2024-10-12",
    reservationStatus: "pending",
    paymentStatus: "pending",
    numberOfGuests: 50,
    specialRequests: "Vegetarian meal",
  },
  {
    reservationID: "R102",
    customer: "Alice Johnson",
    email: "alicejohnson@example.com",
    reservationType: "room",
    roomID: "102",
    checkInDate: "2024-10-15",
    checkOutDate: "2024-10-18",
    reservationStatus: "confirmed",
    paymentStatus: "paid",
    numberOfGuests: 1,
    specialRequests: "",
  },
  {
    reservationID: "R103",
    customer: "Bob Wilson",
    email: "bobwilson@example.com",
    reservationType: "room",
    roomID: "103",
    checkInDate: "2024-10-20",
    checkOutDate: "2024-10-25",
    reservationStatus: "confirmed",
    paymentStatus: "paid",
    numberOfGuests: 3,
    specialRequests: "Extra towels",
  },
  {
    reservationID: "V202",
    customer: "Carol Taylor",
    email: "caroltaylor@example.com",
    reservationType: "venue",
    roomID: "202",
    checkInDate: "2024-11-01",
    checkOutDate: "2024-11-03",
    reservationStatus: "pending",
    paymentStatus: "pending",
    numberOfGuests: 75,
    specialRequests: "AV equipment",
  },
  {
    reservationID: "R104",
    customer: "David Brown",
    email: "davidbrown@example.com",
    reservationType: "room",
    roomID: "104",
    checkInDate: "2024-11-05",
    checkOutDate: "2024-11-10",
    reservationStatus: "confirmed",
    paymentStatus: "paid",
    numberOfGuests: 2,
    specialRequests: "Ocean view",
  },
];

const CustomerTable = () => {
  return (
    <Card className="w-full">
      <CardHeader className="mb-0 pb-0">
        <CardTitle>Customer Reservations</CardTitle>
        <Table className="min-w-full">
            <TableHeader className="sticky top-0 bg-white ">
              <TableRow>
                <TableHead className="bg-gray-100 text-center w-[7%] " >Reservation ID</TableHead>
                <TableHead className="bg-gray-100 text-center w-[9%] " >Customer</TableHead>
                <TableHead className="bg-gray-100 text-center w-[20%]" >Email</TableHead>
                <TableHead className="bg-gray-100 text-center w-[5%] " >Type</TableHead>
                <TableHead className="bg-gray-100 text-center w-[7%] " >Room ID</TableHead>
                <TableHead className="bg-gray-100 text-center w-[8%] " >Check-in Date</TableHead>
                <TableHead className="bg-gray-100 text-center w-[12%] " >Check-out Date</TableHead>
                <TableHead className="bg-gray-100 text-center w-[6.5%]" >Status</TableHead>
                <TableHead className="bg-gray-100 text-center w-[9%]" >Payment Status</TableHead>
                <TableHead className="bg-gray-100 text-center w-[6%]" >Guests</TableHead>
                <TableHead className="bg-gray-100 text-center w-[auto]" >Special Requests</TableHead>
              </TableRow>
            </TableHeader>
        </Table>
      </CardHeader>
      <CardContent className="">
        <div className="relative overflow-x-auto" style={{ maxHeight: '200px' }}>
         <Table>
            <TableBody className="overflow-y-scroll" style={{ maxHeight: '200px',  }}>
              {dummyData.map((data, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-center">{data.reservationID}</TableCell>
                  <TableCell className="text-center">{data.customer}</TableCell>
                  <TableCell className="text-center">{data.email}</TableCell>
                  <TableCell className="text-center">{data.reservationType}</TableCell>
                  <TableCell className="text-center">{data.roomID}</TableCell>
                  <TableCell className="text-center">{data.checkInDate}</TableCell>
                  <TableCell className="text-center">{data.checkOutDate}</TableCell>
                  <TableCell className="text-center">{data.reservationStatus}</TableCell>
                  <TableCell className="text-center">{data.paymentStatus}</TableCell>
                  <TableCell className="text-center">{data.numberOfGuests}</TableCell>
                  <TableCell className="text-center">{data.specialRequests || "None"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerTable;
