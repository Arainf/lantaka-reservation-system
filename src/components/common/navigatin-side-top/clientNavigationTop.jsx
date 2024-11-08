import { memo, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import './navigationside.css';
import { UserContext } from "@/context/contexts";
import Slogo from '@/assets/images/SchoolLogo.png';
import Hlogo from '@/assets/images/HorizontalLogo.png';
import Modal from '@/components/ui/modal';
import { Bed, Calendar, CheckCircle } from 'lucide-react';

const NavigationTop = memo(({ handleBackToHome }) => {
    const { userData, userRole } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const [reservationData, setReservationData] = useState({
        name: '',
        date: '',
        time: '',
        guests: 1,
    });

    // Extended sample notifications data for hotel reservation system
    const notifications = [
        { id: 1, title: "Booking Confirmed", description: "Your booking at the Grand Hotel has been confirmed.", icon: <Bed size={16} className="mr-2 text-blue-600" /> },
        { id: 2, title: "Check-in Reminder", description: "Don't forget to check in at 3 PM today!", icon: <Calendar size={16} className="mr-2 text-green-600" /> },
        { id: 3, title: "Payment Received", description: "Your payment for the upcoming stay has been received.", icon: <CheckCircle size={16} className="mr-2 text-yellow-600" /> },
        { id: 4, title: "New Offer!", description: "Special discount available for your next stay. Book now!", icon: <CheckCircle size={16} className="mr-2 text-orange-600" /> },
        { id: 5, title: "Reservation Updated", description: "Your reservation details have been updated.", icon: <Bed size={16} className="mr-2 text-purple-600" /> },
        { id: 6, title: "Reminder: Checkout", description: "Your checkout is scheduled for tomorrow at 11 AM.", icon: <Calendar size={16} className="mr-2 text-red-600" /> },
        { id: 7, title: "New Message", description: "You have a new message from the hotel staff.", icon: <CheckCircle size={16} className="mr-2 text-teal-600" /> },
        { id: 8, title: "Feedback Requested", description: "Please provide feedback on your recent stay.", icon: <CheckCircle size={16} className="mr-2 text-pink-600" /> },
        { id: 9, title: "Upcoming Events", description: "Check out the upcoming events at our hotel!", icon: <Calendar size={16} className="mr-2 text-indigo-600" /> },
        { id: 10, title: "New Amenities", description: "We have added new amenities to enhance your stay!", icon: <Bed size={16} className="mr-2 text-gray-600" /> },
    ];

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
        console.log('Reservation Data:', reservationData);
        setIsModalOpen(false);
    };

    const toggleNotifications = () => {
        setNotificationsVisible(prev => !prev);
    };

    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev); // Toggle dropdown visibility
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="flex justify-between items-center h-14 px-4 bg-[#0f172a] text-white sticky top-0 right-0 z-10">
            {/* Left Section (Logo and Title) */}
            <div className="flex items-center space-x-2 w-1/4">
                <img
                    src={Hlogo}
                    alt="Logo"
                    className="logoStyle2"
                />
            </div>

            {/* Center Section (Navigation Links) */}
            <div className="flex justify-center w-1/2">
                <nav className="flex space-x-4">
                    {[
                        ['Home', 'home'],
                        ['Reservation', 'Reservation'],
                        ['Calendar', 'Calendar'],
                        ['Account', 'account'],
                    ].map(([title, path]) => (
                        <Link
                            to={`/${path}`}
                            className="clientnavtop relative text-slate-100 font-medium"
                            key={title}
                        >
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
                        <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-20 max-h-80 overflow-hidden">
                            <div className="p-4">
                                <div className="font-semibold border-b pb-2">Notifications</div>
                                <div className="max-h-72 overflow-y-auto">
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
                         <img src={Slogo} alt="LOGO" className="h-8 w-8"/>
                        <div className="text-sm">
                            <p className="font-medium">Welcome, {userData.first_name}!</p>
                            <p className="text-xs text-gray-400">{userRole}</p>
                        </div>
                    </div>
                )}
                {/* Dropdown Menu */}
                {dropdownVisible && (
                    <div className="absolute right-0  mt-[280px] w-60 bg-white text-black rounded-lg shadow-lg z-20 p-3">
                        <img src={Slogo} alt="LOGO" className="h-14 w-14 mx-auto mb-2" />
                        <p className="text-center font-medium text-lg mb-2">{userData.first_name} {userData.last_name}</p>
                        <Link
                            to="/account"
                            className="block text-center py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 hover:text-white data-[state=active]:bg-blue-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center mb-3 rounded-lg"
                        >
                            Account
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-center py-2 px-4 shadow-lg hover:shadow-xl transition-shadow bg-[#FCB813] text-white hover:bg-yellow-450 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Modal for Reservations */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalToggle}
                    onSubmit={handleSubmit}
                    reservationData={reservationData}
                    handleChange={handleChange}
                />
            )}
        </header>
    );
});

export default NavigationTop;
