import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const AccountsRow = ({ accounts }) => {
  const handleEdit = () => {
    console.log(`Edit user: ${accounts.user}`);
  };

  const handleDelete = () => {
    console.log(`Delete user: ${accounts.user}`);
  };

  // Determine the status badge classes
  const status = accounts.status || 'Unknown';
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
      <td>
        <img src={accounts.imageUrl} className="w-10 h-10 rounded-full text-center mx-auto" />
      </td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.firstName} {accounts.lastName}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.role}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.email}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.username}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.PhoneNumber}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.dob}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.gender}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.created_at}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.updated_at}</td>
      <td className="px-4 py-5 text-sm leading-none text-neutral-700">{accounts.status}</td>
      <td className="p-4"> 
      </td>
      
    </tr>
  );
};

export default AccountsRow;