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

export function DatePicker({ value, onChange, className }) {
  const [date, setDate] = React.useState(value || {
    from: new Date(),
    to: addDays(new Date(), 0),
  })

  const handleDateChange = (newDate) => {
    setDate(newDate)
    onChange(newDate) // Pass selected date back to FormField
    console.log("Selected date:", newDate)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal transition-colors duration-200 ease-in-out",
              !date && "text-muted-foreground",
            )}
            style={{
              backgroundColor: "#95c1ff",
            }}
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
            onSelect={handleDateChange} // Use the callback here
            numberOfMonths={2}
            className="border-blue-500 text-black hover:border-blue-700"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
