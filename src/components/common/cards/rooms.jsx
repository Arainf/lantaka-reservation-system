import React from "react"
import LantakaBG from '@/assets/images/LantakaEmployeeBG.png'

const RoomCard = ({ name, price, image }) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg group">
    <img 
      src={image} 
      alt={`${name} room`} 
      className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <p className="text-xl font-semibold text-white">{price}</p>
      </div>
      <button className="w-full bg-blue-400 text-gray-100 font-semibold py-3 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#8FE3CF] focus:ring-opacity-50">
        Book Now
      </button>
    </div>
  </div>
)

export default function OurRooms() {
  const roomData = [
    { name: "Single Bedroom", price: "PHP 1600", image: LantakaBG },
    { name: "Double Bedroom", price: "PHP 1600", image: LantakaBG },
    { name: "Matrimonial Bedroom", price: "PHP 1600", image: LantakaBG },
    { name: "Gazebo", price: "PHP 1600", image: LantakaBG },
    { name: "Old Talisay Bar", price: "PHP 1600", image: LantakaBG }
    
  ]

  return (
    <section className="py-24 px-4 md:px-20 bg-white">
      <div className="w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Rooms</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex gap-8 overflow-x:auto">
          {roomData.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>
      </div>
    </section>
  )
}