import React, { useState, useEffect } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import GuestListTable from "@/components/common/tables/guestListTable"; // Import your GuestTable component
import { ChevronLeft, ChevronRight, Settings, Filter, Trash2, Edit, Search } from "lucide-react";

const GuestList = ({ sidebarOpen, toggleSidebar }) => {
  // Dummy event logs data
  const [guestList, setGuestList] = useState([
    { id: 1, user: "John Doe", email: "john@example.com", room: "102", check_in_date: "2022-01-01 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "4" },
    { id: 2, user: "Jane Doe", email: "jane@example.com", room: "202", check_in_date: "2022-01-02 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "2" },
    { id: 3, user: "Bob Smith", email: "bob@example.com", room: "301", check_in_date: "2022-01-03 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "2" },
    { id: 4, user: "Alice Johnson", email: "alice@example.com", room: "212", check_in_date: "2022-01-04 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "2" },
    { id: 5, user: "Mike Brown", email: "mike@example.com", room: "223", check_in_date: "2022-01-05 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Pending", noGuest: "1" },
    { id: 6, user: "Emily Davis", email: "emily@example.com", room: "201", check_in_date: "2022-01-06 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "5" },
    { id: 7, user: "Sarah Taylor", email: "sarah@example.com", room: "304", check_in_date: "2022-01-07 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "3" },
    { id: 8, user: "Kevin White", email: "kevin@example.com", room: "105", check_in_date: "2022-01-08 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "2" },
    { id: 9, user: "Lisa Lee", email: "lisa@example.com", room: "208", check_in_date: "2022-01-09 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Pending", noGuest: "2" },
    { id: 10, user: "Tom Harris", email: "tom@example.com", room: "111", check_in_date: "2022-01-10 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "2" },
    { id: 11, user: "Rachel Martin", email: "rachel@example.com", room: "132", check_in_date: "2022-01-01 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "1" },
    { id: 12, user: "Daniel Hall", email: "daniel@example.com", room: "106", check_in_date: "2022-01-12 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "2" },
    { id: 13, user: "Olivia Walker", email: "olivia@example.com", room: "110", check_in_date: "2022-01-13 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "3" },
    { id: 14, user: "Benjamin Clark", email: "benjamin@example.com", room: "203", check_in_date: "2022-01-14 12:00:00", check_out_date: "2022-01-01 12:00:00", payment_status: "Paid", noGuest: "2" },
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

  // Filter event logs based on search input
  const filteredGuestList = guestList.filter((eventLog) =>
    eventLog.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredGuestList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentGuestList = filteredGuestList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

      
        return (
          <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
            {/* Side navigation bar */}
            <NavigationSide isOpen={sidebarOpen} />
      
            <div className="flex-1 overflow-auto">
              {/* Top navigation bar */}
              <NavigationTop onSidebarToggle={toggleSidebar} />
      
              <main className="p-6">
                <h1 className="text-xl font-bold mb-4">Guest List</h1>
      
                {/* Search and Control Area */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {/* Settings Icon */}
                    <div className="relative mr-2">
                      <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center">
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
                  <GuestListTable listData={currentGuestList} /> {/* Use your GuestTable component */}
                </div>
              </main>
            </div>
          </div>
        );
      };
      
      export default GuestList;