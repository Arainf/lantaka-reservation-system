import { useEffect, useState } from "react";
import { Bell, Menu, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import './navigationside.css';


const NavigationTop = ({ onSidebarToggle }) => {
  const [profile, setProfile] = useState({
    imageUrl: "", // Will be dynamically fetched
    name: "Adrian Rainier Fabian",
    email: "220622@adzu.edu.ph",
  });
  
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setLoading(true); // Show spinner
      try {
        // Simulate a delay for logout process (replace with actual logout logic)
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async logout
        // Perform any logout logic here if needed (e.g., clearing tokens)
        navigate('/');  // Redirect to the login page
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        setLoading(false); // Hide spinner
      }
    }
  };

  return (
    <header className="flex items-center justify-between h-14 px-4 py-2 bg-[#0f172a] text-white sticky top-0 right-0  z-10">
    <div className="flex items-center space-x-4">
      <div onClick={onSidebarToggle} className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all cursor-pointer">
        <Menu size={24} />
      </div>
       <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          type="search" 
          placeholder="Search..." 
          className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border-none rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    
    <div className="flex items-center space-x-4">
      <div className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all cursor-pointer">
        <Bell size={24} />
      </div>
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Adrian" />
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <p className="font-medium">Welcome, Adrian!</p>
          <p className="text-xs text-gray-400">Administrator</p>
        </div>
      </div>
    </div>
  </header>
  );
};

export default NavigationTop;
