import { memo, useState, useContext } from "react";
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import './navigationside.css';
import { UserContext } from "@/context/contexts";
import logo from '@/assets/images/logo1.png';
import Modal from '@/components/ui/modal';

const NavigationTop = memo(() => {
    const { userData, userRole, userImg } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationData, setReservationData] = useState({
        name: '',
        date: '',
        time: '',
        guests: 1,
    });

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

    return (
        <header className="flex justify-between items-center h-14 px-4 bg-[#0f172a] text-white sticky top-0 right-0 z-[100]">
            {/* Left Section (Logo and Title) */}
            <div className="flex items-center space-x-2 w-1/4">
                <img
                    src={logo}
                    alt="Logo"
                    className="logoStyle2"
                />
                <h1 className="text-xl"> &lt; Lantaka Reservation System / &gt;</h1>
            </div>

            {/* Center Section (Navigation Links) */}
            <div className="flex justify-center w-1/2">
                <nav className="flex space-x-4">
                    {[
                        ['Home', '/home'],
                        ['Reservations', '#calendar'],
                        ['Add Reservation', '#calendar'],
                        ['Account', '/reports'],
                    ].map(([title, url]) => (
                        <a
                            href={url}
                            className="rounded-lg px-3 py-2 text-slate-100 font-medium hover:bg-[#FCB813] hover:text-slate-900"
                            onClick={(event) => {
                                if (title === 'Add Reservation') {
                                    event.preventDefault();
                                    handleModalToggle();
                                }
                            }}
                            key={title}
                        >
                            {title}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Right Section (Bell, Avatar, and User Info) */}
            <div className="flex items-center space-x-2 justify-end w-1/4">
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
