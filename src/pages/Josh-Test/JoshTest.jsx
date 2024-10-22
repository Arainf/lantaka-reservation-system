import React, { useState, useEffect } from "react";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import FirstFloor from "@/components/common/cards/FirstFloor";
import SecondFloorr from "@/components/common/cards/SecondFloorr";
import { Component as BigCalendar } from "@/components/common/calendar/Calendar";

import Image from "@/assets/images/LantakaBg.jpg";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo as DatePicker } from "@/components/common/utilities/DateRangePicker";
import Clock from "@/components/common/time/clock";
import Sidebar from "@/components/common/navigatin-side-top/sidebarDetails";
import FormSidebar from "@/components/common/navigatin-side-top/sidebarReservationForm";

const JoshTest = () => {
  const [selectedFloor, setSelectedFloor] = useState("floor1");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormSidebarOpen, setIsFormSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [buttonNum, setButtonNum] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1920);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsGrabbing(true);
    }
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleFormSidebar = () => {
    setIsFormSidebarOpen(!isFormSidebarOpen);
  };

  // Reset function to trigger resetting of FirstFloor and SecondFloorr components
  const resetState = () => {
    setResetTrigger(true); // Set resetTrigger to true
    setTimeout(() => {
      setResetTrigger(false); // Reset it back to false
    }, 0); // Use 0 to execute immediately
  };

  return (
    <div className="flex flex-col relative w-screen overflow-x-hidden h-screen bg-[#f8f6f2]">
      <NavigationTop />
      <main className="flex-1 p- sm:p-6 flex flex-col h-full space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        {/* Main content area (1) */}
        <div
          className={`relative w-[100%] h-[85vh] overflow-hidden bg-white border border-black rounded-lg ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
        >
          {/* Content here svgmap */}
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
            {/* Status Boxes overlapping the SVG */}
            <div className="absolute bottom-9 left-1/3 flex flex-row mt-5 ml-5 mb-0 p-1.5 space-x-20 z-10">
              <div className="flex items-center">
                <div className="bg-green-500 w-4 h-4 flex items-center justify-center text-white rounded">
                  {/* Empty space for the box */}
                </div>
                <span className="text-black-500 text-sm ml-2">Reserved</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-500 w-4 h-4 flex items-center justify-center text-white rounded">
                  {/* Empty space for the box */}
                </div>
                <span className="text-black-500 text-sm ml-2">Pending</span>
              </div>
              <div className="flex items-center">
                <div className="bg-red-500 w-4 h-4 flex items-center justify-center text-white rounded">
                  {/* Empty space for the box */}
                </div>
                <span className="text-black-500 text-sm ml-2">Canceled</span>
              </div>
            </div>

            {/* Reset button */}
            <Button
              onClick={resetState} // Call reset function on click
              className="px-3 py-1 text-black rounded hover:bg-blue-600 opacity-90"
              style={{ marginLeft: "55%", backgroundColor: "#95c1ff" }} // Set the background color and margin
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
          <Button>
            <p>Internal Reservation &#40;Individual Guest&#41; </p>
          </Button>
          <Button>
            <p>Internal Reservation &#40;Group&#41;</p>
          </Button>
          <Button>
            <p>External Reservation &#40;Individual Guest&#41;</p>
          </Button>
          <Button>
            <p>External Reservation &#40;Group&#41;</p>
          </Button>
          <Button>
            <p>Other Reservations</p>
          </Button>
        </div>
      </main>

      {/* Backdrop */}
      {(isSidebarOpen || isFormSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Room Details Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-1/5 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Form Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isFormSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FormSidebar onClose={toggleFormSidebar} presetNumber={buttonNum} />
      </div>

      <div className="h-auto" id="calendar">
        <BigCalendar className="w-[98%]" style={{ padding: "0" }} />
      </div>
    </div>
  );
};

export default JoshTest;
