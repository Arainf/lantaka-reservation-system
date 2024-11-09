'use client'

import React, { useState, useEffect, useRef } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import AccountsTable from "@/components/common/cards/AccountsTable"
import { ChevronLeft, ChevronRight, Settings, Filter, Search, X, RefreshCw, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DeleteModal from "@/components/ui/deletemodal"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import axios from "axios"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

const formSchema = z.object({
  account_role: z.enum(["Administrator", "Employee"], {
    required_error: "Please select a role.",
  }),
  fName: z.string().min(1, "First name is required.").max(100, "First name must be 100 characters or less."),
  lName: z.string().min(1, "Last name is required.").max(100, "Last name must be 100 characters or less."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").max(15, "Phone number must be 15 digits or less."),
  dob: z.date({
    required_error: "Date of birth is required.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  })
})

const dummyAccounts = [
  {
    account_id: "ACC001",
    account_role: "Admin",
    account_fName: "John",
    account_lName: "Doe",
    account_username: "johndoe",
    account_email: "john.doe@example.com",
    account_status: "Active",
    account_phone: "+1234567890",
    account_dob: "1990-01-01",
    account_gender: "Male",
    account_created_at: "2023-01-01T00:00:00Z",
    account_updated_at: "2023-06-15T12:30:00Z",
    account_last_login: "2023-06-30T09:15:00Z"
  },
  {
    account_id: "ACC002",
    account_role: "User",
    account_fName: "Jane",
    account_lName: "Smith",
    account_username: "janesmith",
    account_email: "jane.smith@example.com",
    account_status: "Inactive",
    account_phone: "+1987654321",
    account_dob: "1992-05-15",
    account_gender: "Female",
    account_created_at: "2023-02-01T00:00:00Z",
    account_updated_at: "2023-06-20T14:45:00Z",
    account_last_login: "2023-06-25T11:30:00Z"
  },
  {
    account_id: "ACC003",
    account_role: "User",
    account_fName: "Alice",
    account_lName: "Johnson",
    account_username: "alicejohnson",
    account_email: "alice.johnson@example.com",
    account_status: "Active",
    account_phone: "+1234567891",
    account_dob: "1988-03-12",
    account_gender: "Female",
    account_created_at: "2023-03-01T00:00:00Z",
    account_updated_at: "2023-06-10T11:15:00Z",
    account_last_login: "2023-06-28T08:20:00Z"
  },
  {
    account_id: "ACC004",
    account_role: "Moderator",
    account_fName: "Bob",
    account_lName: "Brown",
    account_username: "bobbrown",
    account_email: "bob.brown@example.com",
    account_status: "Inactive",
    account_phone: "+1234567892",
    account_dob: "1995-08-21",
    account_gender: "Male",
    account_created_at: "2023-04-01T00:00:00Z",
    account_updated_at: "2023-06-18T09:35:00Z",
    account_last_login: "2023-06-22T07:25:00Z"
  },
  {
    account_id: "ACC005",
    account_role: "Admin",
    account_fName: "Carol",
    account_lName: "White",
    account_username: "carolwhite",
    account_email: "carol.white@example.com",
    account_status: "Active",
    account_phone: "+1234567893",
    account_dob: "1985-10-10",
    account_gender: "Female",
    account_created_at: "2023-05-01T00:00:00Z",
    account_updated_at: "2023-06-17T13:40:00Z",
    account_last_login: "2023-06-29T05:10:00Z"
  },
  {
    account_id: "ACC006",
    account_role: "User",
    account_fName: "David",
    account_lName: "Clark",
    account_username: "davidclark",
    account_email: "david.clark@example.com",
    account_status: "Active",
    account_phone: "+1234567894",
    account_dob: "1991-12-02",
    account_gender: "Male",
    account_created_at: "2023-06-01T00:00:00Z",
    account_updated_at: "2023-06-14T10:50:00Z",
    account_last_login: "2023-06-26T06:45:00Z"
  },
  {
    account_id: "ACC007",
    account_role: "User",
    account_fName: "Eva",
    account_lName: "Miller",
    account_username: "evamiller",
    account_email: "eva.miller@example.com",
    account_status: "Inactive",
    account_phone: "+1234567895",
    account_dob: "1989-07-15",
    account_gender: "Female",
    account_created_at: "2023-07-01T00:00:00Z",
    account_updated_at: "2023-07-10T14:30:00Z",
    account_last_login: "2023-07-18T11:00:00Z"
  },
  {
    account_id: "ACC008",
    account_role: "Moderator",
    account_fName: "Frank",
    account_lName: "Green",
    account_username: "frankgreen",
    account_email: "frank.green@example.com",
    account_status: "Active",
    account_phone: "+1234567896",
    account_dob: "1987-11-20",
    account_gender: "Male",
    account_created_at: "2023-08-01T00:00:00Z",
    account_updated_at: "2023-08-05T15:25:00Z",
    account_last_login: "2023-08-14T12:15:00Z"
  },
  {
    account_id: "ACC009",
    account_role: "Admin",
    account_fName: "Grace",
    account_lName: "Harris",
    account_username: "graceharris",
    account_email: "grace.harris@example.com",
    account_status: "Inactive",
    account_phone: "+1234567897",
    account_dob: "1993-04-22",
    account_gender: "Female",
    account_created_at: "2023-09-01T00:00:00Z",
    account_updated_at: "2023-09-07T10:00:00Z",
    account_last_login: "2023-09-14T09:50:00Z"
  },
  {
    account_id: "ACC010",
    account_role: "User",
    account_fName: "Henry",
    account_lName: "Adams",
    account_username: "henryadams",
    account_email: "henry.adams@example.com",
    account_status: "Active",
    account_phone: "+1234567898",
    account_dob: "1994-03-11",
    account_gender: "Male",
    account_created_at: "2023-10-01T00:00:00Z",
    account_updated_at: "2023-10-08T09:10:00Z",
    account_last_login: "2023-10-15T08:30:00Z"
  },
  {
    account_id: "ACC011",
    account_role: "User",
    account_fName: "Ivy",
    account_lName: "Roberts",
    account_username: "ivyroberts",
    account_email: "ivy.roberts@example.com",
    account_status: "Inactive",
    account_phone: "+1234567899",
    account_dob: "1986-09-13",
    account_gender: "Female",
    account_created_at: "2023-11-01T00:00:00Z",
    account_updated_at: "2023-11-05T12:00:00Z",
    account_last_login: "2023-11-10T10:20:00Z"
  },
  {
    account_id: "ACC012",
    account_role: "Admin",
    account_fName: "Jack",
    account_lName: "Wilson",
    account_username: "jackwilson",
    account_email: "jack.wilson@example.com",
    account_status: "Active",
    account_phone: "+1234567800",
    account_dob: "1982-02-28",
    account_gender: "Male",
    account_created_at: "2023-12-01T00:00:00Z",
    account_updated_at: "2023-12-10T14:45:00Z",
    account_last_login: "2023-12-20T09:05:00Z"
  }
];

export default function AdminAccounts({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const [accounts, setAccounts] = useState(dummyAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    role: [],
    status: [],
  })
  const [tempFilters, setTempFilters] = useState({
    role: [],
    status: [],
  })  
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState(null)
  const [isAddAccountSidebarOpen, setIsAddAccountSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_role: "Employee",
      gender: "male",
      fName: "",
      lName: "",
      email: "",
      password: "",
      phone: "",
      dob: null,
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

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.account_fName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           account.account_lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           account.account_email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filters.role.length === 0 || filters.role.includes(account.account_role)
    const matchesStatus = filters.status.length === 0 || filters.status.includes(account.account_status)
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleDelete = (account) => {
    setAccountToDelete(account)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setAccounts(accounts.filter(account => account.account_id !== accountToDelete.account_id))
    setDeleteModalOpen(false)
    setAccountToDelete(null)
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
      role: [],
      status: [],
    })
    setTempFilters({
      role: [],
      status: [],
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleAddAccount = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "dob") {
          formData.append(key, format(value, "yyyy-MM-dd"));
        } else if (key === "profileImageFile" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newAccount = {
        account_id: `ACC${(accounts.length + 1).toString().padStart(3, '0')}`,
        account_role: values.account_role,
        account_fName: values.fName,
        account_lName: values.lName,
        account_username: `${values.fName.toLowerCase()}.${values.lName.toLowerCase()}`,
        account_email: values.email,
        account_status: "Active",
        account_phone: values.phone,
        account_dob: format(values.dob, "yyyy-MM-dd"),
        account_gender: values.gender,
        account_created_at: new Date().toISOString(),
        account_updated_at: new Date().toISOString(),
        account_last_login: null,
      };

      setAccounts([...accounts, newAccount]);
      Toast({
        title: "Registration Successful",
        description: "New account has been created successfully.",
      });
      formMethods.reset();
      setIsAddAccountSidebarOpen(false);
    } catch (error) {
      console.error("Registration error:", error);
      Toast({
        title: "Registration Failed",
        description: "There was an error creating the account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const roles = [...new Set(accounts.map(a => a.account_role))]
  const statuses = [...new Set(accounts.map(a => a.account_status))]

  const activeFilters = [...filters.role, ...filters.status]

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto relative">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Accounts</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
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
                      <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Role</div>
                      {roles.map((role) => (
                        <label key={role} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            checked={tempFilters.role.includes(role)}
                            onChange={() => handleTempFilterChange('role', role)}
                          />
                          <span className="ml-2">{role}</span>
                        </label>
                      ))}
                      <div className="border-t border-gray-100"></div>
                      <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Status</div>
                      {statuses.map((status) => (
                        <label key={status} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            checked={tempFilters.status.includes(status)}
                            onChange={() => handleTempFilterChange('status', status)}
                          />
                          <span className="ml-2">{status}</span>
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
                onClick={() => setIsAddAccountSidebarOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Account
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
          <div>
            <AccountsTable
              accounts={filteredAccounts}           
              onDelete={handleDelete}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>

        {/* Darkened overlay */}
        {isAddAccountSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsAddAccountSidebarOpen(false)}
          ></div>
        )}

        {/* Add Account Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 w-[500px] bg-white shadow-lg transform ${
            isAddAccountSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out overflow-y-auto z-50`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Account</h2>
              <Button
                variant="ghost"
                size="xl"
                onClick={() => setIsAddAccountSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <FormProvider {...formMethods}>
              <Form {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(handleAddAccount)} className="space-y-6">
                  <FormField
                    control={formMethods.control}
                    name="account_role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Administrator">Administrator</SelectItem>
                            <SelectItem value="Employee">Employee</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="lName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter E-mail" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>Must be at least 6 characters long.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register Account"
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
        itemName={accountToDelete ? `${accountToDelete.account_fName} ${accountToDelete.account_lName}` : ""}
        itemType="Account"
      />
    </div>
  )
}