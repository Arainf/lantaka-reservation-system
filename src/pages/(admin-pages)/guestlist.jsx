'use client'

import React, { useState, useEffect } from "react";
import { createIcons, icons } from "lucide";
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import GuestTable from "@/components/common/tables/GuestTable";
import { Search, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGuestContext } from "@/context/GuestContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";

export default function AdminGuest({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const { guests, isLoading, error, refreshGuests } = useGuestContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    guest_type: 'All Guest Types'
  });

  useEffect(() => {
    createIcons({ icons });
  }, []);

  const filteredGuests = guests.filter((guest) => {
    if (!guest) return false;
    const guestName = guest.guest_fName && guest.guest_lName 
      ? `${guest.guest_fName} ${guest.guest_lName}`.toLowerCase()
      : '';
    const guestEmail = guest.guest_email ? guest.guest_email.toLowerCase() : '';
    const searchTermLower = searchTerm.toLowerCase();

    const matchesSearch = guestName.includes(searchTermLower) || guestEmail.includes(searchTermLower);
    const matchesGuestType = filters.guest_type === 'All Guest Types' || guest.guest_type === filters.guest_type;

    return matchesSearch && matchesGuestType;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  const resetFilters = () => {
    setFilters({ guest_type: 'All Guest Types' });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const guestTypes = ['All Guest Types', ...new Set(guests.filter(g => g && g.guest_type).map(g => g.guest_type))];

  const activeFilters = Object.entries(filters).filter(([key, value]) => value !== 'All Guest Types');

  const getGuestTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'internal':
        return 'bg-blue-100 text-blue-800';
      case 'external':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) return <><Spinner/></>;


  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Guest List Management</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name or account..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-50 md:w-80"
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search className="text-gray-900" size={18} />
                </div>
              </div>
              <Select value={filters.guest_type} onValueChange={(value) => handleFilterChange('guest_type', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Guest Type" />
                </SelectTrigger>
                <SelectContent>
                  {guestTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              {activeFilters.map(([key, value]) => (
                <Badge 
                  key={key} 
                  variant="secondary" 
                  className={`px-2 py-1 ${getGuestTypeColor(value)}`}
                >
                  {key}: {value}
                </Badge>
              ))}
            </div>
          )} 
          <GuestTable
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}

