"use client"

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import Slogo from '@/assets/images/SchoolLogo.png'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ReservationsTableWithModal({ data = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState(null)
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleEditClick = (reservation) => {
    setEditingReservation(reservation)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingReservation(null)
  }

  const handleSaveChanges = () => {
    // Implement save logic here
    console.log("Saving changes for reservation:", editingReservation)
    handleCloseModal()
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[25%]">Guest Information</TableHead>
              <TableHead className="w-[20%]">Room Name</TableHead>
              <TableHead className="w-[20%]">Room Type</TableHead>
              <TableHead className="w-[20%]">Status</TableHead>
              <TableHead className="w-[15%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center space-x-3 py-4">
                  <img src={Slogo} alt="" className='h-8 w-8'/>
                  <div>
                    <div className="font-medium">{item.customer}</div>
                    <div className="text-sm text-gray-500">{item.email}</div>
                  </div>
                </TableCell>
                <TableCell className="py-4">{item.roomName}</TableCell>
                <TableCell className="py-4">{item.roomType}</TableCell>
                <TableCell className="py-4">
                  <Badge variant="secondary" className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center py-4">
                  <div className="flex justify-center space-x-2">
                    <Button variant="link" onClick={() => handleEditClick(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reservation</DialogTitle>
          </DialogHeader>
          {editingReservation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingReservation.customer}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={editingReservation.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Room
                </Label>
                <Input
                  id="room"
                  value={editingReservation.roomName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roomType" className="text-right">
                  Room Type
                </Label>
                <Select defaultValue={editingReservation.roomType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={editingReservation.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex justify-center items-center space-x-4 my-4 text-[#0f172a]">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "primary" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
            className={`transition-all duration-300 ${
              currentPage === i + 1
                ? 'shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] text-[#0f172a] bg-[#fcb813]'
                : ' bg-[#0f172a] text-primary-foreground'
            }`}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      </Card>
  )
}