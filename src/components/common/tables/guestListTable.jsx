// GuestTable.js
import React from 'react';
import GuestListRow from './guestlistRow'; // Make sure to create this component

const GuestListTable = ({ listData }) => {
  return (
    <div className="flex flex-wrap items-start mt-4 w-full max-md:max-w-full">
      <table className="w-full border-collapse">
        <TableHeader />
        <tbody>
          {listData.map((guestlist, index) => (
            <GuestListRow key={index} guestlist={guestlist} />
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
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[200px] w-[250px]">User  </th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[250px] w-[250px]">Email</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[200px] w-[200px]">Room</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[250px] w-[250px]">Check-in Date</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[250px] w-[250px]">Check-out Date</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[250px] w-[250px]">Payment Status</th>
        <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[250px] w-[250px]">No. Guest</th>
      </tr>
    </thead>
  );
};

export default GuestListTable;

