'use client'

import React, { useState, useEffect } from "react";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import FirstFloor from "@/components/common/cards/FirstFloor";
import SecondFloorr from "@/components/common/cards/SecondFloorr";
import { Component as BigCalendar } from "@/components/common/calendar/Calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerDemo as DatePicker } from '@/components/common/utilities/DateRangePicker';
import Clock from '@/components/common/time/clock';
<<<<<<< HEAD
import Sidebar from "@/components/common/navigatin-side-top/sidebarDetails";
=======
import Sidebar from '@/components/common/navigatin-side-top/sidebarDetails'
import FormSidebar from '@/components/common/navigatin-side-top/sidebarReservationForm'
>>>>>>> dce9d9211c3d5177e101fa410330c83fade77adc

const JoshTest = () => {
  const [selectedFloor, setSelectedFloor] = useState("floor1");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormSidebarOpen, setIsFormSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1920);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsGrabbing(true);
    }
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  const toggleSidebar = (roomId) => {
    setSelectedRoom(roomId);
    setIsSidebarOpen(true);
    setIsFormSidebarOpen(false);
  };

  const toggleFormSidebar = () => {
    setIsFormSidebarOpen(true);
    setIsSidebarOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsFormSidebarOpen(false);
    setSelectedRoom(null);
  };

  const resetState = () => {
    setResetTrigger((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col relative w-screen overflow-x-hidden h-screen bg-[#f8f6f2]">
      <NavigationTop />
      <main className="flex-1 p-4 sm:p-6 flex flex-col h-full space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div
          className={`w-[100%] h-[85vh] overflow-hidden bg-white border border-black rounded-lg ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="flex flex-row mt-5 ml-5 mb-0 p-1.5">
            <div className="mr-2">
              <Select onValueChange={setSelectedFloor} value={selectedFloor}>
                <SelectTrigger
                  style={{ backgroundColor: "#95c1ff" }}
                  className="w-[140px]"
                >
                  <SelectValue placeholder="Select Floor" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: "#95c1ff" }}>
                  <SelectItem value="floor1">Floor One</SelectItem>
                  <SelectItem value="floor2">Floor Two</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DatePicker />
            <Button
              onClick={resetState}
              className="px-3 py-1 text-black rounded hover:bg-blue-600 opacity-90"
              style={{ marginLeft: '55%', backgroundColor: '#95c1ff' }}
            >
              Reset
            </Button>
          </div>
          {selectedFloor === "floor1" && <FirstFloor resetTrigger={resetTrigger} onRoomClick={toggleSidebar} />}
          {selectedFloor === "floor2" && <SecondFloorr resetTrigger={resetTrigger} onRoomClick={toggleSidebar} />}
        </div>
        
        <div className="w-full md:w-1/3 flex flex-col h-auto space-y-4">
          <div className="h-1/4 bg-[#143774] border flex border-gray-200 rounded-lg overflow-hidden">
            <Clock />
          </div>
          
          <div className="flex justify-center items-center py-4">
            <h6 className="absolute bg-[#f8f6f2] px-3">Quick Actions</h6>
            <hr className="w-full border-black" />
          </div>

          <Button onClick={toggleFormSidebar}>
            <p>Campus Ministry Office &#40;CMO&#41; Retreat</p>
          </Button>
          <Button onClick={toggleFormSidebar}>
            <p>Internal Reservation &#40;Individual Guest&#41; </p>
          </Button>
          <Button onClick={toggleFormSidebar}>
            <p>Internal Reservation &#40;Group&#41;</p>
          </Button>
          <Button onClick={toggleFormSidebar}>
            <p>External Reservation &#40;Individual Guest&#41;</p>
          </Button>
          <Button onClick={toggleFormSidebar}>
            <p>External Reservation &#40;Group&#41;</p>
          </Button>
          <Button onClick={toggleFormSidebar}> 
            <p>Other Reservations</p>
          </Button>
        </div>
      </main>

      {/* Backdrop */}
      {(isSidebarOpen || isFormSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Room Details Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-1/5 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Sidebar roomId={selectedRoom} onClose={closeSidebar} />
      </div>

      {/* Form Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-1/5 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isFormSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <FormSidebar onClose={closeSidebar} />
      </div>

      <div className="h-auto" id="calendar">
        <BigCalendar className="w-[98%]" style={{padding: "0"}}/>
      </div>
    </div>
  );
};

export default JoshTest;