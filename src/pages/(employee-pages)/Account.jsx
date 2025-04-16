"use client";

import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Loader2, Mail, Phone, User, Building2 } from 'lucide-react';
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import BookingTable from "@/components/common/cards/BookingTable";
import { useReservationsContext } from "@/context/reservationContext";
import { UserContext } from "@/context/contexts";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Account() {
  const { reservationsData } = useReservationsContext();
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dob: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // Sync account data with userData whenever userData changes
  useEffect(() => {
    setAccount(userData);
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    // Get the actual account data from account state
    const accountID = localStorage.getItem('account_id')
    const accountData = {
      id: accountID,  // Using account state for consistency
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      phone: account.phone,
      date_of_birth: account.dob,
    };

    // safe
  
    setIsSaving(true);  // Set loading state
    try {
      const response = await fetch('http://localhost:5000/api/update_account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(accountData),
      });
      
  
      if (!response.ok) {
        throw new Error('Failed to update account');
      }
  
      const result = await response.json();
      console.log(result.message);  // Log success message
  
      setUserData(result.account);  // Update user data state with the result
      setIsEditable(false);  // Set form to non-editable after save
    } catch (error) {
      console.error(error);  // Log any errors
    } finally {
      setIsSaving(false);  // Reset saving state
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("userToken");
    setTimeout(() => {
      setIsLoggingOut(false);
      navigate("/auth/login");
    }, 1000);
  };

  const handleEditToggle = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationTop />
      </div>
      <Card className="fixed inset-0 w-screen h-screen pt-[5rem] bg-white/50 dark:bg-gray-900/50 overflow-hidden">
        <CardHeader className="pb-4 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
          <Avatar className="w-24 h-24">
            <img src="src/assets/images/SchoolLogo.png" alt="Upload Logo" className="w-full h-full object-cover rounded-full" />
          </Avatar>

          <div className="flex-1">
            <CardTitle className="text-3xl font-bold">
              {`${userData.first_name} ${userData.last_name}`.toUpperCase()}
            </CardTitle>
          </div>

          <div className="flex gap-3 pt-[20px] md:self-start">
            <Button onClick={handleSaveChanges} disabled={isSaving || !isEditable} className="bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all">
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button onClick={handleLogout} disabled={isLoggingOut} className="bg-[#FCB813] text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl transition-all">
              {isLoggingOut ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging Out...
                </div>
              ) : (
                "Logout"
              )}
            </Button>
            <Button onClick={handleEditToggle} className="bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all">
              {isEditable ? "Cancel Edit" : "Edit Account"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="mt-6">
            <TabsList className="grid w-full grid-cols-2 gap-4 ">
              <TabsTrigger value="personal" className="bg-blue-500 text-white hover:bg-blue-600 data-[state=active]:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                <User className="w-4 h-4 mr-2" />
                User Info
              </TabsTrigger>
              <TabsTrigger value="bookings" className="bg-blue-500 text-white hover:bg-blue-600 data-[state=active]:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                <Building2 className="w-4 h-4 mr-2" />
                Booking History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-sm font-medium">First Name</Label>
                  <Input type="text" id="first_name" name="first_name" value={account.first_name} onChange={handleInputChange} disabled={!isEditable} className="shadow-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-sm font-medium">Last Name</Label>
                  <Input type="text" id="last_name" name="last_name" value={account.last_name} onChange={handleInputChange} disabled={!isEditable} className="shadow-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth" className="text-sm font-medium">Date of Birth</Label>
                  <Input type="date" id="date_of_birth" name="date_of_birth" value={account.dob} onChange={handleInputChange} disabled={!isEditable} className="shadow-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center">Email <Mail className="ml-2 w-4 h-4" /></Label>
                  <Input type="email" id="email" name="email" value={account.email} onChange={handleInputChange} disabled={!isEditable} className="shadow-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center">Phone <Phone className="ml-2 w-4 h-4" /></Label>
                  <Input type="text" id="phone" name="phone" value={account.phone} onChange={handleInputChange} disabled={!isEditable} className="shadow-sm" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <div className="pt-1">
                  <BookingTable data={reservationsData} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
