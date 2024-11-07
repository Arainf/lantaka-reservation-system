"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoCalendarClearSharp } from "react-icons/io5";
import { IoIosBriefcase } from "react-icons/io";
import { TbMessageCircleFilled } from "react-icons/tb";
import { FaMapPin } from "react-icons/fa";
import { BsFileTextFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker as DatePicker } from "@/components/common/utilities/DateRange";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formatDateToYYYYMMDD } from "@/utils/colorsUtils";
import Footer from "@/components/common/footer/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate} from 'react-router-dom'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"



export default function Component() {
  const [selectedDate, setSelectedDate] = useState("");
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(true);
  const [reservationType, setReservationType] = useState("");
  const [availableRooms, setAvailableRooms] = useState({
    double_rooms: [],
    triple_rooms: [],
    matrimonial_rooms: [],
    venues_holder: [],
  });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [roomState, setRoomState] = useState(true)
  const [venueState, setVenueState] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  
  
  const form = useForm({
    defaultValues: {
      accountId: localStorage.getItem("account_id"),
      clientAlias: "",
      clientType: "",
      reservationType: "",
      dateRangeRoom: { from: "", to: "" },
      dateRangeVenue: { from: "", to: "" }, // Ensure this matches your form structure
      numberofGuest: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phone: "",
      designation: "",
      messengerAccount: "",
      address: "",
      addNotes: "",
      selectedReservationRooms: [],
      selectedReservationVenues: [],
    },
  });

  const handleRoomClick = (roomId) => {
    setSelectedRooms((prevSelected) => {
      // Check if the roomId is already in the selectedRooms array
      if (prevSelected.includes(roomId)) {
        // If it is, remove it (toggle off)
        return prevSelected.filter(id => id !== roomId);
      } else {
        // If it isn't, add it (toggle on)
        return [...prevSelected, roomId];
      }
    });
  };

  const handleVenueClick = (venueId) => {
    setSelectedVenues((prevSelected) => {
      // Check if the roomId is already in the selectedRooms array
      if (prevSelected.includes(venueId)) {
        // If it is, remove it (toggle off)
        return prevSelected.filter(id => id !== venueId);
      } else {
        // If it isn't, add it (toggle on)
        return [...prevSelected, venueId];
      }
    });
  };

  const handleDisable = () => {
    console.log("called");
    if (reservationType === "room") {
      setRoomState(false);
      setVenueState(true);
    } else if (reservationType === "venue") {
      setRoomState(true);
      setVenueState(false);
    } else if (reservationType === "both") {
      setRoomState(false);
      setVenueState(false);
    }
  };

  // useEffect to call handleDisable whenever reservationType changes
  useEffect(() => {
    handleDisable();
  }, [reservationType]);

  
  
  const onSubmit = (data) => {
    data.selectedReservationRooms = selectedRooms
    data.selectedReservationVenues = selectedVenues
    setFormData(data)  
    console.log("data:" + JSON.stringify(data,null, 2));  
  }

  const review = () => {
    setIsConfirmationOpen(true)
  }
  
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:5000/api/submitReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (response.ok) {
        toast({
          title: "Success",
          description: result.message || 'Reservation submitted successfully!',
        })
        // Close the dialog
        setIsConfirmationOpen(false)
        // Reset the form
        form.reset()
        // Clear other state if necessary
        setSelectedRooms([])
        setSelectedVenues([])
        // Reload the page after a short delay
        setTimeout(() => {
          navigate(0) // This will refresh the current page
        }, 1500) // Delay for 1.5 seconds so the user can see the success message
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || 'An error occurred while submitting the reservation.',
        })
      }
    } catch (error) {
      console.error("Error submitting reservation:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
    // You might want to show a success message or redirect the user
  // Fetch available rooms based on the selected date range
const fetchAvailable = async (dateRangeRoom, dateRangeVenue) => {
  try {
    const { from, to } = dateRangeRoom || dateRangeVenue;
    if (!from || !to) return;

    const formattedFrom = formatDateToYYYYMMDD(from);
    const formattedTo = formatDateToYYYYMMDD(to);

    console.log("Fetching available rooms from:", formattedFrom, "to:", formattedTo); // Log the formatted dates

    const response = await fetch(
      `http://localhost:5000/api/availableRooms/${formattedFrom}/${formattedTo}/${reservationType}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const availableData = await response.json();
    console.log("Available data received:", availableData); // Log the received data

    // Directly update availableRooms using the fetched data with room_status as is_available
    setAvailableRooms({
      double_rooms: availableData.double_rooms,
      triple_rooms: availableData.triple_rooms,
      matrimonial_rooms: availableData.matrimonial_rooms,
      venues_holder: availableData.venues_holder,
    });

    console.log("Updated available rooms:", {
      double_rooms: availableData.double_rooms,
      triple_rooms: availableData.triple_rooms,
      matrimonial_rooms: availableData.matrimonial_rooms,
      venues_holder: availableData.venues_holder,
    }); // Log the updated rooms
  } catch (error) {
    console.error("Error fetching available rooms:", error);
  }
};

  
  // Fetch all available rooms when the component mounts
  const fetchEverythingAvailable = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/everythingAvailable");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
  
      // Initialize available rooms with room_status directly used as is_available
      setAvailableRooms({
        double_rooms: data.double_rooms.map(room => ({ ...room, is_available: room.room_status })),
        triple_rooms: data.triple_rooms.map(room => ({ ...room, is_available: room.room_status })),
        matrimonial_rooms: data.matrimonial_rooms.map(room => ({ ...room, is_available: room.room_status })),
        venues_holder: data.venues_holder.map(room => ({ ...room, is_available: room.room_status })),
      });
  
      console.log("available rooms:", JSON.stringify(availableRooms, null, 2));
    } catch (error) {
      console.error("Error fetching everything available:", error);
    }
  };
  
  // Call fetchEverythingAvailable on mount
  useEffect(() => {
    fetchEverythingAvailable();
  }, []);
  
  // Main function to call availability check
  const callAvailable = (dateRangeRoom, dateRangeVenue ) => {
    fetchAvailable(dateRangeRoom, dateRangeVenue);
    setShowResults(true);
  };
  
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  
  // Function to render room sections
  const renderRoomSection = (rooms, title) => (
    <div className="mb-8">
      <h3 className="text-sm font-medium mb-4 text-gray-600">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {rooms.map((room) => {
          const { room_id: roomId, room_status: isAvailable } = room; // Use room_status as is_available directly
          const isSelected = selectedRooms.includes(roomId); // Check if the room is selected
  
          return (
            <Button
              key={roomId}
              variant={isAvailable ? "default" : "outline"}
              className={`h-15 ${
                isAvailable
                  ? isSelected
                    ? "bg-sky-500 text-white" // Change to black if selected
                    : "bg-green-500 text-primary-foreground" // Default color
                  : "bg-muted text-muted-foreground"
              }`}
              disabled={!isAvailable} // Disable if unavailable
              onClick={() => handleRoomClick(roomId)} // Handle room click
            >
              {roomId}
            </Button>
          );
        })}
      </div>
    </div>
  );

  const renderVenueSection = (venues, title) => (
    <div className="mb-8">
      <h3 className="text-sm font-medium mb-4 text-gray-600">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {venues.map((room) => {
          const { room_id: venueId, room_status: isAvailable } = room; // Use room_status as is_available directly
          const isSelected = selectedVenues.includes(venueId); // Check if the room is selected
  
          return (
            <Button
              key={venueId}
              variant={isAvailable ? "default" : "outline"}
              className={`h-15 ${
                isAvailable
                  ? isSelected
                    ? "bg-sky-500 text-white" // Change to black if selected
                    : "bg-green-500 text-primary-foreground" // Default color
                  : "bg-muted text-muted-foreground"
              }`}
              disabled={!isAvailable} // Disable if unavailable
              onClick={() => handleVenueClick(venueId)} // Handle room click
            >
              {venueId}
            </Button>
          );
        })}
      </div>
    </div>
  );

  const formatDateRange = (dateRange) => {
    if (!dateRange || !dateRange.from || !dateRange.to) return "Not specified"
    return `${formatDateToYYYYMMDD(dateRange.from)} to ${formatDateToYYYYMMDD(dateRange.to)}`
  }
  
  
  const dateRange = form.getValues("dateRangeRoom") || form.getValues("dateRangeVenue"); 
  const formattedFromDate = dateRange.from ? new Date(dateRange.from).toLocaleDateString() : "_____";
  const formattedToDate = dateRange.to ? new Date(dateRange.to).toLocaleDateString() : "_____";

  return (
    <>
      <main className="flex flex-col h-screen w-screen overflow-hidden">
        <NavigationTop />
        <main className="flex flex-row">
          <div className="flex w-full">
            {/* Reservation Form */}
            <section className="w-1/3 border-r bg-background p-3 drop-shadow-lg">
              <div className="max-w-4xl mx-auto p-1">
                <div className="p-2">
                  <h1 className="text-2xl font-bold text-center mb-2">
                    Reservation Form
                  </h1>
                  <p className="text-center mb-2 text-gray-600">
                    Please complete the form below.
                  </p>

                  <Progress value={step * 35} className="mb-3" />

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {step === 1 && (
                        <>
                          <FormField
                            control={form.control}
                            name="clientAlias"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client Alias</FormLabel>
                                <FormControl>
                                  <Input placeholder="Client Alias" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />



                          <div className="flex flex-row w-[500px] gap-4 ">
                          <FormField
                            control={form.control}
                            name="clientType"
                            className="flex-1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client Type</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value); // Call the original onChange function
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="internal">
                                      Internal
                                    </SelectItem>
                                    <SelectItem value="external">
                                      External
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="reservationType"
                            className="flex-1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reservation Type</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value); // Call the original onChange function
                                    setReservationType(value); // Update the reservation type
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="room">Room</SelectItem>
                                    <SelectItem value="venue">Venue</SelectItem>
                                    <SelectItem value="both">Both</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          </div>


                          <FormField
                            control={form.control}
                            name="dateRangeRoom"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reservation Date	&#40; Room	&#41; </FormLabel>
                                <FormControl>
                                  <div className="flex flex-row gap-2">
                                    <DatePicker
                                      value={field.value}
                                      onChange={field.onChange}
                                      className="custom-datepicker w-full"
                                      state={roomState}
                                    />
                                    <Button
                                      variant="default"
                                      type="button"
                                      disabled={roomState}
                                      onClick={() =>
                                        callAvailable(
                                          form.getValues("dateRangeRoom"),
                                          form.getValues("reservationType")
                                        )
                                      }
                                    >
                                      Show Available
                                    </Button>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dateRangeVenue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reservation Date &#40; Venue	&#41;</FormLabel>
                                <FormControl>
                                  <div className="flex flex-row gap-2">
                                    <DatePicker
                                      value={field.value}
                                      onChange={field.onChange}
                                      className="custom-datepicker w-full"
                                      state={venueState}
                                    />
                                    <Button
                                      variant="default"
                                      type="button"
                                      disabled={venueState}
                                      onClick={() =>
                                        callAvailable(
                                          form.getValues("dateRangeVenue"),
                                          form.getValues("reservationType")
                                        )
                                      }
                                    >
                                      Show Available
                                    </Button>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="numberofGuest"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Guest</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type="number"
                                      placeholder="Enter number of guests"
                                      {...field}
                                      className="pl-10"
                                    />
                                    <FaUser
                                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                      size={18}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Guest First name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Guest Last name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Your last name"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type="email"
                                      placeholder="yourmail@gmail.com"
                                      {...field}
                                      className="pl-10"
                                    />
                                    <IoMail
                                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                      size={18}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="Phone no."
                                      {...field}
                                      className="pl-10"
                                    />
                                    <FaPhone
                                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                      size={18}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Designation</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Designation or position"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <FormField
                            control={form.control}
                            name="messengerAccount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Messenger Account</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Messenger Username"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Address details"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="addNotes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="notes"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      <div className="  flex justify-between">
                        <Button
                          type="button"
                          disabled={step === 1}
                          onClick={prevStep}
                        >
                          Previous
                        </Button>
                        {step < 3 ? (
                          <Button type="button" onClick={nextStep}>
                            Next
                          </Button>
                        ) : (
                          <Button type="submit" onClick={review}>Submit</Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </section>

            {/* Room Layout */}
            <section className="flex-1 bg-muted/50 p-6">
              <h1 className="text-2xl font-bold">Available Rooms & Venue</h1>
              <p className="text-sm font-normal">
                From {formattedFromDate} to {formattedToDate}
              </p>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                {showResults && (
                  <>
                    {renderRoomSection(
                      availableRooms.double_rooms,
                      "Double Rooms"
                    )}
                    {renderRoomSection(
                      availableRooms.triple_rooms,
                      "Triple Rooms"
                    )}
                    {renderRoomSection(
                      availableRooms.matrimonial_rooms,
                      "Matrimonial Rooms"
                    )}
                    {renderVenueSection(
                      availableRooms.venues_holder,
                      "Venues"
                    )}
                  </>
                )}
                
              </ScrollArea>
              
            </section>
          </div>
        </main>
      </main>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confirm Your Reservation</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaUser className="mr-2" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Full Name</Label>
                  <p>{`${formData.firstName || ''} ${formData.lastName || ''}`}</p>
                </div>
                <div>
                  <Label className="font-medium">Gender</Label>
                  <p>{formData.gender || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="font-medium">Email</Label>
                  <p className="flex items-center"><IoMail className="mr-2 h-4 w-4" />{formData.email || 'Not provided'}</p>
                </div>
                <div>
                  <Label className="font-medium">Phone</Label>
                  <p className="flex items-center"><FaPhone className="mr-2 h-4 w-4" />{formData.phone || 'Not provided'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IoCalendarClearSharp className="mr-2" />
                  Reservation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Date Range</Label>
                  <p>{formatDateRange(formData.dateRange)}</p>
                </div>
                <div>
                  <Label className="font-medium">Number of Guests</Label>
                  <p className="flex items-center"><FaUser className="mr-2 h-4 w-4" />{formData.numberofGuest || '1'}</p>
                </div>
                <div>
                  <Label className="font-medium">Client Type</Label>
                  <p>{formData.clientType || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="font-medium">Reservation Type</Label>
                  <p>{formData.reservationType || 'Not specified'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IoIosBriefcase className="mr-2" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Designation</Label>
                  <p>{formData.designation || 'Not provided'}</p>
                </div>
                <div>
                  <Label className="font-medium">Messenger Account</Label>
                  <p className="flex items-center"><TbMessageCircleFilled className="mr-2 h-4 w-4" />{formData.messengerAccount || 'Not provided'}</p>
                </div>
                <div className="col-span-2">
                  <Label className="font-medium">Address</Label>
                  <p className="flex items-center"><FaMapPin  className="mr-2 h-4 w-4" />{formData.address || 'Not provided'}</p>
                </div>
                <div className="col-span-2">
                  <Label className="font-medium">Additional Notes</Label>
                  <p className="flex items-center"><BsFileTextFill className="mr-2 h-4 w-4" />{formData.addNotes || 'No additional notes'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaUser className="mr-2" />
                  Selected Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{formData.selectedReservationRooms && formData.selectedReservationRooms.length > 0 
                    ? formData.selectedReservationRooms.join(", ") 
                    : "No rooms selected"}
                </p>
              </CardContent>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaUser className="mr-2" />
                  Selected Venues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{formData.selectedReservationVenues && formData.selectedReservationVenues.length > 0 
                    ? formData.selectedReservationVenues.join(", ") 
                    : "No venues selected"}
                </p>
              </CardContent>

            </Card>
          </div>
          <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setIsConfirmationOpen(false)}>
            Edit Reservation
          </Button>
          <Button type="button" onClick={handleConfirmSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
          </Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Add Toaster component for notifications */}
      <Toaster />
    </>
  );
}
