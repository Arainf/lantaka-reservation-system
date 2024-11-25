"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { IoCalendarSharp } from "react-icons/io5"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ value, onChange, className, state }) {
  const [date, setDate] = React.useState(value || {
    from: new Date(), 
    to: new Date(), 
  })

  const handleDateChange = (newDate) => {
    console.log("Data to be sent to onChange:", newDate); // Log the data
    setDate(newDate);
    onChange(newDate); // Pass selected date back to FormField
  
    if (newDate?.from && newDate?.to) {
      const formattedFrom = format(newDate.from, "yyyy-MM-dd");
      const formattedTo = format(newDate.to, "yyyy-MM-dd");
  
      // Log the raw string for the date range
      console.log(`From ${formattedFrom} to ${formattedTo}`);
      console.log(`from ${newDate.from.toLocaleString()} to ${newDate.to.toLocaleString()}`);
    }
  };
  
  

  return (
    <div className={cn("flex items-center justify-between gap-2 ", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal transition-colors duration-200 ease-in-out",
              !date && "text-muted-foreground", className
            )}
            style={{
              backgroundColor: "#95c1ff",
            }}
            disabled={state}
          >
            <IoCalendarSharp className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            className="border-blue-500 text-black hover:border-blue-500"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}


