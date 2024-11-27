import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

const EventModalContent = ({ event }) => {
  return (
    <div>
      <ScrollArea className="p-6 max-h-[60vh]">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Date & Time</h3>
            <p className="text-gray-600">
              {format(new Date(event.start), 'PPpp')} - {format(new Date(event.end), 'PPpp')}
            </p>
          </div>

          {event.groupId && (
            <div>
              <h3 className="font-medium text-gray-900">Group Details</h3>
              <div className="space-y-2">
                {event.view.getEvents()
                  .filter(e => e.groupId === event.groupId)
                  .map((groupEvent, index) => (
                    <div key={groupEvent.id} className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">{groupEvent.title}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(groupEvent.start), 'PPpp')} - {format(new Date(groupEvent.end), 'PPpp')}
                      </p>
                      {groupEvent.extendedProps.description && (
                        <p className="text-sm text-gray-600 mt-1">{groupEvent.extendedProps.description}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {!event.groupId && event.extendedProps.description && (
            <div>
              <h3 className="font-medium text-gray-900">Description</h3>
              <p className="text-gray-600">{event.extendedProps.description}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EventModalContent;

