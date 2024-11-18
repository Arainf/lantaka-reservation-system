'use client'

import React, { useState, useEffect, useRef } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import { Filter, Search, X, RefreshCw, Plus, Edit, Trash2, UserRound, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DeleteModal from "@/components/ui/deletemodal"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
  type: z.enum(["Room", "Venue"], {
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
  { id: "VENUE001", name: "Old Talisay Bar", type: "Venue", internalPrice: 1600, externalPrice: 1800, capacity: 0, status: "Ready" },
  { id: "VENUE002", name: "Seaside Area", type: "Venue", internalPrice: 1600, externalPrice: 1800, capacity: 0, status: "Maintenance"},
  { id: "ROOM001", name: "Room301", type: "Room", internalPrice: 1600, externalPrice: 1500, capacity: 2, roomType: "Double Bed", status: "Cleaning" },
  { id: "ROOM002", name: "Room302", type: "Room", internalPrice: 1800, externalPrice: 1350, capacity: 3, roomType: "Triple Bed" , status: "Maintenance"},
  { id: "ROOM003", name: "Room303", type: "Room", internalPrice: 1600, externalPrice: 1800, capacity: 2, roomType: "Matrimonial", status: "Ready"},
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
  const [roomTypes, setRoomTypes] = useState([
    { name: "Double Bed", capacity: 2, internalPrice: 1600, externalPrice: 1800 },
    { name: "Triple Bed", capacity: 3, internalPrice: 1800, externalPrice: 2000 },
    { name: "Matrimonial", capacity: 2, internalPrice: 1600, externalPrice: 1800 },
  ])

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
    formMethods.reset(item)
    setIsEditModalOpen(true)
  }

  const handleAddRoomType = (values) => {
    setRoomTypes([...roomTypes, values])
    roomTypeFormMethods.reset()
  }

  const types = ["Room", "Venue"]

  const activeFilters = [...filters.type]

  const renderItemCard = (item) => (
    <Card key={item.id} className="relative bg-white rounded-lg shadow-md mb-4">
      <div className="p-4 flex w-[480px]">
        <div className="flex-1 w-[480px]">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <UserRound className="text-xs text-blue-500 w-4 h-4" />
            <span>{item.capacity}</span>
          </div>
          {item.type === "Room" && (
            <p className="text-sm text-muted-foreground">{item.roomType}</p>
          )}
        </div>
        <div className="text-middle min-w-[120px]">
          <div className="mt-4">
            <p
              className={`px-2 py-1 rounded text-center text-sm font-semibold ${
                item.status === "Ready"
                  ? "text-green-800 bg-green-200"
                  : item.status === "Maintenance"
                  ? "text-red-800 bg-red-200"
                  : item.status === "Cleaning"
                  ? "text-gray-800 bg-gray-200"
                  : "text-black bg-white"
              }`}
            >
              {item.status}
            </p>
          </div>
        </div>

        <div className="flex gap-2 m-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center w-10 h-10"
            onClick={() => handleEdit(item)}
          >
            <Edit className="h-8 w-8" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center justify-center w-10 h-10"
            onClick={() => handleDelete(item)}
          >
            <Trash2 className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto relative">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Venue and Room Management</h1>
          <div className="flex">
            <div className="w-3/4 pr-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                      <Search className="text-gray-900" size={18} />
                    </div>
                  </div>
                  <div className="relative" ref={filterRef}>
                    <Button
                      variant="outline"
                      className="ml-2"
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
                    className="ml-2"
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
                      className="ml-2"
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="w-[480px]">
                  <h2 className="text-xl font-semibold mb-4">Rooms</h2>
                  <div className="">
                    {filteredItems.filter(item => item.type === "Room").slice(0, 15).map(renderItemCard)}
                  </div>
                </div>
                <div className="w-[480px]">
                  <h2 className="text-xl font-semibold mb-4">Venues</h2>
                  <div className="">
                    {filteredItems.filter(item => item.type === "Venue").slice(0, 15).map(renderItemCard)}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Add New Room Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormProvider {...roomTypeFormMethods}>
                    <Form {...roomTypeFormMethods}>
                      <form onSubmit={roomTypeFormMethods.handleSubmit(handleAddRoomType)} className="space-y-4">
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
                        <Button type="submit" className="w-full">
                          Add Room Type
                        </Button>
                      </form>
                    </Form>
                  </FormProvider>
                </CardContent>
              </Card>
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
          className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
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
                              const selectedType = roomTypes.find(type => type.name === value)
                              if (selectedType) {
                                formMethods.setValue('capacity', selectedType.capacity)
                                formMethods.setValue('internalPrice', selectedType.internalPrice)
                                formMethods.setValue('externalPrice', selectedType.externalPrice)
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
                              {roomTypes.map((type) => (
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
                {editingItem?.type === "Room" && (
                  <>
                    <FormField
                      control={formMethods.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value)
                              const selectedType = roomTypes.find(type => type.name === value)
                              if (selectedType) {
                                formMethods.setValue('capacity', selectedType.capacity)
                                formMethods.setValue('internalPrice', selectedType.internalPrice)
                                formMethods.setValue('externalPrice', selectedType.externalPrice)
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
                              {roomTypes.map((type) => (
                                <SelectItem key={type.name} value={type.name}>{type.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                {editingItem?.type === "Venue" && (
                  <>
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
    </div>
  )
}