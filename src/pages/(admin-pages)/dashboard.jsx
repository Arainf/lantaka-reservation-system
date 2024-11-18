import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Mail, FileText, CircleDollarSign, CircleUserRound, Book, BedSingle } from 'lucide-react';
import ReservationCard from "@/components/common/cards/ReservationCard";
import { Component as RevenueChartComponent } from "@/components/common/charts/LineChartComponent";
import { Component as OccupancyChartComponent } from "@/components/common/charts/BarChartComponent";
import { Component as PieChartComponent } from "@/components/common/charts/PieChartComponent";
import { Component as StackedChartComponent } from "@/components/common/charts/StackedChartComponent";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import { DatePickerDemo as DatePicker } from "@/components/common/utilities/DateRangePicker";
import Footer from "@/components/common/footer/Footer";
import { useDashboardContext } from '@/context/dashboardContext'
import { DashboardDatePickerDemo as DashboardDatePicker  } from '@/components/common/utilities/DashboardDatePicker';

const AdminDashboard = () => {
  const { loading, occupancyData, visitorData, revenueData, roomTypeData } = useDashboardContext(); // Access context data

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />
      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl text-gray-400">Home / Dashboard</h1>
              <h2 className="text-3xl font-bold">Welcome back, Hotel Manager!</h2>
              <p className="text-gray-500">Here's what's happening with your hotel today.</p>
            </div>
            <div className="hidden lg:flex justify-between items-center space-x-3 bg-white rounded-md shadow-sm p-2">
              <DashboardDatePicker />
              <span className="text-gray-500">-</span>
              <DashboardDatePicker />
              <div className="hidden lg:flex justify-between space-x-3 ml-2">
                <Button variant="outline" size="md"><Mail className="h-5 w-5" /></Button>
                <Button variant="outline" size="md"><FileText className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ReservationCard
              isLoading={loading}
              title="TOTAL BOOKINGS"
              icon={Book}
              value={152}
              percentageChange={8.5}
              percentageSuffix="Up from last week"
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="AVAILABLE ROOMS"
              icon={BedSingle}
              value={24}
              percentageChange={1.3}
              percentageSuffix="Up from past week"
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="REVENUE"
              icon={CircleDollarSign}
              value={28750}
              percentageChange={-4.3}
              percentageSuffix="Down from yesterday"
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="GUESTS"
              icon={CircleUserRound}
              value={89}
              percentageChange={1.8}
              percentageSuffix="Up from yesterday"
              baseColor="#001f3f"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <OccupancyChartComponent data={occupancyData} isLoading={loading} />
            </div>
            <div>
              <PieChartComponent data={visitorData} isLoading={loading} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RevenueChartComponent data={revenueData} isLoading={loading} />
            </div>
            <div>
              <StackedChartComponent data={roomTypeData} isLoading={loading} />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
