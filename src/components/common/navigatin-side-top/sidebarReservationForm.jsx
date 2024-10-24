import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Phone, Mail, Users } from "lucide-react";
import { DatePickerDemo as DatePicker } from "@/components/common/utilities/DateRangePicker";

export default function Component() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      arrivalDate: "",
      departureDate: "",
      adults: "",
      kids: "",
      paymentMethod: "check",
      specialRequest: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const greetings = ["Good Day", "Atenean", "Welcome", "Hello", "Magis"];
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0); // Start fading out
      setTimeout(() => {
        setCurrentGreeting(
          (prevGreeting) => (prevGreeting + 1) % greetings.length
        );
        setOpacity(1); // Fade in the new greeting
      }, 500); // Duration of fade out
    }, 3000); // Change greeting every 2.5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll bg-gray-100">
      <div className="relative h-[300px] md:h-[250px] z-10">
        <img
          src="src/assets/images/LantakaBG.jpg"
          alt="Relaxing view of a person in an infinity pool overlooking the ocean"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-opacity-30 flex items-center justify-center"
          style={{
            opacity,
            transition: "opacity 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {greetings[currentGreeting]}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-2">
          Lantaka Reservation Form
        </h2>
        <p className="text-center mb-6 text-gray-600">
          Please complete the form below.
        </p>
        <p className="text-center mb-8 text-gray-600">
          Your registration will be verified prior to your arrival.
        </p>

        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {" "}
              {/* Use consistent vertical spacing */}
              {/* Date Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Date and Time</h2>
                <div className="flex gap-4 items-center">
                  {/* Arrival Date */}
                  <FormField
                    control={form.control}
                    name="arrivalDate"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full drop-shadow-lg">
                        <FormLabel>Arrival Date</FormLabel>
                        <FormControl>
                          <DatePicker {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/* Departure Date */}
                  <FormField
                    control={form.control}
                    name="departureDate"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full drop-shadow-lg">
                        <FormLabel>Departure Date</FormLabel>
                        <FormControl>
                          <DatePicker {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Guest Details */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Guest Details</h2>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1 drop-shadow-lg">
                        <FormLabel className="flex items-center">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1 drop-shadow-lg">
                        <FormLabel className="flex items-center">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Contact Information */}
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex items-center">
                        <Phone className="mr-2 h-5 w-5" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="drop-shadow-lg"
                          placeholder="Phone no."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex items-center">
                        <Mail className="mr-2 h-5 w-5" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="drop-shadow-lg"
                          type="email"
                          placeholder="E-mail address"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* Guest Count */}
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        Number of Adults
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="drop-shadow-lg"
                          type="number"
                          placeholder="Enter number of adults"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kids"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        Number of Kids
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="drop-shadow-lg"
                          type="number"
                          placeholder="Enter number of kids"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="drop-shadow-lg">
                        <select
                          {...field}
                          className="bg-white border rounded p-2"
                        >
                          <option value="cash">Cash</option>
                          <option value="credit-card">Credit Card</option>
                          <option value="check">Check</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* Special Requests */}
              <FormField
                control={form.control}
                name="specialRequest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Input
                        className="drop-shadow-lg"
                        placeholder="Any special requests?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
