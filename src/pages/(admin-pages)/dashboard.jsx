import { useMemo, useState, useEffect } from 'react';
import './adminPages.css';
import NavigationSide from '@/components/common/navigatin-side-top/NavigationSide';
import NavigationTop from '@/components/common/navigatin-side-top/NavigationTop';
import ReservationCard from '@/components/common/cards/ReservationCard';
import { IoCalendarSharp, IoBedSharp, IoCashSharp, IoPersonSharp, IoMailOutline, IoCloudUploadOutline, IoDocumentTextOutline, IoShareSocialOutline } from "react-icons/io5";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';
import { Skeleton } from '@/components/ui/skeleton';
import CustomerTable from '@/components/common/cards/CustomerTable';
import { DatePickerDemo as DatePicker } from '@/components/common/utilities/DateRangePicker';
import { Button } from "@/components/ui/button";

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
  const [dateRange, setDateRange] = useState("04/12/2023 - 04/01/2024");

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

  const occupancyData = useMemo(() => [
    { month: "Jan", occupancy: 65, revenue: 15000 },
    { month: "Feb", occupancy: 70, revenue: 17000 },
    { month: "Mar", occupancy: 75, revenue: 18500 },
    { month: "Apr", occupancy: 80, revenue: 20000 },
    { month: "May", occupancy: 85, revenue: 22000 },
    { month: "Jun", occupancy: 90, revenue: 24000 },
    { month: "Jul", occupancy: 95, revenue: 26000 },
    { month: "Aug", occupancy: 100, revenue: 28000 },
    { month: "Sep", occupancy: 90, revenue: 24000 },
    { month: "Oct", occupancy: 85, revenue: 22000 },
    { month: "Nov", occupancy: 80, revenue: 20000 },
    { month: "Dec", occupancy: 75, revenue: 18500 },
  ], []);

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-[#f8f6f2]">
      <NavigationSide isOpen={sidebarOpen} />
      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />
        <main className="p-6">
          <div className="flex w-full justify-between items-center mb-6">
            <div className="flex flex-col">
              <h1 className="text-xl text-gray-400">Home / Dashboard</h1>
              <h2 className="text-3xl font-bold">Welcome back, Hotel Manager!</h2>
              <p className="text-gray-500">Here's what's happening with your hotel today.</p>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-md shadow-sm p-2">
              <DatePicker className="text-sm font-medium" />
              <span className="text-gray-500">-</span>
              <DatePicker className="text-sm font-medium" />
              <div className="flex space-x-1 ml-2">
                <Button variant="ghost" size="icon">
                  <IoMailOutline className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <IoCloudUploadOutline className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <IoDocumentTextOutline className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <IoShareSocialOutline className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ReservationCard
              isLoading={loading}
              title="TOTAL BOOKINGS"
              icon={IoCalendarSharp}
              value={152}
              percentageChange={8}
              percentageSuffix="from last week"
              baseColor='#001f3f'
            />
            <ReservationCard
              isLoading={loading}
              title="AVAILABLE ROOMS"
              icon={IoBedSharp}
              value={24}
              percentageChange={-15}
              percentageSuffix="from yesterday"
              baseColor='#001f3f'
            />
            <ReservationCard
              isLoading={loading}
              title="REVENUE"
              icon={IoCashSharp}
              value={28750}
              percentageChange={12}
              percentageSuffix="from last month"
              baseColor='#001f3f'
            />
            <ReservationCard
              isLoading={loading}
              title="GUESTS"
              icon={IoPersonSharp}
              value={89}
              percentageChange={5}
              percentageSuffix="currently checked in"
              baseColor='#001f3f'
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {loading ? (
              <ChartSkeleton />
            ) : (
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Occupancy & Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] w-full">
                    <BarChartComponent chartData={occupancyData} />
                  </div>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Room Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Single Rooms</span>
                    <span>30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Double Rooms</span>
                    <span>40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suites</span>
                    <span>20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deluxe Rooms</span>
                    <span>10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerTable />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Upcoming Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-gray-500">Room 101 - 2 nights</p>
                    </div>
                    <span className="text-sm">In 2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Jane Smith</p>
                      <p className="text-sm text-gray-500">Room 205 - 5 nights</p>
                    </div>
                    <span className="text-sm">In 4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Bob Johnson</p>
                      <p className="text-sm text-gray-500">Room 310 - 3 nights</p>
                    </div>
                    <span className="text-sm">Tomorrow</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;