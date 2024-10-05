import { lazy, Suspense, useMemo } from 'react';
import './adminPages.css';
import NavigationSide from '@/components/common/navigatin-side-top/NavigationSide';
import NavigationTop from '@/components/common/navigatin-side-top/NavigationTop';
import ReservationCard from '@/components/common/cards/ReservationCard';
import { IoCalendarSharp, IoPersonSharp, IoCashSharp, IoPeopleSharp } from "react-icons/io5";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FloorPlan from "@/assets/images/Floorplan.svg";
import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';


// Lazy-loaded components
const CustomerTable = lazy(() => import('@/components/common/cards/CustomerTable'));
const BookingCalendar = lazy(() => import('@/components/common/cards/BookingCalendar'));




const Dashboard = ({ sidebarOpen, toggleSidebar }) => {

  const chartData = useMemo(() => [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ], []);

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />
      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />
        <main className="p-20 ">
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-4 row">
              <ReservationCard
                title="Total Bookings"
                icon={IoCalendarSharp}
                value={100}
                percentageChange={20.1}
                percentageSuffix="from last month"
                baseColor='#06402b'
                graphData={chartData}
              />
              <ReservationCard
                title="Available Rooms"
                icon={IoPersonSharp}
                value={20}
                percentageChange={2.5}
                percentageSuffix="from last month"
                baseColor='#06402b'
                graphData={chartData}
              />
              <ReservationCard
                title="Check In"
                icon={IoCashSharp}
                value={71}
                percentageChange={15.3}
                percentageSuffix="from last month"
                baseColor='#EC1C24'
                graphData={chartData}
              />
              <ReservationCard
                title="Check Out"
                icon={IoPeopleSharp}
                value={29}
                percentageChange={7.2}
                percentageSuffix="from last month"
                baseColor='#06402b'
                graphData={chartData}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            

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
                <div className='bg-gray-200 h-[calc(100%-2rem)] p-10 flex items-center justify-center '>
                  <img src={FloorPlan} alt="" />
                </div>
              </CardContent>
            </Card>

            <Suspense fallback={<div>Loading...</div>}>
              <BookingCalendar />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <div className="col-span-3">
                <CustomerTable />
              </div>
            </Suspense>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Other chart placeholders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Line Chart Placeholder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='bg-gray-200 h-48 flex items-center justify-center'>
                  Line Chart Placeholder
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Bar Chart Placeholder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-[auto] min-w-0">
                  <BarChartComponent chartData={chartData} barColor="#494992" />
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
