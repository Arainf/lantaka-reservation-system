import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Phone, Mail } from 'lucide-react'
import { DatePickerDemo as DatePicker } from "@/components/common/utilities/DateRangePicker"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"

export default function ReservationForm() {
  const [step, setStep] = useState(1)
  const form = useForm({
    defaultValues: {
      arrivalDate: "",
      departureDate: "",
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
  })

  const onSubmit = (data) => {
    console.log(data)
    // Handle form submission
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="max-w-4xl mx-auto p-16">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-2">Lantaka Reservation Form</h1>
        <p className="text-center mb-6 text-gray-600">Please complete the form below.</p>
        <p className="text-center mb-8 text-gray-600">Your registration will be verified prior to your arrival.</p>

        <Progress value={step * 25} className="mb-6 bg-gray-200" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="arrivalDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Arrival Date</FormLabel>
                        <FormControl>
                          <DatePicker {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="departureDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Date</FormLabel>
                        <FormControl>
                          <DatePicker {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-5">
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
                  
                </div>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="email" placeholder="yourmail@gmail.com" {...field} className="pl-10" />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
                          <Input placeholder="Phone no." {...field} className="pl-10" />
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
                  name="proofOfPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proof of Payment</FormLabel>
                      <FormControl>
                        <Input placeholder="Attach proof of payment" {...field} />
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
                        <Input placeholder="Attach proof of identity" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 4 && (
              <>
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
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input placeholder="Client details" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex justify-between">
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
      </div>
    </div>
  );
}