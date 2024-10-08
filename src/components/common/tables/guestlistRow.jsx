import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const GuestListRow = ({ guestlist }) => {
  const handleEdit = () => {
    console.log(`Edit user: ${guestlist.user}`);
  };

  const handleDelete = () => {
    console.log(`Delete user: ${guestlist.user}`);
  };

  // Determine the status badge classes
  const status = guestlist.status || 'Unknown';
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
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guestlist.user}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guestlist.email}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guestlist.room}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guestlist.check_in_date}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guestlist.check_out_date}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guestlist.payment_status}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guestlist.noGuest}</td>
      
    </tr>
  );
};

export default GuestListRow;