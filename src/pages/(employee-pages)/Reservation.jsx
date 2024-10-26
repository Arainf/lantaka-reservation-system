import React, { useState, useEffect } from "react";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import FirstFloor from "@/components/common/cards/FirstFloor";
import SecondFloorr from "@/components/common/cards/SecondFloorr";
import { Component as BigCalendar } from "@/components/common/calendar/Calendar";
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
import Sidebar from "@/components/common/navigatin-side-top/sidebarDetails";
import FormSidebar from "@/components/common/navigatin-side-top/sidebarReservationForm";
import { X, ChevronRight } from "lucide-react";
import { formatDateToYYYYMMDD } from "@/utils/colorsUtils";
import LantakaBG from '@/assets/images/LantakaEmployeeBG.png'

const Reservation = () => {
  const [selectedFloor, setSelectedFloor] = useState("floor1");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormSidebarOpen, setIsFormSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [buttonNum, setButtonNum] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [date, setDate] = React.useState("")
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateTranslate, setDateTranslate] = useState("")
  const xnewDate = formatDateToYYYYMMDD(selectedDate);
  const [showRooms, setShowRooms] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showMainContent, setShowMainContent] = useState(false);

  const mainSection = () => {
  setShowMainContent(true); // Ensure this line executes
};
  

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 300)
    const buttonTimer = setTimeout(() => setShowButton(true), 1000)
    return () => {
      clearTimeout(textTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  // Disable scrolling on body when the component is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Restore scrolling when component is unmounted
    };
  }, []);
  useEffect(() => {
    setDate(new Date())
    setSelectedDate(new Date()) 
    setDateTranslate(xnewDate) // Update the selected date state
  }, [])


  console.log(selectedDate)

  const handleDateChange = (date) => {
    setSelectedDate(date)  // Update the selected date state
    const newDate = formatDateToYYYYMMDD(selectedDate);
    setDateTranslate(newDate);  // Update the date translation state
    console.log("Selected date in parent:", date)  // Log the selected date
  }

  console.log(dateTranslate)

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
    // setIsFormSidebarOpen(!isFormSidebarOpen);
    setButtonClicked(!buttonClicked); // Set buttonClicked to true
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsFormSidebarOpen(false);
  };

  // Reset function to trigger resetting of FirstFloor and SecondFloorr components
  const resetState = () => {
    setResetTrigger(true); // Set resetTrigger to true
    setTimeout(() => {
      setResetTrigger(false); // Reset it back to false
    }, 0); // Use 0 to execute immediately
  };

  return (
    
    <div className="flex flex-col relative w-screen overflow-x-hidden h-screen bg-[#f8f6f2]" id="reservation">
      <NavigationTop />
      <div className={`relative flex flex-col w-screen h-screen transition-all duration-1000 ease-in-out    p-20  `}>

      <img
          loading="lazy"
          src={LantakaBG}
          alt="Lantaka Hotel Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
       <div  
  className="relative flex flex-col justify-center items-center bg-black bg-opacity-70 py-[182.6px]  px-5" // Added py-10 for vertical padding
  style={{
    width: "1500px",
    height:"1000px",
    position: "relative",
    left: "-80px",
    top: "-190px",
    
    }}
>

        
        


          <div className="flex flex-col items-center w-screen   text-center mt-16">
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
              We provide excellent accommodation.
            </p>
            <div onClick={mainSection}
  className={`relative inline-flex items-center justify-start px-6 py-2 top-2 mb-2 text-white bg-transparent border border-transparent rounded-lg group focus:outline-none focus:ring-0 transition-all duration-300 ease-in-out ${
    showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}
  

>
<span className="mr-2 transition-colors duration-300 text-2xl">Reservation</span> {/* Change text-lg to desired size */}
<span className="absolute left-1 bottom-0 w-0 h-0 transition-all duration-300 bg-yellow-500 group-hover:w-[140px] group-hover:h-1" />
</div>
          </div>
        </div>
      </div>
      <main className="flex-1 p- sm:p-6 flex flex-col h-full space-y-4 md:flex-row md:space-y-0 md:space-x-4" >
        {/* Main content area (1) */}
        <div
          className={`relative w-[100%] h-[85vh] overflow-hidden bg-white border border-black rounded-lg ${isGrabbing ? "cursor-grabbing" : "cursor-grab"
            }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
        >
          <div className="flex flex-row mt-1 ml-5 mb-0 p-1.5">
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
            <DatePicker date={selectedDate} onDateChange={handleDateChange} />
            {/* Box for room/event availability */}
            <div
              className="absolute bottom-6 flex flex-row justify-between items-center p-4 z-10 left-0"
              style={{
                // Adjust background to match the dark theme
                borderRadius: "10px", // Slightly adjust corner radius
                width: "22%", // Set the width similar to your preference
              }}
            >
              {/* Available box */}
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  backgroundColor: "#8BC34A", // Green background for Available
                  borderRadius: "10px", // Border radius to match the squares
                  width: "100px", // Set the width/height of the squares
                  height: "100px",
                }}
              >
                <span className="text-5xl font-bold text-green-600">69</span>{" "}
                {/* Adjust text size and color */}
                <span className="text-lg text-green-700">Available</span>
              </div>

              {/* Reserved box */}
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  backgroundColor: "#64B5F6", // Blue background for Reserved
                  borderRadius: "10px",
                  width: "100px",
                  height: "100px",
                }}
              >
                <span className="text-5xl font-bold text-blue-600">69</span>
                <span className="text-lg text-blue-700">Reserve</span>
              </div>
            </div>
            {/* Status Boxes */}
            <div
              className="absolute bottom-0 left-0 right-0 flex flex-row justify-center items-center mt-1 p-1.5 space-x-20 z-10 w-full"
              style={{ backgroundColor: "#95c1ff" }}
            >
              <div className="flex items-center">
                <div className="bg-green-500 border border-black w-4 h-4 flex items-center justify-center text-white rounded"></div>
                <span className="text-black-500 text-sm ml-2">Reserved</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-500 border border-black w-4 h-4 flex items-center justify-center text-white rounded"></div>
                <span className="text-black-500 text-sm ml-2">Pending</span>
              </div>
              <div className="flex items-center">
                <div className="bg-red-500 border border-black w-4 h-4 flex items-center justify-center text-white rounded"></div>
                <span className="text-black-500 text-sm ml-2">Canceled</span>
              </div>
            </div>
            {/* Reset button */}
            <Button
              onClick={resetState} // Call reset function on click
              className="px-3 py-1 text-black rounded hover:bg-blue-600 opacity-90"
              style={{ marginLeft: "61%", backgroundColor: "#95c1ff" }}
            >
              Reset
            </Button>
          </div>
          {selectedFloor === "floor1" && (
            <FirstFloor resetTrigger={resetTrigger} onRoomClick={toggleSidebar} date={dateTranslate} />
          )}
          {selectedFloor === "floor2" && (
            <SecondFloorr resetTrigger={resetTrigger} onRoomClick={toggleSidebar} />
          )}
        </div>

        <div
        className={`fixed top-0 right-0 h-full w-[35%] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isFormSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        
        
        
        
      
        </div>

        <div className={`bg-transparent w-full md:w-1/3 h-full ${buttonClicked ? "flex" : "hidden"}`}>
  <button
    className="absolute rounded-l-lg bg-transparent flex items-center"
    style={{
      top: '20x',  
      left: '1096px',
      
      padding: '11px',
      cursor: 'pointer' 
    }}
    onClick={toggleFormSidebar}
  >
    <X className="h-[30px] w-8" strokeWidth={5} />
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
                {/*Guest_Clients  */}
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
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Room Details Sidebar */}
      {/* <div
        className={`fixed top-0 right-0 h-full w-1/5 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <Sidebar />
      </div> */}

      {/* Form Sidebar */}


      

      <div className="h-auto" id="calendar">
        <BigCalendar className="w-[98%]" style={{ padding: "0" }} />
      </div>
    </div>
    
  );
};

export default Reservation;
