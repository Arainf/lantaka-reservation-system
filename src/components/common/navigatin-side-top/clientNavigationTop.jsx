import React, { memo, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Loader2, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserContext } from "@/context/contexts";
import Slogo from "@/assets/images/SchoolLogo.png";
import Hlogo from "@/assets/images/HorizontalLogo.png";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/common/Notification/NotificationBell"; // Import NotificationBell

const NavigationTop = memo(({ handleBackToHome }) => {
  const { userData, userRole } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center h-14 px-4 bg-[#0f172a] text-white sticky top-0 right-0 z-10">
      {/* Left Section (Logo and Title) */}
      <div className="flex items-center space-x-2 w-1/4">
        <img src={Hlogo} alt="Logo" className="logoStyle2" />
      </div>

      {/* Center Section (Navigation Links) */}
      <div className="flex justify-center w-1/2">
        <nav className="flex space-x-4">
          {[["Home", "home"], ["Reservation", "Reservation"], ["Calendar", "Calendar"], ["Account", "account"]].map(([title, path]) => (
            <Link to={`/${path}`} className="clientnavtop relative text-slate-100 font-medium" key={title}>
              {title}
              <span className="linkTextStyle"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Section (Bell, Avatar, and User Info) */}
      <div className="flex items-center space-x-2 justify-end w-1/4">
        {/* Integrated NotificationBell */}
        <NotificationBell />

        {/* User Avatar and Info */}
        {userData && (
          <div
            className="relative flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
            onMouseEnter={() => setDropdownVisible(true)}
          >
            <img src={Slogo} alt="LOGO" className="h-8 w-8" />
            <div className="text-sm">
              <p className="font-medium">Welcome, {userData.first_name}!</p>
              <p className="text-xs text-gray-400">{userRole}</p>
            </div>
          </div>
        )}

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <div
            className="absolute right-0 mt-[21%] w-60 bg-white text-black rounded-lg shadow-lg z-20 p-3"
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <img src={Slogo} alt="LOGO" className="h-14 w-14 mx-auto mb-2" />
            <p className="text-center font-medium text-lg mb-2">
              {userData.first_name} {userData.last_name}
            </p>
            {userRole === "Administrator" && (
              <Link
                to="/dashboard"
                className="text-center py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 hover:text-white data-[state=active]:bg-blue-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center mb-3 rounded-lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            )}
            <Link
              to="/account"
              className=" text-center py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 hover:text-white data-[state=active]:bg-blue-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center mb-3 rounded-lg"
            >
              Account
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className={`w-full py-2 px-4 ${isLoading ? "bg-gray-500" : "bg-red-600"} text-white rounded-lg shadow-md transition-all`}
            >
              {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Logout"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
});

export default NavigationTop;
