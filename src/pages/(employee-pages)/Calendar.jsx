import { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import NavigationTop from '@/components/common/navigatin-side-top/clientNavigationTop';
import { useReservationsContext } from '@/context/reservationContext';
import { UserContext } from '@/context/contexts';
import { EventDialog } from '@/components/common/calendar/EventDialog';
import { CustomToolbar } from '@/components/common/calendar/CustomToolbar';
import { CustomEvent } from '@/components/common/calendar/CustomEvent';
import { MoreEventsDialog } from '@/components/common/calendar/MoreEventsDialog';

const localizer = momentLocalizer(moment);

const views = ['month', 'week'];

export default function CalendarPage() {
  const { reservationsData } = useReservationsContext();
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showMoreEvents, setShowMoreEvents] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateEvents, setDateEvents] = useState([]);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const events = useMemo(() => {
    return reservationsData.reduce((acc, reservation) => {
      const groupId = `${reservation.timestamp}_${reservation.guest_id}`;
      let group = acc.find(e => e.groupId === groupId);
      
      if (!group) {
        group = {
          groupId,
          title: `${reservation.guest_name} (${reservation.reservation_type})`,
          start: new Date(reservation.check_in_date),
          end: new Date(reservation.check_out_date),
          guestName: reservation.guest_name,
          guestEmail: reservation.guest_email,
          guestType: reservation.guest_type,
          description: reservation.additional_notes,
          status: reservation.status,
          reservations: [],
          color: reservation.status === 'waiting' 
                 ? '#F59E0B' 
                 : reservation.status === 'cancelled' 
                 ? '#EF4444' 
                 : reservation.status === 'onCleaning' 
                 ? '#FB923C'
                 : reservation.status === 'onUse' 
                 ? '#60A5FA'
                 : reservation.status === 'done' 
                 ? '#c084fc'
                 : '#10B981' // Default to green if not waiting or cancelled
        };
        acc.push(group);
      }
      
      
      group.reservations.push({
        id: reservation.reservation_id,
        type: reservation.reservation_type,
        roomType: reservation.room_type,
        status: reservation.status,
        room: reservation.reservation
      });
      
      return acc;
    }, []);
  }, [reservationsData]);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: '4px',
      opacity: 0.8,
      color: '#fff',
      border: 'none',
      display: 'block',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleNavigate = (newDate) => setDate(newDate);
  const handleViewChange = (newView) => setView(newView);

  const handleShowMore = (events, date) => {
    setDateEvents(events);
    setSelectedDate(date);
    setShowMoreEvents(true);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationTop handleBackToHome={() => navigate('/')} />
      </div>
      
      <div className="pt-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="my-8">
          <h1 className="text-2xl font-bold text-gray-900">Reservation Calendar</h1>
          <p className="text-gray-600">View all reservations in calendar format</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4" style={{ height: '700px' }}>
          <Calendar 
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            views={views}
            date={date}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            onSelectEvent={handleEventClick}
            onShowMore={handleShowMore}
            eventPropGetter={eventStyleGetter}
            components={{
              toolbar: CustomToolbar,
              event: CustomEvent
            }}
            formats={{
              eventTimeRangeFormat: () => '',
              timeGutterFormat: (date, culture, localizer) =>
                localizer.format(date, 'HH:mm', culture),
              eventTimeRangeEndFormat: ({ start, end }, culture, localizer) =>
                localizer.format(end, 'HH:mm', culture),
            }}
            popup
          />
        </div>

        <EventDialog
          event={selectedEvent}
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
        />

      </div>
    </div>
  );
}