import React from 'react'
import NavigationSide from '@/components/common/navigatin-side-top/NavigationSide'
import NavigationTop from '@/components/common/navigatin-side-top/NavigationTop'
import ReservationCard from '@/components/common/cards/ReservationCard'
import { IoCalendarSharp, IoPersonSharp, IoCashSharp, IoPeopleSharp } from "react-icons/io5"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

const Dashboard = () => {
  return (
    <div className='flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100'>
      {/* Side navigation bar */}
      <NavigationSide />
      <div className='flex-1 overflow-auto'>
        {/* Top navigation bar */}
        <NavigationTop />
        <main className='p-6'>
          {/* Main grid layout for the dashboard, consisting of 2 sections */}
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6'>
            {/* Large card displaying the hotel floor plan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Booking Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>
            <Card className='col-span-3 row-span-2'>
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
            

            {/* Right section with booking calendar and reservation cards */}
            <div className='flex flex-col gap-4 justify-self-center'>
              

              {/* Various reservation statistics in cards */}
              <ReservationCard
                title="Total Reservations"
                icon={IoCalendarSharp}
                value={1234}
                percentageChange={20.1}
                percentageSuffix="from last month"
              />
              <ReservationCard
                title="Occupancy Rate"
                icon={IoPersonSharp}
                value={78.5}
                percentageChange={2.5}
                valueSuffix="%"
                percentageSuffix="from last month"
              />
              <ReservationCard
                title="Revenue"
                icon={IoCashSharp}
                value={52345}
                percentageChange={15.3}
                valuePrefix="₱"
                percentageSuffix="from last month"
              />
              <ReservationCard
                title="Active Guests"
                icon={IoPeopleSharp}
                value={312}
                percentageChange={7.2}
                percentageSuffix="from last month"
              />
            </div>
          </div>

          {/* Second section for displaying charts */}
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
  )
}

export default Dashboard
