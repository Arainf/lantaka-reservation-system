import React, { useState, useEffect } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import GuestTable from "@/components/common/tables/guesttable"; // Import your GuestTable component
import { ChevronLeft, ChevronRight, Settings, Filter, Trash2, Edit, Search } from "lucide-react";

const Reservation = ({ sidebarOpen, toggleSidebar }) => {
  // Dummy reservation data
  const [reservations, setReservations] = useState([
    { id: 1, guest: "John Doe", roomName: "Room 101", roomType: "Single Bed", roomFloor: "First Floor", status: "Confirmed" },
    { id: 2, guest: "Jane Smith", roomName: "Room 102", roomType: "Double Bed", roomFloor: "Second Floor", status: "Pending" },
    { id: 3, guest: "Alice Johnson", roomName: "Room 103", roomType: "Single Bed", roomFloor: "Third Floor", status: "Cancelled" },
    // Add more entries here...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // State to manage checkbox selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Initialize Lucide icons after component is mounted
  useEffect(() => {
    createIcons({ icons });
  }, []);

  // Filter reservations based on search input
  const filteredReservations = reservations.filter((reservation) =>
    reservation.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredReservations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle delete action (for demonstration purposes)
  const handleDelete = (id) => {
    setReservations(reservations.filter(reservation => reservation.id !== id));
    // Remove deleted ID from selectedIds
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  // Toggle individual checkbox
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter(selectedId => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // Toggle select all checkboxes
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectedIds(isChecked ? currentReservations.map(reservation => reservation.id) : []);
  };

  // Status Component
  const StatusBadge = ({ status }) => {
    let colorClasses = '';
    if (status === 'Confirmed') {
      colorClasses = 'bg-emerald-100 text-emerald-800';
    } else if (status === 'Pending') {
      colorClasses = 'bg-orange-100 text-orange-800';
    } else if (status === 'Cancelled') {
      colorClasses = 'bg-red-100 text-red-800';
    }
    return (
      <div className={`gap-2 self-stretch px-3 py-1 my-auto rounded-sm ${colorClasses}`} role="status">
        {status}
      </div>
    );
  };

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      {/* Side navigation bar */}
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        {/* Top navigation bar */}
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6">
          <h1 className="text-xl font-bold mb-4">Reservations Management</h1>

          {/* Search and Control Area */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              {/* Settings Icon */}
              <div className="relative mr-2">
                <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center">
                  <Settings size={18} />
                </button>
              </div>
              <span className="mx-2 border-l border-gray-400 h-6"></span>
              {/* Search Input */}
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
              </div>
            </div>

            {/* Pagination and Filter Controls */}
            <div className="flex items-center">
              {/* Pagination Controls */}
              <span className="mr-2">{currentPage} of {totalPages}</span>
              <button
                className="bg-gray-200 p-2 rounded-lg"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="bg-gray-200 p-2 rounded-lg ml-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </button>
              <span className="mx-2 border-l border-gray-400 h-6"></span>
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center ml-2"
                onClick={() => {}}
              >
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Reservations Table Wrapper */}
          <div className="mt-4 rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            <GuestTable guestData={currentReservations} /> {/* Use your GuestTable component */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reservation;