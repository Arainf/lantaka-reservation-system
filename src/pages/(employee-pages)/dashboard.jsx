import { lazy, Suspense, useMemo, useState, useEffect } from 'react';
import './clientPages.css';
import NavigationTop from '@/components/common/navigatin-side-top/clientNavigationTop';
import ReservationCard from '@/components/common/cards/ReservationCard';
import { IoCalendarSharp, IoPersonSharp, IoCashSharp, IoPeopleSharp } from "react-icons/io5";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FloorPlan from '@/components/common/cards/FloorPlan';
import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';
import { Skeleton } from '@/components/ui/skeleton';
import CustomerTable from '@/components/common/cards/CustomerTable';
import BookingCalendar from '@/components/common/cards/BookingCalendar';
import { DatePickerDemo as DatePicker } from '@/components/common/utilities/DateRangePicker';
import LantakaBg from '@/assets/images/LantakaBG_2.png'
import {Button} from "@/components/ui/button"
// // Lazy-loaded components
// const CustomerTable = lazy(() => import('@/components/common/cards/CustomerTable'));
// const BookingCalendar = lazy(() => import('@/components/common/cards/BookingCalendar'));

// Skeleton components
const FloorPlanSkeleton = () => (
  <Card className='col-span-2 row-span-1'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-10 w-[180px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
);

const BookingCalendarSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
);

const CustomerTableSkeleton = () => (
  <Card className="col-span-3">
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-48 w-full" />
    </CardContent>
  </Card>
);

const AdminDashboard = ({ sidebarOpen, toggleSidebar }) => {
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = useMemo(() => [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ], []);

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-white ">
      <div className="flex-1 overflow-auto ">
                <NavigationTop onSidebarToggle={toggleSidebar} />
              
                <div className="relative bg-[#0f172a]">
                      <img src={LantakaBg} className='w-full h-screen' alt="Background" />
                      <div className="absolute top-0 left-0 pl-48 pt-36 text-3xl font-[Oswald]">
                        <h2 className="text-[#0f172a] ">Buenas dias, Lorem!</h2>
                        <h1 className="text-[#0f172a] font-extrabold text-9xl leading-tight leading-[.9]">
                          A view <br />to the <br />horizon
                        </h1>
                        <h2 className="text-[#0f172a] text-xl mt-4">Pro deo Et Patria</h2>
                        <h2 className="text-[#0f172a] text-xl ">In the service of God and Country</h2>
              
                        <Button className="h-12 w-44 mt-4 px-6 py-3 bg-blue-900 text-white hover:bg-yellow-500 hover:text-black h-200px rounded-none text-lg transition-colors duration-300">
                            View Rooms
                          </Button>                      
                    </div>
                    </div>
                

            <main className="p-6">
            
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <h1 className="text-xl text-gray-400 ">Dashboard</h1>
              <h1 className="text-4xl font-bold mb-4">Overview</h1>
            </div>
            <div className="flex-shrink mt-4 flex flex-row">
              <DatePicker className="min-w-max" />
              <h1 className='m-2 text-center text-[1.2rem] font-[Oswald]'> to </h1>
              <DatePicker />
            </div>
          </div>
        
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-4 row">
              <ReservationCard
                isLoading={loading}
                title="Total Bookings"
                icon={IoCalendarSharp}
                value={100}
                percentageChange={20.1}
                percentageSuffix="from last month"
                baseColor='#06402b'
                graphData={chartData}
              />
              <ReservationCard
                isLoading={loading}
                title="Available Rooms"
                icon={IoPersonSharp}
                value={20}
                percentageChange={2.5}
                percentageSuffix="from last month"
                baseColor='#06402b'
                graphData={chartData}
              />
              <ReservationCard
                isLoading={loading}
                title="Check In"
                icon={IoCashSharp}
                value={71}
                percentageChange={15.3}
                percentageSuffix="from last month"
                baseColor='#EC1C24'
                graphData={chartData}
              />
              <ReservationCard
                isLoading={loading}
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
            {loading ? (
              <FloorPlanSkeleton />
            ) : (
              <FloorPlan/>
            )}


            {loading ? (
              <BookingCalendarSkeleton />
            ) : (
              <BookingCalendar />
            )}

            {loading ? (
              <CustomerTableSkeleton />
            ) : (
              <div className="col-span-3">
                <CustomerTable />
              </div>
            )}

          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <ChartSkeleton />
            {loading ? (
              <ChartSkeleton />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Bar Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-[auto] min-w-0">
                    <BarChartComponent chartData={chartData} barColor="#494992" />
                  </div>
                </CardContent>
              </Card>
            )}
            <ChartSkeleton />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;