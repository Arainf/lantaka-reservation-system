'use client'

import React, { useState, useEffect, useRef, useCallback } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import ReservationsTable from "@/components/common/cards/ReservationsTable"
import { Filter, Search, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DeleteModal from "@/components/ui/deletemodal"
import { useReservationsContext } from "@/context/reservationContext"

export default function AdminReservation({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const { reservationsData, fetchReservations, deleteData } = useReservationsContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    reservation: [],
    status: [],
    guest_type: []
  })
  const [tempFilters, setTempFilters] = useState({
    reservation: [],
    status: [],
    guest_type: []
  })  
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [reservationToDelete, setReservationToDelete] = useState(null)
  const [tableKey, setTableKey] = useState(0)

  useEffect(() => {
    createIcons({ icons })

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const fetchReservationsAttachment = useCallback(async () => {
    await fetchReservations()
    setTableKey(prevKey => prevKey + 1) // Force re-render of ReservationsTable
    setTempFilters(filters)
  }, [fetchReservations, filters])

  useEffect(() => {
    fetchReservationsAttachment()
  }, [deleteData])

  useEffect(() => {
    setTempFilters(filters)
  }, [filters])

  const filteredReservations = reservationsData.filter((reservation) => {
    const matchesSearch = reservation.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           reservation.account_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesReservation = filters.reservation.length === 0 || filters.reservation.includes(reservation.reservation)
    const matchesStatus = filters.status.length === 0 || filters.status.includes(reservation.status)
    const matchesGuestType = filters.guest_type.length === 0 || filters.guest_type.includes(reservation.guest_type)
    return matchesSearch && matchesReservation && matchesStatus && matchesGuestType
  })

  const handleDelete = (reservation) => {
    setReservationToDelete(reservation)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    console.log(`Deleting reservation for ${reservationToDelete.guest_name}`)
    setDeleteModalOpen(false)
    setReservationToDelete(null)
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
      reservation: [],
      status: [],
      guest_type: []
    })
    setTempFilters({
      reservation: [],
      status: [],
      guest_type: []
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  const reservations = [...new Set(reservationsData.map(r => r.reservation))]
  const statuses = [...new Set(reservationsData.map(r => r.status))]
  const guestTypes = [...new Set(reservationsData.map(r => r.guest_type))]

  const activeFilters = [...filters.reservation, ...filters.status, ...filters.guest_type]

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
                  placeholder="Search by name or account..."
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
                  <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Reservation</div>
                      {reservations.map((res) => (
                        <label key={res} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            checked={tempFilters.reservation.includes(res)}
                            onChange={() => handleTempFilterChange('reservation', res)}
                          />
                          <span className="ml-2">{res}</span>
                        </label>
                      ))}
                      <div className="border-t border-gray-100"></div>
                      <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Status</div>
                      {statuses.map((status) => (
                        <label key={status} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            checked={tempFilters.status.includes(status)}
                            onChange={() => handleTempFilterChange('status', status)}
                          />
                          <span className="ml-2">{status}</span>
                        </label>
                      ))}
                      <div className="border-t border-gray-100"></div>
                      <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Guest Type</div>
                      {guestTypes.map((type) => (
                        <label key={type} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            checked={tempFilters.guest_type.includes(type)}
                            onChange={() => handleTempFilterChange('guest_type', type)}
                          />
                          <span className="ml-2">{type}</span>
                        </label>
                      ))}
                      <div className="border-t border-gray-100"></div>
                      <div className="px-4 py-2">
                        <Button onClick={applyFilters} className="w-full mb-2">
                          Apply Filters
                        </Button>
                        <Button onClick={resetFilters} variant="outline" className="w-full">
                          Reset Filters
                        </Button>
                      </div>
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
          <div>
            <ReservationsTable
              key={tableKey}
              data={filteredReservations}           
              onDelete={handleDelete}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={reservationToDelete ? reservationToDelete.guest_name : ""}
        itemType="Reservation"
      />
    </div>
  )
}