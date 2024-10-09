import { memo , useState, useContext } from "react";
import { Bell, Menu, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import './navigationside.css';
import { UserContext } from "@/context/contexts";
import logo from '@/assets/images/logo1.png';

const NavigationTop = memo(({ onSidebarToggle }) => {
  const { userData, userRole, userImg } = useContext(UserContext);

  return (
    <header className="flex justify-between items-center h-14 px-4 py- bg-[#0f172a] text-white sticky top-0 right-0 z-10">
    
    {/* First Div (Logo and Title) on the left */}
    <div className="flex items-center space-x-2"> {/* Reduced space-x-4 to space-x-2 */}
        <img
            src={logo} // Logo image
            alt="AteneoSeal" // Alt text for logo
            className="logoStyle2" // Logo styling class
        />
        <h1 className="text-xl"> &lt; Lantaka Reservation System / &gt;</h1>
    </div>

    {/* Second Div (Navigation) in the center */}
    <div className="flex-grow flex justify-center">
        <nav className="flex space-x-2 text-base"> {/* Reduced space-x-4 to space-x-2 */}
            {[
                ['Home', '/home'],
                ['Reservations', '/team'],
                ['Add Reservation', '/projects'],
                ['Account', '/reports'],
            ].map(([title, url]) => (
                <a href={url} className="rounded-lg px-3 py-2 text-slate-100 font-medium hover:bg-slate-200 hover:text-slate-900">{title}</a>
            ))}
        </nav>
    </div>

    {/* Third Div (Search, Notifications, and User Info) on the right */}
    <div className="flex items-center space-x-2"> {/* Reduced space-x-4 to space-x-2 */}
        <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border-none rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all cursor-pointer">
            <Bell size={24} />
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