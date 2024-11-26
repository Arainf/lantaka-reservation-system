"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Mail, Phone, User, Building2 } from "lucide-react";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import BookingTable from "@/components/common/cards/BookingTable";
import { useReservationsContext } from "@/context/reservationContext";
import { UserContext } from "@/context/contexts";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Account() {
  const { reservationsData } = useReservationsContext();
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const [account, setAccount] = useState(userData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Replace with your API endpoint URL
      const response = await fetch('http://localhost:5000/api/updateaccount', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guest_id: account.guestId, // Replace with the relevant field for guest ID
          first_name: account.fName,
          last_name: account.lName,
          email: account.email,
          phone: account.phone,
          date_of_birth: account.dateOfBirth,
        }),
              });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      const data = await response.json(); // Assuming the server responds with JSON
      toast({
        title: "Changes Saved",
        description: "Your changes have been successfully saved.",
      });
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Error",
        description: "There was an issue saving your changes.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavigationTop handleBackToHome={handleBackToHome} />
      </div>
      <Card className="fixed inset-0 w-screen h-screen pt-[5rem] bg-white/50 dark:bg-gray-900/50 overflow-hidden">
        <CardHeader className="pb-4 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
          <div className="relative group">
            <Avatar className="w-24 h-24">
              <img
                src="src/assets/images/SchoolLogo.png"
                alt="Upload Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </Avatar>
          </div>

          <div className="flex-1">
            <CardTitle className="text-3xl font-bold">
              {`${account.first_name} ${account.last_name}`.toUpperCase()}
            </CardTitle>
            <CardDescription className="text-lg mt-1">
              {account.position}
            </CardDescription>
          </div>
          <div className="flex gap-3 pt-[20px] md:self-start">
            <Button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all"
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-[#FCB813] text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl transition-all"
            >
              {isLoggingOut ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging Out...
                </div>
              ) : (
                "Logout"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 gap-4 ">
              <TabsTrigger
                value="personal"
                className="bg-blue-500 text-white hover:bg-blue-600 data-[state=active]:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                <User className="w-4 h-4 mr-2" />
                User Info
              </TabsTrigger>

              <TabsTrigger
                value="bookings"
                className="bg-blue-500 text-white hover:bg-blue-600 data-[state=active]:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Booking History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={account.fName}
                    onChange={handleInputChange}
                    className="shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={account.lName}
                    onChange={handleInputChange}
                    className="shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                    Date of Birth
                  </Label>
                  <Input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={account.dateOfBirth}
                    onChange={handleInputChange}
                    className="shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={account.email}
                    onChange={handleInputChange}
                    className="shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Phone
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={account.phone}
                    onChange={handleInputChange}
                    className="shadow-sm"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <ScrollArea className="h-[500px] top-3 space-y-4 scrollbar-hidden">
                <BookingTable data={reservationsData} />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
