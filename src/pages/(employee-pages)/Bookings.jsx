"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import ReservationsTable from "@/components/common/tables/ReservationsTable";
import { useReservationsContext } from "@/context/reservationContext";
import { useNotifications } from "@/context/notificationContext";
import { useReservations } from "@/context/contexts";

export default function ReservationCalendar() {
  const { reservationsData, fetchReservations } = useReservationsContext();
  const [events, setEvents] = useState([]);
  const { bookingSummary } = useReservations();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ guest_type: "all", status: "all" });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const { createNotification } = useNotifications();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchBookingSummary();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchBookingSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/booking-summary"
      );
      setBookingSummary(response.data);
    } catch (error) {
      console.error("Error fetching booking summary:", error);
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setEditedEvent(clickInfo.event.extendedProps);
    setIsEventDialogOpen(true);
  };

  const handleCloseEventDialog = () => {
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
    setEditedEvent(null);
  };

  const handleEditSubmit = async () => {
    try {
      const updatePromises = [...editedEvent.rooms, ...editedEvent.venues].map(
        (event) =>
          axios.put(
            `http://localhost:5000/api/reservationCalendar/${event.reservation}`,
            {
              id: event.reservation,
              status: event.resource.status,
              type: event.resource.type,
            }
          )
      );
      await Promise.all(updatePromises);
      await fetchEvents();
      handleCloseEventDialog();
      const account = localStorage.getItem("userData.first_name");
      createNotification({
        type: "Modified",
        description: `Account Name: "${account}" has updated event id "${event.reservation}".`,
        role: "Administrator",
      });
    } catch (error) {
      console.error("Error updating events:", error);
      alert("Failed to update reservation statuses. Please try again.");
    }
  };

  const statusOrder = {
    waiting: 1,
    ready: 2,
    onUse: 3,
    onCleaning: 4,
    done: 5,
    cancelled: 6,
  };

  const filteredReservations = reservationsData
    .filter((reservation) => {
      const matchesSearch =
        reservation.guest_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        reservation.account_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesGuestType =
        filters.guest_type === "all" ||
        reservation.guest_type === filters.guest_type;
      const matchesStatus =
        filters.status === "all" || reservation.status === filters.status;

      return matchesSearch && matchesGuestType && matchesStatus;
    })
    .sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });

  const sortedReservations = useMemo(() => {
    let sortableItems = [...filteredReservations];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems.sort((a, b) => {
      if (a.status === "Waiting" && b.status !== "Waiting") return -1;
      if (a.status !== "Waiting" && b.status === "Waiting") return 1;
      return 0;
    });
  }, [filteredReservations, sortConfig]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (reservation) => {
    console.log(`Deleting reservation for ${reservation.guest_name}`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const resetFilters = () => {
    setFilters({ guest_type: "all", status: "all" });
    setSearchTerm("");
    setSortConfig({ key: null, direction: "ascending" });
  };

  const guestTypes = ["internal", "external"];
  const statuses = [
    "waiting",
    "confirmed",
    "cancelled",
    "onUse",
    "onCleaning",
    "done",
  ];

  const activeFilters = Object.entries(filters).filter(
    ([_, value]) => value !== "all"
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <main className="bg-background pt-[65px] px-4 flex flex-col h-screen w-screen">
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <NavigationTop />
      </div>
      <div className="flex flex-row h-full relative">
        {/* Booking Summary Drawer */}
        <div
          className={`fixed left-0 top-[65px] bottom-0 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
            isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '300px', zIndex: 40 }}
        >
          <Button
            onClick={toggleDrawer}
            className="absolute -right-10 bottom-0 transform -translate-y-1/2 bg-primary text-white p-2 rounded-r-md"
          >
            {isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{bookingSummary.total}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{bookingSummary.rooms}</div>
                  <div className="text-sm text-muted-foreground">Rooms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{bookingSummary.venues}</div>
                  <div className="text-sm text-muted-foreground">Venues</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className={`space-y-4 flex-grow transition-all duration-300 ${isDrawerOpen ? 'ml-[300px]' : ''}`}>
          <h1 className="text-2xl pt-[20px] font-bold">
            Reservations Management
          </h1>
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full lg:w-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by name or account..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-2 border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search className="text-gray-900" size={18} />
                </div>
              </div>
              <Select
                value={filters.guest_type}
                onValueChange={(value) => handleFilterChange("guest_type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Guest Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Guest Types</SelectItem>
                  {guestTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(activeFilters.length > 0 || searchTerm) && (
                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  title="Reset all filters"
                  className="text-xs w-[50px]"
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

          <div className="w-full overflow-x-auto rounded-lg border bg-card">
            <div className="min-w-screen lg:w-full">
              <ReservationsTable
                data={sortedReservations}
                onDelete={handleDelete}
                onSort={handleSort}
                sortConfig={sortConfig}
              />
            </div>
          </div>
        </div>
      </div>

      {isEventDialogOpen && (
        <Dialog open={isEventDialogOpen} onOpenChange={handleCloseEventDialog}>
          <DialogContent className="w-[90vw] max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Reservation</DialogTitle>
              <DialogDescription>
                Modify the reservation details as needed and save changes.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Status</label>
                <Select
                  value={editedEvent?.status || ""}
                  onValueChange={(value) =>
                    setEditedEvent((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={handleCloseEventDialog}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}

