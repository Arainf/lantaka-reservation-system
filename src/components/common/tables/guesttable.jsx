'use client'

import React, { useState } from 'react';
import { useGuestContext } from '@/context/GuestContext';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Trash2 } from 'lucide-react';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Slogo from '@/assets/images/SchoolLogo.png';

export default function GuestTable({ currentPage, setCurrentPage }) {
  const { guests, selectGuest, deleteGuest } = useGuestContext();
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(guests.length / itemsPerPage);
  const currentData = guests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getGuestTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'internal':
        return 'bg-blue-100 text-blue-800';
      case 'external':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRowClick = (guest) => {
    setSelectedGuest(guest);
    selectGuest(guest.guest_id);
    setIsDetailsDialogOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedGuest) {
      deleteGuest(selectedGuest.guest_id);
      setIsDetailsDialogOpen(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
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
      
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="bg-white p-0 max-w-4xl border-none flex flex-col items-center gap-3 shadow-none">
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
            <Button variant="destructive" onClick={handleDeleteClick}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Guest
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this guest? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

