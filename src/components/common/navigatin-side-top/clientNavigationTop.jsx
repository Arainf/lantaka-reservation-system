import { memo, useState, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import './navigationside.css';
import { UserContext } from "@/context/contexts";
import Slogo from '@/assets/images/SchoolLogo.png';
import Hlogo from '@/assets/images/HorizontalLogo.png';
import Modal from '@/components/ui/modal';

const NavigationTop = memo(({ handleBackToHome }) => {
    const { userData, userRole } = useContext(UserContext);
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
        <header className="flex justify-between items-center h-14 px-4 bg-[#0f172a] text-white sticky top-0 right-0 z-[50]">
            <div className="flex items-center space-x-2 w-1/4">
                <img src={Hlogo} alt="Logo" className="logoStyle2" />
            </div>

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

            <div className="flex items-center space-x-2 justify-end w-1/4">
                <div className="text-gray-400 hover:text-[#fcb813] hover:scale-110 transition-all cursor-pointer">
                    <Bell size={24} />
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
            </div>

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
