import React from 'react';
import { X } from 'lucide-react';
import Clock from '@/components/common/time/clock';

const Modal = ({ isOpen, onClose, onSubmit, reservationData, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center text-black">
      <div className="bg-white rounded-lg shadow-md w-6/12 h-5/6 relative flex flex-col">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 hover:text-red-500 p-0">
          <X size={28} />
        </button>
        <div className="pl-8 pt-12 flex flex-col w-full">
          <h2 className="text-3xl font-semibold">Add Reservation</h2>
        </div>

        {/* Make the grid take the remaining space */}
        <div className="flex-grow p-8 grid grid-rows-3 grid-flow-col gap-4 w-full h-full ">
          <div className="row-span-3 text-white flex items-center justify-center rounded border-4	border-gray-400"></div>
          <div className="col-span-1 b text-white flex items-center justify-center rounded border-4	border-gray-400"></div>
          <div className="row-span-2 col-span-1 text-white flex items-center justify-center rounded border-4 border-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
