import React, { memo, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Loader2,
  ArrowLeft,
  Bed,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./navigationside.css";
import { UserContext } from "@/context/contexts";
import Slogo from "@/assets/images/SchoolLogo.png";
import Hlogo from "@/assets/images/HorizontalLogo.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const NavigationTop = memo(({ handleBackToHome }) => {
  const { userData, userRole } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Booking Confirmed",
      description: "Your booking at the Grand Hotel has been confirmed.",
      icon: <Bed size={16} className="mr-2 text-blue-600" />,
      read: false,
    },
    {
      id: 2,
      title: "Check-in Reminder",
      description: "Don't forget to check in at 3 PM today!",
      icon: <Calendar size={16} className="mr-2 text-green-600" />,
      read: false,
    },
    {
      id: 3,
      title: "Payment Received",
      description: "Your payment for the upcoming stay has been received.",
      icon: <CheckCircle size={16} className="mr-2 text-yellow-600" />,
      read: false,
    },
    {
      id: 4,
      title: "New Offer!",
      description: "Special discount available for your next stay. Book now!",
      icon: <CheckCircle size={16} className="mr-2 text-orange-600" />,
      read: false,
    },
    {
      id: 5,
      title: "Reminder: Late Checkout",
      description: "You can request a late checkout up to 2 PM.",
      icon: <Calendar size={16} className="mr-2 text-blue-600" />,
      read: false,
    },
    {
      id: 6,
      title: "Maintenance Update",
      description: "Scheduled maintenance on the hotel's pool from 8 AM to 12 PM tomorrow.",
      icon: <Bed size={16} className="mr-2 text-red-600" />,
      read: false,
    },
    {
      id: 7,
      title: "New Feedback Received",
      description: "You have a new feedback from a previous guest.",
      icon: <CheckCircle size={16} className="mr-2 text-teal-600" />,
      read: false,
    },
    {
      id: 8,
      title: "System Update",
      description: "The reservation system will be down for 15 minutes due to maintenance.",
      icon: <Calendar size={16} className="mr-2 text-purple-600" />,
      read: false,
    },
    // Add more notifications as needed...
  ]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({
      ...reservationData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Reservation Data:", reservationData);
    setIsModalOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsVisible((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark all as read
  const markAllAsRead = (e) => {
    e.stopPropagation();  // Prevent closing the dropdown
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
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
        {/* Notification Bell */}
        <div onClick={toggleNotifications} className="relative cursor-pointer">
          <Bell size={24} className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all" />
          {notificationsVisible && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="font-semibold border-b pb-2">Notifications</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs focus:outline-none"
                  >
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start border-b py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {notification.icon}
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-gray-600">{notification.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-600">No notifications.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

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
