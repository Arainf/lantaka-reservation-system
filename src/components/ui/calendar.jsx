import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-white shadow-md rounded-md", className)} // Light background with subtle shadow
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-gray-800", // Darker caption label for better visibility in light mode
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 text-gray-500 hover:text-blue-600 hover:bg-gray-100" // Subtle button colors for light mode
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-gray-600", // Light gray for the header cells
        row: "grid grid-cols-7 gap-1", // Responsive grid layout for days
        cell: "h-auto w-full aspect-square text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-blue-100 [&:has([aria-selected])]:bg-blue-200 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // Soft blue background for selected range
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-full h-full p-0 font-normal text-gray-700 hover:bg-blue-100 hover:text-blue-600" // Softer hover effect and blue highlight for hover state
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white", // Blue background for selected day, with white text
        day_today: "bg-yellow-100 text-yellow-800", // Accent for today's date with soft yellow
        day_outside:
          "day-outside text-gray-400 opacity-50 aria-selected:bg-blue-50 aria-selected:text-gray-500", // Lighter color for days outside the current month
        day_disabled: "text-gray-300 opacity-50", // Disabled days styled with a lighter gray
        day_range_middle:
          "aria-selected:bg-blue-100 aria-selected:text-blue-600", // Light blue for selected range in the middle
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4 text-gray-500" />, // Gray color for previous arrow
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4 text-gray-500" />, // Gray color for next arrow
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
