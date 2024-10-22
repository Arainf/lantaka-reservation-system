import React, { useState } from 'react';
import { BedDouble, Users, Phone, Mail, Calendar, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import  DatePicker  from '@/components/ui/daterangepicker';
import Image from "@/assets/images/LantakaBg.jpg";

export default function ReservationForm() {
    const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  
  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission
    };
  

  return (
    <div className="w-full bg-gray-100 h-screen p-4 flex flex-col overflow-y-auto">
        <div className="w-88">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reservation Form</CardTitle>
        </CardHeader>
       
      </Card>

      <form onSubmit={handleSubmit}>
        <Card className="mb-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomName" className="flex items-center">
                <BedDouble className="mr-2 h-5 w-5" />
                Room Type
              </Label>
              <Select>
                <SelectTrigger id="roomName">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="single-sea">Single Room (Sea View)</SelectItem>
                <SelectItem value="single-garden">Single Room (Garden View)</SelectItem>
                  <SelectItem value="double-sea">Double Room (Sea View)</SelectItem>
                  <SelectItem value="double-garden">Double Room (Garden View)</SelectItem>
                  <SelectItem value="oldTalisayBar">Old Talisay Bar</SelectItem>
                  <SelectItem value="breezahall">Breeza Hall</SelectItem>
                  <SelectItem value="gazebo">Gazebo</SelectItem>
                  <SelectItem value="capizHall">Capiz Hall</SelectItem>
                  <SelectItem value="dinningHall">Dinning Hall</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Name
              </Label>
              <Input id="name" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Contact Number
              </Label>
              <Input id="phone" placeholder="Enter your contact number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Number of Guests
              </Label>
              <Input id="guest" placeholder="Enter number of guests" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Check-in / Check-out
              </Label>
              <DatePicker/>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-blue-500" />
                Total Bill:
              </span>
              <span className="text-2xl font-bold">₱ 1000.00</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit Reservation</Button>
          </CardFooter>
        </Card>
      </form>
      </div>
    </div>
  );
}