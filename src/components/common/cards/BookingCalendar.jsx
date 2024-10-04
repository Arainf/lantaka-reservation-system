import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; // Start from SUN

const BookingCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date()); // Current date
  const [selectedDay, setSelectedDay] = React.useState(null); // State for selected day

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Sunday is 0
    const daysArray = [];

    // Add days from previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push({ day: new Date(year, month, -i).getDate(), currentMonth: false });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({ day: i, currentMonth: true });
    }

    // Add days from next month
    const remainingDays = 42 - daysArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({ day: i, currentMonth: false });
    }

    return daysArray;
  };

  const days = getDaysInMonth(currentDate);

  const prevMonth = () => {
    // Move to the previous month but maintain the same day if possible
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);

    // If the new month doesn't have the current day, set to the last day of that month
    if (newDate.getDate() > new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()) {
      newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());
    }

    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    // Move to the next month but maintain the same day if possible
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);

    // If the new month doesn't have the current day, set to the first day of the next month
    if (newDate.getDate() > new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()) {
      newDate.setDate(1);
    }

    setCurrentDate(newDate);
  };

  // Function to handle day click
  const handleDayClick = (day) => {
    if (day.currentMonth) {
      setSelectedDay(day.day);
      // Additional logic can be added here (e.g., show booking form)
      console.log(`Selected Day: ${day.day}`);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Booking Schedule</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4 " />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map(day => (
            <div key={day} className="text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDayClick(day)} // Add click handler
              className={`p-1 text-sm cursor-pointer transition-all duration-200 ease-in-out ${
                day.currentMonth ? 'text-gray-900 hover:bg-blue-200' : 'text-gray-400'
              } ${
                day.day === currentDate.getDate() && day.currentMonth ? 'bg-green-500 text-white rounded-md' : '' // Only current day is green
              } ${selectedDay === day.day && day.currentMonth ? 'bg-blue-500 text-white rounded-md' : ''}`}
            >
              {day.day}
              {/* {day.day === currentDate.getDate() && day.currentMonth && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></span>
              )} */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;

