import React from 'react';
import {X} from 'lucide-react';


const Modal = ({ isOpen, onClose, onSubmit, reservationData, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center text-black">
        <div className="bg-white rounded-lg sh2adow-md w-6/12 h-5/6 relative">
        <button 
            onClick={onClose} 
            className="absolute top-2 right-2 hover:text-red-500 p-0 ">
            <X size={28} />
          </button>
          <div className="pl-12 pt-12 flex flex-column w-100%">
          <h2 className="flex text-3xl font-semibold ">Add Reservation </h2>
          </div>
        </div>      
      </div>
  );
};

export default Modal;