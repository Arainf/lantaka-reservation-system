'use client'

import React, { useState, useEffect, useRef } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import CustomerTable from "@/components/common/cards/ReservationsTable"
import { ChevronLeft, ChevronRight, Settings, Filter, Search, X } from "lucide-react"

const reservations = [
  {
    id: 1,
    email: "johndoe@gmail.com",
    customer: "John Doe",
    roomName: "Room 101",
    roomType: "Standard",
    status: "Confirmed",
  },
  {
    id: 2,
    email: "alicej@gmail.com",
    customer: "Alice Johnson",
    roomName: "Room 102",
    roomType: "Deluxe",
    status: "Pending",
  },
  {
    id: 3,
    email: "michaelb@gmail.com",
    customer: "Michael Brown",
    roomName: "Room 103",
    roomType: "Suite",
    status: "Cancelled",
  },
  {
    id: 4,
    email: "jesslee@gmail.com",
    customer: "Jessica Lee",
    roomName: "Room 104",
    roomType: "Standard",
    status: "Confirmed",
  },
  {
    id: 5,
    email: "emilyd@gmail.com",
    customer: "Emily Davis",
    roomName: "Room 105",
    roomType: "Suite",
    status: "Pending",
  },
  {
    id: 6,
    email: "chriswhite@gmail.com",
    customer: "Chris White",
    roomName: "Room 106",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 7,
    email: "sarahkim@gmail.com",
    customer: "Sarah Kim",
    roomName: "Room 107",
    roomType: "Standard",
    status: "Cancelled",
  },
  {
    id: 8,
    email: "dclark@gmail.com",
    customer: "David Clark",
    roomName: "Room 108",
    roomType: "Suite",
    status: "Pending",
  },
  {
    id: 9,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 10,
    email: "danharris@gmail.com",
    customer: "Daniel Harris",
    roomName: "Room 110",
    roomType: "Standard",
    status: "Cancelled",
  },
  {
    id: 11,
    email: "danharris@gmail.com",
    customer: "Daniel Harris",
    roomName: "Room 110",
    roomType: "Standard",
    status: "Cancelled",
  },
  {
    id: 12,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 13,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 14,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 15,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 16,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },{
    id: 17,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 18,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 19,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id:20,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 21,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 22,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 23,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 24,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 25,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 26,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 27,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 28,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 29,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 30,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 31,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 32,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 33,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 34,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 35,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 36,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 37,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 38,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 39,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 40,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 41,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 42,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 43,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 44,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 45,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 46,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  { id: 47,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 48,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  {
    id: 49,
    email: "sophiam@gmail.com",
    customer: "Sophia Martinez",
    roomName: "Room 109",
    roomType: "Deluxe",
    status: "Confirmed",
  },
  
]

export default function AdminReservation({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    roomType: [],
    status: [],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filterButtonRef = useRef(null)

  useEffect(() => {
    createIcons({ icons })
  }, [])

  const filteredReservations = reservations.filter((reservation) => {
    return reservation.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
           reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
});
  

  const handleDelete = (id) => {
    setReservations(reservations.filter((reservation) => reservation.reservationID !== id))
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Reservations Management</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search className="text-gray-900" size={18} />
                </div>
              </div>
              <button
                className="ml-2 p-2 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                ref={filterButtonRef}
              >
                <Filter size={18} />
              </button>
            </div>
          </div>
          <div>
            <CustomerTable
              data={filteredReservations}           
              onDelete={handleDelete}
              currentPage={currentPage}
              onFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>
        </main>
      </div>
    </div>
  )
}