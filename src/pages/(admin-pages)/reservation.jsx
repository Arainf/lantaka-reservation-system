'use client'

import React, { useState, useEffect, useRef, useCallback } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import ReservationsTable from "@/components/common/tables/ReservationsTable"
import { Filter, Search, RefreshCw, ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DeleteModal from "@/components/ui/deletemodal"
import { useReservationsContext } from "@/context/reservationContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function AdminReservation({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const { reservationsData, fetchReservations, deleteData, saveNote } = useReservationsContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    guest_type: "all",
    status: "all"
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [reservationToDelete, setReservationToDelete] = useState(null)
  const [tableKey, setTableKey] = useState(0)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

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
    setTableKey(prevKey => prevKey + 1)
  }, [fetchReservations])

  useEffect(() => {
    fetchReservationsAttachment()
  }, [deleteData, saveNote])

// Importance order for statuses
const statusOrder = {
  waiting: 1,
  ready: 2,
  onUse: 3,
  onCleaning: 4,
  done: 5,
  cancelled: 6,
};

// Filter and sort the reservations
const filteredReservations = reservationsData
  .filter((reservation) => {
    const matchesSearch =
      reservation.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.account_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGuestType =
      filters.guest_type === "all" || reservation.guest_type === filters.guest_type;
    const matchesStatus =
      filters.status === "all" || reservation.status === filters.status;

    return matchesSearch && matchesGuestType && matchesStatus;
  })
  .sort((a, b) => {
    // Sort by the importance of status
    return statusOrder[a.status] - statusOrder[b.status];
  });


  const sortedReservations = React.useMemo(() => {
    let sortableItems = [...filteredReservations]
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    // Prioritize 'Waiting' status
    return sortableItems.sort((a, b) => {
      if (a.status === 'Waiting' && b.status !== 'Waiting') return -1
      if (a.status !== 'Waiting' && b.status === 'Waiting') return 1
      return 0
    })
  }, [filteredReservations, sortConfig])

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handleDelete = (reservation) => {
    setReservationToDelete(reservation)
    setDeleteModalOpen(true)
  }

  

  const confirmDelete = () => {
    console.log(`Deleting reservation for ${reservationToDelete.guest_name}`)
    setDeleteModalOpen(false)
    setReservationToDelete(null)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }))
  }

  const resetFilters = () => {
    setFilters({
      guest_type: "all",
      status: "all"
    })
    setSearchTerm("")
    setSortConfig({ key: null, direction: 'ascending' })
  }

  const guestTypes = ["internal", "external"]
  const statuses = ["waiting", "confirmed", "cancelled", "onUse", "onCleaning", "done"]

  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "all")


  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-xl font-bold">Reservations Management</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name or account..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-50 md:w-80"
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search className="text-gray-900" size={18} />
                </div>
              </div>
              <Select value={filters.guest_type} onValueChange={(value) => handleFilterChange('guest_type', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Guest Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Guest Types</SelectItem>
                  {guestTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(activeFilters.length > 0 || searchTerm) && (
                <Button
                  variant="ghost"
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
              {activeFilters.map(([key, value]) => (
                <Badge key={key} variant="default">
                  {value}
                </Badge>
              ))}
            </div>
          )}
          <div>

                <ReservationsTable
                key={tableKey}
                data={filteredReservations}
                onDelete={handleDelete}
                onSort={handleSort}
                sortConfig={sortConfig}
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