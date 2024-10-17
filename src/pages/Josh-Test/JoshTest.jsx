import React, { useState, useEffect } from "react";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import FirstFloor from "@/components/common/cards/FirstFloor";
import SecondFloorr from "@/components/common/cards/SecondFloorr";

import Image from "@/assets/images/LantakaBg.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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

const JoshTest = () => {
  const [selectedFloor, setSelectedFloor] = useState("floor1");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1920);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1920);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      // Detect right-click
      setIsGrabbing(true);
    }
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  return (
    <div className="flex flex-col relative w-screen overflow-hidden h-screen bg-[#f8f6f2]">
      <NavigationTop />

      <main className="flex-1 p-4 sm:p-6 flex flex-col h-full space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        {/* Main content area (1) */}
        <div
          className={`w-[110%] h-[85vh] overflow-hidden bg-white border border-black rounded-lg ${
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
          </div>
          {selectedFloor === "floor1" && <FirstFloor />}
          {selectedFloor === "floor2" && <SecondFloorr />}
        </div>
        {/* Right-side section */}

        <div className="w-full md:w-1/3 flex flex-col space-y-4">
          {/* Top right area (2) */}

          <div className="h-1/4 bg-[#143774] border flex border-gray-200 rounded-lg overflow-hidden">
            <Clock />
          </div>

          {/* Bottom right area (3) */}
          <div className="flex-1 relative bg-white border overflow-hidden border-gray-200 rounded-lg ">
            <div
              className="h-[60%]  relative top-0 bg-slate-600 w-full bg-cover"
              style={{ backgroundImage: `url(${Image})` }}
            >
              <div className="font-[Oswald] p-2 absolute bottom-[22%] flex flex-col font-bold text-white text-2xl">
                <span className="px-2 py-1 bg-green-100 w-1/3 text-green-800 rounded-full text-xs font-semibold text-center">
                  Confirmed
                </span>
                Double Room &#40; Sea View &#41;
              </div>
            </div>

            <div
              className="p-6 space-y-4 h-[54%] flex flex-col absolute bottom-0 bg-[#d9ebff] w-full rounded-tr-[40px]"
              style={{
                boxShadow: "-15px 20px 26px -14px rgba(0,0,0,0.3) inset",
              }}
            >
              <div className="flex items-center h-[85%]">
                <div
                  className="text-center w-[40%]"
                  style={{
                    scale: isLargeScreen ? "1.5" : "1", // Change font size based on screen width
                  }}
                >
                  <span className="text-6xl font-bold ">2</span>
                  <p className="text-xl text-gray-600">Guest</p>
                </div>
                <div
                  className="space-y-2 flex-1"
                  style={{
                    scale: isLargeScreen ? "1.1" : "1", // Change font size based on screen width
                  }}
                >
                  <div className="flex items-center">
                    <MdOutlinePayment className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-semibold">₱ 1000.00</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaCalendarCheck className="w-4 h-4 mr-2 text-green-500" />
                    <span>Check-in: 05-30-24</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaCalendarTimes className="w-4 h-4 mr-2 text-red-500" />
                    <span>Check-out: 05-30-24</span>
                  </div>
                </div>
              </div>

              <Button className="w-[85%] absolute bottom-4  justify-center">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoshTest;
