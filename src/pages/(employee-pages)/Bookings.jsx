"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ActivityIcon, Search, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import BookingSummary from "@/components/common/cards/BookingSummary";
import UpcomingBooking from "@/components/common/cards/UpcomingBooking";
import UpcomingBookingdue from "@/components/common/cards/UpcomingBookingdue";
import { useNotifications } from "@/context/notificationContext";

export default function ReservationCalendar() {
  const { reservationsData, fetchReservations, deleteData, saveNote } =
    useReservationsContext();
  const [events, setEvents] = useState([]);
  const [bookingSummary, setBookingSummary] = useState({
    total: 0,
    rooms: 0,
    venues: 0,
  });
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ guest_type: "all", status: "all" });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [tableKey, setTableKey] = useState(0);
  const { createNotification } = useNotifications();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    fetchEvents();
    fetchBookingSummary();
    fetchUpcomingBookings();
    fetchRecentActivities();
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

  const fetchUpcomingBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/upcoming-bookings"
      );
      setUpcomingBookings(response.data);
    } catch (error) {
      console.error("Error fetching upcoming bookings:", error);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/recent-activities"
      );
      setRecentActivities(response.data);
    } catch (error) {
      console.error("Error fetching recent activities:", error);
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
        type: 'Modified',
        description: `Account Name: "${account}" has updated event id "${event.reservation}".`,
        role: 'Administrator',
      });
    } catch (error) {
      console.error("Error updating events:", error);
      alert("Failed to update reservation statuses. Please try again.");
    }
  };

  const eventStyleGetter = () => {
    return {
      className:
        "bg-primary/10 text-primary border border-primary/20 rounded-md shadow-sm hover:bg-primary/20 transition-colors",
    };
  };

  const fetchReservationsAttachment = useCallback(async () => {
    await fetchReservations()
    setTableKey(prevKey => prevKey + 1)
  }, [fetchReservations])

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
      // Sort by the importance of status
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
    // Implement delete functionality
    console.log(`Deleting reservation for ${reservation.guest_name}`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  useEffect(() => {
    fetchReservationsAttachment()
  }, [deleteData])

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

  return (
    <main className="min-h-screen bg-background pt-[65px] px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <NavigationTop />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 pt-[6px]">
        <div className="space-y-4 flex-grow">
          <h1 className="text-2xl pt-[20px] font-bold">
            Reservations Management
          </h1>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full md:w-auto">
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
                onValueChange={(value) =>
                  handleFilterChange("guest_type", value)
                }
              >
                <SelectTrigger className="w-full ">
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
                <SelectTrigger className="w-full ">
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
                  className=" text-xs w-[50px]"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex justify-center w-full sm:w-auto">
              
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
            <div className="min-w-[800px]">
              <ReservationsTable
                key={tableKey}
                data={sortedReservations}
                onDelete={handleDelete}
                onSort={handleSort}
                sortConfig={sortConfig}
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[320px] mt-3 ">
          <div className="mb-5">
            <BookingSummary data={sortedReservations} />
          </div>
          <div className="mb-5">
            <UpcomingBooking data={sortedReservations} />
          </div>

          <div className="mb-5">
            <UpcomingBookingdue data={sortedReservations} />
          </div>
        </div>
      </div>

      <Dialog open={isCalendarModalOpen} onOpenChange={setIsCalendarModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Reservation Calendar</DialogTitle>
          </DialogHeader>
          <div className="flex-[2] p-6">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
              editable={false}
              selectable={true}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "",
              }}
              eventContent={renderEventContent}
              eventClassNames={eventStyleGetter}
              height="auto"
            />
          </div>
        </DialogContent>
      </Dialog>

      {isEventDialogOpen && (
        <Dialog open={isEventDialogOpen} onOpenChange={handleCloseEventDialog}>
          <DialogContent>
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

function renderEventContent(eventInfo) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full h-full p-1">
            <div className="text-xs font-medium">{eventInfo.event.title}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Rooms: {eventInfo.event.extendedProps.rooms.length}</p>
          <p>Venues: {eventInfo.event.extendedProps.venues.length}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
