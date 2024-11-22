import React, { memo, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import NotificationBell from "@/components/common/Notification/NotificationBell"; // Import your NotificationBell
import Slogo from "@/assets/images/SchoolLogo.png";
import Hlogo from "@/assets/images/HorizontalLogo.png";
import { UserContext } from "@/context/contexts";
import { Loader2, ArrowLeft } from "lucide-react";
import Modal from "@/components/ui/modal";

const NavigationTop = memo(({ handleBackToHome }) => {
  const { userData, userRole } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center h-14 px-4 bg-[#0f172a] text-white sticky top-0 right-0 z-10">
      {/* Left Section */}
      <div className="flex items-center space-x-2 w-1/4">
        <img src={Hlogo} alt="Logo" className="logoStyle2" />
      </div>

      {/* Center Navigation */}
      <div className="flex justify-center w-1/2">
        <nav className="flex space-x-4">
          {["Home", "Reservation", "Bookings", "Account"].map((title) => (
            <Link
              to={`/${title.toLowerCase()}`}
              className="clientnavtop relative text-slate-100 font-medium"
              key={title}
            >
              {title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 justify-end w-1/4">
        {/* Notification Bell */}
        <NotificationBell />

        {/* User Info */}
        {userData && (
          <div
            className="relative flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-950"
            onClick={toggleDropdown}
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
          <div className="absolute right-0 mt-2 w-60 bg-white text-black rounded-lg shadow-lg z-20 p-3">
            <img src={Slogo} alt="LOGO" className="h-14 w-14 mx-auto mb-2" />
            <p className="text-center font-medium text-lg mb-2">
              {userData.first_name} {userData.last_name}
            </p>
            {userRole === "Administrator" && (
              <Link
                to="/dashboard"
                className="text-center py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all mb-3 rounded-lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            )}
            <Link
              to="/account"
              className="text-center py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all mb-3 rounded-lg"
            >
              Account
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className={`w-full text-center py-2 px-4 bg-[#FCB813] text-white hover:bg-yellow-450 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </div>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        )}
      </div>

      {/* Modal for Reservations */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
    </header>
  );
});

export default NavigationTop;
