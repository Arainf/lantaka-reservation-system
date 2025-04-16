import React, { createContext, useContext, useState, useEffect } from 'react';

const PriceContext = createContext();

export const usePriceContext = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState({});
  const [clientType, setClientType] = useState('');
  const [discounts, setDiscounts] = useState([]);
  const [initialTotalPrice, setInitialTotalPrice] = useState(0);
  const [discountsData, setDiscountsData] = useState({});
  const [addFeesData, setAddFeesData] = useState({});

  // Use environment variable for the API base URL
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const fetchPrice = async (clientType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getPrice/${clientType}`);
      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }
      const dataPrice = await response.json();
      setPrice(dataPrice);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const fetchDiscount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getDiscounts`);
      if (!response.ok) {
        throw new Error("Failed to fetch discounts");
      }
      const dataDiscounts = await response.json();
      setDiscountsData(dataDiscounts);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };

  const fetchAddFees = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getAddFees`);
      if (!response.ok) {
        throw new Error("Failed to fetch Additional Fees");
      }
      const dataAdditionalFees = await response.json();
      setAddFeesData(dataAdditionalFees);
    } catch (error) {
      console.error("Error fetching Additional Fees", error);
    }
  };

  const insertDiscount = async (newDiscount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/insertDiscount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscount),
      });
      if (!response.ok) {
        throw new Error("Failed to insert discount");
      }
      await fetchDiscount(); // Refetch discounts after successful insertion
    } catch (error) {
      console.error("Error inserting discount:", error);
    }
  };

  const insertAddFee = async (newAddFee) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/insertAdditionalFee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddFee),
      });
      if (!response.ok) {
        throw new Error("Failed to insert additional fee");
      }
      await fetchAddFees(); // Refetch additional fees after successful insertion
    } catch (error) {
      console.error("Error inserting additional fee:", error);
    }
  };

  useEffect(() => {
    fetchDiscount();
    fetchAddFees();
  }, []);

  useEffect(() => {
    if (clientType) {
      fetchPrice(clientType);
    }
  }, [clientType]);

  const contextValue = {
    price,
    clientType,
    setClientType,
    discounts,
    setDiscounts,
    initialTotalPrice,
    setInitialTotalPrice,
    discountsData,
    addFeesData,
    insertDiscount,
    insertAddFee,
    fetchDiscount,
    fetchPrice,
  };

  return (
    <PriceContext.Provider value={contextValue}>
      {children}
    </PriceContext.Provider>
  );
};
