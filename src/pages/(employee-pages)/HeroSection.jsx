'use client'

import React, { useState, useEffect } from "react"
import FirstFloor from "@/components/common/cards/FirstFloor"
import SecondFloorr from "@/components/common/cards/SecondFloorr"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa"
import { MdOutlinePayment } from "react-icons/md"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePickerDemo as DatePicker } from "@/components/common/utilities/DateRangePicker"
import Clock from "@/components/common/time/clock";
import FormSidebar from "@/components/common/navigatin-side-top/sidebarReservationForm"
import { X, Plus } from "lucide-react"
import { formatDateToYYYYMMDD } from "@/utils/colorsUtils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useNavigate} from 'react-router-dom'
import { useReservations, useRoomVenueProvider } from "@/context/contexts"


const Reservation = () => {
  const { bookingSummary } = useReservations()
  
  const [selectedFloor, setSelectedFloor] = useState("floor1")
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateTranslate, setDateTranslate] = useState("")
  const [calendarKey, setCalendarKey] = useState(0)
  const [isFancyMode, setIsFancyMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const initialDate = new Date()
    setSelectedDate(initialDate)
    setDateTranslate(formatDateToYYYYMMDD(initialDate))
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    const newDate = formatDateToYYYYMMDD(date)
    setDateTranslate(newDate)
  }

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsGrabbing(true)
    }
  }

  const handleMouseUp = () => {
    setIsGrabbing(false)
  }

  const toggleFormSidebar = () => {
    setButtonClicked(!buttonClicked)
  }

  const resetState = () => {
    setResetTrigger(true)
    setTimeout(() => {
      setResetTrigger(false)
    }, 0)
  }

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-y-auto bg-background" id="reservation">
      <main className="flex flex-col md:flex-row h-full">
        <div className="flex flex-col md:w-2/3 h-screen  p-4 space-y-4 ">
          <Card className="flex h-screen  flex-col flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Floor Plan</CardTitle>
              <div className="flex items-center space-x-2">
                <Label htmlFor="fancy-mode">Fancy Mode</Label>
                <Switch
                  id="fancy-mode"
                  checked={isFancyMode}
                  onCheckedChange={setIsFancyMode}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center space-x-2 mb-4">
                <Select onValueChange={setSelectedFloor} value={selectedFloor}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floor1">Floor One</SelectItem>
                    <SelectItem value="floor2">Floor Two</SelectItem>
                  </SelectContent>
                </Select>
                <DatePicker date={selectedDate} onDateChange={handleDateChange} state={buttonClicked} />
                <Button
                  onClick={resetState}
                  className="ml-auto"
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
              <div
                className={`relative w-full h-[60vh] overflow-hidden bg-white border border-gray-200 rounded-lg ${
                  isGrabbing ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onContextMenu={(e) => e.preventDefault()}
              >
                {isFancyMode ? (
                  selectedFloor === "floor1" ? (
                    <FirstFloor key={calendarKey} resetTrigger={resetTrigger} onRoomClick={toggleFormSidebar} date={dateTranslate} />
                  ) : (
                    <SecondFloorr key={calendarKey} resetTrigger={resetTrigger} onRoomClick={toggleFormSidebar} />
                  )
                ) : (
                  <SimplifiedFloorPlan floor={selectedFloor} />
                )}
                <LegendOverlay />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col  md:w-1/3 h-auto p-6 space-y-3 overflow-y-auto border-l">
          <Card>
            <CardContent className="p-0">
              <div className="h-1/4 bg-[#143774] border flex border-gray-200 rounded-lg overflow-hidden">
                <Clock />
              </div>
            </CardContent>
          </Card>
          

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button className="w-full justify-start" onClick={() => navigate("/Reservation")}>
                <Plus className="mr-2 h-4 w-4" /> New Reservation
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FaCalendarCheck className="mr-2 h-4 w-4" /> Check-in Guest
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FaCalendarTimes className="mr-2 h-4 w-4" /> Check-out Guest
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MdOutlinePayment className="mr-2 h-4 w-4" /> Process Payment
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  {/* {bookingSummary.total} */}
                  <div className="text-2xl font-bold">{bookingSummary.total}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div>
                  {/* {bookingSummary.rooms} */}
                  <div className="text-2xl font-bold">{bookingSummary.rooms}</div>
                  <div className="text-sm text-muted-foreground">Rooms</div>
                </div>
                <div>
                  {/* {bookingSummary.venues} */}
                  <div className="text-2xl font-bold">{bookingSummary.venues}</div>
                  <div className="text-sm text-muted-foreground">Venues</div>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </div>
      </main>
      
      {buttonClicked && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-background">
            <div className="flex justify-end p-4">
              <Button variant="ghost" onClick={toggleFormSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FormSidebar />
          </div>
        </div>
      )}
    </div>
  )
}

const SimplifiedFloorPlan = ({ floor }) => {
  // Get available rooms from context
  const { availableRooms, fetchEverythingAvailable } = useRoomVenueProvider();

  useEffect(() => {
    // Check if the data is already fetched or not
    if (availableRooms.double_rooms.length === 0) {
      fetchEverythingAvailable();
    }
  }, [availableRooms, fetchEverythingAvailable]);

  // Combine all available rooms and venues into one array
  const allRooms = [
    ...availableRooms.double_rooms,
    ...availableRooms.triple_rooms,
    ...availableRooms.matrimonial_rooms,
    ...availableRooms.venues_holder
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {allRooms.map((room) => (
        <div
          key={room.id}
          className={`aspect-square rounded-md flex items-center justify-center text-sm font-medium ${
            room.is_available
              ? room.type === 'venue'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
              : 'bg-gray-300 text-gray-700 line-through' // For unavailable rooms/venues
          }`}
        >
          {room.id}
        </div>
      ))}
    </div>
  );
};

const LegendOverlay = () => (
  <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded-md shadow-sm">
    <LegendItem color="#6F42C1" label="Reserved" />
    <LegendItem color="#FFC107" label="Pending" />
    <LegendItem color="#DC3545" label="Canceled" />
    <LegendItem color="#28A745" label="Occupied" />
    <LegendItem color="#87A5EF" label="Normal" />
  </div>
)

const LegendItem = ({ color, label }) => (
  <div className="flex items-center mb-1">
    <div className={`w-3 h-3 mr-1 border border-gray-300`} style={{ backgroundColor: color }}></div>
    <span className="text-xs text-gray-600">{label}</span>
  </div>
)

export default Reservation