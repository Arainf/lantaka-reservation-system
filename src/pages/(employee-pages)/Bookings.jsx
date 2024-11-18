'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import NavigationTop from '@/components/common/navigatin-side-top/clientNavigationTop'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, HomeIcon, ActivityIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useReservations } from '@/context/contexts'
import CustomerTable from "@/components/common/cards/ReservationsTable"

export default function Calendar() {
  const { events, bookingSummary, upcomingBookings, recentActivities, fetchEvents } = useReservations()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [editedEvent, setEditedEvent] = useState(null)
  const [bookingFilter, setBookingFilter] = useState('all')
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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

  const handleEditChange = (value, index, type) => {
    setEditedEvent(prev => {
      const updatedBookings = [...prev[type]]
      updatedBookings[index] = {
        ...updatedBookings[index],
        resource: {
          ...updatedBookings[index].resource,
          status: value
        }
      }
      return { ...prev, [type]: updatedBookings }
    })
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

  const filteredBookings = upcomingBookings.filter(booking => 
    (bookingFilter === 'all' || booking.bookingType === bookingFilter) &&
    (booking.guestName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     booking.details?.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <main className="h-screen overflow-hidden bg-background pt-[65px]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationTop />
      </div>
      <div className="flex flex-row pt-[6px] pl-[30px]">
        <div className="space-y-4">
          <h1 className="text-2xl pt-[20px] font-bold">Reservations Management</h1>
          <div className="flex space-x-2 fixed top-[125px]">
            <Button 
              variant={bookingFilter === 'all' ? "default" : "outline"} 
              onClick={() => setBookingFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={bookingFilter === 'room' ? "default" : "outline"} 
              onClick={() => setBookingFilter('room')}
            >
              Room
            </Button>
            <Button 
              variant={bookingFilter === 'event' ? "default" : "outline"} 
              onClick={() => setBookingFilter('event')}
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
              onClick={() => {
                console.log('Searching for:', searchQuery)
              }}
            >
              Search
            </Button>
          </div>

          <div className="space-y-6 mt-4">
            {filteredBookings.map((booking, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="bg-muted/50 py-3">
                  <CardTitle className="text-lg font-medium">
                    {booking.guestName} - {booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">{booking.details}</p>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <p>Date: {booking.date}</p>
                    <p>Booked: {new Date(booking.timestamp).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className="flex pr-8"
            style={{
              width: '148%',
              height: '510px',
              position: 'relative',
              top: '20px',
              paddingRight: '570px',
              overflow: 'hidden',
            }}
          >
            <CustomerTable />
          </div>

          <div
            className="flex justify-center p-4"
            style={{
              position: 'relative',
              top: '-609px',
              left: '450px',
            }}
          >
            <Button onClick={() => setIsCalendarModalOpen(true)}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Open Calendar
            </Button>
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
        </div>

        <div className="w-[320px] flex flex-col">
          <Card className="mb-4">
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

          <Card className="mb-4">
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

          <Card className="mb-4">
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