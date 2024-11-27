'use client'

import React, { useState } from "react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useHero } from "@/context/heroContext";
import Spinner from "@/components/ui/spinner";

const RoomAndVenueSelector = () => {
  const { data, isLoading, error, calendarReservations, selectedDate } = useHero();
  const [selectedCategory, setSelectedCategory] = useState("rooms");
  const [selectedRoomType, setSelectedRoomType] = useState("all");

  if (isLoading) return <Spinner />;
  if (error) return (
    <div className="flex items-center justify-center min-h-[200px] text-red-600">
      <p className="text-center">
        <span className="block text-lg font-semibold">Error</span>
        <span className="block mt-1">{error.message}</span>
      </p>
    </div>
  );
  if (!data) return (
    <div className="flex items-center justify-center min-h-[200px] text-gray-500">
      <p className="text-center">
        <span className="block text-lg font-semibold">No Data</span>
        <span className="block mt-1">No data available at the moment</span>
      </p>
    </div>
  );

  const getStatusColor = (status) => {
    const statusColors = {
      ready: "bg-green-200",
      waiting: "bg-yellow-200",
      onUse: "bg-blue-200",
      cancelled: "bg-red-200",
      done: "bg-purple-200",
      onCleaning: "bg-orange-200",
    };
    return statusColors[status] || "text-gray-800";
  };

  const getStatusBgColor = (status) => {
    const statusColors = {
      ready: "bg-green-200 text-green-800",
      waiting: "bg-yellow-200 text-yellow-800",
      onUse: "bg-blue-200 text-blue-800",
      cancelled: "bg-red-200 text-red-800",
      done: "bg-purple-200 text-purple-800",
      onCleaning: "bg-orange-200 text-orange-800",
    };
    return statusColors[status] || "bg-gray-100";
  };

  const isRoomReserved = (roomId) => {
    return calendarReservations?.some(
      reservation => reservation.id === roomId && 
      format(selectedDate, 'yyyy-MM-dd') >= reservation.dateStart &&
      format(selectedDate, 'yyyy-MM-dd') <= reservation.dateEnd
    );
  };

  const getRoomStatus = (room) => {
    if (calendarReservations && isRoomReserved(room.room_id)) {
      const reservation = calendarReservations.find(r => r.id === room.room_id);
      return reservation.status;
    }
    return room.status;
  };

  const RoomCard = ({ room }) => {
    const currentStatus = getRoomStatus(room);
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className={`p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer relative overflow-hidden ${getStatusBgColor(currentStatus)}`}
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold truncate">{room.room_name}</div>
                <div className={`text-xs font-medium ${getStatusColor(currentStatus)}`}>
                  {currentStatus}
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="right" className="w-80 p-0">
            <div className="p-4">
            <h3 className="font-semibold text-lg">{room.room_name}</h3>
              <p className="text-sm text-gray-500">
                <strong>Status:</strong> {currentStatus}
              </p>
              <p className="text-sm">
                <strong>Is Ready:</strong> {room.room_isready ? 'Yes' : 'No'}
              </p>
              <p className="text-sm">
                <strong>Room Status:</strong> {room.room_status ? 'Occupied' : 'Available'}
              </p>
              {isRoomReserved(room.room_id) ? (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm font-semibold">Reservation Details:</p>
                  {calendarReservations
                    .filter(r => r.id === room.room_id)
                    .map(reservation => (
                      <div key={reservation.reservationid} className="text-sm">
                        <p><strong>Guest:</strong> {reservation.guests}</p>
                        <p><strong>Check In:</strong> {reservation.checkIn}</p>
                        <p><strong>Check Out:</strong> {reservation.checkOut}</p>
                        <p><strong>Date:</strong> {reservation.dateStart} - {reservation.dateEnd}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div>
                  <p className="text-sm">No reservations found for this Room.</p>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const VenueCard = ({ venue }) => {
    const currentStatus = getRoomStatus(venue);
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className={`p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer relative overflow-hidden ${getStatusBgColor(currentStatus)}`}
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold truncate">{venue.room_name}</div>
                <div className={`text-xs font-medium ${getStatusColor(currentStatus)}`}>
                  {currentStatus}
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="right" className="w-80 p-0">
            <div className="p-4">
              <h3 className="font-semibold text-lg">{venue.room_name}</h3>
              <p className="text-sm text-gray-500">
                <strong>Status:</strong> {currentStatus}
              </p>
              <p className="text-sm">
                <strong>Is Ready:</strong> {venue.room_isready ? 'Yes' : 'No'}
              </p>
              <p className="text-sm">
                <strong>Venue Status:</strong> {venue.room_status ? 'Occupied' : 'Available'}
              </p>
              {isRoomReserved(venue.room_id) ? (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm font-semibold">Reservation Details:</p>
                  {calendarReservations
                    .filter(r => r.id === venue.room_id)
                    .map(reservation => (
                      <div key={reservation.reservationid} className="text-sm">
                        <p><strong>Guest:</strong> {reservation.guests}</p>
                        <p><strong>Check In:</strong> {reservation.checkIn}</p>
                        <p><strong>Check Out:</strong> {reservation.checkOut}</p>
                        <p><strong>Date:</strong> {reservation.dateStart} - {reservation.dateEnd}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div>
                  <p className="text-sm">No reservations found for this Venue.</p>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderContent = () => {
    if (selectedCategory === "venues") {
      return (
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data.venues_holder.map((venue) => (
              <VenueCard key={venue.room_id} venue={venue} />
            ))}
          </div>
        </ScrollArea>
      );
    }

    let roomsToDisplay = [];
    if (selectedRoomType === "all") {
      roomsToDisplay = [...data.double_rooms, ...data.triple_rooms, ...data.matrimonial_rooms];
    } else if (selectedRoomType === "double") {
      roomsToDisplay = data.double_rooms;
    } else if (selectedRoomType === "triple") {
      roomsToDisplay = data.triple_rooms;
    } else if (selectedRoomType === "matrimonial") {
      roomsToDisplay = data.matrimonial_rooms;
    }

    return (
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {roomsToDisplay.map((room) => (
            <RoomCard key={room.room_id} room={room} />
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rooms">Rooms</SelectItem>
            <SelectItem value="venues">Venues</SelectItem>
          </SelectContent>
        </Select>

        {selectedCategory === "rooms" && (
          <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms</SelectItem>
              <SelectItem value="double">Double</SelectItem>
              <SelectItem value="triple">Triple</SelectItem>
              <SelectItem value="matrimonial">Matrimonial</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {renderContent()}
    </div>
  );
};

export default RoomAndVenueSelector;