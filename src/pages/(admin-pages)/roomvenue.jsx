'use client'

import React, { useState, useEffect, useRef } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import { Filter, Search, X, RefreshCw, Plus, Edit, Trash2, Users, DollarSign } from "lucide-react"
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
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"


const formSchema = z.object({
  name: z.string().min(1, "Name is required.").max(100, "Name must be 100 characters or less."),
  type: z.enum(["Room", "Venue"], {
    required_error: "Please select a type.",
  }),
  price: z.number().min(0, "Price must be a positive number."),
  capacity: z.number().int().min(1, "Capacity must be at least 1."),
  description: z.string().max(500, "Description must be 500 characters or less."),
})

const dummyItems = [
  { id: "ROOM101", name: "Room 101", type: "Room", price: 200, capacity: 2, description: "A luxurious suite with a beautiful view." },
  { id: "ROOM102", name: "Room 102", type: "Room", price: 180, capacity: 2, description: "Cozy room with modern amenities." },
  { id: "ROOM103", name: "Room 103", type: "Room", price: 220, capacity: 3, description: "Spacious room with a balcony." },
  { id: "ROOM104", name: "Room 104", type: "Room", price: 190, capacity: 2, description: "Quiet room with a garden view." },
  { id: "ROOM105", name: "Room 105", type: "Room", price: 250, capacity: 4, description: "Family suite with two bedrooms." },
  { id: "ROOM106", name: "Room 106", type: "Room", price: 210, capacity: 2, description: "Elegant room with a city view." },
  { id: "VENUE001", name: "Capiz Hall", type: "Venue", price: 1000, capacity: 200, description: "Perfect for large events and weddings." },
  { id: "VENUE002", name: "Emerald Room", type: "Venue", price: 800, capacity: 100, description: "Ideal for corporate meetings and seminars." },
  { id: "VENUE003", name: "Sunset Pavilion", type: "Venue", price: 1200, capacity: 150, description: "Beautiful outdoor venue for special occasions." },
  { id: "VENUE004", name: "Crystal Ballroom", type: "Venue", price: 1500, capacity: 300, description: "Luxurious ballroom for grand celebrations." },
  { id: "VENUE005", name: "Garden Terrace", type: "Venue", price: 600, capacity: 80, description: "Charming venue for intimate gatherings." },
  { id: "VENUE006", name: "Skyline Lounge", type: "Venue", price: 900, capacity: 120, description: "Modern venue with panoramic city views." },
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

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Room",
      price: 0,
      capacity: 1,
      description: "",
    },
  });

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
    const matchesSearch = item  .name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    Toast({
      title: "Item Deleted",
      description: `${itemToDelete.name} has been removed.`,
    })
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
    setIsLoading(true);
    try {
      if (editingItem) {
        // Edit existing item
        const updatedItems = items.map(item => 
          item.id === editingItem.id ? { ...item, ...values } : item
        );
        setItems(updatedItems);
        Toast({
          title: "Item Updated",
          description: `${values.name} has been updated successfully.`,
        });
        setIsEditModalOpen(false);
      } else {
        // Add new item
        const newItem = {
          id: `${values.type.toUpperCase()}${(items.length + 1).toString().padStart(3, '0')}`,
          ...values,
        };
        setItems([...items, newItem]);
        Toast({
          title: "Item Added",
          description: `${values.name} has been added successfully.`,
        });
        setIsAddSidebarOpen(false);
      }
      formMethods.reset();
      setEditingItem(null);
    } catch (error) {
      console.error("Error:", error);
      Toast({
        title: "Action Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item);
    formMethods.reset(item);
    setIsEditModalOpen(true);
  }

  const types = ["Room", "Venue"]

  const activeFilters = [...filters.type]

  const renderItemCard = (item) => (
    <Card key={item.id} className="mb-4 overflow-hidden drop-shadow-xl">
      
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center">
           
            ₱ {item.price}
          </span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {item.capacity}
          </span>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button variant="ghost" onClick={() => handleEdit(item)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" onClick={() => handleDelete(item)}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto relative">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Venue and Room Management</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or description..."
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
                  setEditingItem(null);
                  formMethods.reset();
                  setIsAddSidebarOpen(true);
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
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Rooms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {filteredItems.filter(item => item.type === "Room").slice(0, 15).map(renderItemCard)}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Venues</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {filteredItems.filter(item => item.type === "Venue").slice(0, 15).map(renderItemCard)}
              </div>
            </div>
          </div>
        </main>

        {/* Darkened overlay */}
        {isAddSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsAddSidebarOpen(false)}
          ></div>
        )}

        {/* Add Item Sidebar */}
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
                size="xl"
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <FormField
                    control={formMethods.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter price" {...field} onChange={(e) => field.onChange(+e.target.value)} />
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter description" {...field} />
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
            <DialogTitle>Edit Room/Venue Details</DialogTitle>
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
                <FormField
                  control={formMethods.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <FormField
                  control={formMethods.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter price" {...field} onChange={(e) => field.onChange(+e.target.value)} />
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </FormProvider>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={formMethods.handleSubmit(handleAddOrEditItem)} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Item'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}