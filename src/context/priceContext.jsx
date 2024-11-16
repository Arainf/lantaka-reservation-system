import React, { createContext, useContext, useState, useEffect } from 'react';

const PriceContext = createContext();

export const usePriceContext = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState({});
  const [clientType, setClientType] = useState('Internal');
  const [discounts, setDiscounts] = useState([]);
  const [initialTotalPrice, setInitialTotalPrice] = useState(0);
  const [discountsData, setDiscountsData] = useState({});
  const [addFeesData, setAddFeesData] = useState({});

  const fetchPrice = async (clientType) => {
    try {
      const response = await fetch(`http://localhost:5000/api/getPrice/${clientType}`);
      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }
      const dataPrice = await response.json();
      setPrice(dataPrice);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const fetchDisount = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getDiscounts`);
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
      const response = await fetch(`http://localhost:5000/api/getAddFees`);
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
      const response = await fetch('http://localhost:5000/api/insertDiscount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscount),
      });
      if (!response.ok) {
        throw new Error("Failed to insert discount");
      }
      const data = await response.json();
      // Optionally, refetch the discounts after successful insertion
      fetchDisount();
    } catch (error) {
      console.error("Error inserting discount:", error);
    }
  };

  const insertAddFee = async (newAddFee) => {
    try {
      const response = await fetch('http://localhost:5000/api/insertAdditionalFee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddFee),
      });
      if (!response.ok) {
        throw new Error("Failed to insert additional fee");
      }
      const data = await response.json();
      // Optionally, refetch the additional fees after successful insertion
      fetchAddFees();
    } catch (error) {
      console.error("Error inserting additional fee:", error);
    }
  };

  useEffect(() => {
    fetchDisount();
    fetchAddFees();
  }, []);

  useEffect(() => {
    fetchPrice(clientType);
  }, [clientType]);

  console.log("Fetching price",price)
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
  };

  return (
    <PriceContext.Provider value={contextValue}>
      {children}
    </PriceContext.Provider>
  );
};
