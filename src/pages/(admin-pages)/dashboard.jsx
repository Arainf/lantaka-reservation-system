import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, Upload, FileText, Share2 } from "lucide-react"
import ReservationCard from "@/components/common/cards/ReservationCard"
import { Component as RevenueChartComponent } from "@/components/common/charts/LineChartComponent";
import { Component as OccupancyChartComponent } from "@/components/common/charts/BarChartComponent";
import { Component as PieChartComponent } from "@/components/common/charts/PieChartComponent"
import { Component as StackedChartComponent } from "@/components/common/charts/StackedChartComponent"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import { DatePickerDemo as DatePicker } from "@/components/common/utilities/DateRangePicker"
import Footer from "@/components/common/footer/Footer"

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const occupancyData = [
    { month: "Jan", occupancy: 65 },
    { month: "Feb", occupancy: 70 },
    { month: "Mar", occupancy: 75 },
    { month: "Apr", occupancy: 80 },
    { month: "May", occupancy: 85 },
    { month: "Jun", occupancy: 90 },
    { month: "Jul", occupancy: 95 },
    { month: "Aug", occupancy: 100 },
    { month: "Sep", occupancy: 90 },
    { month: "Oct", occupancy: 85 },
    { month: "Nov", occupancy: 80 },
    { month: "Dec", occupancy: 75 },
  ]

  const visitorData = [
    { name: "Venue", value: 400 },
    { name: "Room", value: 300 },
    { name: "Other", value: 62 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 10000 },
    { month: "Feb", revenue: 12000 },
    { month: "Mar", revenue: 11000 },
    { month: "Apr", revenue: 15000 },
    { month: "May", revenue: 18000 },
    { month: "Jun", revenue: 24000 },
    { month: "Jul", revenue: 22000 },
    { month: "Aug", revenue: 19000 },
    { month: "Sep", revenue: 17000 },
    { month: "Oct", revenue: 16000 },
    { month: "Nov", revenue: 20000 },
    { month: "Dec", revenue: 22000 },
  ]

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
            <div className="hidden lg:flex justify-between items-center space-x-2 bg-white rounded-md shadow-sm p-2">
              <DatePicker />
              <span className="text-gray-500">-</span>
              <DatePicker />
              <div className="hidden lg:flex justify-between space-x-1 ml-2">
                <Button variant="outline" size="md"><Mail className="h-5 w-5" /></Button>
                <Button variant="outline" size="md"><Upload className="h-5 w-5" /></Button>
                <Button variant="outline" size="md"><FileText className="h-5 w-5" /></Button>
                <Button variant="outline" size="md"><Share2 className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ReservationCard
              isLoading={loading}
              title="TOTAL BOOKINGS"
              icon={Calendar}
              value={152}
              percentageChange={8.5}
              percentageSuffix="Up from last week"
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="AVAILABLE ROOMS"
              icon={Calendar}
              value={24}
              percentageChange={1.3}
              percentageSuffix="Up from past week"
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="REVENUE"
              icon={Calendar}
              value={28750}
              percentageChange={-4.3}
              percentageSuffix="Down from yesterday"
              baseColor="#001f3f"
            />
            <ReservationCard
              isLoading={loading}
              title="GUESTS"
              icon={Calendar}
              value={89}
              percentageChange={1.8}
              percentageSuffix="Up from yesterday"
              baseColor="#001f3f"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <OccupancyChartComponent data={occupancyData} isLoading={loading} />
            </div>
            <div>
              <PieChartComponent data={visitorData} isLoading={loading}/>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RevenueChartComponent data={revenueData} isLoading={loading} />
            </div>
            <div>
              <StackedChartComponent isLoading={loading} />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard