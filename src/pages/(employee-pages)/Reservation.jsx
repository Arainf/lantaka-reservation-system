"use client"

import React, { useState, useEffect, useCallback, useContext } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop"
import { FaPhone, FaUser, FaMapPin } from "react-icons/fa6"
import { IoMail, IoCalendarClearSharp } from "react-icons/io5"
import { IoIosBriefcase } from "react-icons/io"
import { TbMessageCircleFilled } from "react-icons/tb"
import { BsFileTextFill } from "react-icons/bs"
import { Label } from "@/components/ui/label"
import moment from 'moment-timezone';
import Spinner from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/common/utilities/DateRange"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { formatDateToYYYYMMDD } from "@/utils/colorsUtils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRoomVenueProvider } from "@/context/contexts"
import CostCalculator from "@/components/common/cards/Receipt"
import { Badge } from "@/components/ui/badge"
import { usePriceContext } from "@/context/priceContext"
import { Separator } from "@/components/ui/separator"
import { useNotifications } from "@/context/notificationContext";
import { UserContext } from "@/context/contexts";


const step1Schema = z.object({
  clientAlias: z.string().min(1, "*"),
  clientType: z.enum(["internal", "external"], {
    errorMap: () => ({ message: "*" }),
  }),
  reservationType: z.enum(["room", "venue", "both"], {
    errorMap: () => ({ message: "*" }),
  }),
  MaxnumberofGuest: z.number().optional(),
})

const step2Schema = z.object({
  firstName: z.string().min(1, "*"),
  lastName: z.string().min(1, "*"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "*" }),
  }),
  email: z.string().email("*"),
  phone: z.string().min(1, "*"),
  designation: z.string().optional(),
})

const step3Schema = z.object({
  messengerAccount: z.string().optional(),
  address: z.string().optional(),
  addNotes: z.string().optional(),
})

const reservationSchema = step1Schema.and(step2Schema).and(step3Schema)

export default function Component() {
  const {
    availableRooms,
    availableVenues,
    fetchEverythingAvailable,
    fetchAvailableRoom,
    fetchAvailableVenue,
  } = useRoomVenueProvider()
  const [step, setStep] = useState(1)
  const [showResultsRoom, setShowResultsRoom] = useState(false)
  const [showResultsVenue, setShowResultsVenue] = useState(false)
  const [selectedRooms, setSelectedRooms] = useState([])
  const [selectedVenues, setSelectedVenues] = useState([])
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [roomState, setRoomState] = useState(true)
  const [venueState, setVenueState] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservationType, setReservationType] = useState("")
  const [selectedRoomReceipt, setSelectedRoomReceipt] = useState({
    double: [],
    triple: [],
    matrimonial: [],
  })
  const { createNotification } = useNotifications();
  const { price, clientType, setClientType, discounts, initialTotalPrice, fetchDiscount } =
    usePriceContext()
  const [venueMessage, setVenueMessage] = useState("")
  const [search, setSearch] = useState("")
  const [roomMessage, setRoomMessage] = useState("")
  const [dateRangeRoomsetter, setDateRangeRoomsetter] = useState({
    from: "",
    to: "",
  })
  const [dateRangeVenueSetter, setDateRangeVenueSetter] = useState({
    from: "",
    to: "",
  })
  const [maxGuests, setMaxGuests] = useState(0)
  const [capacity, setCapacity] = useState({
    "Double capacity": 0,
    "Triple capacity": 0,
    "Matrimonial capacity": 0,
  })
  const [venueCapacity, setVenueCapacity] = useState([])
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  const [loading, setLoading] = useState(false);
  const { userData  } = useContext(UserContext);


  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      accountId: "",
      clientAlias: "",
      clientType: "",
      dateRangeRoom: { from: "", to: "" },
      dateRangeVenue: { from: "", to: "" },
      dateRangeBoth: { from: "", to: "" },
      MaxnumberofGuest: 0,
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
  })



  useEffect(() => {
    setCapacity({
      "Double capacity": price.double_capacity || 0,
      "Triple capacity": price.triple_capacity || 0,
      "Matrimonial capacity": price.Matrimonial_capacity || 0,
    })
    console.log(capacity)
  }, [price])

  useEffect(() => {
    if (Array.isArray(price.venue_Holder)) {
      const venues = price.venue_Holder.reduce((acc, venue) => {
        acc[venue.venue_id] = venue.venue_capacity || 0
        return acc
      }, {})
    
      setVenueCapacity(venues)
    } else {
      setVenueCapacity([])
    }
  }, [price])

  useEffect(() => {
    fetchEverythingAvailable();
    fetchDiscount();
  }, [])

  useEffect(() => {
    if (
      availableRooms.double_rooms.length > 0 ||
      availableVenues.venues_holder.length > 0
    ) {
      setShowResultsRoom(true)
      setShowResultsVenue(true)
    }
  }, [availableRooms, availableVenues])

  const calculateMaxGuests = useCallback(() => {
    let totalGuests = 0
    if (selectedRoomReceipt.double.length > 0) {
      totalGuests +=
        selectedRoomReceipt.double.length * capacity["Double capacity"]
    }
    if (selectedRoomReceipt.triple.length > 0) {
      totalGuests +=
        selectedRoomReceipt.triple.length * capacity["Triple capacity"]
    }
    if (selectedRoomReceipt.matrimonial.length > 0) {
      totalGuests +=
        selectedRoomReceipt.matrimonial.length *
        capacity["Matrimonial capacity"]
    }
    return totalGuests
  }, [selectedRoomReceipt, capacity, price])

  useEffect(() => {
    const newMaxGuests = calculateMaxGuests()
    setMaxGuests(newMaxGuests)
    form.setValue("MaxnumberofGuest", newMaxGuests)
  }, [selectedRoomReceipt, capacity, calculateMaxGuests, form])

  const getSelectedRooms = useCallback(() => {
    const rooms = []
    if (selectedRoomReceipt.double.length > 0) {
      rooms.push(...selectedRoomReceipt.double.map(() => "Double Bed"))
    }
    if (selectedRoomReceipt.triple.length > 0) {
      rooms.push(...selectedRoomReceipt.triple.map(() => "Triple Bed"))
    }
    if (selectedRoomReceipt.matrimonial.length > 0) {
      rooms.push(
        ...selectedRoomReceipt.matrimonial.map(() => "Matrimonial Room")
      )
    }
    return rooms
  }, [selectedRoomReceipt])

  const handleRoomClick = useCallback((roomId, roomType) => {
    setSelectedRooms((prevSelected) => {
      const currentTypeRooms = prevSelected[roomType] || []
      const updatedRooms = currentTypeRooms.includes(roomId)
        ? currentTypeRooms.filter((id) => id !== roomId)
        : [...currentTypeRooms, roomId]

      const newSelectedRooms = {
        ...prevSelected,
        [roomType]: updatedRooms,
      }

      setSelectedRoomReceipt((prevReceipt) => ({
        ...prevReceipt,
        [roomType]: updatedRooms,
      }))

      const message = updatedRooms.includes(roomId)
        ? `${roomType} room selected`
        : `${roomType} room deselected`

      setRoomMessage(message)

      return newSelectedRooms
    })
  }, [])

  const handleVenueClick = useCallback((venueId) => {
    setSelectedVenues((prevSelected) => {
      const isSelected = prevSelected.includes(venueId)
      const updatedVenues = isSelected
        ? prevSelected.filter((id) => id !== venueId)
        : [...prevSelected, venueId]
  
      const message = isSelected
        ? `Venue ${venueId} deselected`
        : `Venue ${venueId} selected`
  
      setVenueMessage(message)
  
      const newMaxCapacity = updatedVenues.reduce((total, venueId) => {
        const venue = price.venue_Holder.find(v => v.venue_id === venueId)
        return total + (venue ? venue.venue_capacity : 0)
      }, 0)
  
      setMaxGuests(newMaxCapacity)
      form.setValue("MaxnumberofGuest", newMaxCapacity)
  
      return updatedVenues
    })
  }, [price.venue_Holder, form])

  const onPass = async (data) => {
    console.log(data);
    if (step < 3) {
      await nextStep();
    } else {
      try {
        await step3Schema.parseAsync(data);
  
        // Get the timezone (e.g., from a user setting or default to system's timezone)
        const timeZone = 'Asia/Manila';  // Example: set this dynamically if needed
  
        // Adjust the date range for room with the selected timezone
        const fromRoom = dateRangeRoomsetter.from ? moment(dateRangeRoomsetter.from).tz(timeZone, true).format() : null;
        const toRoom = dateRangeRoomsetter.to ? moment(dateRangeRoomsetter.to).tz(timeZone, true).format() : null;
  
        // Adjust the date range for venue with the selected timezone
        const fromVenue = dateRangeVenueSetter.from ? moment(dateRangeVenueSetter.from).tz(timeZone, true).format() : null;
        const toVenue = dateRangeVenueSetter.to ? moment(dateRangeVenueSetter.to).tz(timeZone, true).format() : null;
  
        data.accountId = localStorage.getItem("account_id");
        data.totalPrice = calculateTotalPrice();
        data.discount = discounts;
        data.initialTotalPrice = initialTotalPrice;
        data.MaxnumberofGuest = maxGuests;
  
        // Check if `fromRoom` and `toRoom` are defined, if so, set `dateRangeRoom`
        if (fromRoom && toRoom) {
          data.dateRangeRoom = {
            from: fromRoom,
            to: toRoom,
          };
        }
  
        // If no dates are selected for room, set it to "none"
        if (!fromRoom && !toRoom) {
          data.dateRangeRoom = "none";
        }
  
        // Check if `fromVenue` and `toVenue` are defined, if so, set `dateRangeVenue`
        if (fromVenue && toVenue) {
          data.dateRangeVenue = {
            from: fromVenue,
            to: toVenue,
          };
        }
  
        // If no dates are selected for venue, set it to "none"
        if (!fromVenue && !toVenue) {
          data.dateRangeVenue = "none";
        }
  
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
  }
  

  const calculateTotalPrice = () => {
    let total = initialTotalPrice
    discounts.forEach((d) => {
      total -= Number(d.Amount)
    })
    return total
  }

  const review = () => {
    setIsConfirmationOpen(true)
  }

  const handleDisable = () => {
    if (reservationType === "room") {
      setRoomState(false)
      setVenueState(true)
      fetchEverythingAvailable()

      form.setValue("dateRangeVenue", { from: "", to: "" })

      form.reset({
        ...form.getValues(),
        dateRangeRoom: { from: "", to: "" },
        MaxnumberofGuest: 0,
        selectedReservationRooms: [""],
        selectedReservationVenues: [" "],
      })

      setSelectedRooms([])
      setSelectedVenues([])
    } else if (reservationType === "venue") {
      setRoomState(true)
      setVenueState(false)
      fetchEverythingAvailable()

      form.setValue("dateRangeRoom", { from: "", to: "" })

      form.reset({
        ...form.getValues(),
        dateRangeVenue: { from: "", to: "" },
        MaxnumberofGuest: 0,
        selectedReservationRooms: [""],
        selectedReservationVenues: [" "],
      })

      setSelectedRooms([])
      setSelectedVenues([])
    } else if (reservationType === "both") {
      form.setValue("dateRangeVenue", { from: "", to: "" })
      form.setValue("dateRangeRoom", { from: "", to: "" })

      form.reset({
        ...form.getValues(),
        dateRangeRoom: { from: "", to: "" },
        dateRangeVenue: { from: "", to: "" },
        MaxnumberofGuest: 0,
        selectedReservationRooms: [""],
        selectedReservationVenues: [" "],
      })

      setRoomState(false)
      setVenueState(false)
    }
  }

  useEffect(() => {
    handleDisable()
  }, [reservationType])

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/submitReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "An error occurred while submitting the reservation.");
      }
  
      toast({
        title: "Success",
        description: result.message || "Reservation submitted successfully!",
        variant: "success",
      });
  
      let fullName = userData.first_name + " " + userData.last_name;

        // Create a formatted timestamp
      const timestamp = new Date().toLocaleString('en-US', {
        weekday: 'long', // Day of the week
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // 12-hour format (AM/PM)
      });

      await createNotification({
        type: 'Created',
        description: `Account Name: "${fullName}" has created reservations for: "${formData.clientAlias} (${formData.firstName}) at Timestamp: "${timestamp} ".`,
        role: 'Administrator',
      });
  
      setIsConfirmationOpen(false);
      form.reset();
      setSelectedRooms([]);
      setSelectedVenues([]);
  
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate(0);
  
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const callAvailableRoom = (dateRange) => {
    console.log(`Date Range Raw: ${dateRange.from.toLocaleString()}, to ${dateRange.to.toLocaleString()}`)
    if (dateRange.from && dateRange.to) {
      const adjustedDateRange = {
        from: new Date(dateRange.from),
        to: new Date(dateRange.to),
      }

      console.log(`Date Range Adjusted: ${adjustedDateRange.from.toLocaleString()}, to ${adjustedDateRange.to.toLocaleString()}`)
      setDateRangeRoomsetter(adjustedDateRange)
      fetchAvailableRoom(adjustedDateRange)
      setShowResultsRoom(true)
    }
  }

  const callAvailableVenue = (dateRange) => {
    console.log(`Date Range Raw: ${dateRange.from.toLocaleString()}, to ${dateRange.to.toLocaleString()}`)
    if (dateRange.from && dateRange.to) {
      const adjustedDateRange = {
        from: new Date(dateRange.from),
        to: new Date(dateRange.to),
      }

      console.log(`Date Range Adjusted: ${adjustedDateRange.from.toLocaleString()}, to ${adjustedDateRange.to.toLocaleString()}`)
      setDateRangeVenueSetter(adjustedDateRange)
      fetchAvailableVenue(adjustedDateRange)
      setShowResultsVenue(true)
    }
  }

  const callAvailableRoomAndVenue = (dateRange) => {
    setDateRangeRoomsetter(dateRange)
    setDateRangeVenueSetter(dateRange)
    fetchAvailableRoom(dateRange)
    fetchAvailableVenue(dateRange)
    setShowResultsRoom(true)
    setShowResultsVenue(true)
  }



  const nextStep = async () => {
    try {
      const currentData = form.getValues()
      if (step === 1) {
        await step1Schema.parseAsync(currentData)
        if (
          (currentData.reservationType === "room" ||
            currentData.reservationType === "both") &&
          Object.values(selectedRooms).flat().length === 0
        ) {
          form.setError("dateRangeRoom", { type: "manual", message: "*" })
          setRoomMessage("Please select at least one room.")
          return
        }
        if (
          (currentData.reservationType === "venue" ||
            currentData.reservationType === "both") &&
          selectedVenues.length === 0
        ) {
          form.setError("dateRangeVenue", { type: "manual", message: "*" })
          setVenueMessage("Please select at least one venue.")
          return
        }
      } else if (step === 2) {
        await step2Schema.parseAsync(currentData)
      }

      setStep((prev) => Math.min(prev + 1, 3))
    } catch (error) {
      console.error("Validation error:", error)
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          form.setError(err.path[0], { message: err.message })
        })
      }
    }
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

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
          const {
            room_id: roomId,
            room_isready: isReady,
            room_status: isAvailable,
          } = room
          const isSelected = selectedRooms[roomType]?.includes(roomId)

          return (
            <Button
              key={roomId}
              variant={isAvailable && isReady ? "default" : "outline"}
              className={`h-15 poppins-semibold ${
                isAvailable 
                  ? (isSelected 
                      ? "bg-sky-500 text-white" 
                      : !isReady 
                        ? "bg-red-200 text-white" 
                        : "bg-green-500 text-primary-foreground")
                  : isReady 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-red-200 text-white"
              }`}
              disabled={!isReady || !isAvailable}
              onClick={() => handleRoomClick(roomId, roomType)}
            >
              {formatRoomName(roomId)}
            </Button>
          )
        })}
      </div>
    </div>
  )

  const calculateNumberOfNights = (dateRange) => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      console.error("Invalid date range")
      return 0
    }

    const { from, to } = dateRange
    const start = new Date(from)
    const end = new Date(to)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date format")
      return 0
    }

    const timeDifference = end - start
    const numberOfNights = timeDifference / (1000 * 3600 * 24)

    return Math.max(numberOfNights, 1)
  }

  const formatRoomName = (name) => {
    return name.replace(/([a-z])([1-9])/g, "$1 $2")
  }

  const formatVenueName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2")
  }

  const renderVenueSection = (venues, title) => (
    <div className="mb-8">
      <h3 className="text-sm font-medium mb-4 text-gray-600">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {venues.map((room) => {
          const {
            room_id: venueId,
            room_isready: isReady,
            room_status: isAvailable,
          } = room
          const isSelected = selectedVenues.includes(venueId)

          return (
            <Button
              key={venueId}
              variant={isAvailable && isReady ? "default" : "outline"}
              className={`h-15 w-auto poppins-semibold ${
                isAvailable 
                  ? (isSelected 
                      ? "bg-sky-500 text-white" 
                      : !isReady 
                        ? "bg-red-200 text-white" 
                        : "bg-green-500 text-primary-foreground")
                  : isReady 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-red-200 text-white"
              }`}
              disabled={!isReady || !isAvailable}
              onClick={() => handleVenueClick(venueId)}
            >
              {formatVenueName(venueId)}
            </Button>
          )
        })}
      </div>
    </div>
  )

  const formatDateRange = (dateRange) => {
    if (!dateRange || !dateRange.from || !dateRange.to) return "Not specified"
    return `${formatDateToYYYYMMDD(dateRange.from)} to ${formatDateToYYYYMMDD(
      dateRange.to
    )}`
  }

  const dateRangeVenue = form.getValues("dateRangeVenue")
  const dateRangeRoom = form.getValues("dateRangeRoom")
  const formattedFromDateRoom = dateRangeRoom.from
    ? new Date(dateRangeRoom.from).toLocaleDateString()
    : "null"
  const formattedToDateRoom = dateRangeRoom.to
    ? new Date(dateRangeRoom.to).toLocaleDateString()
    : "null"
  const formattedFromDateVenue = dateRangeVenue.from
    ? new Date(dateRangeVenue.from).toLocaleDateString()
    : "null"
  const formattedToDateVenue = dateRangeVenue.to
    ? new Date(dateRangeVenue.to).toLocaleDateString()
    : "null"

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount)
  }

  useEffect(() => {
    if (search.trim()) {
      fetch(`http://localhost:5000/api/clients?search=${search}`)
        .then(response => response.json())
        .then(data => {
          setClients(data)
        })
        .catch(error => {
          console.error("Error fetching clients:", error)
        })
    } else {
      setClients([])
    }
  }, [search])

  const [clnTpe, serClnTpe ] = useState("")
  
  const handleClientSelect = (client) => {
    setSelectedClient(client)
    form.reset({
      ...form.getValues(),
      clientAlias: client.guest_client,
      clientType: client.guest_type,
      firstName: client.guest_fName,
      lastName: client.guest_lName,
      gender: client.guest_gender,
      email: client.guest_email,
      phone: client.guest_phone,
      designation: client.guest_designation,
      messengerAccount: client.guest_messenger_account,
      address: client.guest_address,
    })
    setSearch(client.guest_client)
    setClients([])
    serClnTpe(client.guest_type)
    setClientType(client.guest_type)
    console.log(client.guest_type)
  }

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
                        className="space-y-6 animate-none"
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
                                    <div className="relative">
                                      <Input
                                        placeholder="Client Alias"
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(e.target.value)
                                          setSearch(e.target.value)
                                        }}
                                        autocomplete="off"
                                      />
                                      {clients.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                          {clients.map((client) => (
                                            <div
                                              key={client.guest_id}
                                              className="p-2 hover:bg-gray-100 cursor-pointer poppins-regular"
                                              onClick={() => handleClientSelect(client)}
                                            >
                                              <p>{client.guest_client}</p>
                                              <p className="poppins-light">{client.guest_fName} {client.guest_lName} </p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
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
                                        field.onChange(value)
                                        setClientType(value)
                                      }}
                                      defaultValue={field.value || clnTpe}
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
                                    <div className="flex flex-row gap-1">
                                      <FormLabel className={"poppins-semibold"}>
                                        Reservation Type
                                      </FormLabel>
                                    </div>
                                    <Select
                                      onValueChange={(value) => {
                                        field.onChange(value)
                                        setReservationType(value)
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

                            {reservationType !== "both" && (
                              <>
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
                                            onChange={(value) => {
                                              field.onChange(value)
                                              callAvailableRoom(value)
                                            }}
                                            className="custom-datepicker w-full"
                                            state={roomState}
                                          />
                                          <Button
                                            variant="default"
                                            type="button"
                                            disabled={roomState}
                                            onClick={() => callAvailableRoom(form.getValues("dateRangeRoom"))}
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
                                            onChange={(value) => {
                                              field.onChange(value)
                                              callAvailableVenue(value)
                                            }}
                                            className="custom-datepicker w-full"
                                            state={venueState}
                                          />
                                          <Button
                                            variant="default"
                                            type="button"
                                            disabled={venueState}
                                            onClick={() => callAvailableVenue(form.getValues("dateRangeVenue"))}
                                          >
                                            Show
                                          </Button>
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </>
                            )}

                            {reservationType === "both" && (
                              <FormField
                                control={form.control}
                                name="dateRangeBoth"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="flex flex-row gap-1">
                                      <FormLabel className={"poppins-semibold"}>
                                        Reservation Date &#40;Room and Venue&#41;
                                      </FormLabel>
                                      <FormMessage className="form-message" />
                                    </div>
                                    <FormControl>
                                      <div className="flex flex-row gap-2">
                                        <DatePicker
                                          value={field.value}
                                          onChange={(value) => {
                                            field.onChange(value)
                                            form.setValue("dateRangeRoom", value)
                                            form.setValue("dateRangeVenue", value)
                                          }}
                                          className="custom-datepicker w-full"
                                        />
                                        <Button
                                          variant="default"
                                          type="button"
                                          onClick={() => callAvailableRoomAndVenue(form.getValues("dateRangeBoth"))}
                                        >
                                          Show
                                        </Button>
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            )}

                            <FormField
                              control={form.control}
                              name="MaxnumberofGuest"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex flex-row gap-1">
                                    <FormLabel className="poppins-semibold">
                                      Max number of Guests
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
                                        value={maxGuests}
                                        readOnly
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
                                  <FormControl>
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
                                  </FormControl>
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
                    <div className="flex flex-row gap-1 text-center align-middle items-center mb-1">
                      <Badge variant="outline">{formattedFromDateRoom}</Badge>
                      <h2>-</h2>
                      <Badge variant="outline">{formattedToDateRoom}</Badge>
                    </div>
                    {roomMessage && (
                      <p className="text-sm text-green-600 mt-2">
                        {roomMessage}
                      </p>
                    )}
                    {renderRoomSection(
                      availableRooms.double_rooms,
                      "Double Bedroom",
                      "double"
                    )}
                    {renderRoomSection(
                      availableRooms.triple_rooms,
                      "Triple Bedroom",
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
                    <div className="flex flex-row gap-1 text-center align-middle items-center mb-1">
                      <Badge variant="outline">{formattedFromDateVenue}</Badge>
                      <h2>-</h2>
                      <Badge variant="outline">{formattedToDateVenue}</Badge>
                    </div>
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
        <DialogContent className="bg-transparent p-0 max-w-5xl border-none flex flex-row gap-3" showCloseButton={false}>
          <div className="w-3/5 flex flex-col gap-2">
            <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Confirm Your Reservation</CardTitle>
              <p>
                {formData?.dateRangeRoom?.from && formData?.dateRangeRoom?.to ? (
                  `From: ${new Date(formData.dateRangeRoom.from).toLocaleDateString()} To: ${new Date(formData.dateRangeRoom.to).toLocaleDateString()}`
                ) : (
                  "No date range selected"
                )}
              </p>
            </CardHeader>


              <CardContent className="p-4 flex flex-col h-full">
                <ScrollArea className="h-[calc(80vh-8rem)] w-full pr-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Guest Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="font-medium">Full Name</Label>
                          <p>{`${formData.firstName || ""} ${formData.lastName || ""}`}</p>
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
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                      <div className="grid grid-cols-2 gap-4">
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
                      </div>
                    </div>

                    {(formData.reservationType === "room" || formData.reservationType === "both") && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Selected Rooms</h3>
                          {Object.entries(selectedRoomReceipt).map(([roomType, rooms]) =>
                            rooms.length > 0 && (
                              <p key={roomType}>
                                <strong>{roomType.charAt(0).toUpperCase() + roomType.slice(1)} Rooms:</strong> {rooms.join(", ")}
                              </p>
                            )
                          )}
                        </div>
                      </>
                    )}

                    {(formData.reservationType === "venue" || formData.reservationType === "both") && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Selected Venues</h3>
                          <p>
                            <strong>Venues:</strong> {selectedVenues.length > 0 ? selectedVenues.join(", ") : "None selected"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="w-1/3 flex flex-col gap-2">

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
                {discounts &&
                  discounts.map((d, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-green-600"
                    >
                      <span>{d.type} Discount:</span>
                      <span>- {formatCurrency(Number(d.Amount))}</span>
                    </div>
                  ))}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Final Total:</span>
                  <span>{formatCurrency(formData.totalPrice)}</span>
                </div>
              </CardContent>
            </Card>




            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Confirm Reservation"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div>
      {/* Conditionally render the spinner */}
      {loading && <Spinner />}
      </div>
      <Toaster />
    </>
  );
}
