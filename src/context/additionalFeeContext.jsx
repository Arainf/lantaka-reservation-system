import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotifications } from "@/context/notificationContext";

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
  const { createNotification } = useNotifications();

  const fetchAddFees = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getAddFees2`);
      if (!response.ok) {
        throw new Error("Failed to fetch Additional Fees");
      }
      const dataAdditionalFees = await response.json();
      setAdditionalFees(dataAdditionalFees);
      return dataAdditionalFees;
    } catch (error) {
      console.error("Error fetching Additional Fees", error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchAddFees();
  }, []);

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
      const newFee = await response.json();
      setAdditionalFees(prevFees => [...prevFees, newFee]);
      createNotification({
        type: 'Added',
        description: `Additional fee "${fee.additional_fee_name}" has been added.`,
        role: 'employee',
      });
      return newFee;
    } catch (error) {
      console.error('Error adding fee:', error);
      throw error;
    }
  }, [createNotification]);

  const updateFee = useCallback(async (id, fee) => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateFee/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fee),
      });
      if (!response.ok) {
        throw new Error('Failed to update fee');
      }
      const updatedFee = await response.json();
      setAdditionalFees(prevFees => 
        prevFees.map(f => f.additional_fee_id === id ? updatedFee : f)
      );
      createNotification({
        type: 'Modified',
        description: `Additional fee "${fee.additional_fee_name}" has been updated.`,
        role: 'employee',
      });
    } catch (error) {
      console.error('Error updating fee:', error);
      throw error;
    }
  }, [createNotification]);

  const deleteFee = useCallback(async (id) => {
    if (!id) {
      throw new Error('Fee ID is required for deletion');
    }
    try {
      const response = await fetch(`http://localhost:5000/api/deleteFee/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete fee');
      }
      setAdditionalFees(prevFees => 
        prevFees.filter(fee => fee.additional_fee_id !== id)
      );
      createNotification({
        type: 'Deleted',
        description: `Additional fee has been deleted.`,
        role: 'employee',
      });
    } catch (error) {
      console.error('Error deleting fee:', error);
      throw error;
    }
  }, [createNotification]);

  const calculateTotalWithFees = useCallback((baseTotal, selectedFees = []) => {
    const feesTotal = selectedFees.reduce((sum, fee) => sum + (parseFloat(fee.additional_fee_amount) || 0), 0);
    return baseTotal + feesTotal;
  }, []);

  return (
    <AdditionalFeeContext.Provider
      value={{
        additionalFees,
        fetchAddFees,
        addFee,
        updateFee,
        deleteFee,
        calculateTotalWithFees,
      }}
    >
      {children}
    </AdditionalFeeContext.Provider>
  );
};