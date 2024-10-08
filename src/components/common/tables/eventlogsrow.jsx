import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const EventLogsRow = ({ eventLog }) => {
  const handleEdit = () => {
    console.log(`Edit user: ${eventLog.user}`);
  };

  const handleDelete = () => {
    console.log(`Delete user: ${eventLog.user}`);
  };

  // Determine the status badge classes
  const status = eventLog.status || 'Unknown';
  const statusClasses = (() => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-teal-900'; // Green for confirmed
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'; // Orange for pending
      case 'Cancelled':
        return 'bg-red-100 text-red-700'; // Red for cancelled
      default:
        return 'bg-gray-100 text-gray-700'; // Default style if needed
    }
  })();

  return (
    <tr className="bg-white border-b hover:bg-gray-100 transition duration-200 min-h-[60px]">
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{eventLog.user}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{eventLog.eventType}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{eventLog.eventDescription}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{eventLog.eventDate}</td>
      <td className="p-4"> 
      </td>
      <td className="flex gap-2 items-center p-4 min-h-[60px]">
      </td>
    </tr>
  );
};

export default EventLogsRow;