import React from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';


const Modal = ({ isOpen, onClose, onSubmit, reservationData, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center text-black ">
      <div className="bg-white rounded-lg shadow-md p-8 w-6/12 h-5/6">
        <h2 className="flex text-3xl font-semibold mb-4 ">Add Reservation </h2>
                <button onClick={onClose} className="flex text-red-500"><X size={24} /></button>
        <form onSubmit={onSubmit}>
            
          <div className="mt-24 mb-4">
            <label className="block text-sm mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={reservationData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={reservationData.date}
              onChange={handleChange}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              value={reservationData.time}
              onChange={handleChange}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="guests">Number of Guests</label>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              value={reservationData.guests}
              onChange={handleChange}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;