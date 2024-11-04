import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ReservationForm() {
  const [step, setStep] = useState(1);
  const [available, setAvailable] = useState("");
  const [showResults, setShowResults] = useState(false)
  const [reservationType, setReservationType] = useState("room")

  const form = useForm({
    defaultValues: {
      reservationType: "",
      dateRange: "",
      adults: "",
      kids: "",
      gender: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      paymentMethod: "",
      specialRequest: "",
      messengerAccount: "",
      proofOfPayment: "",
      proofOfIdentity: "",
      designation: "",
      address: "",
      client: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  const fetchAvailable = async (dateRange,reservationType) => {
    try {
      const { from, to } = dateRange;
      const formattedFrom = formatDateToYYYYMMDD(from);
      const formattedTo = formatDateToYYYYMMDD(to);
      const response = await fetch(`http://localhost:5000/api/available/${formattedFrom}/${formattedTo}/${reservationType}`);
      const data = await response.json();
      setAvailable(data);
    } catch (error) {
      console.error("Error fetching available:", error);
    }
  };
  
  // Main function to call availability check
  const callAvailable = (dateRange, reservationType) => {
    fetchAvailable(dateRange, reservationType);
    setShowResults(true);
  };

  console.log("Available:", available);


  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="p-2">
        <h1 className="text-3xl font-bold text-center mb-2">
          Reservation Form
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Please complete the form below.
        </p>

        <Progress value={step * 25} className="mb-6 bg-gray-200" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="reservationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reservation Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);  // Call the original onChange function
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
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reservation Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          className="custom-datepicker"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button variant="default" onClick={() => callAvailable(form.getValues("dateRange"), form.getValues("reservationType"))}>
                  Check Availability
                </Button>



                {/* <div className="grid grid-cols-1 gap-5">
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Guest</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="Enter number of adults" {...field} className="pl-10" />
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
                        <Input placeholder="Designation or position" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                  
                </div> */}
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
                        <FormLabel>First name</FormLabel>
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
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your last name" {...field} />
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
                          <SelectItem value="female">Female</SelectItem>
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
                          <Mail
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
                          <Phone
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

            {step === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="messengerAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Messenger Account</FormLabel>
                      <FormControl>
                        <Input placeholder="Messenger Username" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="proofOfIdentity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proof of Identity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Attach proof of identity"
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
                        <Textarea placeholder="Address details" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="  flex justify-between">
              <Button type="button" disabled={step === 1} onClick={prevStep}>
                Previous
              </Button>
              {step < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </form>
        </Form>
        <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Available {reservationType === 'room' ? 'Rooms' : 'Venues'}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            {available?.rooms && reservationType === 'room' && (
              <div className="space-y-6">
                {Object.entries(available.rooms).map(([floor, rooms]) => (
                  <div key={floor} className="space-y-2">
                    <h3 className="font-semibold">Floor {floor}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {rooms.map((room) => (
                        <div
                          key={room}
                          className="p-2 border rounded-lg text-sm flex items-center justify-between"
                        >
                          <span>{room}</span>
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {available?.venues && reservationType === 'venue' && (
              <div className="space-y-4">
                {Object.entries(available.venues).map(([venue, status]) => (
                  <div
                    key={venue}
                    className="p-3 border rounded-lg flex items-center justify-between"
                  >
                    <span className="font-medium">{venue}</span>
                    {status.available ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
