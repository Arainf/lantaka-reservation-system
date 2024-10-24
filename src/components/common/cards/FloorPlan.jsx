"use client"

import { Card, CardContent , CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from 'react'
import FirstFloor from "@/components/common/cards/FirstFloor";
import SecondFloor from "@/components/common/cards/SecondFloorr";
import { DatePickerDemo as DatePicker } from '@/components/common/utilities/DateRangePicker';

export default function FloorPlan() {
  const [selectedFloor, setSelectedFloor] = useState("floor1")
  const [roomColors, setRoomColors] = useState({})

  // Random color generator for rooms (red and green)
  const getRandomColor = () => {
    const colors = ['#e74c3c', '#2ecc71'] // Red and Green colors
    const roomColors = {}

    for (let i = 102; i <= 236; i++) {
      const roomId = `room${i}`
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      roomColors[roomId] = randomColor
    }
    return roomColors
  }

  useEffect(() => {
    const colors = getRandomColor()
    setRoomColors(colors)
  }, [])

  return (
    <div className="container mx-auto">
      <div className="flex flex-row">
        <div className="mr-2">
      <Select onValueChange={setSelectedFloor} value={selectedFloor}>
        <SelectTrigger className="w-[140px] mb-4">
          <SelectValue placeholder="Select Floor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="floor1">Floor One</SelectItem>
          <SelectItem value="floor2">Floor Two</SelectItem>
        </SelectContent>
      </Select>
      </div>
      <DatePicker/>
      </div>

      
    
      <Card className="w-full mx-auto">
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              {/* Floor Plan */}
              <div className="h-[450px] flex justify-start rounded-md overflow-hidden">
                  {selectedFloor === "floor1" ? (
                    
                    <FirstFloor />
                  ) : (
                    <SecondFloor roomColors={roomColors} />
                  )}
              </div>
            </div>
            
            {/* Details Section */}
            <div className="col-span-1 rounded-md p-4 bg-transparent">
              <Card className="bg-[#e5e7eb] " style={{ boxShadow: "-1px 1px 11px 0px rgba(0, 0, 0, 0.75) inset"}}>
                <CardHeader className="px-6 pt-6 pb-2">
                  <h2 className="text-lg font-[Oswald] font-semibold m-0 p-0 ">Reservation Details</h2>
                </CardHeader>
                <CardContent>
                  <div className="">
                    <div className="text-sm">Employee Name: Adrian</div>
                    <div className="text-sm">Guest Name:</div>
                  </div>
                </CardContent>
              </Card>
              
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

                    {/* <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#e74c3c]"></div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#2ecc71]"></div>
                      <span>Available</span>
                    </div> */}
                    {/* Add more details as needed */}