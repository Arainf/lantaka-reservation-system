'use client'

import React, { useState, useEffect, useRef } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import GuestTable from "@/components/common/cards/GuestTable"
import { Filter, Search, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DeleteModal from "@/components/ui/deletemodal"
import { useGuestContext } from "@/context/guestContext"

export default function AdminGuest({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const { guestsData } = useGuestContext()
  const [guests, setGuests] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    room: [],
    status: []
  })
  const [tempFilters, setTempFilters] = useState({
    room: [],
    status: []
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [guestToDelete, setGuestToDelete] = useState(null)

  useEffect(() => {
    createIcons({ icons })

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (Array.isArray(guestsData)) {
      setGuests(guestsData)
    }
  }, [guestsData])

  useEffect(() => {
    setTempFilters(filters)
  }, [filters])

  const filteredGuests = guests.filter((guest) => {
    if (!guest) return false
    const guestName = guest.guest_fName && guest.guest_lName 
      ? `${guest.guest_fName} ${guest.guest_lName}`.toLowerCase()
      : ''
    const guestEmail = guest.guest_email ? guest.guest_email.toLowerCase() : ''
    const searchTermLower = searchTerm.toLowerCase()

    const matchesSearch = guestName.includes(searchTermLower) || guestEmail.includes(searchTermLower)
    const matchesRoom = filters.room.length === 0 || (guest.room && filters.room.includes(guest.room))
    const matchesStatus = filters.status.length === 0 || (guest.status && filters.status.includes(guest.status))
    return matchesSearch && matchesRoom && matchesStatus
  })

  const handleDelete = (id) => {
    const guestToDelete = guests.find(guest => guest && guest.guest_id === id)
    setGuestToDelete(guestToDelete)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (guestToDelete) {
      setGuests(prevGuests => prevGuests.filter(guest => guest && guest.guest_id !== guestToDelete.guest_id))
      setDeleteModalOpen(false)
      setGuestToDelete(null)
    }
  }

  const handleEdit = (id) => {
    console.log(`Edit guest with id: ${id}`)
  }

  const handleTempFilterChange = (filterType, value) => {
    setTempFilters(prevFilters => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value]
      return { ...prevFilters, [filterType]: updatedFilter }
    })
  }

  const applyFilters = () => {
    setFilters(tempFilters)
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    setFilters({
      room: [],
      status: []
    })
    setTempFilters({
      room: [],
      status: []
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  const rooms = [...new Set(guests.filter(g => g && g.room).map(g => g.room))]
  const statuses = [...new Set(guests.filter(g => g && g.status).map(g => g.status))]

  const activeFilters = [...filters.room, ...filters.status]

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Guest List Management</h1>
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
              <div className="relative" ref={filterRef}>
                <Button
                  variant="outline"
                  className="ml-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                {isFilterOpen && (
                  <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4">
                    <h3 className="text-lg font-semibold mb-2">Filters</h3>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium">Room</h4>
                        {rooms.map(room => (
                          <label key={room} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={tempFilters.room.includes(room)}
                              onChange={() => handleTempFilterChange('room', room)}
                              className="mr-2"
                            />
                            {room}
                          </label>
                        ))}
                      </div>
                      <div>
                        <h4 className="font-medium">Status</h4>
                        {statuses.map(status => (
                          <label key={status} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={tempFilters.status.includes(status)}
                              onChange={() => handleTempFilterChange('status', status)}
                              className="mr-2"
                            />
                            {status}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsFilterOpen(false)}>Cancel</Button>
                      <Button onClick={applyFilters}>Apply</Button>
                    </div>
                  </div>
                )}
              </div>
              {(activeFilters.length > 0 || searchTerm) && (
                <Button
                  variant="ghost"
                  className="ml-2"
                  onClick={resetFilters}
                  title="Reset all filters"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary">
                  {filter}
                </Badge>
              ))}
            </div>
          )}
          <GuestTable
            data={filteredGuests}
            onDelete={handleDelete}
            onEdit={handleEdit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={guestToDelete ? `${guestToDelete.guest_fName} ${guestToDelete.guest_lName}` : ""}
        itemType="Guest"
      />
    </div>
  )
}