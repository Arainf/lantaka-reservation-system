import React, { useState, useEffect, useContext } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import AccountsTable from "@/components/common/tables/accountsTable"; // Import your GuestTable component
import { ChevronLeft, ChevronRight, Settings, Filter, Search } from "lucide-react";


const Accounts = ({ sidebarOpen, toggleSidebar }) => {


  return (
    
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      {/* Side navigation bar */}
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        {/* Top navigation bar */}
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6">
          <h1 className="text-xl font-bold mb-4">Accounts</h1>

          
        </main>
      </div>
    </div>
  );
};

export default Accounts;
