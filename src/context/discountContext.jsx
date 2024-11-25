import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

  const fetchDiscounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/getDiscounts');
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
  }, []);

  const addDiscount = useCallback(async (discount) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/discountAdd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discount),
      });
      if (!response.ok) {
        throw new Error('Failed to add discount');
      }
      await fetchDiscounts();
    } catch (error) {
      setError(error.message);
      console.error('Error adding discount:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchDiscounts]);

  const updateDiscount = useCallback(async (discount) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/discountEdit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discount),
      });
      if (!response.ok) {
        throw new Error('Failed to update discount');
      }
      await fetchDiscounts();
    } catch (error) {
      setError(error.message);
      console.error('Error updating discount:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchDiscounts]);

  const deleteDiscount = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/discountDelete?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete discount');
      }
      await fetchDiscounts();
    } catch (error) {
      setError(error.message);
      console.error('Error deleting discount:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchDiscounts]);

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  return (
    <DiscountContext.Provider value={{ discounts, isLoading, error, fetchDiscounts, addDiscount, updateDiscount, deleteDiscount }}>
      {children}
    </DiscountContext.Provider>
  );
};
