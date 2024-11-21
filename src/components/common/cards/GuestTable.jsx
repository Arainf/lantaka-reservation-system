'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Copy } from 'lucide-react'
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function GuestTable({ data = [], onDelete, onEdit, currentPage, setCurrentPage }) {
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [guestType, setGuestType] = useState("")
  const itemsPerPage = 8
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleRowClick = (guest) => {
    setSelectedGuest(guest)
    setAdditionalNotes(guest.additional_notes || "")
    setGuestType(guest.guest_type)
    setIsDetailsDialogOpen(true)
  }

  const handleSaveChanges = () => {
    // Implement save logic here
    console.log("Saving changes for guest:", selectedGuest)
    console.log("Additional Notes:", additionalNotes)
    console.log("New Type:", guestType)
    onEdit({...selectedGuest, additional_notes: additionalNotes, guest_type: guestType})
    setIsDetailsDialogOpen(false)
  }

  const handleDelete = () => {
    onDelete(selectedGuest.guest_id)
    setIsDetailsDialogOpen(false)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Table>
          <TableHeader >
            <TableRow className="hover:bg-bg-[#0f172a]">
              <TableHead className="w-[25%] text-white">Guest Name</TableHead>
              <TableHead className="w-[20%] text-white">Email</TableHead>
              <TableHead className="w-[15%] text-white">Phone</TableHead>
              <TableHead className="w-[10%] text-white">Type</TableHead>
              <TableHead className="w-[30%] text-white">Client</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((guest) => (
              <TableRow
                key={guest.guest_id}
                onClick={() => handleRowClick(guest)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell className="font-medium">
                  {guest.guest_fName} {guest.guest_lName}
                </TableCell>
                <TableCell>{guest.guest_email}</TableCell>
                <TableCell>{guest.guest_phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getGuestTypeColor(guest.guest_type)}>
                    {guest.guest_type}
                  </Badge>
                </TableCell>
                <TableCell>{guest.guest_client}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex justify-center items-center space-x-4 my-4 text-primary">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <ScrollArea className="w-auto">
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className={`transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] bg-primary text-primary-foreground'
                    : ''
                }`}
                aria-label={`Go to page ${i + 1}`}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader className="flex flex-row justify-between items-center">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {selectedGuest && `${selectedGuest.guest_fName} ${selectedGuest.guest_lName}`}
              </DialogTitle>
              <p className="text-sm text-gray-500">
                {selectedGuest && selectedGuest.guest_email}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setIsDetailsDialogOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          {selectedGuest && (
            <div className="grid gap-6 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p>{selectedGuest.guest_phone}</p>
                </div>
                <div>
                  <Label className="font-semibold">Client</Label>
                  <p>{selectedGuest.guest_client}</p>
                </div>
                <div>
                  <Label className="font-semibold">Designation</Label>
                  <p>{selectedGuest.guest_designation}</p>
                </div>
                <div>
                  <Label className="font-semibold">Gender</Label>
                  <p>{selectedGuest.guest_gender}</p>
                </div>
                <div>
                  <Label className="font-semibold">Address</Label>
                  <p>{selectedGuest.guest_address || 'N/A'}</p>
                </div>
                <div>
                  <Label className="font-semibold">Messenger Account</Label>
                  <p>{selectedGuest.guest_messenger_account || 'N/A'}</p>
                </div>
              </div>
              <div>
                <Label className="font-semibold">Additional Notes</Label>
                <Textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Add any additional notes here..."
                  className="mt-2"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="type" className="font-semibold">Type</Label>
                  <Select value={guestType} onValueChange={setGuestType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="External">External</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Guest</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}