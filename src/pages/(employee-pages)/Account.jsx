'use client'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { ArrowUpDown, Building2, Calendar, Clock, Loader2, Mail, Phone, Upload, User } from 'lucide-react'
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop"

const initialEmployee = {
  id: 'EMP001',
  name: 'Josh Chiong Pogi',
  email: 'pogi si chiong @gmail.com',
  phone: '+1 (555) 123-4567',
  startDate: '2022-03-15',
  recentInteractions: [
    { guestName: 'Mr. Smith', roomNumber: '301', notes: 'Late check-out requested for tomorrow', timestamp: '2023-06-20T09:30:00Z' },
    { guestName: 'Ms. Garcia', roomNumber: '512', notes: 'Complained about noisy neighbors', timestamp: '2023-06-20T10:15:00Z' }
  ],
  bookingHistory: [
    { guestName: 'Dr. Johnson', bookingType: 'room', details: 'Room 405, 3 nights', date: '2023-06-15', timestamp: '2023-06-15T14:00:00Z' },
    { guestName: 'Mrs. Williams', bookingType: 'event', details: 'Wedding reception, Grand Ballroom', date: '2023-07-22', timestamp: '2023-06-18T11:30:00Z' },
    { guestName: 'Mr. Brown', bookingType: 'room', details: 'Room 210, 1 night', date: '2023-06-18', timestamp: '2023-06-18T16:45:00Z' }
  ]
}

export default function Account() {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(initialEmployee)
  const [bookingFilter, setBookingFilter] = useState('all')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  useEffect(() => {
    let isMounted = true
    const fetchEmployeeData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (isMounted) setEmployee(initialEmployee)
      } catch (error) {
        console.error('Error fetching employee data:', error)
      }
    }

    fetchEmployeeData()

    const intervalId = setInterval(() => {
      if (isMounted) simulateAutomaticUpdates()
    }, 10000)

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [])

  const simulateAutomaticUpdates = () => {
    const newInteraction = {
      guestName: `Guest ${Math.floor(Math.random() * 100)}`,
      roomNumber: `${Math.floor(Math.random() * 500 + 100)}`,
      notes: `Random interaction ${new Date().toLocaleTimeString()}`,
      timestamp: new Date().toISOString()
    }

    const newBooking = {
      guestName: `Guest ${Math.floor(Math.random() * 100)}`,
      bookingType: Math.random() > 0.5 ? 'room' : 'event',
      details: `Random booking ${new Date().toLocaleTimeString()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    }

    setEmployee(prev => ({
      ...prev,
      recentInteractions: [newInteraction, ...prev.recentInteractions.slice(0, 9)],
      bookingHistory: [newBooking, ...prev.bookingHistory.slice(0, 9)]
    }))

    toast({
      title: "Updates Received",
      description: "New interaction and booking have been automatically added.",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployee(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name) => (value) => {
    setEmployee(prev => ({ ...prev, [name]: value }))
  }




  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    console.log('Button clicked:', buttonName); // Debugging statement
    setActiveButton(buttonName);
    
    if (buttonName === 'save') {
      setIsSaving(true);
      setTimeout(() => {
        console.log('Saving completed'); // Debugging statement
        toast({
          title: "Changes Saved",
          description: "Your changes have been successfully saved.",
        });
        setIsSaving(false); 
      }, 1000);
    }
  };

  const logoutButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  
    if (buttonName === 'logout') {
      // Perform actual logout logic here:
      console.log("Logging out...");
  
      setTimeout(() => {
        setActiveButton(null);
  
        // Clear the user session or authentication token
        localStorage.removeItem("userToken"); // Example, adjust according to your setup
  
        // Redirect to login page
        navigate('/auth/login'); // Make sure this path matches your login route
      }, 1000);
    }
  };

  const handleBackToHome = () => {
    navigate('/')
  }
  const [sortOldestFirst, setSortOldestFirst] = useState(false)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationTop handleBackToHome={handleBackToHome} />
      </div>
      <Card className="fixed inset-0 w-screen h-screen pt-[5rem] bg-white/50 dark:bg-gray-900/50 overflow-hidden">

        <CardHeader className="pb-4 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
          <div className="relative group">
              <Avatar className="w-24 h-24 ">
                <img
                  src="src/assets/images/SchoolLogo.png"
                  alt="Upload Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </Avatar>
            </div>

          <div className="flex-1">
            <CardTitle className="text-3xl font-bold">{employee.name}</CardTitle>
            <CardDescription className="text-lg mt-1">{employee.position}</CardDescription>
            
          </div>
          <div className="flex gap-3 pt-[20px] md:self-start">
          <Button
  onClick={() => handleButtonClick('save')}
  disabled={activeButton !== null || isSaving}
  className="bg-blue-500 text-white hover:bg-blue-600 data-[state=active]:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
>
  {isSaving ? (
    <div className="flex items-center justify-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saving Changes...
    </div>
  ) : (
    'Save Changes'
  )}
</Button>
      <Button
        onClick={() => logoutButtonClick('logout')}
        disabled={activeButton !== null}
        className="bg-[#FCB813] text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
      >
        {activeButton === 'logout' ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading Logout...
          </div>
        ) : (
          'Logout'
        )}
      </Button>
    </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="mt-6 ">
          <TabsList className="grid w-full grid-cols-3 gap-4 ">
        <TabsTrigger value="personal"
          className="bg-blue-500 text-white hover:bg-blue-600 data-[state=active]:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <User className="w-4 h-4 mr-2" />
          Employee Info
        </TabsTrigger>
        <TabsTrigger value="interactions"
          className="bg-blue-500 text-white hover:bg-blue-600 data-[state=active]:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Guest Interactions
        </TabsTrigger>
        <TabsTrigger value="bookings"
          className="bg-blue-500 text-white hover:bg-blue-600 data-[state=active]:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <Building2 className="w-4 h-4 mr-2" />
          Booking History
        </TabsTrigger>
      </TabsList>
            <div
              className="mt-8 border-4 border-gray-300 p-6 h-[450px] overflow-y-auto no-scrollbar"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none" // Internet Explorer and Edge
              }}
            >
              <TabsContent value="personal">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstname" className="text-sm font-medium">First Name</Label>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            value={employee.firstname}
            onChange={handleInputChange}
            className="shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname" className="text-sm font-medium">Last Name</Label>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            value={employee.lastname}
            onChange={handleInputChange}
            className="shadow-sm"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth</Label>
          <Input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={employee.dateOfBirth}
            onChange={handleInputChange}
            className="shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" /> Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            className="shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
            <Phone className="w-4 h-4" /> Phone
          </Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={employee.phone}
            onChange={handleInputChange}
            className="shadow-sm"
          />
        </div>
        
        
       
      </div>
    </TabsContent>


    <TabsContent value="interactions">
        <div className="mb-4 flex space-x-2 fixed top-[325px] ">
        <Button
  onClick={() => setSortOldestFirst(!sortOldestFirst)}
  className="flex items-center gap-2 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
>
  <ArrowUpDown className="h-4 w-4 text-white" />
  Sort {sortOldestFirst ? 'Newest to Oldest' : 'Oldest to Newest'}
</Button>
        </div>
        <div className="space-y-6 pt-5">
          {[...employee.recentInteractions]
            .sort((a, b) => {
              const dateA = new Date(a.timestamp).getTime()
              const dateB = new Date(b.timestamp).getTime()
              return sortOldestFirst ? dateA - dateB : dateB - dateA
            })
            .map((interaction, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg ">
                <CardHeader className="bg-muted/50 py-4">
                  <CardTitle className="text-lg font-medium">
                    {interaction.guestName} - Room {interaction.roomNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">{interaction.notes}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(interaction.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>
            <TabsContent value="bookings">
              <div className="space-y-4">
              <div className="flex space-x-2 fixed top-[325px] " >
              <Button 
                    variant={bookingFilter === 'all' ? "default" : "outline"} 
                    onClick={() => setBookingFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={bookingFilter === 'room' ? "default" : "outline"} 
                    onClick={() => setBookingFilter('room')}
                  >
                    Room
                  </Button>
                  <Button 
                    variant={bookingFilter === 'event' ? "default" : "outline"} 
                    onClick={() => setBookingFilter('event')}
                  >
                    Event
                  </Button>
                </div>
                <div className="space-y-6">
                  {employee.bookingHistory
                    .filter(booking => bookingFilter === 'all' || booking.bookingType === bookingFilter)
                    .map((booking, index) => (
                      <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                        <CardHeader className="bg-muted/50 py-3">
                          <CardTitle className="text-lg font-medium">
                            {booking.guestName} - {booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-muted-foreground">{booking.details}</p>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <p>Date: {booking.date}</p>
                            <p>Booked: {new Date(booking.timestamp).toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}