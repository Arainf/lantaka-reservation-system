// GuestTable.js
import React from 'react';
import EventsLogRow from './eventlogsrow'; // Make sure to create this component

const EventsLogTable = ({ userData }) => {
  return (
    <div className="flex flex-wrap items-start mt-4 w-full max-md:max-w-full">
      <table className="w-full border-collapse">
        <TableHeader />
        <tbody>
          {userData.map((eventlog, index) => (
            <EventsLogRow key={index} eventLog={eventlog} />
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
    <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[400px] w-[400px]">User  </th>
    <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[400px] w-[400px]">Event Type</th>
    <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[400px] w-[400px]">Event Description</th>
    <th className="p-4 text-xs font-semibold leading-none text-left text-neutral-1000 min-w-[400px] w-[400px]">Date & Time</th> 

  </tr>
</thead>
  );
};

export default EventsLogTable;

