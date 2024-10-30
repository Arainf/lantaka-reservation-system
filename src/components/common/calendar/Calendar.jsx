'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import axios from 'axios'

const localizer = momentLocalizer(moment)

const testEvents = [
  {
    title: 'Meeting',
    start: moment('2024-10-27T10:00:00').toDate(),
    end: moment('2024-10-27T15:00:00').toDate(),
    resource: 'Room 1',
  },
  {
    title: 'testMeeting',
    start: moment('2024-10-27T11:00:00').toDate(),
    end: moment('2024-10-27T16:00:00').toDate(),
    resource: 'Room 1',
  },
  {
    title: 'testMeeting',
    start: moment('2024-10-27T12:00:00').toDate(),
    end: moment('2024-10-27T17:00:00').toDate(),
    resource: 'Room 1',
  }
]

export function Component() {
  const [events, setEvents] = useState([])
  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [editedEvent, setEditedEvent] = useState(null)

  const handleNavigate = (newDate) => setDate(newDate)
  const handleViewChange = (newView) => setView(newView)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reservationCalendar')
      const formattedEvents = response.data.map(event => ({
        reservation: event.reservationid,
        id: event.id,
        title: `${event.id} - ${event.guests}`,
        start: moment(`${event.dateStart}T${event.checkIn}`).toDate(),
        end: moment(`${event.dateEnd}T${event.checkOut}`).toDate(),
        allDay: false,
        resource: {
          employee: event.employee,
          guests: event.guests,
          type: event.type,
          status: event.status,
        },
      }))

      
      setEvents(formattedEvents)
      console.log('Fetched events:', formattedEvents)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setEditedEvent({...event})
    setIsEventDialogOpen(true)
  }

  const handleCloseEventDialog = () => {
    setIsEventDialogOpen(false)
    setSelectedEvent(null)
    setEditedEvent(null)
  }

  const handleEditChange = (value) => {
    setEditedEvent(prev => ({
      ...prev,
      resource: {
        ...prev.resource,
        status: value
      }
    }))
  }



  const handleEditSubmit = async () => {
    try {
        // Construct URL with query parameters
        const url = `http://localhost:5000/api/reservationCalendar/${editedEvent.reservation}?id=${editedEvent.reservation}&status=${editedEvent.resource.status}&type=${editedEvent.resource.type}`;

        // Log the data and URL being sent in the PUT request
        console.log("Sending PUT request with URL:", url);

        // Make the PUT request without a body, since data is in the URL
        await axios.put(url);

        // Log the current events array before updating
        console.log("Events before update:", events);

        // Update local state
        setEvents(events.map(event => 
            event.reservation === editedEvent.reservation ? {  // Use `reservation` for matching
                ...event,
                title: `${event.resource.type === 'room' ? 'Room' : 'Venue'}: ${event.id} - ${editedEvent.resource.status}`,
                resource: {
                    ...event.resource,
                    status: editedEvent.resource.status
                }
            } : event
        ));

        // Log the updated events array
        console.log("Events after update:", events);

        handleCloseEventDialog();
    } catch (error) {
        console.error('Error updating event:', error);
        alert('Failed to update reservation status. Please try again.'); // User feedback
    }
};

  

  const CustomToolbar = (toolbar) => {
    const goToToday = () => toolbar.onNavigate('TODAY')
    const goBack = () => toolbar.onNavigate('PREV')
    const goNext = () => toolbar.onNavigate('NEXT')

    return (
      <div className="flex justify-between items-center mb-3">
        <div className="flex space-x-2">
          <Button onClick={goToToday} variant="outline">Today</Button>
          <Button onClick={goBack} variant="outline">Back</Button>
          <Button onClick={goNext} variant="outline">Next</Button>
        </div>
        <h2 className="text-2xl font-bold">{toolbar.label}</h2>
        <div className="flex space-x-2">
          <Select value={view} onValueChange={handleViewChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }

  const eventStyleGetter = (event) => {
    let backgroundColor, color
    switch (event.resource.status.toLowerCase()) {
      case 'reserved':
      case 'pending':
        backgroundColor = '#FFF9C4'
        color = '#F57F17'
        break
      case 'cancelled':
      case 'canceled':
        backgroundColor = '#FFCDD2'
        color = '#B71C1C'
        break
      case 'occupied':
        backgroundColor = '#E3F2FD'
        color = '#0D47A1'
        break
      case 'normal':
      case 'completed':
        backgroundColor = '#E8F5E9'
        color = '#1B5E20'
        break
      default:
        backgroundColor = '#F5F5F5'
        color = '#212121'
    }
    return { 
      style: { 
        backgroundColor,
        color,
        border: `1px solid ${color}`,
        borderRadius: '4px',
        opacity: 0.8,
        display: 'block',
        fontWeight: 'normal',
        fontSize: '0.9em',
        padding: '2px 5px',
      } 
    }
  }

  const formats = {
    agendaDateFormat: 'ddd MMM D',
    agendaTimeFormat: 'h:mm A',
    agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, 'h:mm A', culture),
  }

  const CustomAgendaEvent = ({ event }) => (
    <div className="flex items-center p-2 hover:bg-gray-100 transition-colors">
      <div className="w-24 flex-shrink-0">
        {moment(event.start).format('h:mm A')}
      </div>
      <div className="flex-grow flex items-center">
        <div 
          className="w-4 h-4 rounded-full mr-3 flex-shrink-0" 
          style={{ backgroundColor: eventStyleGetter(event).style.backgroundColor }}
        ></div>
        <div className="font-semibold truncate">
          {event.title}
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-[700px] w-full p-4">
      <Calendar
        localizer={localizer}
        events={events}
        view={view}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        selectable
        onSelectEvent={handleSelectEvent}
        components={{
          // toolbar: CustomToolbar,
          agenda: {
            event: CustomAgendaEvent,
          },
        }}
        eventPropGetter={eventStyleGetter}
        formats={formats}
        className="rounded-lg shadow-lg"
      />
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {editedEvent && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Start</Label>
                  <div className="col-span-3">{moment(editedEvent.start).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">End</Label>
                  <div className="col-span-3">{moment(editedEvent.end).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Type</Label>
                  <div className="col-span-3">{editedEvent.resource.type}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    name="status"
                    value={editedEvent.resource.status}
                    onValueChange={handleEditChange}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Employee</Label>
                  <div className="col-span-3">{editedEvent.resource.employee}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Guests</Label>
                  <div className="col-span-3">{editedEvent.resource.guests}</div>
                </div>
              </div>
            )}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleEditSubmit}>Save changes</Button>
            <Button onClick={handleCloseEventDialog} variant="outline">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}