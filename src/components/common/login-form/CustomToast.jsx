import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const CustomToast = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed left-1/2 bottom-20 transform -translate-x-1/2 px-4 py-2 rounded-md text-white text-sm font-medium shadow-lg transition-opacity duration-300",
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      )}
      role="alert"
    >
      {message}
    </div>
  );
};

export default CustomToast;

