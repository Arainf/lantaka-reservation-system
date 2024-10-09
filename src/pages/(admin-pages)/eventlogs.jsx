import React, { useState, useEffect } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import EventsLogTable from "@/components/common/tables/eventlogstable"; // Import your GuestTable component
import { ChevronLeft, ChevronRight, Settings, Filter, Trash2, Edit, Search } from "lucide-react";

const  AdminEventLogs = ({ sidebarOpen, toggleSidebar }) => {
  // Dummy event logs data
  const [eventLogs, setEventLogs] = useState([
    { id: 1, user: "John Doe", eventType: "Login", eventDescription: "User logged in successfully", eventDate: "2022-01-01 12:00:00" },
    { id: 2, user: "Jane Smith", eventType: "Logout", eventDescription: "User logged out successfully", eventDate: "2022-01-01 13:00:00" },
    { id: 3, user: "Alice Johnson", eventType: "Create Account", eventDescription: "User created a new account", eventDate: "2022-01-01 14:00:00" },
    { id: 4, user: "Bob Brown", eventType: "Update Profile", eventDescription: "User updated their profile information", eventDate: "2022-01-01 15:00:00" },
    { id: 5, user: "Charlie Davis", eventType: "Delete Account", eventDescription: "User deleted their account", eventDate: "2022-01-01 16:00:00" },
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
  const filteredEventLogs = eventLogs.filter((eventLog) =>
    eventLog.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredEventLogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentEventLogs = filteredEventLogs.slice(
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
                <h1 className="text-xl font-bold mb-4">Event Logs</h1>
      
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
                  <EventsLogTable userData={currentEventLogs} /> {/* Use your GuestTable component */}
                </div>
              </main>
            </div>
          </div>
        );
      };
      
      export default  AdminEventLogs;