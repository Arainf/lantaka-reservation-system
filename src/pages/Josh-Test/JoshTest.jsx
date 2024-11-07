'use client'

import React, { useState, useEffect } from "react";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import FirstFloor from "@/components/common/cards/FirstFloor";
import SecondFloorr from "@/components/common/cards/SecondFloorr";
import { Component as BigCalendar } from "@/components/common/calendar/Calendar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerDemo as DatePicker } from "@/components/common/utilities/DateRangePicker";
import Clock from "@/components/common/time/clock";
import Sidebar from "@/components/common/navigatin-side-top/sidebarDetails";
import FormSidebar from "@/components/common/navigatin-side-top/sidebarReservationForm";
import { X, ChevronRight } from "lucide-react";
import { formatDateToYYYYMMDD } from "@/utils/colorsUtils";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const Joshtest = () => {
  const [selectedFloor, setSelectedFloor] = useState("floor1");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormSidebarOpen, setIsFormSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [buttonNum, setButtonNum] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateTranslate, setDateTranslate] = useState("");
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [calendarKey, setCalendarKey] = useState(0);

  useEffect(() => {
    const initialDate = new Date();
    setSelectedDate(initialDate);
    setDateTranslate(formatDateToYYYYMMDD(initialDate));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1920);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const newDate = formatDateToYYYYMMDD(date);
    setDateTranslate(newDate);
    console.log("Selected date in parent:", date);
    console.log("Translated date:", newDate);
  };

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
    setButtonClicked(!buttonClicked);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsFormSidebarOpen(false);
  };

  const resetState = () => {
    setResetTrigger(true);
    setTimeout(() => {
      setResetTrigger(false);
    }, 0);
  };

  const handleCalendarChange = (newValue) => {
    setCalendarValue(newValue);
    setCalendarKey(prevKey => prevKey + 1);
  };

  return (
    <div className="flex flex-col relative w-screen overflow-x-hidden h-screen bg-[#f8f6f2]" id="reservation">
      <NavigationTop />
      <main className="flex-1 sm:p-6 flex flex-col h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        <div
          className={`relative w-[100%] h-[85vh] overflow-hidden bg-white border border-black rounded-lg ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="flex flex-row mb-0 p-1.5 bg-white">
            <div className="mr-2">
              <Select onValueChange={setSelectedFloor} value={selectedFloor}>
                <SelectTrigger style={{ backgroundColor: "#95c1ff" }} className="w-[140px]">
                  <SelectValue placeholder="Select Floor" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: "#95c1ff" }}>
                  <SelectItem value="floor1">Floor One</SelectItem>
                  <SelectItem value="floor2">Floor Two</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DatePicker date={selectedDate} onDateChange={handleDateChange} state={buttonClicked} />
            {/* <div className="absolute bottom-6 flex flex-row justify-between items-center p-4 z-10 left-0" style={{ borderRadius: "10px", width: "22%" }}>
              <div className="flex flex-col items-center justify-center" style={{ backgroundColor: "#8BC34A", borderRadius: "10px", width: "100px", height: "100px" }}>
                <span className="text-5xl font-bold text-green-600">69</span>
                <span className="text-lg text-green-700">Available</span>
              </div>
              <div className="flex flex-col items-center justify-center" style={{ backgroundColor: "#64B5F6", borderRadius: "10px", width: "100px", height: "100px" }}>
                <span className="text-5xl font-bold text-blue-600">69</span>
                <span className="text-lg text-blue-700">Reserve</span>
              </div>
            </div> */}
            <div className="absolute bottom-0 pr-3 flex flex-col items-end z-10 w-full">
              <div className="flex items-center">
                <span className="text-black-500 text-[10px] mr-1">Reserved</span>
                <div className="bg-[#6F42C1] border border-black w-2 h-2 flex items-center justify-center text-white rounded"></div>
              </div>
              <div className="flex items-center">
                <span className="text-black-500 text-[10px] mr-1">Pending</span>
                <div className="bg-[#FFC107] border border-black w-2 h-2 flex items-center justify-center text-white rounded"></div>
              </div>
              <div className="flex items-center">
                <span className="text-black-500 text-[10px] mr-1">Canceled</span>
                <div className="bg-[#DC3545] border border-black w-2 h-2 flex items-center justify-center text-white rounded"></div>
              </div>
              <div className="flex items-center">
                <span className="text-black-500 text-[10px] mr-1">Occupied</span>
                <div className="bg-[#28A745] border border-black w-2 h-2 flex items-center justify-center text-white rounded"></div>
              </div>
              <div className="flex items-center">
                <span className="text-black-500 text-[10px] mr-1">Normal</span>
                <div className="bg-[#87A5EF] border border-black w-2 h-2 flex items-center justify-center text-white rounded"></div>
              </div>
            </div>
            <Button
              onClick={resetState}
              className="px-3 py-1 text-black rounded hover:bg-blue-600 opacity-90"
              style={{ marginLeft: "61%", backgroundColor: "#95c1ff" }}
            >
              Reset
            </Button>
          </div>
          {selectedFloor === "floor1" && (
            <FirstFloor key={calendarKey} resetTrigger={resetTrigger} onRoomClick={toggleSidebar} date={dateTranslate} />
          )}
          {selectedFloor === "floor2" && (
            <SecondFloorr key={calendarKey} resetTrigger={resetTrigger} onRoomClick={toggleSidebar} />
          )}
        </div>

        <div className={`fixed top-0 right-0 h-full w-[35%] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isFormSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        </div>

        <div className={`bg-transparent w-full md:w-1/3 h-full ${buttonClicked ? "flex" : "hidden"}`}>
          <button
            className="absolute rounded-l-lg bg-transparent flex items-center"
            style={{
              top: '80px',
              padding: '11px',
              cursor: 'pointer'
            }}
            onClick={toggleFormSidebar}
          >
            <X className="h-5 w-5" strokeWidth={3} />
          </button>
          <FormSidebar presetNumber={buttonNum} />
        </div>
        <div className={`w-full md:w-1/3 flex-col h-auto space-y-4 ${buttonClicked ? "hidden" : "flex"}`}>
          <div className="h-1/4 bg-[#143774] border flex border-gray-200 rounded-lg overflow-hidden">
            <Clock />
          </div>

          <div className="flex justify-center items-center py-7">
            <h6 className="absolute z-10 text-gray-600 bg-[#f8f6f2] mx-6 px-5 font-bold">QUICK ACTIONS</h6>
            <hr className="w-full border-black z-0" />
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

      {(isSidebarOpen || isFormSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="self-center h-[80vh] w-[90vw] p-5" id="calendar">
        <BigCalendar
          style={{ padding: "0" }}
          onChange={handleCalendarChange}
          value={calendarValue}
        />
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
        />
      </div>
    </div>
  );
}


export default Joshtest