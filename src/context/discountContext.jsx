import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotifications } from "@/context/notificationContext";

const DiscountContext = createContext(undefined);

export const useDiscountContext = () => {
  const context = useContext(DiscountContext);
  if (!context) {
    throw new Error('useDiscountContext must be used within a DiscountProvider');
  }
  return context;
};

export const DiscountProvider = ({ children }) => {
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { createNotification } = useNotifications();

  // Use environment variable for the API base URL
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const fetchDiscounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/getDiscounts`);
      if (!response.ok) {
        throw new Error('Failed to fetch discounts');
      }
      const data = await response.json();
      setDiscounts(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching discounts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  const addDiscount = useCallback(async (discount) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/discountAdd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discount),
      });
      if (!response.ok) {
        throw new Error('Failed to add discount');
      }
      await fetchDiscounts();
      createNotification({
        type: 'Added',
        description: `Discount "${discount.discount_name}" has been added.`,
        role: 'employee',
      });
    } catch (error) {
      setError(error.message);
      console.error('Error adding discount:', error);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL, fetchDiscounts, createNotification]);

  const updateDiscount = useCallback(async (discount) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/discountEdit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discount),
      });
      if (!response.ok) {
        throw new Error('Failed to update discount');
      }
      await fetchDiscounts();
      createNotification({
        type: 'Modified',
        description: `Discount "${discount.discount_name}" has been updated.`,
        role: 'employee',
      });
    } catch (error) {
      setError(error.message);
      console.error('Error updating discount:', error);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL, fetchDiscounts, createNotification]);

  const deleteDiscount = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/discountDelete?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete discount');
      }
      await fetchDiscounts();
      createNotification({
        type: 'Deleted',
        description: `Discount with ID "${id}" has been deleted.`,
        role: 'employee',
      });
    } catch (error) {
      setError(error.message);
      console.error('Error deleting discount:', error);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL, fetchDiscounts, createNotification]);

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  return (
    <DiscountContext.Provider
      value={{
        discounts,
        isLoading,
        error,
        fetchDiscounts,
        addDiscount,
        updateDiscount,
        deleteDiscount,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};
