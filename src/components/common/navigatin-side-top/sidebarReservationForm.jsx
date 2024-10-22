import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { BedDouble, Users, Phone, Mail, Calendar } from 'lucide-react'
import DatePicker from '@/components/ui/daterangepicker'

export default function Component() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      streetAddressLine2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      phone: "",
      email: "",
      arrivalDate: "",
      arrivalTime: "",
      departureDate: "",
      departureTime: "",
      adults: "",
      kids: "",
      paymentMethod: "check",
      specialRequest: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <div className="w-full h-screen overflow-y-scroll bg-gray-100">
      <div className="relative h-[300px] md:h-[250px]">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vyV4r8StrhEaMZuM8BfzgeYok48gcA.png"
          alt="Relaxing view of a person in an infinity pool overlooking the ocean"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Catch a break</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-2">Hotel Reservation Form</h2>
        <p className="text-center mb-6 text-gray-600">Please complete the form below.</p>
        <p className="text-center mb-8 text-gray-600">Your registration will be verified prior to your arrival.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Full Name</h2>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormLabel></FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormLabel></FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
                      <Input placeholder="(000) 000-0000" {...field} />
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
                      <Input type="email" placeholder="ex: myname@example.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Arrival - Date and Time</h2>
              <div className="flex gap-4 justify-center items-center">
                <FormField
                  control={form.control}
                  name="arrivalDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <DatePicker {...field} />
                      </FormControl>
                      <FormLabel>Date</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
                      <Input type="number" placeholder="ex: 2" {...field} />
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
                      Number of Hot Kids
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ex: 2" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Do you have any special request?</FormLabel>
                  <FormControl>
                    <Input as="textarea" placeholder="Type here..." {...field} className="h-24" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit Reservation</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}