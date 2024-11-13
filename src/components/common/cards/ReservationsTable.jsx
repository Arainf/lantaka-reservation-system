"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ChevronLeft, ChevronRight, Info, ChevronDown, ChevronUp } from 'lucide-react'
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
  DialogTrigger,
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

export default function ReservationsTableWithModal({ data = [], onDelete, currentPage, setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState(null)
  const [expandedGroups, setExpandedGroups] = useState({})
  const itemsPerPage = 8

  const groupedReservations = useMemo(() => {
    const groups = data.reduce((acc, reservation) => {
      const key = `${reservation.guest_name}-${reservation.account_name}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(reservation)
      return acc
    }, {})
    return Object.entries(groups)
  }, [data])

  const totalPages = Math.ceil(groupedReservations.length / itemsPerPage)
  const currentData = groupedReservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'waiting':
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
    console.log("Saving changes for reservation:", editingReservation)
    handleCloseModal()
  }

  const toggleGroupExpansion = (groupKey) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }))
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Guest Information</TableHead>
              <TableHead className="w-[15%]">Reservation</TableHead>
              <TableHead className="w-[15%]">Check-in</TableHead>
              <TableHead className="w-[15%]">Check-out</TableHead>
              <TableHead className="w-[10%]">Status</TableHead>
              <TableHead className="w-[15%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map(([groupKey, reservations]) => (
              <React.Fragment key={groupKey}>
                <TableRow className="bg-gray-50">
                  <TableCell colSpan={6} className="py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={Slogo} alt="" className='h-8 w-8'/>
                        <div>
                          <div className="font-medium">{reservations[0].guest_name}</div>
                          <div className="text-sm text-gray-500">{reservations[0].account_name}</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleGroupExpansion(groupKey)}
                      >
                        {expandedGroups[groupKey] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedGroups[groupKey] && reservations.map((item) => (
                  <TableRow key={item.reservation_id}>
                    <TableCell></TableCell>
                    <TableCell>{item.reservation}</TableCell>
                    <TableCell>{new Date(item.check_in_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(item.check_out_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost">
                              <Info className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reservation Details</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-semibold">Guest Type:</span>
                                <span>{item.guest_type}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-semibold">Initial Total:</span>
                                <span>${item.receipt_initial_total.toFixed(2)}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-semibold">Total Amount:</span>
                                <span>${item.receipt_total_amount.toFixed(2)}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-semibold">Additional Notes:</span>
                                <span>{item.additional_notes}</span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" onClick={() => handleEditClick(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" onClick={() => onDelete(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>          
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
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
                  Guest Name:
                </Label>
                <Input
                  id="name"
                  value={editingReservation.guest_name}
                  onChange={(e) => setEditingReservation({...editingReservation, guest_name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="account" className="text-right">
                  Account Name:
                </Label>
                <Input
                  id="account"
                  value={editingReservation.account_name}
                  onChange={(e) => setEditingReservation({...editingReservation, account_name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reservation" className="text-right">
                  Reservation:
                </Label>
                <Input
                  id="reservation"
                  value={editingReservation.reservation}
                  onChange={(e) => setEditingReservation({...editingReservation, reservation: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="check-in" className="text-right">
                  Check-in:
                </Label>
                <Input
                  id="check-in"
                  type="datetime-local"
                  value={editingReservation.check_in_date}
                  onChange={(e) => setEditingReservation({...editingReservation, check_in_date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="check-out" className="text-right">
                  Check-out:
                </Label>
                <Input
                  id="check-out"
                  type="datetime-local"
                  value={editingReservation.check_out_date}
                  onChange={(e) => setEditingReservation({...editingReservation, check_out_date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status:
                </Label>
                <Select 
                  value={editingReservation.status}
                  onValueChange={(value) => setEditingReservation({...editingReservation, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="waiting">Waiting</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
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