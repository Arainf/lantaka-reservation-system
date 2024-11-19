  "use client";

  import React, { useState, useEffect, useRef } from "react";
  import { createIcons, icons } from "lucide";
  import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
  import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
  import AccountsTable from "@/components/common/cards/AccountsTable";
  import {
    ChevronLeft,
    ChevronRight,
    Settings,
    Filter,
    Search,
    X,
    RefreshCw,
    Plus,
    Loader2,
    CalendarIcon,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import DeleteModal from "@/components/ui/deletemodal";
  import { useForm, FormProvider } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import * as z from "zod";
  import { format } from "date-fns";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Toast } from "@/components/ui/toast";
  import { cn } from "@/lib/utils";
  import { Calendar } from "@/components/ui/calendar";
  import { useAccountContext } from "@/context/contexts";
  import RegistrationForm from "@/components/common/cards/RegistrationForm";

  const formSchema = z.object({
    account_role: z.enum(["Administrator", "Employee"], {
      required_error: "Please select a role.",
    }),
    fName: z
      .string()
      .min(1, "First name is required.")
      .max(100, "First name must be 100 characters or less."),
    lName: z
      .string()
      .min(1, "Last name is required.")
      .max(100, "Last name must be 100 characters or less."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits.")
      .max(15, "Phone number must be 15 digits or less."),
    dob: z.date({
      required_error: "Date of birth is required.",
    }),
    gender: z.enum(["male", "female"], {
      required_error: "Please select a gender.",
    }),
  });

  export default function AdminAccounts({
    sidebarOpen = false,
    toggleSidebar = () => {},
  }) {
    const { accountData } = useAccountContext();
    const [accounts, setAccounts] = useState(accountData || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
      role: [],
      status: [],
    });
    const [tempFilters, setTempFilters] = useState({
      role: [],
      status: [],
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const [isAddAccountSidebarOpen, setIsAddAccountSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    console.log("accounts:", accountData);

    useEffect(() => {
      createIcons({ icons });

      const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
          setIsFilterOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      setTempFilters(filters);
    }, [filters]);

    const filteredAccounts = accountData
      ? accountData.filter((accountData) => {
          const matchesSearch =
            (accountData.account_fName &&
              accountData.account_fName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (accountData.account_lName &&
              accountData.account_lName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (accountData.account_email &&
              accountData.account_email
                .toLowerCase()
                .includes(searchTerm.toLowerCase()));

          const matchesRole =
            filters.role.length === 0 ||
            filters.role.includes(accountData.account_role);
          const matchesStatus =
            filters.status.length === 0 ||
            filters.status.includes(accountData.account_status);

          return matchesSearch && matchesRole && matchesStatus;
        })
      : [];

    const handleDelete = (account) => {
      setAccountToDelete(account);
      setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
      setAccounts(
        accountData.filter(
          (account) => account.account_id !== accountToDelete.account_id
        )
      );
      setDeleteModalOpen(false);
      setAccountToDelete(null);
    };

    const handleTempFilterChange = (filterType, value) => {
      setTempFilters((prevFilters) => {
        const updatedFilter = prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((item) => item !== value)
          : [...prevFilters[filterType], value];
        return { ...prevFilters, [filterType]: updatedFilter };
      });
    };

    const applyFilters = () => {
      setFilters(tempFilters);
      setIsFilterOpen(false);
    };

    const resetFilters = () => {
      setFilters({
        role: [],
        status: [],
      });
      setTempFilters({
        role: [],
        status: [],
      });
      setSearchTerm("");
      setCurrentPage(1);
    };

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
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newAccount = {
          account_id: `ACC${(accountData.length + 1)
            .toString()
            .padStart(3, "0")}`,
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

        setAccounts([...accountData, newAccount]);
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
          description:
            "There was an error creating the account. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const roles = accountData
      ? [...new Set(accountData.map((a) => a.account_role))]
      : [];
    const statuses = accountData
      ? [...new Set(accountData.map((a) => a.account_status))]
      : [];

    const activeFilters = [...filters.role, ...filters.status];

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
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                          Role
                        </div>
                        {roles.map((role) => (
                          <label
                            key={role}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                              checked={tempFilters.role.includes(role)}
                              onChange={() =>
                                handleTempFilterChange("role", role)
                              }
                            />
                            <span className="ml-2">{role}</span>
                          </label>
                        ))}
                        <div className="border-t border-gray-100"></div>
                        <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                          Status
                        </div>
                        {statuses.map((status) => (
                          <label
                            key={status}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                              checked={tempFilters.status.includes(status)}
                              onChange={() =>
                                handleTempFilterChange("status", status)
                              }
                            />
                            <span className="ml-2">{status}</span>
                          </label>
                        ))}
                        <div className="border-t border-gray-100"></div>
                        <div className="px-4 py-2">
                          <Button onClick={applyFilters} className="w-full mb-2">
                            Apply Filters
                          </Button>
                          <Button
                            onClick={resetFilters}
                            variant="outline"
                            className="w-full"
                          >
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
              isAddAccountSidebarOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out overflow-y-auto z-50`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setIsAddAccountSidebarOpen(false)}
                  className="absolute top-1 right-[440px]"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <RegistrationForm />
            </div>
          </div>
        </div>
        <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={accountToDelete ? `${accountToDelete.account_fName} ${accountToDelete.account_lName}` : ''}
        itemType="Account"
      />
      </div>
    );
  }
