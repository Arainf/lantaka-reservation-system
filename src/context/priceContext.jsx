import React, { createContext, useContext, useState, useEffect } from 'react';

const PriceContext = createContext();

export const usePriceContext = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState({});
  const [clientType, setClientType] = useState('external');
  const [discounts, setDiscounts] = useState([]);
  const [initialTotalPrice, setInitialTotalPrice] = useState(0);

  const fetchPrice = async (clientType) => {
    try {
      const response = await fetch(`http://localhost:5000/api/getPrice/${clientType}`);
      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }
      const dataPrice = await response.json();
      setPrice(dataPrice);
    } catch (error) {
      console.error("Error fetching room prices:", error);
    }
  };

  useEffect(() => {
    fetchPrice(clientType);
  }, [clientType]);

  console.log(discounts)

  const contextValue = {
    price,
    clientType,
    setClientType,
    discounts,
    setDiscounts,
    initialTotalPrice,
    setInitialTotalPrice,
  };

  return (
    <PriceContext.Provider value={contextValue}>
      {children}
    </PriceContext.Provider>
  );
};