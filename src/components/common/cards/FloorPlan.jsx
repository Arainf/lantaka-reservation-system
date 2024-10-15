"use client"

import { Card, CardContent , CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from 'react'
import FirstFloor from "./FirstFloor"
import SecondFloor from "./SecondFloor"
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
      <Select onValueChange={setSelectedFloor} value={selectedFloor}>
        <SelectTrigger className="w-[140px] mb-4">
          <SelectValue placeholder="Select Floor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="floor1">Floor One</SelectItem>
          <SelectItem value="floor2">Floor Two</SelectItem>
        </SelectContent>
      </Select>
    
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
              <Card className="bg-transparent">
                <CardHeader>
                  <h2 className="text-lg font-semibold mb-4">Room Details</h2>
                  <DatePicker/>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    <p>Total Rooms: {selectedFloor === "floor1" ? "X" : "36"}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#e74c3c]"></div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#2ecc71]"></div>
                      <span>Available</span>
                    </div>
                    {/* Add more details as needed */}
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