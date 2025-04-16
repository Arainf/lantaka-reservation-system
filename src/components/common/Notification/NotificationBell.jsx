import React, { useState, useEffect, useRef } from "react";
import { Bell, Plus, Trash2, Calendar, Pencil } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/context/notificationContext";

const NotificationBell = () => {
  const { notifications, markAllAsRead } = useNotifications();
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const notificationRef = useRef(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || '';
    const filtered = notifications.filter(notification => {
      if (userRole === 'Administrator') {
        return notification.notification_role === 'Administrator';
      } else if (userRole === 'Employee') {
        return notification.notification_role === 'Employee';
      }
      return false;
    });
    setFilteredNotifications(filtered);
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setNotificationsVisible(prev => !prev);
  };

  const handleMarkAllAsRead = (e) => {
    e.stopPropagation();
    markAllAsRead();
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Added' || 'Create':
        return <Plus size={28} className="mr-2 text-green-600" />;
      case 'Deleted':
        return <Trash2 size={28} className="mr-2 text-red-600" />;
      case 'Reserve':
        return <Calendar size={28} className="mr-2 text-blue-600" />;
      case 'Upcoming':
        return <Calendar size={28} className="mr-2 text-yellow-600" />;
      case 'Modified':
        return <Pencil size={28} className="mr-2 text-violet-600" />;
      default:
        return <Bell size={28} className="mr-2 text-gray-600" />;
    }
  };

  return (
    <div className="relative" ref={notificationRef}>
      <div onClick={toggleNotifications} className="cursor-pointer">
        <Bell size={24} className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all" />
        {filteredNotifications.length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-[0] px-1 w-4 h-4 text-center align-middle justify-center rounded-xl text-[10px] leading-none"
          >
            {filteredNotifications.length}
          </Badge>
        )}
      </div>

      {notificationsVisible && (
        <div className="absolute right-0 mt-2 w-96 bg-white text-black rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold">Notifications</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs focus:outline-none"
              >
                Mark all as read
              </Button>
            </div>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.notification_id}
                  className="flex items-start border-b py-2 hover:bg-gray-100"
                >
                  {getIcon(notification.notification_type)}
                  <div>
                    <p className="font-medium text-sm">{notification.notification_type}</p>
                    <p className="text-xs text-gray-600">{notification.notification_description}</p>
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

