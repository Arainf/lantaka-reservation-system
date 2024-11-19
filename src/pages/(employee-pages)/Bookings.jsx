'use client'

import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import NavigationTop from '@/components/common/navigatin-side-top/clientNavigationTop'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, ActivityIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ReservationsTable from "@/components/common/cards/ReservationsTable"
import { useReservationsContext } from "@/context/reservationContext"

export default function Calendar() {
  const { reservationsData } = useReservationsContext()
  const [events, setEvents] = useState([])
  const [bookingSummary, setBookingSummary] = useState({ total: 0, rooms: 0, venues: 0 })
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [editedEvent, setEditedEvent] = useState(null)
  const [bookingFilter, setBookingFilter] = useState('all')
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [tableKey, setTableKey] = useState(0)

  useEffect(() => {
    fetchEvents()
    fetchBookingSummary()
    fetchUpcomingBookings()
    fetchRecentActivities()
  }, [])
  const handleDelete = (reservation) => {
    setReservationToDelete(reservation)
    setDeleteModalOpen(true)
  }
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events')
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const fetchBookingSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/booking-summary')
      setBookingSummary(response.data)
    } catch (error) {
      console.error('Error fetching booking summary:', error)
    }
  }

  const fetchUpcomingBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/upcoming-bookings')
      setUpcomingBookings(response.data)
    } catch (error) {
      console.error('Error fetching upcoming bookings:', error)
    }
  }

  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recent-activities')
      setRecentActivities(response.data)
    } catch (error) {
      console.error('Error fetching recent activities:', error)
    }
  }

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event)
    setEditedEvent(clickInfo.event.extendedProps)
    setIsEventDialogOpen(true)
  }

  const handleCloseEventDialog = () => {
    setIsEventDialogOpen(false)
    setSelectedEvent(null)
    setEditedEvent(null)
  }

  const handleEditSubmit = async () => {
    try {
      const updatePromises = [...editedEvent.rooms, ...editedEvent.venues].map(event => 
        axios.put(`http://localhost:5000/api/reservationCalendar/${event.reservation}`, {
          id: event.reservation,
          status: event.resource.status,
          type: event.resource.type
        })
      )
      await Promise.all(updatePromises)
      await fetchEvents()
      handleCloseEventDialog()
    } catch (error) {
      console.error('Error updating events:', error)
      alert('Failed to update reservation statuses. Please try again.')
    }
  }

  const eventStyleGetter = () => {
    return { 
      className: 'bg-primary/10 text-primary border border-primary/20 rounded-md shadow-sm hover:bg-primary/20 transition-colors',
    }
  }

  const filteredData = useMemo(() => {
    return reservationsData.filter((item) => {
      const typeMatch =
        bookingFilter === "all" ||
        (bookingFilter === "room" && item.type === "room") ||
        (bookingFilter === "event" && item.type === "event");

      const searchMatch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.room?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.event?.toLowerCase().includes(searchQuery.toLowerCase());

      return typeMatch && searchMatch;
    });
  }, [reservationsData, bookingFilter, searchQuery]);

  const handleSearch = () => {
    // The search is already being handled by the useMemo hook above
    console.log("Searching for:", searchQuery);
  };

  return (
    <main className="h-screen overflow-hidden bg-background pt-[65px]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationTop />
      </div>
      <div className="flex flex-row pt-[6px] pl-[30px]">
        <div className="space-y-4 flex-grow">
          <h1 className="text-2xl pt-[20px] font-bold">Reservations Management</h1>
          <div className="flex space-x-2 fixed top-[125px]">
            <Button
              variant={bookingFilter === "all" ? "default" : "outline"}
              onClick={() => setBookingFilter("all")}
            >
              All
            </Button>
            <Button
              variant={bookingFilter === "room" ? "default" : "outline"}
              onClick={() => setBookingFilter("room")}
            >
              Room
            </Button>
            <Button
              variant={bookingFilter === "event" ? "default" : "outline"}
              onClick={() => setBookingFilter("event")}
            >
              Event
            </Button>
          </div>

          <div className="flex items-center space-x-2 mt-6 pl-[230px]">
            <input
              type="text"
              placeholder="Search bookings..."
              className="border p-2 rounded bg-white text-black placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="bg-white text-black border border-gray-300"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div className="flex w-[110%] h-[510px] relative top-[20px] pr-[140px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              <ReservationsTable 
                data={reservationsData}
                              keys={tableKey}

                onDelete={handleDelete}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

              />
            </div>
          </div>

          <div className="flex justify-center p-4 relative -top-[609px] left-[440px]">
            <Button
              onClick={() => setIsCalendarModalOpen(true)}
              className="px-6 py-2 text-sm rounded-lg"
            >
              <CalendarIcon className="mr-2 h-5 w-5" />
              Open Calendar
            </Button>
          </div>
        </div>

        <div className="w-[320px] flex flex-col">
          <Card className="mb-4 shadow-md">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
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

          <Card className="mb-4 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Upcoming Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-32 overflow-auto">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="mb-2 last:mb-0">
                    <div className="font-medium">{booking.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {moment(booking.start).format('MMM DD, YYYY')}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="mb-4 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="w-5 h-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-32 overflow-auto">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="mb-2 last:mb-0">
                    <div className="font-medium">{activity.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {moment(activity.timestamp).fromNow()}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
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
                left: 'prev,next',
                center: 'title',
                right: ''
              }}
              eventContent={renderEventContent}
              eventClassNames={eventStyleGetter}
              height="auto"
            />
          </div>
        </DialogContent>
      </Dialog>

      {isEventDialogOpen && (
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>Edit booking details below.</DialogDescription>
            </DialogHeader>
            <div>
              <p className="text-sm">Status: {editedEvent?.status}</p>
            </div>
            <DialogFooter>
              <Button onClick={handleEditSubmit}>Save Changes</Button>
              <Button variant="outline" onClick={handleCloseEventDialog}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  )
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
  )
}