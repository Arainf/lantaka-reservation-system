import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Upload, FileSpreadsheet, FileIcon as FilePdf, Book, BedSingle, CircleDollarSign, CircleUserRound } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReservationCard from "@/components/common/cards/ReservationCard";
import { LineChartComponent } from "@/components/common/charts/LineChartComponent";
import { Component as OccupancyChartComponent } from "@/components/common/charts/BarChartComponent";
import { Component as PieChartComponent } from "@/components/common/charts/PieChartComponent";
import { Component as StackedChartComponent } from "@/components/common/charts/StackedChartComponent";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import Footer from "@/components/common/footer/Footer";
import { useDashboardContext } from "@/context/dashboardContext";
import { DashboardDatePickerDemo as DashboardDatePicker } from "@/components/common/utilities/DashboardDatePicker";
import ViewToggle from "@/components/common/utilities/ViewToggle";

const AdminDashboard = () => {
  const {
    loading,
    dashboardData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    viewMode,
    setViewMode,
  } = useDashboardContext();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleExport = async (format) => {
    if (!dashboardData) return;
  
    const formatDate = (date) => date.toISOString().split('T')[0];
    const params = new URLSearchParams({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      viewMode,
      export: format,
    });

    try {
      const response = await fetch(`http://localhost:5000/api/dashboardData?${params}`, {
        method: 'GET',
        headers: {
          'Accept': format === 'excel' 
            ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            : 'application/pdf'
        }
      });
  
      if (!response.ok) throw new Error('Export failed');
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-report-${formatDate(new Date())}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting dashboard data:', error);
      // You might want to add a toast notification here
    }
  };

  const getPercentageChangeText = (change, period) => {
    if (change === undefined || period === undefined) return '';
    const direction = change >= 0 ? 'Up' : 'Down';
    return `${direction} from last ${period}`;
  };

  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      );
    }

    if (!dashboardData || Object.keys(dashboardData).length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500">
            No data available for the selected date range.
          </p>
        </div>
      );
    }

    return (
      <>
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ReservationCard
              isLoading={loading}
              title="TOTAL BOOKINGS"
              icon={Book}
              value={dashboardData.totalBookings}
              percentageChange={dashboardData.totalBookingsChange}
              percentageSuffix={getPercentageChangeText(dashboardData.totalBookingsChange, dashboardData.totalBookingsPeriod)}
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="AVAILABLE ROOMS"
              icon={BedSingle}
              value={dashboardData.availableRooms}
              percentageChange={dashboardData.availableRoomsChange}
              percentageSuffix={getPercentageChangeText(dashboardData.availableRoomsChange, dashboardData.totalBookingsPeriod)}
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="REVENUE"
              icon={CircleDollarSign}
              value={dashboardData.totalRevenue}
              percentageChange={dashboardData.totalRevenueChange}
              percentageSuffix={getPercentageChangeText(dashboardData.totalRevenueChange, dashboardData.totalRevenuePeriod)}
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="GUESTS"
              icon={CircleUserRound}
              value={dashboardData.totalGuests}
              percentageChange={dashboardData.totalGuestsChange}
              percentageSuffix={getPercentageChangeText(dashboardData.totalGuestsChange, dashboardData.totalBookingsPeriod)}
              baseColor="#001f3f"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <OccupancyChartComponent
              data={dashboardData.occupancyData}
              isLoading={loading}
              viewMode={viewMode}
            />
          </div>
          <div>
            <PieChartComponent
              data={dashboardData.visitorData}
              trending={dashboardData.visitorTrending}
              isLoading={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <LineChartComponent
              data={dashboardData.revenueData}
              isLoading={loading}
              viewMode={viewMode}
            />
          </div>
          <div>
            <StackedChartComponent
              data={dashboardData.roomTypePerformance}
              isLoading={loading}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />
      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl text-gray-400">Home / Dashboard</h1>
              <h2 className="text-3xl font-bold">
                Welcome back, Hotel Manager!
              </h2>
              <p className="text-gray-500">
                Here's what's happening with your hotel today.
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
              <div className="flex items-center space-x-3 bg-white rounded-md shadow-sm p-2">
                <DashboardDatePicker
                  date={startDate}
                  onDateChange={setStartDate}
                />
                <span className="text-gray-500">-</span>
                <DashboardDatePicker date={endDate} onDateChange={setEndDate} />
                <div className="flex space-x-3 ml-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Upload className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleExport('excel')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export as Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport('pdf')}>
                        <FilePdf className="h-4 w-4 mr-2" />
                        Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>

          {renderDashboardContent()}

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;