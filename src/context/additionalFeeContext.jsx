import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AdditionalFeeContext = createContext();

export const useAdditionalFees = () => {
  const context = useContext(AdditionalFeeContext);
  if (!context) {
    throw new Error('useAdditionalFees must be used within an AdditionalFeeProvider');
  }
  return context;
};

export const AdditionalFeeProvider = ({ children }) => {
  const [additionalFees, setAdditionalFees] = useState([]);

  const fetchAddFees = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getAddFees2`);
      if (!response.ok) {
        throw new Error("Failed to fetch Additional Fees");
      }
      const dataAdditionalFees = await response.json();
      setAdditionalFees(dataAdditionalFees);
    } catch (error) {
      console.error("Error fetching Additional Fees", error);
    }
  }, []);

  useEffect(() => {
    fetchAddFees();
  }, [fetchAddFees]);

  const addFee = useCallback(async (fee) => {
    try {
      const response = await fetch('http://localhost:5000/api/addFee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fee),
      });           
      if (!response.ok) {
        throw new Error('Failed to add fee');
      }
      await fetchAddFees();
    } catch (error) {
      console.error('Error adding fee:', error);
    }
  }, [fetchAddFees]);

  const updateFee = useCallback(async (id, fee) => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateFee/${id}`, {
        method: 'PUT',
        body: fee instanceof FormData ? fee : JSON.stringify(fee),
        headers: fee instanceof FormData ? {} : { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to update fee');
      }
      await fetchAddFees();
    } catch (error) {
      console.error('Error updating fee:', error);
    }
  }, [fetchAddFees]);

  const deleteFee = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteFee/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete fee');
      }
      await fetchAddFees();
    } catch (error) {
      console.error('Error deleting fee:', error);
    }
  }, [fetchAddFees]);

  return (
    <AdditionalFeeContext.Provider value={{ additionalFees, fetchAddFees, addFee, updateFee, deleteFee }}>
      {children}
    </AdditionalFeeContext.Provider>
  );
};