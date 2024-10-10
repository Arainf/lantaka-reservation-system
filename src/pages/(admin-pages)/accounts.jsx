import React, { useState, useEffect, useContext } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import AccountsTable from "@/components/common/tables/accountsTable"; // Import your GuestTable component
import { ChevronLeft, ChevronRight, Settings, Filter, Search } from "lucide-react";
import { AccountContext } from "@/context/contexts";

const Accounts = ({ sidebarOpen, toggleSidebar }) => {
  const { accountData } = useContext(AccountContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Initialize Lucide icons after component is mounted
  useEffect(() => {
    createIcons({ icons });
  }, []);

  // Ensure accountData is not null before using it
  if (!accountData) {
    return <div>Loading account data...</div>; // You can replace this with a loading spinner
  }

  // Filter account data based on search input
  const filteredAccounts = accountData.filter((accountData) => 
    accountData?.user?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredAccounts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentAccounts = filteredAccounts.slice(
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
          <h1 className="text-xl font-bold mb-4">Accounts</h1>

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

          {/* Accounts Table Wrapper */}
          <div className="mt-4 rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            <AccountsTable accountData={accountData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Accounts;
