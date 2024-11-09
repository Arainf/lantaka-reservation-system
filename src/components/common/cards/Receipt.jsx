import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CostCalculator = ({
  selectedRooms = ['Double Room', 'Triple Room'],
  selectedVenues = ['Conference Hall'],
  clientType = 'external',
  numberOfNights = 3
}) => {
  const [price, setPrice] = useState({});
  const [roomRates, setRoomRates] = useState({
    'Double Room': 0,
    'Triple Room': 0,
    'Matrimonial Room': 0,
  });

  const venueRates = {
    'Conference Hall': 15000,
    'Meeting Room': 8000,
  };

  const internalDiscount = 300; // 20% discount for internal clients
//   const taxRate = 0.12; // 12% tax

  const calculateSubtotal = () => {
    let subtotal = 0;

    // Ensure selectedRooms is an array
    if (Array.isArray(selectedRooms)) {
      selectedRooms.forEach(room => {
        const baseRate = roomRates[room] || 0;
        subtotal += baseRate * numberOfNights;
      });
    } else {
      console.error('selectedRooms is not an array');
    }

    if (Array.isArray(selectedVenues)) {
      selectedVenues.forEach(venue => {
        subtotal += venueRates[venue] || 0;
      });
    }

    return subtotal;
  };

  // Count occurrences of each room type
  const roomCounts = selectedRooms.reduce((acc, room) => {
    acc[room] = (acc[room] || 0) + 1;
    return acc;
  }, {});

  const subtotal = calculateSubtotal();
  const discount = clientType === 'internal' ? internalDiscount : 0;
  const taxableAmount = subtotal - discount;
  const total = taxableAmount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  const fetchPrice = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getPrice');
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataPrice = await response.json();
      setPrice(dataPrice);
    } catch (error) {
      console.error("Error fetching available rooms:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPrice();
  }, []);

  useEffect(() => {
    if (price) {
      // Set roomRates based on the fetched price data
      setRoomRates({
        'Double Room': price.double_price || 0,
        'Triple Room': price.triple_price || 0,
        'Matrimonial Room': price.matrimonial_price || 0,
      });
    }
  }, [price]);  // Only update roomRates when price changes

  return (
    <Card className="relative w-full bg-white text-gray-800 rounded-xl shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold">Partial Receipt</h3>
            <p className="text-sm text-gray-500">{clientType}</p>
            <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
          </div>
          <Separator />
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Room Charges:</h4>
            {Object.keys(roomCounts).map((room) => (
              <div key={room} className="flex justify-between">
                <span>{room} ({roomCounts[room]}) x {numberOfNights} nights</span>
                <span>{formatCurrency(roomRates[room] * roomCounts[room] * numberOfNights)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Venue Charges:</h4>
            {selectedVenues.map(venue => (
              <div key={venue} className="flex justify-between">
                <span>{venue}</span>
                <span>{formatCurrency(venueRates[venue])}</span>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {clientType === 'Internal' && (
              <div className="flex justify-between text-green-600">
                <span>Internal Discount (300 off*):</span>
                <span>- {formatCurrency(discount)}</span>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">{formatCurrency(total)}</span>
          </div>
          <p className="text-xs text-gray-500 text-center">
            This is an estimate. Final charges may vary.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostCalculator;
