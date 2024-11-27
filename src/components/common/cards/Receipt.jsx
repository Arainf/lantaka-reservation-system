'use client'

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { PlusCircle, XCircle } from 'lucide-react'
import { Label } from "@/components/ui/label"
import * as z from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { usePriceContext } from "@/context/PriceContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const discountSchema = z.object({
  type: z.string().min(1, "Discount type is required"),
})

const formSchema = z.object({
  discounts: z.array(discountSchema),
})

export default function Component({
  selectedRooms = ["Double Room", "Triple Room"],
  selectedVenues = ["Conference Hall"],
  numberOfNights = 0,
  clientType = "Internal",
  showDiscount = true,
}) {
  const {
    price,
    setClientType,
    setDiscounts,
    setInitialTotalPrice,
    discountsData,
  } = usePriceContext()

  const [roomRates, setRoomRates] = useState({
    "Double Bed": 0,
    "Triple Bed": 0,
    "Matrimonial Room": 0,
  })

  const [venueRates, setVenueRates] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discounts: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "discounts",
  })

  const discounts = form.watch("discounts")

  useEffect(() => {
    if (setClientType) {
      setClientType(clientType)
    }
  }, [clientType, setClientType])

  useEffect(() => {
    setRoomRates({
      "Double Bed": price.double_price || 0,
      "Triple Bed": price.triple_price || 0,
      "Matrimonial Room": price.matrimonial_price || 0,
    })
  }, [price])

  useEffect(() => {
    if (Array.isArray(price.venue_Holder)) {
      const venues = price.venue_Holder.reduce((acc, venue) => {
        acc[venue.venue_id] = venue.venue_price_internal || venue.venue_price_external
        return acc
      }, {})
    
      setVenueRates(venues)
    } else {
      setVenueRates([])
    }
  }, [price])

  const calculateSubtotal = useCallback(() => {
    let subtotal = 0
    selectedRooms.forEach((room) => {
      const baseRate = roomRates[room] || 0
      subtotal += baseRate * numberOfNights
    })
    selectedVenues.forEach((venue) => {
      const venueRate = venueRates[venue] || 0
      subtotal += venueRate
    })
    return subtotal
  }, [selectedRooms, selectedVenues, roomRates, venueRates, numberOfNights])

  const subtotal = useMemo(() => calculateSubtotal(), [calculateSubtotal, selectedVenues])
  
  useEffect(() => {
    setInitialTotalPrice(subtotal)
  }, [subtotal, setInitialTotalPrice])

  useEffect(() => {
    setDiscounts(discounts)
  }, [discounts, setDiscounts])

  const roomCounts = useMemo(
    () =>
      selectedRooms.reduce((acc, room) => {
        acc[room] = (acc[room] || 0) + 1
        return acc
      }, {}),
    [selectedRooms]
  )

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount)
  }

  const calculateTotal = useCallback(() => {
    let total = subtotal
  
    if (Array.isArray(discountsData)) {
      discounts.forEach((d, index) => {
        if (d.type) {
          const discountData = discountsData.find(
            (dd) => dd.discount_name === String(d.type)
          )
  
          if (discountData) {
            const discountAmount =
              (subtotal * discountData.discount_percentage) / 100
  
            form.setValue(`discounts.${index}.Amount`, discountAmount)
  
            total -= discountAmount
          }
        }
      })
    }
  
    return total
  }, [subtotal, discounts, discountsData, form])

  useEffect(() => {
    const newTotal = calculateTotal()
    setTotalPrice(newTotal)
  }, [calculateTotal, discounts, discountsData, form])

  const handleAddDiscount = () => {
    append({ type: "" })
  }

  const calling = useCallback(() => {
    const newTotal = calculateTotal()
    setTotalPrice(newTotal)
  },[calculateTotal, discounts, discountsData, form])

  const handleRemoveDiscount = (index) => {
    remove(index)
  }

  return (
    <div className="space-y-4">
      {showDiscount && (
        <Card className="bg-white text-gray-800 rounded-xl shadow-lg">
          <CardContent className="p-6">
            <Form {...form}>
              <form className="space-y-4 animate-none">
                <div>
                  <Label className="text-xl font-bold mb-4">Discounts</Label>
                  {fields.length > 0 ? (
                    fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <FormField
                          control={form.control}
                          name={`discounts.${index}.type`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  calling();
                                }}
                                
                                value={field.value}
                                
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Discount Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.isArray(discountsData) && discountsData.length > 0 ? (
                                    discountsData.map((discount) => (
                                      <SelectItem key={discount.discount_id} value={discount.discount_name}>
                                        {discount.discount_name} ({discount.discount_percentage}%)
                                      </SelectItem>
                                    ))
                                  ) : ( 
                                    <div>No discounts available</div>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => handleRemoveDiscount(index)}
                                className="text-red-500"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove discount</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))
                  ) : (
                    <div>No discounts added yet.</div>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  <Button
                    type="button"
                    onClick={handleAddDiscount}
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
      )}
      
      <Card className="bg-white text-gray-800 rounded-xl shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold">Partial Receipt</h3>
              <p className="text-sm text-gray-500">{clientType}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold">Room Charges:</h4>
              {Object.entries(roomCounts).map(([room, count]) => (
                <div key={room} className="flex justify-between">
                  <span>
                    {room} ({count}) x {numberOfNights} nights
                  </span>
                  <span>
                    {formatCurrency(roomRates[room] * count * numberOfNights)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold">Venue Charges:</h4>
              {selectedVenues.map((venue) => (
                <div key={venue} className="flex justify-between">
                  <span>{venue} </span>
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
              {discounts.map((discount, index) => {
                if (discount.type) {
                  const discountData = discountsData.find(
                    (dd) => dd.discount_name === discount.type
                  )
                  if (discountData) {
                    const discountAmount =
                      (subtotal * discountData.discount_percentage) / 100
                    return (
                      <div
                        key={index}
                        className="flex justify-between text-green-600"
                      >
                        <span>
                          {discountData.discount_name} (
                          {discountData.discount_percentage}%):
                        </span>
                        <span> {formatCurrency(discountAmount)}</span>
                      </div>
                    )
                  }
                }
                return null
              })}
            </div>
            <Separator />
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}