import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { Icons } from '../icons';

interface CalendarProps {
  reservations: any[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function Calendar({ reservations, selectedDate, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(selectedDate));
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasReservationOnDay = (date: Date) => {
    return reservations.some(reservation => {
      const reservationDate = new Date(reservation.scheduledCheckIn);
      return isSameDay(reservationDate, date);
    });
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 hover:bg-blue-100 rounded-full transition-colors"
        >
          <Icons.ChevronLeft className="h-5 w-5 text-blue-600" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 hover:bg-blue-100 rounded-full transition-colors"
        >
          <Icons.ChevronRight className="h-5 w-5 text-blue-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-blue-600 text-sm py-2">
            {day}
          </div>
        ))}
        {days.map(day => (
          <button
            key={day.toString()}
            onClick={() => onSelectDate(day)}
            className={`
              p-2 rounded-lg text-center relative group transition-all
              ${isSameMonth(day, currentMonth) ? 'text-gray-900' : 'text-gray-400'}
              ${isSameDay(day, selectedDate) 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'hover:bg-blue-100'}
            `}
          >
            <span className={`
              ${isSameDay(day, selectedDate) ? 'font-bold' : 'font-medium'}
            `}>
              {format(day, 'd')}
            </span>
            {hasReservationOnDay(day) && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <div className={`h-1.5 w-1.5 rounded-full ${
                  isSameDay(day, selectedDate) 
                    ? 'bg-white' 
                    : 'bg-blue-500'
                }`} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 