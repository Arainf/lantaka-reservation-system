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

  return (
    <tr className="bg-white border-b hover:bg-gray-100 transition duration-200">
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guest.guest}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guest.roomName}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guest.roomType}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{guest.roomFloor}</td>
      <td className="p-4">
        <div className={`inline-block px-3 py-1 text-sm leading-none rounded-sm ${guest.status === 'Confirmed' ? 'bg-emerald-100 text-teal-900' : 'bg-orange-100 text-stone-500'}`}>
          {guest.status}
        </div>
      </td>
      <td className="flex gap-2 items-center p-4 min-h-[60px]">
        <button onClick={handleEdit} className="flex items-center">
          <Edit size={18} />
        </button>
        <button onClick={handleDelete} className="flex items-center">
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default GuestRow;
