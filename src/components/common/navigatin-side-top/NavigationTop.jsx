'use client'

import { memo, useContext } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/contexts";
import Slogo from "@/assets/images/SchoolLogo.png";
import { Link } from "react-router-dom";
import NotificationBell from "@/components/common/Notification/NotificationBell"; // Import your NotificationBell component

const NavigationTop = memo(({ onSidebarToggle }) => {
  const { userData, userRole } = useContext(UserContext);

  return (
    <header className="flex items-center justify-between h-16 px-6 py-3 bg-[#0f172a] text-white sticky top-0 right-0 z-10">
      <div className="flex items-center space-x-6">
        <div
          onClick={onSidebarToggle}
          className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all cursor-pointer"
        >
          <Menu size={28} />
        </div>
        <Link to="/home">
          <Button variant="default" className="text-lg py-3 px-5">
            Employee Page
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        {/* Integrating NotificationBell */}
        <NotificationBell />

        {userData && (
          <div className="flex items-center space-x-3">
            <img src={Slogo} alt="LOGO" className="h-8 w-8" />
            <div className="text-sm">
              <p className="font-medium">Welcome, {userData.first_name}!</p>
              <p className="text-[11px] text-gray-400">{userRole}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

NavigationTop.displayName = "NavigationTop";

export default NavigationTop;
