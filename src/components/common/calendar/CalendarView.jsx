import { useRef, useEffect } from 'react';
import Calendar from '@event-calendar/core';
import DayGrid from '@event-calendar/day-grid';
import TimeGrid from '@event-calendar/time-grid';
import List from '@event-calendar/list';
import '@event-calendar/core/index.css';

export default function CalendarView({ events, onEventClick }) {
  const calendarRef = useRef(null);

  useEffect(() => {
    let ec;
    const initializeCalendar = () => {
      if (calendarRef.current) {
        ec = new Calendar({
          target: calendarRef.current,
          props: {
            plugins: [DayGrid, TimeGrid, List],
            options: {
              view: getInitialView(),
              events,
              height: 'calc(100vh - 100px)', // Make calendar take up most of the viewport height
              headerToolbar: {
                start: 'prev,next today',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              },
              eventClick: ({ event }) => {
                onEventClick?.(event);
              },
              eventDidMount: ({ el, event }) => {
                el.title = event.title;
              },
              nowIndicator: true,
              editable: true,
              selectable: true,
              // Group events by reservation type
              eventGrouping: true,
              eventContent: (arg) => {
                const groupId = arg.event.groupId;
                if (groupId) {
                  const groupEvents = arg.view.getEvents().filter(e => e.groupId === groupId);
                  return {
                    html: `
                      <div class="group-event">
                        <div class="group-title">${arg.event.title}</div>
                        <div class="group-count">${groupEvents.length} items</div>
                      </div>
                    `
                  };
                }
                return arg.event.title;
              },
              eventDidMount: ({ event, el }) => {
                if (event.groupId) {
                  el.style.backgroundColor = '#f3f4f6';
                  el.style.borderLeft = '4px solid #6366f1';
                }
              },
              // Custom styling for grouped events
              eventClassNames: (arg) => {
                return arg.event.groupId ? ['grouped-event'] : [];
              },
            },
          },
        });
      }
    };

    const getInitialView = () => {
      const width = window.innerWidth;
      if (width < 768) return 'timeGridDay';
      if (width < 1024) return 'timeGridWeek';
      return 'dayGridMonth';
    };

    const handleResize = () => {
      if (ec) {
        ec.setOption('view', getInitialView());
      }
    };

    initializeCalendar();
    window.addEventListener('resize', handleResize);

    return () => {
      if (ec) ec.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, [events]);

  return (
    <div 
      ref={calendarRef}
      className="calendar-wrapper rounded-lg shadow-lg bg-white p-4"
      style={{ 
        height: 'calc(100vh - 100px)',
        width: '100%',
        maxWidth: '100%'
      }}
    />
  );
}

