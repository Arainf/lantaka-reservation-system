'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import { FaPhone, FaUser, FaMapPin } from "react-icons/fa6";
import { IoMail, IoCalendarClearSharp } from "react-icons/io5";
import { IoIosBriefcase } from "react-icons/io";
import { TbMessageCircleFilled } from "react-icons/tb";
import { BsFileTextFill } from "react-icons/bs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/common/utilities/DateRange";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatDateToYYYYMMDD } from "@/utils/colorsUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRoomVenueProvider } from "@/context/contexts";
import CostCalculator from "@/components/common/cards/Receipt";
import { Badge } from "@/components/ui/badge";
import { usePriceContext } from "@/context/priceContext";
import { Separator } from "@/components/ui/separator";

// const dateRangeSchema = z.object({
//   from: z.union([z.date().nullable().optional(), z.string().optional()]),
//   to: z.union([z.date().nullable().optional(), z.string().optional()]),
// });

const step1Schema = z.object({
  clientAlias: z.string().min(1, "*"),
  clientType: z.enum(["Internal", "External"], {
    errorMap: () => ({ message: "*" }),
  }),
  reservationType: z.enum(["room", "venue", "both"], {
    errorMap: () => ({ message: "*" }),
  }),
  numberofGuest: z.string().min(1, "*"),
});

const step2Schema = z.object({
  firstName: z.string().min(1, "*"),
  lastName: z.string().min(1, "*"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "*" }),
  }),
  email: z.string().email("*"),
  phone: z.string().min(1, "*"),
  designation: z.string().optional(),
});

const step3Schema = z.object({
  messengerAccount: z.string().optional(),
  address: z.string().optional(),
  addNotes: z.string().optional(),
});

const reservationSchema = step1Schema.and(step2Schema).and(step3Schema);

export default function Component() {
  const {
    availableRooms,
    availableVenues,
    fetchEverythingAvailable,
    fetchAvailableRoom,
    fetchAvailableVenue,
  } = useRoomVenueProvider();
  const [step, setStep] = useState(1);
  const [showResultsRoom, setShowResultsRoom] = useState(false);
  const [showResultsVenue, setShowResultsVenue] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [roomState, setRoomState] = useState(true);
  const [venueState, setVenueState] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationType, setReservationType] = useState("");
  const [selectedRoomReceipt, setSelectedRoomReceipt] = useState({
    double: [],
    triple: [],
    matrimonial: [],
  });
  const { price, clientType, setClientType, discounts, initialTotalPrice } = usePriceContext();
  const [venueMessage, setVenueMessage] = useState("");
  const [roomMessage, setRoomMessage] = useState("");
  const [dateRangeRoomsetter, setDateRangeRoomsetter] = useState({
    from: "",
    to: "",
  });
  const [dateRangeVenueSetter, setDateRangeVenueSetter] = useState({
    from: "",
    to: "",
  });

  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      accountId: localStorage.getItem("account_id"),
      clientAlias: "",
      clientType: "",
      dateRangeRoom: { from: "", to: "" },
      dateRangeVenue: { from: "", to: "" },
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
      selectedReservationRooms: [""],
      selectedReservationVenues: [" "],
      discount: [""],
      initialTotalPrice: 0,
      totalPrice: 0,
    },
  });

  const getSelectedRooms = () => {
    const rooms = [];
    if (selectedRoomReceipt.double.length > 0) {
      rooms.push(...selectedRoomReceipt.double.map(() => "Double Room"));
    }
    if (selectedRoomReceipt.triple.length > 0) {
      rooms.push(...selectedRoomReceipt.triple.map(() => "Triple Room"));
    }
    if (selectedRoomReceipt.matrimonial.length > 0) {
      rooms.push(
        ...selectedRoomReceipt.matrimonial.map(() => "Matrimonial Room")
      );
    }
    return rooms;
  };

  const handleRoomClick = (roomId, roomType) => {
    setSelectedRooms((prevSelected) => {
      const currentTypeRooms = prevSelected[roomType] || [];
      const updatedRooms = currentTypeRooms.includes(roomId)
        ? currentTypeRooms.filter((id) => id !== roomId)
        : [...currentTypeRooms, roomId];

      const newSelectedRooms = {
        ...prevSelected,
        [roomType]: updatedRooms,
      };

      setSelectedRoomReceipt((prevReceipt) => ({
        ...prevReceipt,
        [roomType]: updatedRooms,
      }));

      const message = updatedRooms.includes(roomId)
        ? `${roomType} room selected`
        : `${roomType} room deselected`;

      setRoomMessage(message);

      return newSelectedRooms;
    });
  };

  const handleVenueClick = (venueId) => {
    setSelectedVenues((prevSelected) => {
      if (prevSelected.includes(venueId)) {
        return prevSelected.filter((id) => id !== venueId);
      } else {
        return [...prevSelected, venueId];
      }
    });
  };

  const onPass = async (data) => {
    if (step < 3) {
      await nextStep();
    } else {
      try {
        await step3Schema.parseAsync(data);

        data.totalPrice = calculateTotalPrice();
        data.discount = discounts;
        data.initialTotalPrice = initialTotalPrice;

        data.dateRangeRoom = {
          from: dateRangeRoomsetter.from,
          to: dateRangeRoomsetter.to,
        };

        data.dateRangeVenue = {
          from: dateRangeVenueSetter.from,
          to: dateRangeVenueSetter.to,
        };

        data.selectedReservationRooms = selectedRooms;
        data.selectedReservationVenues = selectedVenues;
        data.clientType = clientType;
        console.log("data:", JSON.stringify(data, null, 2));
        setFormData(data);
      } catch (error) {
        console.error("Final validation error:", error);
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            form.setError(err.path[0], { message: err.message });
          });
        }
      }
    }
  };

  const calculateTotalPrice = () => {
    let total = initialTotalPrice;
    discounts.forEach(d => {
      total -= Number(d.amount);
    });
    return total;
  };

  const review = () => {
    setIsConfirmationOpen(true);
  };

  useEffect(() => {
    fetchEverythingAvailable();
  }, []);

  useEffect(() => {
    if (availableRooms.double_rooms.length > 0 || availableVenues.venues_holder.length > 0) {
      setShowResultsRoom(true);
      setShowResultsVenue(true);
    }
  }, [availableRooms, availableVenues]);

  const handleDisable = () => {
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

  useEffect(() => {
    handleDisable();
  }, [reservationType]);

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/submitReservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: result.message || "Reservation submitted successfully!",
        });
        setIsConfirmationOpen(false);
        form.reset();
        setSelectedRooms([]);
        setSelectedVenues([]);
        setTimeout(() => {
          navigate(0);
        }, 1500);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            result.error ||
            "An error occurred while submitting the reservation.",
        });
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const callAvailableRoom = (dateRange) => {
    setDateRangeRoomsetter(dateRange);
    fetchAvailableRoom(dateRange);
    setShowResultsRoom(true);
  };

  const callAvailableVenue = (dateRange) => {
    setDateRangeVenueSetter(dateRange);
    fetchAvailableVenue(dateRange);
    setShowResultsVenue(true);
  };

  const nextStep = async () => {
    try {
      const currentData = form.getValues();
      if (step === 1) {
        await step1Schema.parseAsync(currentData);
        if (
          (currentData.reservationType === "room" ||
            currentData.reservationType === "both") &&
          Object.values(selectedRooms).flat().length === 0
        ) {
          form.setError("dateRangeRoom", { type: "manual", message: "*" });
          setRoomMessage("Please select at least one room.");
          return;
        }
        if (
          (currentData.reservationType === "venue" ||
            currentData.reservationType === "both") &&
          selectedVenues.length === 0
        ) {
          form.setError("dateRangeVenue", { type: "manual", message: "*" });
          setVenueMessage("Please select at least one venue.");
          return;
        }
      } else if (step === 2) {
        await step2Schema.parseAsync(currentData);
      }

      setStep((prev) => Math.min(prev + 1, 3));
    } catch (error) {
      console.error("Validation error:", error);
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          form.setError(err.path[0], { message: err.message });
        });
      }
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderRoomSection = (rooms, title, roomType) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Badge variant="secondary">
          ₱{price[`${roomType.toLowerCase()}_price`] || 0}
        </Badge>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {rooms.map((room) => {
          const { room_id: roomId, room_isready: isReady, room_status: isAvailable } = room;
          const isSelected = selectedRooms[roomType]?.includes(roomId);

          return (
            <Button
              key={roomId}
              variant={isAvailable && isReady ? "default" : "outline"}
              className={`h-15 poppins-semibold ${
                isAvailable
                  ? isSelected
                    ? "bg-slate-900 text-white"
                    : "bg-green-400 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              disabled={!isAvailable}
              onClick={() => handleRoomClick(roomId, roomType)}
            >
              {formatRoomName(roomId)}
            </Button>
          );
        })}
      </div>
    </div>
  );

  const calculateNumberOfNights = (dateRange) => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      console.error("Invalid date range");
      return 0;
    }

    const { from, to } = dateRange;
    const start = new Date(from);
    const end = new Date(to);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date format");
      return 0;
    }

    const timeDifference = end - start;
    const numberOfNights = timeDifference / (1000 * 3600 * 24);

    return Math.max(numberOfNights, 1);
  };

  const formatRoomName = (name) => {
    return name.replace(/([a-z])([1-9])/g, "$1 $2");
  };

  const formatVenueName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const renderVenueSection = (venues, title) => (
    <div className="mb-8">
      <h3 className="text-sm font-medium mb-4 text-gray-600">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {venues.map((room) => {
          const { room_id: venueId, room_isready: isReady, room_status: isAvailable } = room;
          const isSelected = selectedVenues.includes(venueId);

          return (
            <Button
              key={venueId}
              variant={isAvailable && isReady ? "default" : "outline"}
              className={`h-15 w-auto poppins-semibold ${
                isAvailable
                ? isSelected
                  ? "bg-sky-500 text-white"
                  : "bg-green-500 text-primary-foreground"
                : isReady
                ? "bg-muted text-muted-foreground"
                : "bg-red-500 text-white"
              }`}
              disabled={!isReady || !isAvailable}
              onClick={() => handleVenueClick(venueId)}
            >
              {formatVenueName(venueId)}
            </Button>
          );
        })}
      </div>
    </div>
  );

  const formatDateRange = (dateRange) => {
    if (!dateRange || !dateRange.from || !dateRange.to) return "Not specified";
    return `${formatDateToYYYYMMDD(dateRange.from)} to ${formatDateToYYYYMMDD(
      dateRange.to
    )}`;
  };

  const dateRangeVenue = form.getValues("dateRangeVenue");
  const dateRangeRoom = form.getValues("dateRangeRoom");
  const formattedFromDateRoom = dateRangeRoom.from
    ? new Date(dateRangeRoom.from).toLocaleDateString()
    : "null";
  const formattedToDateRoom = dateRangeRoom.to
    ? new Date(dateRangeRoom.to).toLocaleDateString()
    : "null";
  const formattedFromDateVenue = dateRangeVenue.from
    ? new Date(dateRangeVenue.from).toLocaleDateString()
    : "null";
  const formattedToDateVenue = dateRangeVenue.to
    ? new Date(dateRangeVenue.to).toLocaleDateString()
    : "null";

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <>
      <main className="flex flex-col h-screen w-screen overflow-hidden">
        <NavigationTop />
        <main className="flex flex-row h-screen">
          <div className="flex w-full">
            <section className="w-1/4 border-r bg-background p-3 drop-shadow-lg">
              <div className="max-w-4xl mx-auto p-1">
                <div className="p-2">
                  <h1 className="text-2xl poppins-bold font-bold text-left mb-[-2]">
                    Reservation Form
                  </h1>
                  <p className="text-left mb-5 poppins-extralight text-sm  text-gray-600">
                    Please complete the form below.
                  </p>
                  <FormProvider {...form}>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onPass)}
                        className="space-y-6"
                      >
                        {step === 1 && (
                          <>
                            <FormField
                              control={form.control}
                              name="clientAlias"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Client Alias
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
                                  <FormControl>
                                    <Input
                                      placeholder="Client Alias"
                                      {...field}
                                    />
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
                                    <div className="flex flex-row gap-1">
                                      <FormLabel className={"poppins-semibold"}>
                                        Client Type
                                      </FormLabel>
                                      <FormMessage className="form-message" />
                                    </div>
                                    <Select
                                      onValueChange={(value) => {
                                        field.onChange(value);
                                        setClientType(value);
                                      }}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="Internal">
                                          Internal
                                        </SelectItem>
                                        <SelectItem value="External">
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
                                    <div className="flex flex-row gap-1">
                                      <FormLabel className={"poppins-semibold"}>
                                        Reservation Type
                                      </FormLabel>
                                    </div>
                                    <Select
                                      onValueChange={(value) => {
                                        field.onChange(value);
                                        setReservationType(value);
                                      }}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="room">
                                          Room
                                        </SelectItem>
                                        <SelectItem value="venue">
                                          Venue
                                        </SelectItem>
                                        <SelectItem value="both">
                                          Both
                                        </SelectItem>
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
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Reservation Date &#40;Room&#41;
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
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
                                          callAvailableRoom(
                                            form.getValues("dateRangeRoom")
                                          )
                                        }
                                      >
                                        Show
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
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Reservation Date &#40;Venue&#41;
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
                                  <FormControl>
                                    <div className="flex flex-row gap-2 ">
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
                                          callAvailableVenue(
                                            form.getValues("dateRangeVenue")
                                          )
                                        }
                                      >
                                        Show
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
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Number of Guest
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
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
                                    <div className="flex flex-row gap-1">
                                      <FormLabel className={"poppins-semibold"}>
                                        First name
                                      </FormLabel>
                                      <FormMessage className="form-message" />
                                    </div>
                                    <FormControl>
                                      <Input
                                        placeholder="Your name"
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="flex flex-row gap-1">
                                      <FormLabel className={"poppins-semibold"}>
                                        Last name
                                      </FormLabel>
                                      <FormMessage className="form-message" />
                                    </div>
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
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Gender
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
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
                                      <SelectItem value="other">
                                        Other
                                      </SelectItem>
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
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      E-Mail
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
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
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Phone Number
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
                                  <Form Control>
                                    <div className="relative">
                                      <Input
                                        type="tel"
                                        placeholder="09123456789"
                                        {...field}
                                        className="pl-10"
                                      />
                                      <FaPhone
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        size={18}
                                      />
                                    </div>
                                  </Form>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="designation"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Designation
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="Your designation"
                                        {...field}
                                        className="pl-10"
                                      />
                                      <IoIosBriefcase
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
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Messenger Account
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="Your messenger account"
                                        {...field}
                                        className="pl-10"
                                      />
                                      <TbMessageCircleFilled
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
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Address
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="Your address"
                                        {...field}
                                        className="pl-10"
                                      />
                                      <FaMapPin
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
                              name="addNotes"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className={"poppins-semibold"}>
                                      Additional Notes
                                    </FormLabel>
                                    <FormMessage className="form-message" />
                                  </div>
                                  <FormControl>
                                    <div className="relative">
                                      <Textarea
                                        placeholder="Any additional notes"
                                        {...field}
                                        className="pl-10 pt-8"
                                      />
                                      <BsFileTextFill
                                        className="absolute left-3 top-8 transform -translate-y-1/2 text-gray-400"
                                        size={18}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </>
                        )}

                        <div className="flex justify-between">
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
                            <Button type="submit" onClick={review}>
                              Submit
                            </Button>
                          )}
                        </div>
                      </form>
                    </Form>
                  </FormProvider>
                </div>
              </div>
            </section>

            <section className="flex w-1/2 justify-center items-center bg-muted/50">
              <ScrollArea className="h-[calc(100vh-8rem)] w-[95%] p-2 ">
                
                {showResultsRoom && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Available Rooms</h2>

                    {roomMessage && (
                      <p className="text-sm text-green-600 mt-2">
                        {roomMessage}
                      </p>
                    )}
                    {renderRoomSection(
                      availableRooms.double_rooms,
                      "Double Rooms",
                      "double"
                    )}
                    {renderRoomSection(
                      availableRooms.triple_rooms,
                      "Triple Rooms",
                      "triple"
                    )}
                    {renderRoomSection(
                      availableRooms.matrimonial_rooms,
                      "Matrimonial Rooms",
                      "matrimonial"
                    )}
                   
                  </div>
                )}
                {showResultsVenue && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Available Venues</h2>
                    {renderVenueSection(
                      availableVenues.venues_holder,
                      "Venues"
                    )}
                    {venueMessage && (
                      <p className="text-sm text-green-600 mt-2">
                        {venueMessage}
                      </p>
                    )}
                  </div>
                )}
              </ScrollArea>
            </section>

            <section className="flex w-1/4 justify-center items-center bg-muted/50">
              <ScrollArea className="h-[calc(100vh-8rem)] w-[90%] ">
                <CostCalculator
                  clientType={clientType}
                  selectedRooms={getSelectedRooms()}
                  selectedVenues={selectedVenues}
                  numberOfNights={calculateNumberOfNights(
                    form.getValues("dateRangeRoom") ||
                      form.getValues("dateRangeVenue")
                  )}
                />
              </ScrollArea>
            </section>
          </div>
        </main>
      </main>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Confirm Your Reservation
            </DialogTitle>
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
                  <p>{`${formData.firstName || ""} ${
                    formData.lastName || ""
                  }`}</p>
                </div>
                <div>
                  <Label className="font-medium">Gender</Label>
                  <p>{formData.gender || "Not specified"}</p>
                </div>
                <div>
                  <Label className="font-medium">Email</Label>
                  <p className="flex items-center">
                    <IoMail className="mr-2 h-4 w-4" />
                    {formData.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Phone</Label>
                  <p className="flex items-center">
                    <FaPhone className="mr-2 h-4 w-4" />
                    {formData.phone || "Not provided"}
                  </p>
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
                  <Label className="font-medium">Client Type</Label>
                  <p>{formData.clientType || "Not specified"}</p>
                </div>
                <div>
                  <Label className="font-medium">Room Date Range</Label>
                  <p>{formatDateRange(formData.dateRangeRoom)}</p>
                </div>
                <div>
                  <Label className="font-medium">Venue Date Range</Label>
                  <p>{formatDateRange(formData.dateRangeVenue)}</p>
                </div>
                <div>
                  <Label className="font-medium">Number of Guests</Label>
                  <p>{formData.numberofGuest || "Not specified"}</p>
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
                  <p>{formData.designation || "Not provided"}</p>
                </div>
                <div>
                  <Label className="font-medium">Messenger Account</Label>
                  <p className="flex items-center">
                    <TbMessageCircleFilled className="mr-2 h-4 w-4" />
                    {formData.messengerAccount || "Not provided"}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="font-medium">Address</Label>
                  <p className="flex items-center">
                    <FaMapPin className="mr-2 h-4 w-4" />
                    {formData.address || "Not provided"}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="font-medium">Additional Notes</Label>
                  <p className="flex items-center">
                    <BsFileTextFill className="mr-2 h-4 w-4" />
                    {formData.addNotes || "No additional notes"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {(formData.reservationType === "room" ||
              formData.reservationType === "both") && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaUser className="mr-2" />
                    Selected Rooms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(selectedRoomReceipt).map(
                    ([roomType, rooms]) =>
                      rooms.length > 0 && (
                        <p key={roomType}>
                          <strong>
                            {roomType.charAt(0).toUpperCase() +
                              roomType.slice(1)}{" "}
                            Rooms:
                          </strong>{" "}
                          {rooms.join(", ")}
                        </p>
                      )
                  )}
                </CardContent>
              </Card>
            )}

            {(formData.reservationType === "venue" ||
              formData.reservationType === "both") && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <IoIosBriefcase className="mr-2" />
                    Selected Venues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Venues:</strong>{" "}
                    {selectedVenues.length > 0
                      ? selectedVenues.join(", ")
                      : "None selected"}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IoIosBriefcase className="mr-2" />
                  Price Rundown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Initial Total:</span>
                  <span>{formatCurrency(initialTotalPrice)}</span>
                </div>
                {discounts && discounts.map((d, index) => (
                  <div key={index} className="flex justify-between text-green-600">
                    <span>{d.type} Discount:</span>
                    <span>- {formatCurrency(Number(d.amount))}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Final Total:</span>
                  <span>{formatCurrency(formData.totalPrice)}</span>
                </div>
              </CardContent>
            </Card> 
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmationOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm Reservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}