'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Copy, Trash2 } from 'lucide-react'
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Slogo from '@/assets/images/SchoolLogo.png'



export default function GuestTable({ data = [], onDelete, onEdit, currentPage, setCurrentPage }) {
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [guestType, setGuestType] = useState("")
  const itemsPerPage = 5
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


  const handleDelete = () => {
    onDelete(selectedGuest.guest_id)
    setIsDetailsDialogOpen(false)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
      <>
        <Table>
          <TableHeader >
            <TableRow className="hover:bg-bg-[#0f172a]">
              <TableHead className="w-[25%] text-white">Guest Name</TableHead>
              <TableHead className="w-[20%] text-white">Email</TableHead>
              <TableHead className="w-[20%] text-white">Phone</TableHead>
              <TableHead className="w-[15%] text-white">Type</TableHead>
              <TableHead className="w-[30%] text-white">Client</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((guest) => (
              <TableRow
                key={guest.guest_id}
                onClick={() => handleRowClick(guest)}
                className="cursor-pointer hover:bg-blue-100"
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
      
        <div className="flex items-center justify-between">
  <div className="text-sm text-muted-foreground">
    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
    {Math.min(currentPage * itemsPerPage, currentData.length)} of{" "}
    {currentData.length} entries
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
    {Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      const isEllipsis = 
        (page > 2 && page < currentPage - 1) || 
        (page < totalPages - 1 && page > currentPage + 1);

      if (isEllipsis) {
        return (
          <span key={`ellipsis-${page}`} className="text-muted-foreground">
            ...
          </span>
        );
      }

      if (
        page === 1 || 
        page === totalPages || 
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
      disabled={currentPage === totalPages}
    >
      Next
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
</div>

          
<Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent 
        className="bg-transparent p-0 max-w-4xl border-none flex flex-col items-center gap-3"
        showCloseButton={false}
        >
          <div className='flex flex-col items-center gap-3 w-full max-w-lg'>
            <div className='flex flex-row gap-3 items-center w-full'>
              <img src={Slogo} alt="" width={60} height={60} className="rounded-full" />
              <Card className="w-full">
                <CardContent className="py-3">
                  <h3 className="font-semibold">
                    {selectedGuest && `${selectedGuest.guest_fName} ${selectedGuest.guest_lName}`}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedGuest && selectedGuest.guest_email}
                  </p>
                </CardContent>
              </Card>
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Card className="w-full">
              <CardContent className="py-6">
                {selectedGuest && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold">Type</Label>
                      <p>{selectedGuest.guest_type}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Client</Label>
                      <p>{selectedGuest.guest_client}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Phone</Label>
                      <p>{selectedGuest.guest_phone}</p>
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
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className='flex justify-end gap-3 w-full max-w-lg'>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Guest
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}