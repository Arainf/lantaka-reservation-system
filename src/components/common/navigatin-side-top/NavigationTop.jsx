import { memo, useState, useContext } from "react"; 
import { Bell, Menu, Search, Bed, Calendar, CheckCircle } from 'lucide-react'; 
import { Input } from "@/components/ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import './navigationside.css'; 
import { UserContext } from "@/context/contexts";

const NavigationTop = memo(({ onSidebarToggle }) => { 
  const { userData, userRole, userImg } = useContext(UserContext);
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  // Sample notifications data for hotel reservation system
  const notifications = [
    { id: 1, title: "Booking Confirmed", description: "Your booking at the Grand Hotel has been confirmed.", icon: <Bed size={16} className="mr-2 text-blue-600" /> },
    { id: 2, title: "Check-in Reminder", description: "Don't forget to check in at 3 PM today!", icon: <Calendar size={16} className="mr-2 text-green-600" /> },
    { id: 3, title: "Payment Received", description: "Your payment for the upcoming stay has been received.", icon: <CheckCircle size={16} className="mr-2 text-yellow-600" /> },
    { id: 4, title: "Special Offer", description: "Get 20% off your next booking with code SAVE20.", icon: <Bed size={16} className="mr-2 text-purple-600" /> },
    { id: 5, title: "Feedback Request", description: "We would love your feedback on your recent stay.", icon: <CheckCircle size={16} className="mr-2 text-orange-600" /> },
    { id: 6, title: "Upcoming Stay", description: "Your stay at Ocean View Resort starts in 3 days.", icon: <Calendar size={16} className="mr-2 text-red-600" /> },
    { id: 7, title: "Cancellation Notice", description: "Your reservation at Mountain Lodge has been canceled.", icon: <Bed size={16} className="mr-2 text-gray-600" /> },
    { id: 8, title: "New Message", description: "You have a new message from customer support.", icon: <CheckCircle size={16} className="mr-2 text-teal-600" /> },
  ];

  const toggleNotifications = () => {
    setNotificationsVisible(prev => !prev);
  };

  return ( 
    <header className="flex items-center justify-between h-14 px-4 py-2 bg-[#0f172a] text-white sticky top-0 right-0 z-10"> 
      <div className="flex items-center space-x-4"> 
        <div onClick={onSidebarToggle} className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all cursor-pointer"> 
          <Menu size={24} /> 
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div onClick={toggleNotifications} className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all cursor-pointer relative">
          <Bell size={24} />
          {notificationsVisible && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-20 max-h-80 overflow-hidden"> {/* Increased max height to 80 */}
              <div className="p-4"> {/* Increased padding for a larger box */}
                {/* Fixed header for notifications */}
                <div className="font-semibold border-b pb-2">Notifications</div>
                <div className="max-h-72 overflow-y-auto"> {/* Increased max height for content */}
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="flex items-start border-b py-2">
                        {notification.icon}
                        <div>
                          <p className="font-medium text-lg">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.description}</p>
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
        {userData && (
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userImg} alt={userData.first_name} />
              <AvatarFallback>{userData.first_name[0]}{userData.last_name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">Welcome, {userData.first_name}!</p>
              <p className="text-xs text-gray-400">{userRole}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  ); 
});

export default NavigationTop;
