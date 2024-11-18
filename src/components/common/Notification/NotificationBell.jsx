import React, { useState } from "react";
import { Bell, Bed, Calendar, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NotificationBell = () => {
  // Local state for notifications
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
      read: true,
    },
    {
      id: 4,
      title: "Room Upgrade Offer",
      description: "Upgrade your room to Deluxe Suite at a discounted rate!",
      icon: <Bed size={16} className="mr-2 text-purple-600" />,
      read: false,
    },
    {
      id: 5,
      title: "Limited Time Discount",
      description: "Enjoy 15% off on your next booking. Offer expires soon!",
      icon: <Calendar size={16} className="mr-2 text-red-600" />,
      read: true,
    },
    {
      id: 6,
      title: "Staff Message",
      description: "The manager has sent you a message regarding your request.",
      icon: <CheckCircle size={16} className="mr-2 text-teal-600" />,
      read: false,
    },
    {
      id: 7,
      title: "Maintenance Notice",
      description: "Maintenance work is scheduled in your area tomorrow at 10 AM.",
      icon: <Calendar size={16} className="mr-2 text-orange-600" />,
      read: true,
    },
    {
      id: 8,
      title: "Special Breakfast Offer",
      description: "Complimentary breakfast for guests staying this weekend!",
      icon: <Bed size={16} className="mr-2 text-yellow-600" />,
      read: false,
    },
    {
      id: 9,
      title: "Check-out Reminder",
      description: "Check-out time is tomorrow at 11 AM. Please plan accordingly.",
      icon: <Calendar size={16} className="mr-2 text-green-600" />,
      read: false,
    },
    {
      id: 10,
      title: "Event Invitation",
      description: "Join us for the Hotel Gala Dinner on Saturday evening!",
      icon: <CheckCircle size={16} className="mr-2 text-pink-600" />,
      read: false,
    },
    {
      id: 11,
      title: "New Feature Update",
      description: "Explore the new loyalty rewards program in your account.",
      icon: <Bed size={16} className="mr-2 text-blue-600" />,
      read: true,
    },
    {
      id: 12,
      title: "Feedback Request",
      description: "Share your thoughts on your recent stay with us!",
      icon: <CheckCircle size={16} className="mr-2 text-gray-600" />,
      read: false,
    },
    {
      id: 13,
      title: "Room Service Update",
      description: "Your dinner order will be delivered within 15 minutes.",
      icon: <Bed size={16} className="mr-2 text-cyan-600" />,
      read: true,
    },
  ]);

  const [notificationsVisible, setNotificationsVisible] = useState(false);

  // Get count of unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read)
    .length;

  // Toggle notification dropdown visibility
  const toggleNotifications = () => {
    setNotificationsVisible((prev) => !prev);
  };

  // Mark all notifications as read
  const markAllAsRead = (e) => {
    e.stopPropagation();
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <div className="relative cursor-pointer">
      {/* Notification Bell Icon */}
      <div onClick={toggleNotifications}>
        <Bell size={24} className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 px-1 min-w-[1rem] h-4 text-[10px] leading-none"
          >
            {unreadCount}
          </Badge>
        )}
      </div>

      {/* Notifications Dropdown */}
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
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start border-b py-2 hover:bg-gray-100 cursor-pointer ${
                  notification.read ? "" : "bg-gray-100"
                }`}
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
    )} 

    </div>
  );
};

export default NotificationBell;
