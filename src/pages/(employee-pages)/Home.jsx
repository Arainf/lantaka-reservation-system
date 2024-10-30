import React, { useState, useEffect } from "react";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import { ChevronDown } from "lucide-react";
import OurRooms from "@/components/common/cards/rooms";
import LantakaBG from "@/assets/images/LantakaEmployeeBG.png";
import Reservation from "./Reservation";

export default function Component() {
  const [showReservation, setShowReservation] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const ReservationSection = () => {
    setShowReservation(true);
  };

  const handleBackToHome = () => {
    setShowReservation(false);
  };

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 300);
    const buttonTimer = setTimeout(() => setShowButton(true), 1000);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Disable scrolling on body when the component is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling when component is unmounted
    };
  }, []);

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden m-0">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationTop handleBackToHome={handleBackToHome} />
      </div>

      <section
        id="home"
        className={`relative flex flex-col w-full h-screen transition-all duration-1000 ease-in-out overflow-hidden ${
          showReservation ? "transform -translate-y-full" : "translate-y-0"
        }`}
      >
        <img
          loading="lazy"
          src={LantakaBG}
          alt="Lantaka Hotel Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-70 px-20 max-md:px-5">
          <div className="flex flex-col items-center w-full max-w-[687px] text-center mt-16">
            <h1
              className={`text-5xl tracking-[10.5px] max-md:text-4xl font-extralight text-gray-100 transition-all duration-1000 ease-out ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              WELCOME TO
            </h1>
            <h2
              className={`mt-4 text-9xl font-medium tracking-widest leading-none max-md:text-9xl text-gray-100 transition-all duration-1000 ease-out delay-300 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <span>LANTAKA </span>
              <span className="block">HOTEL</span>
            </h2>
            <p
              className={`mt-10 text-center tracking-[2.5px] font-light text-gray-100 transition-all duration-1000 ease-out delay-600 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Pro Deo et Patria
            </p>
            <div
              className={`relative inline-flex items-center justify-start px-6 py-4 mb-2 text-white bg-transparent border border-transparent rounded-lg group transition-all duration-300 ease-in-out ${
                showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              onClick={ReservationSection}
            >
              <span className="mr-2 transition-colors duration-300">
                Reservation
              </span>
              <span className="absolute left-1 bottom-0 w-0 h-0 transition-all duration-300 bg-yellow-500 group-hover:w-[105px] group-hover:h-1" />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`absolute top-0 left-0 right-0 bottom-0 transition-all duration-1000 ease-in-out overflow-hidden ${
          showReservation ? "translate-y-0" : "translate-y-full"
        } overflow-y-auto`}
      >
        <Reservation />
      </section>
    </main>
  );
}
