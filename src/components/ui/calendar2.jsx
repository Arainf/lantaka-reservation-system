import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar2({
  className,
  classNames,
  showOutsideDays = true,
  disablePast = false, // Add a prop to control whether to disable past dates or not
  ...props
}) {
  // Function to disable dates before today
  const disablePastDates = (date) => {
    if (disablePast) {
      return date < new Date(new Date().setHours(0, 0, 0, 0)); // Disable past dates
    }
    return false; // Allow past dates by default
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-foreground",
          "data-[selected]:bg-primary data-[selected]:text-primary-foreground",
          "aria-selected:bg-primary aria-selected:text-primary-foreground",
          "focus:bg-primary focus:text-primary-foreground",
          "[&:not([aria-selected]):hover]:bg-accent [&:not([aria-selected]):hover]:text-accent-foreground"
        ),
        day_range_start: "day-range-start rounded-l-md",
        day_range_end: "day-range-end rounded-r-md",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: cn(
          "aria-selected:bg-secondary-foreground/50",
          "aria-selected:text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          "relative before:absolute before:inset-0 before:bg-accent/20 before:content-['']"
        ),
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      disabled={disablePastDates}
      {...props}
    />
  );
}

export { Calendar2 };