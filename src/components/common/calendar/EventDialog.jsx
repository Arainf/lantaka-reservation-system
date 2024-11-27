import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import moment from 'moment'

export function EventDialog({ event, isOpen, onClose }) {
  if (!event) return null

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'waiting':
        return '#F59E0B'; // Yellow
      case 'ready':
        return '#4ADE80'; // Green
      case 'cancelled':
        return '#F87171'; // Red
      case 'oncleaning':
        return '#FB923C'; // Orange
      case 'done':
        return '#A78BFA'; // Purple
      case 'onuse':
        return '#60A5FA'; // Blue
      default:
        return '#6B7280'; // Gray
    }
  };
  
 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{event.guestName}'s Reservations</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Guest Details</Label>
                <div className="col-span-3">
                  <p>Email: {event.guestEmail}</p>
                  <p>Type: {event.guestType}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Stay Period</Label>
                <div className="col-span-3">
                  <p>Check-in: {moment(event.start).format('MMMM D, YYYY h:mm A')}</p>
                  <p>Check-out: {moment(event.end).format('MMMM D, YYYY h:mm A')}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Reservations</Label>
                <div className="col-span-3">
                  <div className="space-y-2">
                    {event.reservations.map((res) => (
                      <div 
                        key={res.id} 
                        className="p-3 rounded-lg transition-all"
                        style={{ 
                          backgroundColor: `${getStatusColor(res.status)}20`,
                          borderLeft: `4px solid ${getStatusColor(res.status)}`
                        }}
                      >
                        <p className="font-medium"> {res.room} </p>
                        <p className="text-sm text-gray-600">Reservation ID: {res.id}</p>
                        <p className="text-sm text-gray-600">Type: {res.type}</p>
                        <p className="text-sm font-medium" style={{ color: getStatusColor(res.status) }}>
                          Status: {res.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {event.description && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-semibold">Notes</Label>
                  <div className="col-span-3">{event.description}</div>
                </div>
              )}
            </div>
          </DialogDescription>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}