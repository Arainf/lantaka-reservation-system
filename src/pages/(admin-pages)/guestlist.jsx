import React, { useState, useEffect } from 'react';
import { createIcons, icons } from 'lucide';
import NavigationSide from '@/components/common/navigatin-side-top/NavigationSide';
import NavigationTop from '@/components/common/navigatin-side-top/NavigationTop';
import { ChevronLeft, ChevronRight, Settings, Filter, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const guests = [
  { id: 1, user: 'John Doe', email: 'john@example.com', room: '102', check_in_date: '2022-01-01 12:00:00', check_out_date: '2022-01-03 11:00:00', payment_status: 'Paid', noGuest: '4' },
  { id: 2, user: 'Naruto The Shippuden', email: 'nutterto@example.com', room: '103', check_in_date: '2022-01-02 14:00:00', check_out_date: '2022-01-04 10:00:00', payment_status: 'Pending', noGuest: '3' },
  { id: 3, user: 'Whites are Black inside', email: 'panda@example.com', room: '104', check_in_date: '2022-01-03 15:00:00', check_out_date: '2022-01-05 11:00:00', payment_status: 'Cancelled', noGuest: '2' },
  { id: 4, user: 'RicocoSwag', email: 'ricocoswag@example.com', room: '105', check_in_date: '2022-01-04 13:00:00', check_out_date: '2022-01-06 10:00:00', payment_status: 'Paid', noGuest: '1' },
  { id: 5, user: 'RaikoMS', email: 'rqikioms@example.com', room: '106', check_in_date: '2022-01-05 16:00:00', check_out_date: '2022-01-07 12:00:00', payment_status: 'Pending', noGuest: '2' },
  { id: 6, user: 'Tom Wilson', email: 'tom@example.com', room: '106', check_in_date: '2022-01-05 16:00:00', check_out_date: '2022-01-07 12:00:00', payment_status: 'Pending', noGuest: '2' }
];

const getColorStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'paid':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminGuestList({ sidebarOpen, toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter guest list based on search input
  const filteredGuests = guests.filter((guest) =>
    guest.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);
  const currentGuests = filteredGuests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Initialize Lucide icons after component is mounted
  useEffect(() => {
    createIcons({ icons });
  }, []);

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100 font-montserrat">
      {/* Side navigation bar */}
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        {/* Top navigation bar */}
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Guest List</h1>

          {/* Search and Control Area */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                    <Search className="text-gray-900" size={18} />
                  </div>
                <span className="mx-2 border-l border-gray-400 h-6"></span>
              </div>
              <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center">
              <Filter size={18} />
            </button>            
            </div>           
          </div>

          {/* Guest List Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader className="bg-gray-200">
                <TableRow>
                  <TableHead>Guest Info</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>No. of Guests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />
                        <div>
                          <div className="font-medium">{guest.user}</div>
                          <div className="text-sm text-gray-500">{guest.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{guest.room}</TableCell>
                    <TableCell>{guest.check_in_date}</TableCell>
                    <TableCell>{guest.check_out_date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getColorStatus(
                          guest.payment_status
                        )}`}
                      >
                        {guest.payment_status}
                      </span>
                    </TableCell>
                    <TableCell>{guest.noGuest}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalPages > 5 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
