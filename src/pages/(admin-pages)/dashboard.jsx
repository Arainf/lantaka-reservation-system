import './adminPages.css';
import NavigationSide from '@/components/common/navigatin-side-top/NavigationSide'
import NavigationTop from '@/components/common/navigatin-side-top/NavigationTop'
import ReservationCard from '@/components/common/cards/ReservationCard'
import { IoCalendarSharp, IoPersonSharp, IoCashSharp, IoPeopleSharp } from "react-icons/io5"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


// dummy data

const dummyData = [
  {
    customer: "John Doe",
    reservationType: "room",
    ID: "R101",
    email: "johndoe@example.com",
  },
  {
    customer: "Jane Smith",
    reservationType: "venue",
    ID: "V201",
    email: "janesmith@example.com",
  },
  {
    customer: "Alice Johnson",
    reservationType: "room",
    ID: "R102",
    email: "alicejohnson@example.com",
  },
  {
    customer: "Bob Lee",
    reservationType: "venue",
    ID: "V202",
    email: "boblee@example.com",
  },
  {
    customer: "Charlie Brown",
    reservationType: "room",
    ID: "R103",
    email: "charliebrown@example.com",
  },
  {
    customer: "David Kim",
    reservationType: "venue",
    ID: "V203",
    email: "davidkim@example.com",
  },
  {
    customer: "Eva Green",
    reservationType: "room",
    ID: "R104",
    email: "evagreen@example.com",
  },
  {
    customer: "Frank Miller",
    reservationType: "venue",
    ID: "V204",
    email: "frankmiller@example.com",
  },
  {
    customer: "Grace Hopper",
    reservationType: "room",
    ID: "R105",
    email: "gracehopper@example.com",
  },
  {
    customer: "Hank Pym",
    reservationType: "venue",
    ID: "V205",
    email: "hankpym@example.com",
  },
];




const Dashboard = ({sidebarOpen, toggleSidebar}) => {
  return (
    <div className='flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100'>
      {/* Side navigation bar */}
      <NavigationSide isOpen={sidebarOpen} />
      <div className='flex-1 overflow-auto'>
        {/* Top navigation bar */}
        <NavigationTop onSidebarToggle={toggleSidebar} />
        <main className='p-6'>
          {/* Main grid layout for the dashboard, consisting of 2 sections */}
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6'>
            {/* Large card displaying the hotel floor plan */}
            <Card className='row-span-1'>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Booking Calendar</CardTitle>
              </CardHeader>
              <CardContent className="mt-2 flex scale-110 justify-center align-center">
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>

              <CardContent className="customerTable mt-5 flex scale-110 justify-center align-center">
                <div className="w-full max-w-4xl mx-auto p-4">
                  <div className="border-2">
                    <Table className="border-collapse">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="border-b-2 border-r-2 bg-gray-100 font-bold sticky top-0 z-10">Customer</TableHead>
                          <TableHead className="border-b-2 border-r-2 md:w-[79px] bg-gray-100 font-bold text-center sticky top-0 z-10">Type</TableHead>
                          <TableHead className="border-b-2 bg-gray-100 md:w-[79px] font-bold text-center sticky top-0 z-10">ID</TableHead>
                        </TableRow>
                      </TableHeader>
                    </Table>
                    <div className="max-h-[200px] overflow-y-auto overflow-x-hidden">
                      <Table className="border-collapse">
                        <TableBody>
                          {dummyData.map((data, index) => (
                            <TableRow key={index}>
                              <TableCell className=" bg-blue-50">
                                <div className="font-medium">{data.customer}</div>
                                <div className="text-xs italic text-gray-600">{data.email}</div>
                              </TableCell>
                              <TableCell 
                                className={` text-center ${
                                  data.reservationType === "room" ? "bg-green-50" : "bg-yellow-50"
                                }`}
                              >
                                {data.reservationType}
                              </TableCell>
                              <TableCell className=" bg-red-50 text-center">
                                {data.ID}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>



              
            </Card>
            
            <Card className='col-span-2 row-span-2'>
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
            <div className='flex flex-col gap-4 justify-self-center justify-center'>
              

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
