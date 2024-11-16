'use client'

import { memo, useState, useContext } from "react"
import { Bell, Menu, Bed, Calendar, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserContext } from "@/context/contexts"
import Slogo from '@/assets/images/SchoolLogo.png'
import { Link } from 'react-router-dom'

const notifications = [
  { id: 1, title: "Booking Confirmed", description: "Your booking at the Grand Hotel has been confirmed.", icon: <Bed size={14} className="mr-2 text-blue-600" />, unread: true },
  { id: 2, title: "Check-in Reminder", description: "Don't forget to check in at 3 PM today!", icon: <Calendar size={14} className="mr-2 text-green-600" />, unread: true },
  { id: 3, title: "Payment Received", description: "Your payment for the upcoming stay has been received.", icon: <CheckCircle size={14} className="mr-2 text-yellow-600" />, unread: false },
  { id: 4, title: "Special Offer", description: "Get 20% off your next booking with code SAVE20.", icon: <Bed size={14} className="mr-2 text-purple-600" />, unread: false },
  { id: 5, title: "Feedback Request", description: "We would love your feedback on your recent stay.", icon: <CheckCircle size={14} className="mr-2 text-orange-600" />, unread: false },
  { id: 6, title: "Room Upgrade Available", description: "Upgrade your room to a deluxe suite for just $50 more per night.", icon: <Bed size={14} className="mr-2 text-pink-600" />, unread: true },
  { id: 7, title: "Exclusive Deal", description: "Book your next stay within the next 7 days and receive a 15% discount.", icon: <Calendar size={14} className="mr-2 text-red-600" />, unread: true },
  { id: 8, title: "New Payment Method Added", description: "You have successfully added a new payment method to your account.", icon: <CheckCircle size={14} className="mr-2 text-teal-600" />, unread: false },
  { id: 9, title: "Event Reminder", description: "Reminder: Your event at the Grand Hall starts at 6 PM today.", icon: <Bed size={14} className="mr-2 text-indigo-600" />, unread: true },
  { id: 10, title: "Check-out Reminder", description: "Don't forget to check out before noon tomorrow to avoid additional charges.", icon: <Calendar size={14} className="mr-2 text-gray-600" />, unread: false },
  { id: 11, title: "Welcome Back", description: "Welcome back! We’re glad to see you again. Enjoy your stay.", icon: <CheckCircle size={14} className="mr-2 text-purple-600" />, unread: true },
  { id: 12, title: "Important Update", description: "Our hotel management system has been updated. Please check for the latest features.", icon: <Bed size={14} className="mr-2 text-blue-400" />, unread: false },
  { id: 13, title: "Security Alert", description: "Unusual activity detected in your account. Please verify your details.", icon: <CheckCircle size={14} className="mr-2 text-red-600" />, unread: true },
  { id: 14, title: "Seasonal Offer", description: "Book now and save up to 30% off for the upcoming holiday season!", icon: <Bed size={14} className="mr-2 text-yellow-600" />, unread: false },
  { id: 15, title: "VIP Member Benefits", description: "As a VIP member, enjoy priority booking and exclusive discounts on your next stay.", icon: <CheckCircle size={14} className="mr-2 text-orange-600" />, unread: true }
]

const NavigationTop = memo(({ onSidebarToggle }) => {
  const { userData, userRole } = useContext(UserContext)
  const [notificationsVisible, setNotificationsVisible] = useState(false)
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => n.unread).length)

  const toggleNotifications = () => {
    setNotificationsVisible(prev => !prev)
  }

  const markAllAsRead = () => {
    setUnreadCount(0)
    // In a real application, you would also update the notifications state and possibly send an API request
  }

  return (
    <header className="flex items-center justify-between h-16 px-6 py-3 bg-[#0f172a] text-white sticky top-0 right-0 z-10">
      <div className="flex items-center space-x-6">
        <div onClick={onSidebarToggle} className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all cursor-pointer">
          <Menu size={28} />
        </div>
        <Link to="/home">
          <Button variant="default" className="text-lg py-3 px-5">
            Employee Page
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <Button
          variant="default"
          className="relative text-white hover:text-[#fcb813] text-lg w-100 h-10 flex items-center justify-center" // Smaller button
            onClick={toggleNotifications}
          >
            <Bell size={24} /> {/* Smaller icon */}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 px-2 min-w-[1.5rem] h-6 text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
          {notificationsVisible && (
  <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-20">
    <div className="p-3 border-b flex justify-between items-center">
      <span className="font-semibold text-sm">Notifications</span>
      <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
        Mark all as read
      </Button>
    </div>
    <ScrollArea className="h-96"> {/* Increased height here */}
      {notifications.map(notification => (
        <div key={notification.id} className="flex items-start p-3 hover:bg-gray-100">
          {notification.icon}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{notification.title}</p>
            <p className="text-xs text-gray-600 truncate">{notification.description}</p>
          </div>
          {notification.unread && (
            <Badge variant="secondary" className="ml-2 text-[10px]">New</Badge>
          )}
        </div>
      ))}
    </ScrollArea>
  </div>
)}

        </div>
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
  )
})

NavigationTop.displayName = "NavigationTop"

export default NavigationTop
