'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import NavigationTop from '@/components/common/navigatin-side-top/clientNavigationTop'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, HomeIcon, BellIcon, ActivityIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useReservations } from '@/context/contexts'

export default function Calendar() {
  const { events, bookingSummary, upcomingBookings, recentActivities, fetchEvents } = useReservations()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [editedEvent, setEditedEvent] = useState(null)


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
      const updatedEvents = [...prev[type]]
      updatedEvents[index] = {
        ...updatedEvents[index],
        resource: {
          ...updatedEvents[index].resource,
          status: value
        }
      }
      return { ...prev, [type]: updatedEvents }
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

  const eventStyleGetter = (info) => {
    return { 
      className: 'bg-primary/10 text-primary border border-primary/20 rounded-md shadow-sm hover:bg-primary/20 transition-colors',
    }
  }

  return (
    <main className="flex flex-col h-screen w-full overflow-hidden bg-background">
      <NavigationTop />
      <div className="flex-[1] flex">
        <aside className="w-80 border-r p-4 bg-muted/30 drop-shadow-xl">
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
              <ScrollArea className="h-32">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="mb-2 last:mb-0">
                    <div className="font-medium">{booking.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {moment(booking.start).format('MMM D, YYYY')}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="w-5 h-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-32">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="mb-2 last:mb-0">
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>
        <div className="flex-[2] p-6">
            <h1 className='text-xl'>Reservation Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                editable={false}
                selectable={true}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                eventContent={renderEventContent}
                eventClassNames={eventStyleGetter}
                height="auto"
              />
        </div>
      </div>

      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bookings for {moment(editedEvent?.date).format('MMMM D, YYYY')}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {editedEvent && (
              <div className="grid gap-6 py-4">
                <BookingSection title="Rooms" icon={<HomeIcon className="w-5 h-5" />} bookings={editedEvent.rooms} onStatusChange={(value, index) => handleEditChange(value, index, 'rooms')} />
                <BookingSection title="Venues" icon={<CalendarIcon className="w-5 h-5" />} bookings={editedEvent.venues} onStatusChange={(value, index) => handleEditChange(value, index, 'venues')} />
              </div>
            )}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleEditSubmit}>Save changes</Button>
            <Button onClick={handleCloseEventDialog} variant="outline">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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

function BookingSection({ title, icon, bookings, onStatusChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title} ({bookings.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {bookings.map((booking, index) => (
            <div key={booking.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{booking.id}</Badge>
                <span>{booking.title}</span>
              </div>
              <Select onValueChange={(value) => onStatusChange(value, index)} defaultValue={booking.resource.status}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}