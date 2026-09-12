import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2, Lock, AlertCircle } from 'lucide-react';

export const TIME_SLOTS = [
  '09:00 AM',
  '11:30 AM',
  '02:00 PM',
  '04:30 PM (Golden Hour)',
  '07:00 PM (Sunset / Evening)'
];

export const CalendarView = ({ selectedDate, onSelectDate, selectedTime, onSelectTime, isAdmin = false }) => {
  const { blockedDates, bookings, toggleBlockDate } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1)); // October 2026

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatDateStr = (day) => {
    const yyyy = currentMonth.getFullYear();
    const mm = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const monthYearLabel = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Get status for date
  const getDateStatus = (dateStr) => {
    if (blockedDates.includes(dateStr)) return 'BLOCKED';
    const bk = bookings.find(b => b.eventDate === dateStr);
    if (bk) {
      return bk.status === 'Confirmed' ? 'BOOKED' : 'PENDING';
    }
    return 'AVAILABLE';
  };

  return (
    <div className="bg-studio-card border border-studio-border rounded-xl p-6 md:p-8 shadow-editorial">
      {/* Legend & Month Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-ivory-200">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-champagne-600" />
          <h3 className="font-serif text-2xl font-bold text-obsidian-900">
            {monthYearLabel}
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] font-mono tracking-wider">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            AVAILABLE
          </span>
          <span className="flex items-center gap-1.5 text-amber-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            PENDING
          </span>
          <span className="flex items-center gap-1.5 text-rose-700">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            BOOKED / BLOCKED
          </span>
        </div>

        {/* Month controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 border border-ivory-300 rounded hover:border-obsidian-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 border border-ivory-300 rounded hover:border-obsidian-900 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono tracking-widest text-obsidian-800/60 mb-3 font-semibold">
        <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty leading padding slots */}
        {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-12 md:h-14 bg-ivory-50/50 rounded-lg opacity-30" />
        ))}

        {/* Month Days */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const dateStr = formatDateStr(dayNum);
          const status = getDateStatus(dateStr);
          const isSelected = selectedDate === dateStr;

          let statusBg = 'bg-ivory-50 text-obsidian-900 hover:border-champagne-500';
          let indicatorColor = 'bg-emerald-500';

          if (status === 'BLOCKED' || status === 'BOOKED') {
            statusBg = 'bg-rose-50 text-rose-950 border-rose-200';
            indicatorColor = 'bg-rose-500';
          } else if (status === 'PENDING') {
            statusBg = 'bg-amber-50 text-amber-950 border-amber-200';
            indicatorColor = 'bg-amber-500';
          }

          if (isSelected) {
            statusBg = 'bg-obsidian-900 text-ivory-50 border-champagne-500 shadow-md ring-2 ring-champagne-500/50';
          }

          return (
            <motion.button
              key={dateStr}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isAdmin) {
                  toggleBlockDate(dateStr);
                } else if (status !== 'BLOCKED' && status !== 'BOOKED') {
                  onSelectDate(dateStr);
                }
              }}
              disabled={!isAdmin && (status === 'BLOCKED' || status === 'BOOKED')}
              className={`relative h-12 md:h-14 p-2 rounded-lg border text-sm font-semibold flex flex-col items-center justify-between transition-all ${statusBg} ${
                !isAdmin && (status === 'BLOCKED' || status === 'BOOKED') ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              }`}
            >
              <span className="self-start text-xs font-mono">{dayNum}</span>
              <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${indicatorColor}`} />
                <span className="text-[9px] uppercase font-mono tracking-tighter opacity-80">
                  {status === 'BLOCKED' ? 'LOCK' : status}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Time Slot Picker if Date Selected */}
      {selectedDate && onSelectTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 pt-6 border-t border-ivory-200"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-obsidian-900 mb-4">
            <Clock className="w-4 h-4 text-champagne-600" />
            <span>Select Time Slot for {selectedDate}:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIME_SLOTS.map((slot) => {
              const isTimeSelected = selectedTime === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => onSelectTime(slot)}
                  className={`p-3 rounded-lg border text-xs font-mono tracking-wider flex items-center justify-between transition-all ${
                    isTimeSelected
                      ? 'bg-champagne-500 text-obsidian-950 font-bold border-champagne-600 shadow-sm'
                      : 'bg-ivory-50 text-obsidian-900 border-ivory-300 hover:border-obsidian-800'
                  }`}
                >
                  <span>{slot}</span>
                  {isTimeSelected && <CheckCircle2 className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};
