'use client'

import React, { useState } from "react";

const RoomAndVenueSelector = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("rooms");
  const [hoveredItem, setHoveredItem] = useState(null);

  const data = {
    rooms: [
      { id: 206, name: "Room 206", type: "double", isAvailable: true, checkedIn: "2024-11-25 12:00 PM", checkedOut: "2024-11-28 12:00 PM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 208, name: "Room 208", type: "double", isAvailable: true, checkedIn: "2024-11-22 2:00 PM", checkedOut: "2024-11-25 11:00 AM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 210, name: "Room 210", type: "double", isAvailable: false, checkedIn: "2024-11-20 1:00 PM", checkedOut: "2024-11-22 10:00 AM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 212, name: "Room 212", type: "double", isAvailable: true, checkedIn: "2024-11-25 3:00 PM", checkedOut: "2024-11-30 12:00 PM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 214, name: "Room 214", type: "double", isAvailable: true, checkedIn: "2024-11-24 10:00 AM", checkedOut: "2024-11-27 12:00 PM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 216, name: "Room 216", type: "double", isAvailable: false, checkedIn: "2024-11-18 6:00 PM", checkedOut: "2024-11-20 8:00 AM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 218, name: "Room 218", type: "double", isAvailable: true, checkedIn: "2024-11-23 5:00 PM", checkedOut: "2024-11-26 1:00 PM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 220, name: "Room 220", type: "double", isAvailable: true, checkedIn: "2024-11-25 9:00 AM", checkedOut: "2024-11-29 12:00 PM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 222, name: "Room 222", type: "double", isAvailable: false, checkedIn: "2024-11-21 2:00 PM", checkedOut: "2024-11-23 11:00 AM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 224, name: "Room 224", type: "double", isAvailable: true, checkedIn: "2024-11-26 1:00 PM", checkedOut: "2024-11-28 10:00 AM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 226, name: "Room 226", type: "double", isAvailable: false, checkedIn: "2024-11-19 3:00 PM", checkedOut: "2024-11-22 12:00 PM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 228, name: "Room 228", type: "double", isAvailable: true, checkedIn: "2024-11-27 11:00 AM", checkedOut: "2024-11-30 10:00 AM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 230, name: "Room 230", type: "double", isAvailable: true, checkedIn: "2024-11-28 2:00 PM", checkedOut: "2024-12-01 11:00 AM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },
      { id: 234, name: "Room 234", type: "double", isAvailable: true, checkedIn: "2024-11-29 12:00 PM", checkedOut: "2024-12-02 10:00 AM", img: "/img/double.jpg", details: "Double bed, nearest to the sea." },

      { id: 203, name: "Room 203", type: "triple", isAvailable: true, checkedIn: "2024-11-25 1:00 PM", checkedOut: "2024-11-28 11:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 205, name: "Room 205", type: "triple", isAvailable: true, checkedIn: "2024-11-26 2:00 PM", checkedOut: "2024-11-29 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 207, name: "Room 207", type: "triple", isAvailable: false, checkedIn: "2024-11-22 3:00 PM", checkedOut: "2024-11-25 12:00 PM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 209, name: "Room 209", type: "triple", isAvailable: true, checkedIn: "2024-11-27 11:00 AM", checkedOut: "2024-11-30 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 211, name: "Room 211", type: "triple", isAvailable: true, checkedIn: "2024-11-28 1:00 PM", checkedOut: "2024-12-01 11:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 213, name: "Room 213", type: "triple", isAvailable: false, checkedIn: "2024-11-23 2:00 PM", checkedOut: "2024-11-26 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 215, name: "Room 215", type: "triple", isAvailable: true, checkedIn: "2024-11-29 12:00 PM", checkedOut: "2024-12-02 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 217, name: "Room 217", type: "triple", isAvailable: true, checkedIn: "2024-11-30 1:00 PM", checkedOut: "2024-12-03 11:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 219, name: "Room 219", type: "triple", isAvailable: false, checkedIn: "2024-11-24 3:00 PM", checkedOut: "2024-11-27 12:00 PM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 221, name: "Room 221", type: "triple", isAvailable: true, checkedIn: "2024-12-01 11:00 AM", checkedOut: "2024-12-04 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 223, name: "Room 223", type: "triple", isAvailable: false, checkedIn: "2024-11-25 2:00 PM", checkedOut: "2024-11-28 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 225, name: "Room 225", type: "triple", isAvailable: true, checkedIn: "2024-12-02 1:00 PM", checkedOut: "2024-12-05 11:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 227, name: "Room 227", type: "triple", isAvailable: true, checkedIn: "2024-12-03 12:00 PM", checkedOut: "2024-12-06 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 229, name: "Room 229", type: "triple", isAvailable: false, checkedIn: "2024-11-26 3:00 PM", checkedOut: "2024-11-29 12:00 PM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 231, name: "Room 231", type: "triple", isAvailable: true, checkedIn: "2024-12-04 11:00 AM", checkedOut: "2024-12-07 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 233, name: "Room 233", type: "triple", isAvailable: false, checkedIn: "2024-11-27 2:00 PM", checkedOut: "2024-11-30 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 235, name: "Room 235", type: "triple", isAvailable: true, checkedIn: "2024-12-05 1:00 PM", checkedOut: "2024-12-08 11:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },
      { id: 237, name: "Room 237", type: "triple", isAvailable: true, checkedIn: "2024-12-06 12:00 PM", checkedOut: "2024-12-09 10:00 AM", img: "/img/triple.jpg", details: "Triple bed, nearest to the road." },

      { id: 236, name: "Room 236", type: "matrimonial", isAvailable: false, checkedIn: "2024-11-28 3:00 PM", checkedOut: "2024-12-01 12:00 PM", img: "/img/matrimonial.jpg", details: "Matrimonial room, price to be confirmed." },
      { id: 116, name: "Room 116", type: "matrimonial", isAvailable: true, checkedIn: "2024-12-07 11:00 AM", checkedOut: "2024-12-10 10:00 AM", img: "/img/matrimonial.jpg", details: "Matrimonial room, price to be confirmed." },
    ],
    venues: [
      { id: "breeza", name: "Breeza Hall", category: "hall", isAvailable: true, checkedIn: "2024-11-25 9:00 AM", checkedOut: "2024-11-25 5:00 PM", img: "/placeholder.svg?height=96&width=96", description: "A large, open space suitable for events and gatherings." },
      { id: "capiz", name: "Capiz Hall", category: "hall", isAvailable: false, checkedIn: "2024-11-24 8:00 AM", checkedOut: "2024-11-24 3:00 PM", img: "/placeholder.svg?height=96&width=96", description: "A medium-sized hall perfect for intimate gatherings and meetings." },
      { id: "dining", name: "Dining Hall", category: "hall", isAvailable: true, checkedIn: "2024-11-25 12:00 PM", checkedOut: "2024-11-25 9:00 PM", img: "/placeholder.svg?height=96&width=96", description: "The main dining area for meals and special events." },
      { id: "gazebo", name: "Gazebo", category: "outdoor", isAvailable: true, checkedIn: "2024-11-25 10:00 AM", checkedOut: "2024-11-25 4:00 PM", img: "/placeholder.svg?height=96&width=96", description: "Outdoor gazebo for smaller ceremonies or relaxation." },
      { id: "talisay", name: "Old Talisay Bar", category: "bar", isAvailable: false, checkedIn: "2024-11-24 7:00 PM", checkedOut: "2024-11-24 11:00 PM", img: "/placeholder.svg?height=96&width=96", description: "A cozy bar area for drinks and evening relaxation." },
    ],
  };

  const filteredData =
    selectedCategory === "rooms"
      ? selectedType === "all"
        ? data.rooms
        : data.rooms.filter((room) => room.type === selectedType)
      : selectedType === "all"
      ? data.venues
      : data.venues.filter((venue) => venue.category === selectedType);

  const getAvailabilityColor = (isAvailable) => {
    return isAvailable ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Category Selector */}
      <div className="flex space-x-4 overflow-x-auto">
        {["rooms", "venues"].map((category) => (
          <button
            key={category}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${selectedCategory === category ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Type Selector */}
      <div className="flex space-x-4 mt-4 overflow-x-auto">
        {["all", "double", "triple", "matrimonial", "hall", "outdoor", "bar"].map((venueType) => (
          <button
            key={venueType}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${selectedType === venueType ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            onClick={() => setSelectedType(venueType)}
          >
            {venueType.charAt(0).toUpperCase() + venueType.slice(1)}
          </button>
        ))}
      </div>

      {/* Item Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-semibold">{item.name}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.isAvailable 
                  ? "bg-green-100 text-green-600" 
                  : "bg-red-100 text-red-600"
                }`}>
                  {item.isAvailable ? "Available" : "Reserved"}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-auto">
                Check-in: {item.checkedIn}
              </div>
            </div>
            {/* Item details popup on hover */}
            {hoveredItem && hoveredItem.id === item.id && (
              <div className="absolute z-10 w-64 bg-white rounded-lg shadow-xl p-4 -mt-2 -ml-2">
                <div className="flex">
                  <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.isAvailable 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                    }`}>
                      {item.isAvailable ? "Available" : "Reserved"}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <p><strong>Check-in:</strong> {item.checkedIn}</p>
                  <p><strong>Check-out:</strong> {item.checkedOut}</p>
                  {selectedCategory === "rooms" ? (
                    <p className="mt-1"><strong>Details:</strong> {item.details}</p>
                  ) : (
                    <p className="mt-1"><strong>Description:</strong> {item.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAndVenueSelector;

