import React from 'react';
import './adminPages.css';
import NavigationSide from '@/components/common/navigatin-side-top/NavigationSide';
import NavigationTop from '@/components/common/navigatin-side-top/NavigationTop';
import ReservationCard from '@/components/common/cards/ReservationCard';
import { IoCalendarSharp, IoPersonSharp, IoCashSharp, IoPeopleSharp } from "react-icons/io5";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import CustomerTable from '@/components/common/cards/CustomerTable';
import BookingCalendar from '@/components/common/cards/BookingCalendar';



const Dashboard = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />
      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />
        <main className="p-6">
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-4 row">
              <ReservationCard
                title="Total Bookings"
                icon={IoCalendarSharp}
                value={172}
                percentageChange={20.1}
                percentageSuffix="from last month"
              />
              <ReservationCard
                title="Available Rooms"
                icon={IoPersonSharp}
                value={103}
                percentageChange={2.5}
                percentageSuffix="from last month"
              />
              <ReservationCard
                title="Check In"
                icon={IoCashSharp}
                value={71}
                percentageChange={15.3}
                percentageSuffix="from last month"
              />
              <ReservationCard
                title="Check Out"
                icon={IoPeopleSharp}
                value={29}
                percentageChange={7.2}
                percentageSuffix="from last month"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <BookingCalendar/>
        
            <Card className='col-span-2 row-span-1'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className="text-xl font-bold">Hotel Floor Plan</CardTitle>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floor1">Floor One</SelectItem>
                    <SelectItem value="floor2">Floor Two</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className='bg-gray-200 h-[calc(100%-2rem)] flex items-center justify-center'>
                  Floor Plan Placeholder
                </div>
              </CardContent>
              {/* Booking calendar */}
            </Card>
              <div className="col-span-3">
                <CustomerTable/>
              </div>

          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Placeholder cards for different chart types */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Chart Title</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='bg-gray-200 h-48 flex items-center justify-center'>
                  Line Chart Placeholder
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Chart Title</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='bg-gray-200 h-48 flex items-center justify-center'>
                  Pie Chart Placeholder
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Chart Title</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='bg-gray-200 h-48 flex items-center justify-center'>
                  Bar Chart Placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;