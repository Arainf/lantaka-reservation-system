import React, { useState, useEffect } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import { ChevronLeft, ChevronRight, Settings, Filter, Search } from "lucide-react";

const AdminEventLogs = ({ sidebarOpen, toggleSidebar }) => {
  // Dummy event logs data
  const [eventLogs, setEventLogs] = useState([
    { id: 1, user: "John Doe", eventType: "Login", eventDescription: "User  logged in successfully", eventDate: "2022-01-01 12:00:00" },
    { id: 2, user: "Jane Smith", eventType: "Logout", eventDescription: "User  logged out successfully", eventDate: "2022-01-01 13:00:00" },
    { id: 3, user: "Alice Johnson", eventType: "Create Account", eventDescription: "User  created a new account", eventDate: "2022-01-01 14:00:00" },
    { id: 4, user: "Bob Brown", eventType: "Update Profile", eventDescription: "User  updated their profile information", eventDate: "2022-01-01 15:00:00" },
    { id: 5, user: "Charlie Davis", eventType: "Delete Account", eventDescription: "User  deleted their account", eventDate: "2022-01-01 16:00:00" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  // EventsLogTable component
  const EventsLogTable = ({ userData }) => {
    return (
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">User </th>
            <th className="py-3 px-6 text-left">Event Type</th>
            <th className="py-3 px-6 text-left">Event Description</th>
            <th className="py-3 px-6 text-left">Event Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-montserrat-extrabold">
          {userData.length > 0 ? (
            userData.map((eventLog) => (
              <tr key={eventLog.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-6">{eventLog.user}</td>
                <td className="py-3 px-6">{eventLog.eventType}</td>
                <td className="py-3 px-6">{eventLog.eventDescription}</td>
                <td className="py-3 px-6">{new Date(eventLog.eventDate).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-3 px-6 text-center">No event logs available.</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      {/* Side navigation bar */}
      <NavigationSide isOpen={sidebarOpen } />

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
            <div className ="flex items-center">
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft size={18} />
              </button>
              <span className="mx-2">{currentPage} / {totalPages}</span>
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight size={18} />
              </button>
              <span className="mx-2 border-l border-gray-400 h-6"></span>
              <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Event Logs Table */}
          <EventsLogTable userData={currentEventLogs} />
        </main>
      </div>
    </div>
  );
};

export default AdminEventLogs;