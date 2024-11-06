// src/components/ui/use-toast.jsx
import React, { createContext, useContext, useState } from "react";

// Create a Toast Context
const ToastContext = createContext();

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    // Automatically remove toast after the specified duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };

  const ToastContainer = () => (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.message}
        </div>
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ addToast, ToastContainer }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the Toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Export the toast function using the context's addToast
export const toast = (message, duration) => {
  const { addToast } = useToast();
  return addToast(message, duration);
};
