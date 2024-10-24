import React, { useState, useEffect, useRef } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import GuestTable from "@/components/common/tables/guesttable";
import { ChevronLeft, ChevronRight, Settings, Filter, Search, X } from "lucide-react";
import FloorPlan from "@/components/common/cards/FloorPlan";
import FirstFloor from "@/components/common/cards/FirstFloor";
import SecondFloor from "@/components/common/cards/SecondFloorr";

const FilterPopup = ({ isOpen, onClose, filters, setFilters, applyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (category, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleApply = () => {
    applyFilters(localFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Room Type</h3>
            <div className="space-y-2">
              {["Single Bed", "Double Bed"].map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.roomType.includes(type)}
                    onChange={() => handleFilterChange("roomType", type)}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Room Floor</h3>
            <div className="space-y-2">
              {["First Floor", "Second Floor"].map(floor => (
                <label key={floor} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.roomFloor.includes(floor)}
                    onChange={() => handleFilterChange("roomFloor", floor)}
                    className="mr-2"
                  />
                  {floor}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Status</h3>
            <div className="space-y-2">
              {["Confirmed", "Pending", "Cancelled"].map(status => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.status.includes(status)}
                    onChange={() => handleFilterChange("status", status)}
                    className="mr-2"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminReservation = ({ sidebarOpen, toggleSidebar }) => {
  const [reservations, setReservations] = useState([
    { id: 1, guest: "John Doe", roomName: "Room 101", roomType: "Single Bed", roomFloor: "First Floor", status: "Confirmed" },
    { id: 2, guest: "Jane Smith", roomName: "Room 102", roomType: "Double Bed", roomFloor: "Second Floor", status: "Pending" },
    { id: 3, guest: "Alice Johnson", roomName: "Room 103", roomType: "Single Bed", roomFloor: "First Floor", status: "Cancelled" },
    { id: 4, guest: "Bob Brown", roomName: "Room 201", roomType: "Double Bed", roomFloor: "Second Floor", status: "Confirmed" },
    { id: 5, guest: "Charlie Davis", roomName: "Room 202", roomType: "Single Bed", roomFloor: "Second Floor", status: "Pending" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedIds, setSelectedIds] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    roomType: [],
    roomFloor: [],
    status: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    roomType: [],
    roomFloor: [],
    status: [],
  });

  const filterButtonRef = useRef(null);

  useEffect(() => {
    createIcons({ icons });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterButtonRef.current && !filterButtonRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch = reservation.guest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoomType = appliedFilters.roomType.length === 0 || appliedFilters.roomType.includes(reservation.roomType);
    const matchesRoomFloor = appliedFilters.roomFloor.length === 0 || appliedFilters.roomFloor.includes(reservation.roomFloor);
    const matchesStatus = appliedFilters.status.length === 0 || appliedFilters.status.includes(reservation.status);
    return matchesSearch && matchesRoomType && matchesRoomFloor && matchesStatus;
  });

  const totalItems = filteredReservations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = (id) => {
    setReservations(reservations.filter(reservation => reservation.id !== id));
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter(selectedId => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectedIds(isChecked ? currentReservations.map(reservation => reservation.id) : []);
  };

  const applyFilters = (newFilters) => {
    setAppliedFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6">
          <h1 className="text-xl font-bold mb-4">Reservations Management</h1>

          <FloorPlan />
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className="relative mr-2">
                <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center">
                  <Settings size={18} />
                </button>
              </div>
              <span className="mx-2 border-l border-gray-400 h-6"></span>
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

            <div className="flex items-center">
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
              <div className="relative" ref={filterButtonRef}>
                <button
                  className="bg-gray-200 p-2 rounded-lg ml-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={18} />
                </button>
                <FilterPopup
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                  filters={filters}
                  setFilters={setFilters}
                  applyFilters={applyFilters}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            <GuestTable
              guestData={currentReservations}
              onDelete={handleDelete}
              onCheckboxChange={handleCheckboxChange}
              selectedIds={selectedIds}
              onSelectAllChange={handleSelectAllChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReservation;