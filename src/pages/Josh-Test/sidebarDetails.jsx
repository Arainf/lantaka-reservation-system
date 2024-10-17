import { useState } from 'react';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import Image from "@/assets/images/LantakaBg.jpg"; // Verify this path

export default function Sidebar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return (
    <div className="w-92 bg-gray-100 h-screen p-4 flex flex-col">
      <div className="mb-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Floor One" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="floor-one">Floor One</SelectItem>
            <SelectItem value="floor-two">Floor Two</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="mb-4 w-full justify-start">
        <CalendarIcon className="mr-2 h-4 w-4" /> October 17th, 2024
      </Button>

      <Card className="mb-4">
            <img 
            src={Image} 
            alt="Room Background" 
            className="object-cover w-full h-full rounded-md mb-4" // Adjust size as needed
          />
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Room Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Double Room (Sea View)</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>2 Guests</span>
            </div>
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
        </CardContent>
      </Card>
      
      <Button className="w-[95%] absolute bottom-4  justify-center">Reserve</Button>

    </div>
  );
}
