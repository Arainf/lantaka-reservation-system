// GuestTable.js
import React from 'react';
import GuestRow from './GuestRow'; // Make sure to create this component

const GuestTable = ({ guestData }) => {
  return (
    <div className="flex flex-wrap items-start mt-4 w-full max-md:max-w-full">
      <table className="w-full border-collapse">
        <TableHeader />
        <tbody>
          {guestData.map((guest, index) => (
            <GuestRow key={index} guest={guest} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr className="bg-white">
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-900 min-w-[240px] w-[292px]">Guest</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-900">Room Name</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-900">Room Type</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-900">Room Floor</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-900">Status</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-900 w-[139px]">Actions</th>
      </tr>
    </thead>
  );
};

export default GuestTable;
