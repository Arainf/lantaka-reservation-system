"use client"

import * as React from "react"
import { useEffect } from "react"
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

export function DatePickerDemo() {
  const [date, setDate] = React.useState("")

  useEffect(() => {
    setDate(new Date())
  }, [])

  return (
    <Popover style={{backgroundColor: "#95c1ff"}}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full sm:w-[240px] justify-start text-left font-normal",
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
          selected={date}
          onSelect={(newDate) => setDate(newDate)}
          initialFocus
          className="rounded-md border"
          
        />
      </PopoverContent>
    </Popover>
  )
}

<style jsx global>{`
  .react-calendar {
    width: 100%;
    max-width: 350px;
    font-size: 0.875rem;
  }
  @media (max-width: 640px) {
    .react-calendar {
      font-size: 0.75rem;
    }
  }
`}</style>