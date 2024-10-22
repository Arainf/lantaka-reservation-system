import React, { useState, useEffect } from 'react'
import { BedDouble, Users, Phone, Mail, Calendar, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePicker from '@/components/ui/daterangepicker'
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { useForm } from "react-hook-form"

function ReservationForm({ presetNumber }) {

  console.log(presetNumber)

  const [prefilledData, setPrefilledData] = useState({
    guest: "",
    roomType: "",
    phone: "",
    email: "",
    guests: "",
    dateRange: { from: new Date(), to: new Date() },
  });

  // Use useEffect to modify prefilledData when presetNumber changes
  useEffect(() => {
    switch (presetNumber) {
      case 1:
        setPrefilledData({
          guest: "Campus Ministry Office",
          roomType: "single-sea",
          phone: "09123456789",
          email: "cmo@example.com",
          guests: "10",
          dateRange: { from: new Date(), to: new Date() },
        });
        break;
      case 2:
        setPrefilledData({
          guest: "Campus Ministry Office",
          roomType: "single-sea",
          phone: "09123456789",
          email: "cmo@example.com",
          guests: "10",
          dateRange: { from: new Date(), to: new Date() },
        });
        break;
      case 3:
        setPrefilledData({
          guest: "Campus Ministry Office",
          roomType: "single-sea",
          phone: "09123456789",
          email: "cmo@example.com",
          guests: "10",
          dateRange: { from: new Date(), to: new Date() },
        });
        break;
      default:
        break;
    }
  }, [presetNumber]); // Add presetNumber as a dependency

  const form = useForm({
    defaultValues: {
      roomType: prefilledData?.roomType || "",
      guest: prefilledData?.guest || "",
      phone: prefilledData?.phone || "",
      email: prefilledData?.email || "",
      guests: prefilledData?.guests || "",
      dateRange: prefilledData?.dateRange || { from: new Date(), to: new Date() },
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <div className="w-full bg-gray-100 min-h-screen p-4 flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="guest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Guest
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Phone
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <BedDouble className="mr-2 h-5 w-5" />
                  Room Type
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single-sea">Single Room (Sea View)</SelectItem>
                    <SelectItem value="single-garden">Single Room (Garden View)</SelectItem>
                    <SelectItem value="double-sea">Double Room (Sea View)</SelectItem>
                    <SelectItem value="double-garden">Double Room (Garden View)</SelectItem>
                    <SelectItem value="oldTalisayBar">Old Talisay Bar</SelectItem>
                    <SelectItem value="breezahall">Breeza Hall</SelectItem>
                    <SelectItem value="gazebo">Gazebo</SelectItem>
                    <SelectItem value="capizHall">Capiz Hall</SelectItem>
                    <SelectItem value="dinningHall">Dinning Hall</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your contact number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Number of Guests
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter number of guests" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Check-in / Check-out
                </FormLabel>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-blue-500" />
                Total Bill:
              </span>
              <span className="text-2xl font-bold">₱ 1000.00</span>
            </div>
          </div>

          <Button type="submit" className="w-full">Submit Reservation</Button>
        </form>
      </Form>
    </div>
  )
}

export default ReservationForm
