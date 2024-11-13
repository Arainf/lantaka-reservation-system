'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Info, Edit, Trash2 } from 'lucide-react'
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
  DialogTrigger,
} from "@/components/ui/dialog"

export default function GuestTable({ data = [], onDelete, onEdit, currentPage, setCurrentPage }) {
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

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead className="w-[25%]">Guest Name</TableHead>
                <TableHead className="w-[20%]">Email</TableHead>
                <TableHead className="w-[15%]">Phone</TableHead>
                <TableHead className="w-[10%]">Type</TableHead>
                <TableHead className="w-[15%]">Client</TableHead>
                <TableHead className="w-[15%] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((guest) => (
                <TableRow key={guest.guest_id}>
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
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">View guest details</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Guest Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 items-center gap-4">
                              <span className="font-semibold">Designation:</span>
                              <span>{guest.guest_designation}</span>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                              <span className="font-semibold">Address:</span>
                              <span>{guest.guest_address || 'N/A'}</span>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                              <span className="font-semibold">Gender:</span>
                              <span>{guest.guest_gender}</span>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                              <span className="font-semibold">Messenger Account:</span>
                              <span>{guest.guest_messenger_account || 'N/A'}</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => onEdit(guest.guest_id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit guest</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(guest.guest_id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete guest</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-wrap justify-center items-center gap-2 my-4 text-[#0f172a]">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className={`transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] text-[#0f172a] bg-[#fcb813]'
                    : 'bg-[#0f172a] text-primary-foreground'
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
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}