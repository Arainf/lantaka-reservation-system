import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const initialAdditionalFees = [
  { id: 1, name: "City Tax", amount: 5, type: "Per Night" },
  { id: 2, name: "Resort Fee", amount: 20, type: "Per Stay" },
  { id: 3, name: "Parking", amount: 15, type: "Per Night" },
  { id: 4, name: "Late Check-out", amount: 50, type: "One-time" },
  { id: 5, name: "Pet Fee", amount: 25, type: "Per Stay" },
]

export default function AdditionalFeeTable({ searchTerm }) {
  const [additionalFees, setAdditionalFees] = useState(initialAdditionalFees)
  const [selectedFee, setSelectedFee] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newFee, setNewFee] = useState({ name: "", amount: "", type: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredFees = additionalFees.filter(fee =>
    fee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredFees.length / itemsPerPage)
  const currentData = filteredFees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleRowClick = (fee) => {
    setSelectedFee(fee)
    setIsDialogOpen(true)
  }

  const handleAddFee = () => {
    const id = additionalFees.length > 0 ? Math.max(...additionalFees.map(f => f.id)) + 1 : 1
    setAdditionalFees([...additionalFees, { id, ...newFee, amount: parseFloat(newFee.amount) }])
    setIsAddDialogOpen(false)
    setNewFee({ name: "", amount: "", type: "" })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="flex flex-row gap-3 my-5">
        <h1 className="text-2xl poppins-semibold">Additional Fees</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className=" h-4 w-4 text-black" /> 
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-bg-[#0f172a]">
            <TableHead className="w-[180px] text-white">Name</TableHead>
            <TableHead className="w-[180px] text-white">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((fee) => (
            <TableRow
              key={fee.id}
              className="cursor-pointer "
              onClick={() => handleRowClick(fee)}
            >
              <TableCell className="font-medium">{fee.name}</TableCell>
              <TableCell>${fee.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredFees.length)} of{" "}
          {filteredFees.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

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

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedFee?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Amount:</span>
              <span className="col-span-3">${selectedFee?.amount}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Type:</span>
              <span className="col-span-3">{selectedFee?.type}</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Fee</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newFee.name}
                onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                value={newFee.amount}
                onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                value={newFee.type}
                onChange={(e) => setNewFee({ ...newFee, type: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddFee}>Add Fee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

