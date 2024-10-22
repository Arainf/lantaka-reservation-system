import { useState } from 'react';
import { BedDouble, Users, Phone, Mail} from 'lucide-react';
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
      

      <Card className="mb-4">
            <img 
            src={Image} 
            alt="Room Background" 
            className="object-cover w-full h-full rounded-md mb-4" // Adjust size as needed
          />
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <BedDouble className="mr-2 h-8 w-8 "/>
              <span className="font-bold text-2xl items-center">Double Room (Sea View)</span>
            </div>

            <div className="flex items-center pt-4">
              <span className="font-semibold text-2xl" >John Smith</span>
            </div>
            

            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>Johnsmith@gmail.com</span>
            </div> 
            
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>0992-451-2334</span>
            </div>    

            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>2 Guests</span>
            </div>          
            <div className="flex items-center text-sm">
              <FaCalendarCheck className="w-4 h-4 mr-2 text-green-500" />
              <span>Check-in: 05-30-24</span>
            </div>
            <div className="flex items-center text-sm">
              <FaCalendarTimes className="w-4 h-4 mr-2 text-red-500" />
              <span>Check-out: 05-30-24</span>
              </div>  
            <div className="flex items-center ">
              <MdOutlinePayment className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-semibold">₱ 1000.00</span>
            </div>
            
          </div>
        </CardContent>
      </Card>


    </div>
  );
}
