// GuestRow.js
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const GuestRow = ({ guest }) => {
  const handleEdit = () => {
    console.log(`Edit guest: ${guest.guest}`);
  };

  const handleDelete = () => {
    console.log(`Delete guest: ${guest.guest}`);
  };

  // Determine the status badge classes
  const statusClasses = (() => {
    switch (guest.status) {
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
    <tr className="bg-white border-b hover:bg-gray-100 transition duration-200">
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guest.guest}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guest.roomName}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guest.roomType}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guest.roomFloor}</td>
      <td className="p-4">
        <div className={`inline-block px-3 py-1 text-sm leading-none rounded-sm ${statusClasses}`}>
          {guest.status}
        </div>
      </td>
      <td className="flex gap-2 items-center p-4 min-h-[60px]">
        <button onClick={handleEdit} className="flex items-center bg-gray-200">
          <Edit size={18}  />
        </button>
        <button onClick={handleDelete} className="flex items-center bg-red-500">
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default GuestRow;