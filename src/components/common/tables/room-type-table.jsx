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
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const initialRoomTypes = [
  { id: 1, name: "Standard", capacity: 2, price: 100, description: "A cozy room with a queen-size bed" },
  { id: 2, name: "Deluxe", capacity: 3, price: 150, description: "A spacious room with a king-size bed and city view" },
  { id: 3, name: "Suite", capacity: 4, price: 250, description: "A luxurious suite with separate living area and ocean view" },
  { id: 4, name: "Family Room", capacity: 5, price: 200, description: "A large room with two queen-size beds and a sofa bed" },
  { id: 5, name: "Penthouse", capacity: 6, price: 500, description: "An exclusive top-floor suite with panoramic views and private terrace" },
]

export default function RoomTypeTable({ searchTerm }) {
  const [roomTypes, setRoomTypes] = useState(initialRoomTypes)
  const [selectedRoomType, setSelectedRoomType] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newRoomType, setNewRoomType] = useState({ name: "", capacity: "", price: "", description: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredRoomTypes = roomTypes.filter(roomType =>
    roomType.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRoomTypes.length / itemsPerPage)
  const currentData = filteredRoomTypes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleRowClick = (roomType) => {
    setSelectedRoomType(roomType)
    setIsDialogOpen(true)
  }

  const handleAddRoomType = () => {
    const id = roomTypes.length > 0 ? Math.max(...roomTypes.map(r => r.id)) + 1 : 1
    setRoomTypes([...roomTypes, { 
      id, 
      ...newRoomType, 
      capacity: parseInt(newRoomType.capacity),
      price: parseFloat(newRoomType.price)
    }])
    setIsAddDialogOpen(false)
    setNewRoomType({ name: "", capacity: "", price: "", description: "" })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="flex flex-row gap-3 my-5">
        <h1 className="text-2xl poppins-semibold">Room Types</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className=" h-4 w-4 text-black" /> 
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-bg-[#0f172a]">
            <TableHead className="w-[180px] text-white">Name</TableHead>
            <TableHead className="w-[180px] text-white">Capacity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((roomType) => (
            <TableRow
              key={roomType.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(roomType)}
            >
              <TableCell className="font-medium">{roomType.name}</TableCell>
              <TableCell>{roomType.capacity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredRoomTypes.length)} of{" "}
          {filteredRoomTypes.length} entries
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
            <DialogTitle>{selectedRoomType?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Capacity:</span>
              <span className="col-span-3">{selectedRoomType?.capacity}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Price:</span>
              <span className="col-span-3">${selectedRoomType?.price}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Description:</span>
              <span className="col-span-3">{selectedRoomType?.description}</span>
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
            <DialogTitle>Add New Room Type</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newRoomType.name}
                onChange={(e) => setNewRoomType({ ...newRoomType, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                value={newRoomType.capacity}
                onChange={(e) => setNewRoomType({ ...newRoomType, capacity: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={newRoomType.price}
                onChange={(e) => setNewRoomType({ ...newRoomType, price: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newRoomType.description}
                onChange={(e) => setNewRoomType({ ...newRoomType, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddRoomType}>Add Room Type</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

