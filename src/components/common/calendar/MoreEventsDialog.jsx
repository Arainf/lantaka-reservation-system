import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import moment from 'moment'

export function MoreEventsDialog({ isOpen, onClose, date, events }) {
  if (!events?.length) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Events for {moment(date).format('MMMM D, YYYY')}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <div 
                key={event.groupId} 
                className="p-3 rounded-lg cursor-pointer transition-all hover:opacity-80"
                style={{ backgroundColor: event.color + '20', borderLeft: `4px solid ${event.color}` }}
              >
                <div className="font-medium text-gray-900">{event.title}</div>
                <div className="text-sm text-gray-600">
                  {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                </div>
                <div className="text-sm text-gray-600">
                  {event.reservations.length} room{event.reservations.length > 1 ? 's' : ''} reserved
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}