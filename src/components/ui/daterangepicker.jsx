import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarBooking() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed, so 9 is October
  const [currentYear, setCurrentYear] = useState(2024);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day < startDate) {
      setStartDate(day);
      setEndDate(startDate);
    } else {
      setEndDate(day);
    }
  };

  const isDateInRange = (day) => {
    if (startDate && endDate) {
      return day >= startDate && day <= endDate;
    }
    return day === startDate;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const nightsSelected = endDate && startDate ? endDate - startDate + 1 : 0;
  const totalPrice = nightsSelected * 180;

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-4">
      <div className="text-2xl font-bold mb-4">$ 180<span className="text-sm font-normal text-gray-600">/night</span></div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 text-gray-600">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </div>
        <button onClick={handleNextMonth} className="p-1 text-gray-600">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isSelected = isDateInRange(day);
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
                ${isSelected ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      
      <div className="text-right text-gray-600">
        {nightsSelected > 0 && (
          <>
            <div>Total days: {nightsSelected}</div>
            <div className="font-bold text-black text-xl">Total: $ {totalPrice}</div>
          </>
        )}
      </div>
    </div>
  );
}
