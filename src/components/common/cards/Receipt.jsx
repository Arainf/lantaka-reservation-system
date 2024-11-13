'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { usePriceContext } from "@/context/PriceContext";

// Define the Zod schema for the discount
const discountSchema = z.object({
  type: z.string().min(1, "Discount type is required"),
  amount: z.number().min(0, "Positive number required"),
});

// Define the Zod schema for the form
const formSchema = z.object({
  discounts: z.array(discountSchema),
});

export default function CostCalculator({
  selectedRooms = ['Double Room', 'Triple Room'],
  selectedVenues = ['Conference Hall'],
  numberOfNights = 0,
  clientType,
}) {
  const { 
    price, 
    setClientType, 
    setDiscounts, 
    setInitialTotalPrice,
  } = usePriceContext();

  const [roomRates, setRoomRates] = useState({
    'Double Room': 0,
    'Triple Room': 0,
    'Matrimonial Room': 0,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discounts: [{ type: '', amount: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "discounts",
  });

  const discounts = form.watch('discounts'); // Watch the discounts field for changes

  useEffect(() => {
    if (setClientType) {
      setClientType(clientType);
    }
  }, [clientType, setClientType]);

  useEffect(() => {
    setRoomRates({
      'Double Room': price.double_price || 0,
      'Triple Room': price.triple_price || 0,
      'Matrimonial Room': price.matrimonial_price || 0,
    });
  }, [price]);

  const venueRates = useMemo(() => ({
    'Conference Hall': 15000,
    'Meeting Room': 8000,
  }), []);

  const calculateSubtotal = useMemo(() => {
    let subtotal = 0;
    selectedRooms.forEach(room => {
      const baseRate = roomRates[room] || 0;
      subtotal += baseRate * numberOfNights;
    });
    selectedVenues.forEach(venue => {
      subtotal += venueRates[venue] || 0;
    });
    return subtotal;
  }, [selectedRooms, selectedVenues, roomRates, venueRates, numberOfNights]);

  useEffect(() => {
    setInitialTotalPrice(calculateSubtotal);
  }, [calculateSubtotal, setInitialTotalPrice]);

  useEffect(() => {
    // Automatically set discounts every time the discounts field changes
    setDiscounts(discounts);
  }, [discounts, setDiscounts]);

  const roomCounts = useMemo(() => selectedRooms.reduce((acc, room) => {
    acc[room] = (acc[room] || 0) + 1;
    return acc;
  }, {}), [selectedRooms]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  const calculateTotal = () => {
    const totalDiscount = discounts.reduce((sum, d) => sum + Number(d.amount), 0);
    return calculateSubtotal - totalDiscount;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white text-gray-800 rounded-xl shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form className="space-y-4">
              <div>
                <Label className="text-xl font-bold mb-4">Discounts</Label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2 mb-2">
                    <FormField
                      control={form.control}
                      name={`discounts.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Discount type" className="flex-grow" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`discounts.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" placeholder="Amount" className="w-24" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className='flex flex-row gap-2'>
                <Button
                  type="button"
                  onClick={() => append({ type: '', amount: 0 })}
                  variant="outline"
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2 " />
                  Add Discount
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="bg-white text-gray-800 rounded-xl shadow-lg">
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
              {Object.entries(roomCounts).map(([room, count]) => (
                <div key={room} className="flex justify-between">
                  <span>{room} ({count}) x {numberOfNights} nights</span>
                  <span>{formatCurrency(roomRates[room] * count * numberOfNights)}</span>
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
                <span>{formatCurrency(calculateSubtotal)}</span>
              </div>
              {discounts.map((discount, index) => (
                discount.amount > 0 && (
                  <div key={index} className="flex justify-between text-green-600">
                    <span>{discount.type} Discount:</span>
                    <span>- {formatCurrency(Number(discount.amount))}</span>
                  </div>
                )
              ))}
            </div>
            <Separator />
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
