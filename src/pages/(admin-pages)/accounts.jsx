import React, { useState, useEffect } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import AccountsTable from "@/components/common/tables/accountsTable"; // Import your GuestTable component
import { ChevronLeft, ChevronRight, Settings, Filter, Trash2, Edit, Search } from "lucide-react";



const  Accounts = ({ sidebarOpen, toggleSidebar }) => {
  // Dummy event logs data
    const [accounts, setAccounts] = useState([
      {
        img: "logo1.png",
        user: "John Doe",
        role: "Administrator",
        email: "johndoe@gmail.com",
        username: "johndoe",
        cellphoneNo: "0997-297-3844",
        dob: "1990-01-01",
        gender: "Male",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
        status: "Active"
      },
      {
        img: "logo1.png",
        user: "Jane Smith",
        role: "Employee",
        email: "janesmith@gmail.com",
        username: "janesmith",
        cellphoneNo: "0947-897-3994",
        dob: "1991-02-02",
        gender: "Female",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
        status: "Inactive"
      },
      {
        img: "logo1.png",
        user: "Alice Johnson",
        role: "Employee",
        email: "alicejohnson@gmail.com",
        username: "alicejohnson",
        cellphoneNo: "0995-497-5800",
        dob: "1992-03-03",
        gender: "Female",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
        status: "Active"
      },
      {
        img: "logo1.png",
        user: "Bob Brown",
        role: "Administrator",
        email: "bobbrown@gmail.com",
        username: "bobbrown",
        cellphoneNo: "0996-797-1500",
        dob: "1993-04-04",
        gender: "Male",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
        status: "Inactive"
      },
      {
        img: "logo1.png",
        user: "Charlie Davis",
        role: "Employee",
        email: "charliedavis@gmail.com",
        username: "charliedavis",
        cellphoneNo: "0984-224-0015",
        dob: "1994-05-05",
        gender: "Male",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
        status: "Inactive"
      },
      {
        img: "logo1.png",
        user: "David Lee",
        role: "Employee",
        email: "davidlee@gmail.com",
        username: "davidlee",
        cellphoneNo: "0993-297-3844",
        dob: "1995-06-06",
        gender: "Male",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
        status: "Active"
      },
      {
        img: "logo1.png",
        user: "Emily Chen",
        role: "Administrator",
        email: "emilychen@gmail.com",
        username: "emilychen",
        cellphoneNo: "0949-897-3994",
        dob: "1996-07-07",
        gender: "Female",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
        status: "Inactive"
      },
      {
        img: "logo1.png",
        user: "Frank Wang",
        role: "Employee",
        email: "frankwang@gmail.com",
        username: "frankwang",
        cellphoneNo: "0991-497-5800",
        dob: "1997-08-08",
        gender: "Male",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
        status: "Active"
      },
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
  const filteredAccounts = accounts.filter((eventLog) =>
    eventLog.user.toLowerCase().includes(searchTerm.toLowerCase())
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
    } else {
      console.error(`Invalid page number: ${newPage}`);
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
      
                {/* Reservations Table Wrapper */}
                <div className="mt-4 rounded-lg border border-gray-300 shadow-lg overflow-hidden">
                <AccountsTable accountData={currentAccounts} />
                </div>
              </main>
            </div>
          </div>
        );
      };
      
      export default Accounts;