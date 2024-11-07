import React, { useState, useEffect, useRef } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import GuestTable from "@/components/common/cards/GuestTable";
import { ChevronLeft, ChevronRight, Filter, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteModal from "@/components/ui/deletemodal";

const initialGuests = [
  { id: 1, customer: 'John Doe', email: 'john@example.com', room: '102', check_in_date: '2022-01-01 12:00:00', check_out_date: '2022-01-03 11:00:00', status: 'Confirmed', noGuest: '4' },
  { id: 2, customer: 'Naruto The Shippuden', email: 'nutterto@example.com', room: '103', check_in_date: '2022-01-02 14:00:00', check_out_date: '2022-01-04 10:00:00', status: 'Pending', noGuest: '3' },
  { id: 3, customer: 'Whites are Black inside', email: 'panda@example.com', room: '104', check_in_date: '2022-01-03 15:00:00', check_out_date: '2022-01-05 11:00:00', status: 'Cancelled', noGuest: '2' },
  { id: 4, customer: 'RicocoSwag', email: 'ricocoswag@example.com', room: '105', check_in_date: '2022-01-04 13:00:00', check_out_date: '2022-01-06 10:00:00', status: 'Confirmed', noGuest: '1' },
  { id: 5, customer: 'RaikoMS', email: 'rqikioms@example.com', room: '106', check_in_date: '2022-01-05 16:00:00', check_out_date: '2022-01-07 12:00:00', status: 'Pending', noGuest: '2' },
  { id: 6, customer: 'John Doe', email: 'john@example.com', room: '102', check_in_date: '2022-01-01 12:00:00', check_out_date: '2022-01-03 11:00:00', status: 'Confirmed', noGuest: '4' },
  { id: 7, customer: 'Naruto The Shippuden', email: 'nutterto@example.com', room: '103', check_in_date: '2022-01-02 14:00:00', check_out_date: '2022-01-04 10:00:00', status: 'Pending', noGuest: '3' },
  { id: 8, customer: 'Whites are Black inside', email: 'panda@example.com', room: '104', check_in_date: '2022-01-03 15:00:00', check_out_date: '2022-01-05 11:00:00', status: 'Cancelled', noGuest: '2' },
  { id: 9, customer: 'RicocoSwag', email: 'ricocoswag@example.com', room: '105', check_in_date: '2022-01-04 13:00:00', check_out_date: '2022-01-06 10:00:00', status: 'Confirmed', noGuest: '1' },
  { id: 10, customer: 'RaikoMS', email: 'rqikioms@example.com', room: '106', check_in_date: '2022-01-05 16:00:00', check_out_date: '2022-01-07 12:00:00', status: 'Pending', noGuest: '2' },
  { id: 11, customer: 'Tom Wilson', email: 'tom@example.com', room: '106', check_in_date: '2022-01-05 16:00:00', check_out_date: '2022-01-07 12:00:00', status: 'Pending', noGuest: '2' }
];

export default function AdminGuest({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    room: [],
    status: []
  });
  const [tempFilters, setTempFilters] = useState({
    room: [],
    status: []
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState(null);
  const [guests, setGuests] = useState(initialGuests);

  useEffect(() => {
    createIcons({ icons });

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoom = filters.room.length === 0 || filters.room.includes(guest.room);
    const matchesStatus = filters.status.length === 0 || filters.status.includes(guest.status);
    return matchesSearch && matchesRoom && matchesStatus;
  });

  const handleDelete = (id) => {
    const guestToDelete = guests.find(guest => guest.id === id);
    setGuestToDelete(guestToDelete);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (guestToDelete) {
      setGuests(prevGuests => prevGuests.filter(guest => guest.id !== guestToDelete.id));
      setDeleteModalOpen(false);
      setGuestToDelete(null);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit guest with id: ${id}`);
  };

  const handleTempFilterChange = (filterType, value) => {
    setTempFilters(prevFilters => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      room: [],
      status: []
    });
    setTempFilters({
      room: [],
      status: []
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const rooms = [...new Set(guests.map(g => g.room))];
  const statuses = [...new Set(guests.map(g => g.status))];

  const activeFilters = [...filters.room, ...filters.status];

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Guest List Management</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search className="text-gray-900" size={18} />
                </div>
              </div>
              <div className="relative" ref={filterRef}>
                <Button
                  variant="outline"
                  className="ml-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                {isFilterOpen && (
                  <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {/* Filter options */}
                  </div>
                )}
              </div>
              {(activeFilters.length > 0 || searchTerm) && (
                <Button
                  variant="ghost"
                  className="ml-2"
                  onClick={resetFilters}
                  title="Reset all filters"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary">
                  {filter}
                </Badge>
              ))}
            </div>
          )}
          <GuestTable
            data={filteredGuests}
            onDelete={handleDelete}
            onEdit={handleEdit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={guestToDelete ? guestToDelete.customer : ""}
        itemType="Guest"
      />
    </div>
  );
}