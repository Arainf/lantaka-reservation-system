import React from 'react';
import {X} from 'lucide-react';


const Modal = ({ isOpen, onClose, onSubmit, reservationData, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center text-black ">
        <div className="bg-white rounded-lg shadow-md p-8 w-6/12 h-5/6 relative">
          <div className="w-[600px] flex flex-column ">
          <button 
            onClick={onClose} 
            className="flex hover:text-red-500 place-self-end">
            <X size={24} />
          </button>
          <h2 className="flex text-3xl font-semibold mb-4 ">Add Reservation </h2>
          </div>
        </div>

         
      </div>
  );
};

export default Modal;