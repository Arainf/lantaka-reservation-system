'use client'

import React, { useState, useEffect, useRef } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import { Filter, Search, X, RefreshCw, Plus, Edit, Trash2, UserRound, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DeleteModal from "@/components/ui/deletemodal"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import roomTypeImage from "@/assets/images/hotel_room.jpg"
import * as z from "zod"
import { cn } from "@/lib/utils"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toast } from "@/components/ui/toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(1, "Name is required.").max(100, "Name must be 100 characters or less."),
  type: z.enum(["Room", "Venue", "RoomType"], {
    required_error: "Please select a type.",
  }),
  internalPrice: z.number().min(0, "Price must be a positive number."),
  externalPrice: z.number().min(0, "Price must be a positive number."),
  capacity: z.number().int().min(1, "Capacity must be at least 1."),
  roomType: z.string().optional(),
  status: z.enum(["Ready", "Cleaning", "Maintenance"]).optional(),
})

const roomTypeFormSchema = z.object({
  name: z.string().min(1, "Name is required.").max(100, "Name must be 100 characters or less."),
  capacity: z.number().int().min(1, "Capacity must be at least 1."),
  internalPrice: z.number().min(0, "Price must be a positive number."),
  externalPrice: z.number().min(0, "Price must be a positive number."),
})

const dummyItems = [
  { id: "VENUE001", name: "Old Talisay Bar", type: "Venue",  capacity: 0, status: "Ready" },
  { id: "VENUE002", name: "Seaside Area", type: "Venue",  capacity: 0, status: "Maintenance"},
  { id: "ROOM001", name: "Room301", type: "Room",  capacity: 2, roomType: "Double Bed", status: "Cleaning" },
  { id: "ROOM002", name: "Room302", type: "Room",  capacity: 3, roomType: "Triple Bed" , status: "Maintenance"},
  { id: "ROOM003", name: "Room303", type: "Room", capacity: 2, roomType: "Matrimonial", status: "Ready"},
  { id: "ROOMTYPE001", name: "Double Bed", type: "roomType",internalPrice: 1600, externalPrice: 1800, capacity: 2 },
  { id: "ROOMTYPE002", name: "Triple Bed", type: "roomType",internalPrice: 1900, externalPrice: 1900, capacity: 3 },
  { id: "ROOMTYPE003", name: "Matrimonial", type: "roomType",internalPrice: 2200, externalPrice: 2500, capacity: 4},
]

export default function VenueRoomManagement({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const [items, setItems] = useState(dummyItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: [],
  })
  const [tempFilters, setTempFilters] = useState({
    type: [],
  })  
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isAddSidebarOpen, setIsAddSidebarOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isAddRoomTypeModalOpen, setIsAddRoomTypeModalOpen] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Room",
      internalPrice: 0,
      externalPrice: 0,
      capacity: 1,
      roomType: "",
      status: "Ready",
    },
  })

  const roomTypeFormMethods = useForm({
    resolver: zodResolver(roomTypeFormSchema),
    defaultValues: {
      name: "",
      capacity: 1,
      internalPrice: 0,
      externalPrice: 0,
    },
  })

  useEffect(() => {
    createIcons({ icons })

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setTempFilters(filters)
  }, [filters])

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filters.type.length === 0 || filters.type.includes(item.type)
    return matchesSearch && matchesType
  })

  const handleDelete = (item) => {
    setItemToDelete(item)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setItems(items.filter(item => item.id !== itemToDelete.id))
    setDeleteModalOpen(false)
    setItemToDelete(null)
  }

  const handleTempFilterChange = (filterType, value) => {
    setTempFilters(prevFilters => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value]
      return { ...prevFilters, [filterType]: updatedFilter }
    })
  }

  const applyFilters = () => {
    setFilters(tempFilters)
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    setFilters({
      type: [],
    })
    setTempFilters({
      type: [],
    })
    setSearchTerm("")
  }

  const handleAddOrEditItem = async (values) => {
    setIsLoading(true)
    try {
      if (editingItem) {
        const updatedItems = items.map(item => 
          item.id === editingItem.id ? { ...item, ...values } : item
        )
        setItems(updatedItems)
      } else {
        const newItem = {
          id: `${values.type.toUpperCase()}${(items.length + 1).toString().padStart(3, '0')}`,
          ...values,
        }
        setItems([...items, newItem])
      }
      formMethods.reset()
      setEditingItem(null)
      setIsEditModalOpen(false)
      setIsAddSidebarOpen(false)
    } catch (error) {
      console.error("Error:", error)
      Toast({
        title: "Action Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    if (item.type === "Venue") {
      formMethods.reset({ ...item, status: item.status || "Ready" })
    } else {
      formMethods.reset(item)
    }
    setIsEditModalOpen(true)
  }

  const handlePriceChange = (id, priceType, value) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, [priceType]: value } : item
    ));
  };

  const types = ["Room", "Venue"]

  const activeFilters = [...filters.type]

  const renderItemCard = (item) => (
    <Card key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              
              <div className="flex items-center gap-1 text-muted-foreground">
                <UserRound className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold ">{item.capacity}</span>
              </div>
            </div>
            {item.type === "Room" && (
              <p className="text-sm text-muted-foreground">{item.roomType}</p>
            )}
            
            {item.type === "roomType" && (
              <div className="flex flex-col sm:flex-row mt-2">
                <img
                  src={roomTypeImage}
                  alt={item.name}
                  className="rounded-md object-cover w-full sm:w-[160px] h-[100px] mb-2 sm:mb-0"
                />
                 <div className="sm:ml-4 space-y-1">
                    <p className="text-m">
                      <span className="text-muted-foreground">Internal Price:</span> ₱{item.internalPrice}
                    </p>
                    <p className="text-m">
                      <span className="text-muted-foreground">External Price:</span> ₱{item.externalPrice}
                    </p>
                  </div>         
                </div>
            )}
          </div>
  
          <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
            {item.status && (
              <Badge
                variant="secondary"
                className={cn(
                  "px-2 py-1 text-xs font-medium",
                  item.status === "Ready" && "bg-green-300 text-green-800",
                  item.status === "Maintenance" && "bg-red-300 text-red-800",
                  item.status === "Cleaning" && "bg-gray-300 text-gray-800"
                )}
              >
                {item.status}
              </Badge>
            )}
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(item)}
                className="flex-1 sm:flex-none"
              >
                <Edit className="h-4 w-4" />
                <span className="sm:sr-only">Edit</span>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item)}
                className="flex-1 sm:flex-none"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sm:sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const handleAddRoomType = async (values) => {
    setIsLoading(true);
    try {
      const newRoomType = {
        id: `ROOMTYPE${(items.filter(item => item.type === "roomType").length + 1).toString().padStart(3, '0')}`,
        type: "roomType",
        ...values,
      };
      setItems([...items, newRoomType]);
      setIsAddRoomTypeModalOpen(false);
      roomTypeFormMethods.reset();
    } catch (error) {
      console.error("Error:", error);
      Toast({
        title: "Action Failed",
        description: "There was an error adding the room type. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto relative">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-4 md:p-6 space-y-6">
          <h1 className="text-2xl font-bold">Venue and Room Management</h1>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/4 lg:pr-6">
              <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full sm:w-80 border-2 border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                      <Search className="text-gray-900" size={18} />
                    </div>
                  </div>
                  <div className="relative" ref={filterRef}>
                    <Button
                      variant="outline"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    {isFilterOpen && (
                      <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Type</div>
                          {types.map((type) => (
                            <label key={type} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                checked={tempFilters.type.includes(type)}
                                onChange={() => handleTempFilterChange('type', type)}
                              />
                              <span className="ml-2">{type}</span>
                            </label>
                          ))}
                          <div className="border-t border-gray-100"></div>
                <div className="px-4 py-2">
                            <Button onClick={applyFilters} className="w-full mb-2">
                              Apply Filters
                            </Button>
                            <Button onClick={resetFilters} variant="outline" className="w-full">
                              Reset Filters
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingItem(null)
                      formMethods.reset()
                      setIsAddSidebarOpen(true)
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Room/Venue
                  </Button>
                  {(activeFilters.length > 0 || searchTerm) && (
                    <Button
                      variant="ghost"
                      onClick={resetFilters}
                      title="Reset all filters"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeFilters.map((filter) => (
                    <Badge key={filter} variant="secondary">
                      {filter}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-[480px]">
                <div className="w-[480px]">
                  <h2 className="text-xl font-semibold mb-4">Rooms</h2>
                  <div>
                    {filteredItems.filter(item => item.type === "Room").slice(0, 15).map(renderItemCard)}
                  </div>
                </div>
                <div className="w-[480px]">
                  <h2 className="text-xl font-semibold mb-4">Venues</h2>
                  <div>
                    {filteredItems.filter(item => item.type === "Venue").slice(0, 15).map(renderItemCard)}
                  </div>
                </div>
                <div className="w-[480px]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Room Types</h2>
                    <Button
                      className="h-10 w-10 bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      size="sm"
                      onClick={() => setIsAddRoomTypeModalOpen(true)}
                    >
                      <Plus className="h-4 w-4 text-black"/>
                    </Button>
                  </div>
                  <div>
                    {filteredItems.filter(item => item.type === "roomType").slice(0, 15).map(renderItemCard)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {isAddSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsAddSidebarOpen(false)}
          ></div>
        )}

        <div
          className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform ${
            isAddSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out overflow-y-auto z-50`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add New Room/Venue</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <FormProvider {...formMethods}>
              <Form {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(handleAddOrEditItem)} className="space-y-6">
                  <FormField
                    control={formMethods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name of room/venue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value)
                          if (value === "Venue") {
                            formMethods.setValue('roomType', null)
                          }
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Room">Room</SelectItem>
                            <SelectItem value="Venue">Venue</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {formMethods.watch('type') === "Room" && (
                    <FormField
                      control={formMethods.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value)
                              const selectedType = dummyItems.find(type => type.name === value && type.type === "roomType")
                              if (selectedType) {
                                formMethods.setValue('capacity', selectedType.capacity)
                                // Only set prices if they haven't been manually edited
                                if (formMethods.getValues('internalPrice') === 0) {
                                  formMethods.setValue('internalPrice', selectedType.internalPrice)
                                }
                                if (formMethods.getValues('externalPrice') === 0) {
                                  formMethods.setValue('externalPrice', selectedType.externalPrice)
                                }
                              }
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a room type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {dummyItems.filter(item => item.type === "roomType").map((type) => (
                                <SelectItem key={type.name} value={type.name}>{type.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={formMethods.control}
                    name="internalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internal Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter internal price" {...field} onChange={(e) => field.onChange(+e.target.value)} disabled={formMethods.watch('type') === "Room"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="externalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>External Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter external price" {...field} onChange={(e) => field.onChange(+e.target.value)} disabled={formMethods.watch('type') === "Room"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter capacity" {...field} onChange={(e) => field.onChange(+e.target.value)} disabled={formMethods.watch('type') === "Room"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {formMethods.watch('type') === "Room" && (
                    <FormField
                      control={formMethods.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Ready">Ready</SelectItem>
                              <SelectItem value="Cleaning">Cleaning</SelectItem>
                              <SelectItem value="Maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Item'
                    )}
                  </Button>
                </form>
              </Form>
            </FormProvider>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete ? itemToDelete.name : ""}
        itemType={itemToDelete ? itemToDelete.type : "Item"}
      />
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingItem?.type} Details</DialogTitle>
          </DialogHeader>
          <FormProvider {...formMethods}>
            <Form {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(handleAddOrEditItem)} className="space-y-6">
                <FormField
                  control={formMethods.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {editingItem?.type === "Venue" && (
                  <>
                    <FormField
                      control={formMethods.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter capacity" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formMethods.control}
                      name="internalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internal Price</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter internal price" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formMethods.control}
                      name="externalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>External Price</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter external price" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formMethods.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Ready">Ready</SelectItem>
                              <SelectItem value="Cleaning">Cleaning</SelectItem>
                              <SelectItem value="Maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {editingItem?.type === "roomType" && (
                  <>
                    <FormField
                      control={formMethods.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter room type name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formMethods.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter capacity" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formMethods.control}
                      name="internalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internal Price</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter internal price" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formMethods.control}
                      name="externalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>External Price</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter external price" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Item'
                  )}
                </Button>
              </form>
            </Form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddRoomTypeModalOpen} onOpenChange={setIsAddRoomTypeModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room Type</DialogTitle>
          </DialogHeader>
          <FormProvider {...roomTypeFormMethods}>
            <Form {...roomTypeFormMethods}>
              <form onSubmit={roomTypeFormMethods.handleSubmit(handleAddRoomType)} className="space-y-6">
                <FormField
                  control={roomTypeFormMethods.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter room type name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={roomTypeFormMethods.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter capacity" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={roomTypeFormMethods.control}
                  name="internalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Internal Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter internal price" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={roomTypeFormMethods.control}
                  name="externalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter external price" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Room Type'
                  )}
                </Button>
              </form>
            </Form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  )
}