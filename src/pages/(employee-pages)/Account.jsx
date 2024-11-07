'use client';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload } from 'lucide-react';
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import { toast } from 'react-toastify';

const initialEmployee = {
  id: 'EMP001',
  name: 'Alice Johnson',
  email: 'alice.johnson@grandhotel.com',
  phone: '+1 (555) 123-4567',
  position: 'Front Desk Receptionist',
  department: 'Front Office',
  shift: 'Morning',
  startDate: '2022-03-15',
  languages: ['English', 'Spanish'],
  notes: 'Excellent at handling VIP guests. Trained in emergency procedures.',
  recentInteractions: [
    { guestName: 'Mr. Smith', roomNumber: '301', notes: 'Late check-out requested for tomorrow', timestamp: '2023-06-20T09:30:00Z' },
    { guestName: 'Ms. Garcia', roomNumber: '512', notes: 'Complained about noisy neighbors', timestamp: '2023-06-20T10:15:00Z' }
  ],
  bookingHistory: [
    { guestName: 'Dr. Johnson', bookingType: 'room', details: 'Room 405, 3 nights', date: '2023-06-15', timestamp: '2023-06-15T14:00:00Z' },
    { guestName: 'Mrs. Williams', bookingType: 'event', details: 'Wedding reception, Grand Ballroom', date: '2023-07-22', timestamp: '2023-06-18T11:30:00Z' },
    { guestName: 'Mr. Brown', bookingType: 'room', details: 'Room 210, 1 night', date: '2023-06-18', timestamp: '2023-06-18T16:45:00Z' }
  ]
};

export default function Account() {
  const [showReservation, setShowReservation] = useState(false);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(initialEmployee);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchEmployeeData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (isMounted) setEmployee(initialEmployee);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();

    const intervalId = setInterval(() => {
      if (isMounted) simulateAutomaticUpdates();
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const simulateAutomaticUpdates = () => {
    const newInteraction = {
      guestName: `Guest ${Math.floor(Math.random() * 100)}`,
      roomNumber: `${Math.floor(Math.random() * 500 + 100)}`,
      notes: `Random interaction ${new Date().toLocaleTimeString()}`,
      timestamp: new Date().toISOString()
    };

    const newBooking = {
      guestName: `Guest ${Math.floor(Math.random() * 100)}`,
      bookingType: Math.random() > 0.5 ? 'room' : 'event',
      details: `Random booking ${new Date().toLocaleTimeString()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    };

    setEmployee(prev => ({
      ...prev,
      recentInteractions: [newInteraction, ...prev.recentInteractions.slice(0, 9)],
      bookingHistory: [newBooking, ...prev.bookingHistory.slice(0, 9)]
    }));

    toast({
      title: "Updates Received",
      description: "New interaction and booking have been automatically added.",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (value) => {
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      });
    } catch (error) {
      console.error('Error saving changes:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setEmployee(prev => ({ ...prev, profileImage: null }));
    }
  };

  const handleBackToHome = () => {
    setShowReservation(false);
  };

  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div id='account' className="flex flex-col relative w-screen overflow-x-hidden h-screen bg-[#f8f6f2]">
        
      <main className="flex-1 sm:p-6 flex flex-col h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="fixed top-0 left-0 right-0 z-50">
            <NavigationTop handleBackToHome={handleBackToHome} />
          </div>
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={employee.profileImage || `https://api.dicebear.com/6.x/initials/svg?seed=${employee.name}`} alt={employee.name} />
                    <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
                    <Upload size={16} />
                    <input id="profile-image" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                  </label>
                </div>
                <div className="text-center sm:text-left">
                  <CardTitle className="text-2xl">{employee.name}</CardTitle>
                  <CardDescription>{employee.position}</CardDescription>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                    {employee.languages.map(lang => (
                      <Badge key={lang} variant="secondary">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
            <Tabs defaultValue="personal" className="w-full bg-white">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Employee Info</TabsTrigger>
        <TabsTrigger value="interactions">Guest Interactions</TabsTrigger>
        <TabsTrigger value="bookings">Booking History</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" value={employee.email} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input type="tel" id="phone" name="phone" value={employee.phone} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={employee.department} onValueChange={handleSelectChange("department")}>
              <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Front Office">Front Office</SelectItem>
                <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="shift">Shift</Label>
            <Select value={employee.shift} onValueChange={handleSelectChange("shift")}>
              <SelectTrigger><SelectValue placeholder="Select Shift" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Afternoon">Afternoon</SelectItem>
                <SelectItem value="Night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" value={employee.notes} onChange={handleInputChange} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="interactions" className="space-y-4">
        <ul className="divide-y divide-gray-200">
          {employee.recentInteractions.map((interaction, index) => (
            <li key={index} className="py-4">
              <p><strong>Guest:</strong> {interaction.guestName}</p>
              <p><strong>Room:</strong> {interaction.roomNumber}</p>
              <p><strong>Notes:</strong> {interaction.notes}</p>
              <p><small><strong>Timestamp:</strong> {new Date(interaction.timestamp).toLocaleString()}</small></p>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="bookings" className="space-y-4">
        <ul className="divide-y divide-gray-200">
          {employee.bookingHistory.map((booking, index) => (
            <li key={index} className="py-4">
              <p><strong>Guest:</strong> {booking.guestName}</p>
              <p><strong>Type:</strong> {booking.bookingType}</p>
              <p><strong>Details:</strong> {booking.details}</p>
              <p><small><strong>Date:</strong> {new Date(booking.timestamp).toLocaleString()}</small></p>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
              </Button>
              <Button variant="destructive" onClick={handleLogout} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Logout'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
