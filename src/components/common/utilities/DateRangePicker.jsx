"use client"

import * as React from "react"
import { IoCalendarSharp } from "react-icons/io5"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Add props for date and onDateChange
export function DatePickerDemo({ date, onDateChange }) {
  return (
    <Popover style={{backgroundColor: "#95c1ff"}}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          style={{backgroundColor: "#95c1ff"}}
        >
          <IoCalendarSharp className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}  // Pass the selected date to the Calendar
          onSelect={(newDate) => {
            onDateChange(newDate);  // Call the parent's onDateChange function
          }}
          initialFocus
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}
