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

// Convert 24-hour time to 12-hour format with AM/PM
const format24To12 = (time24) => {
  if (!time24) return '04:30 PM';
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
};

// Convert 12-hour format string to 24-hour HH:mm for <input type="time">
const format12To24 = (time12) => {
  if (!time12) return '16:30';
  const match = time12.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return '16:30';
  let [_, hStr, mStr, ampm] = match;
  let h = parseInt(hStr, 10);
  if (ampm.toUpperCase() === 'PM' && h < 12) h += 12;
  if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${mStr}`;
};

export const CalendarView = ({ selectedDate, onSelectDate, selectedTime, onSelectTime, isAdmin = false }) => {
  const { blockedDates, bookings, toggleBlockDate } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1)); // October 2026
  const [customTimeVal, setCustomTimeVal] = useState(() => format12To24(selectedTime));

  const isPresetSelected = TIME_SLOTS.includes(selectedTime);
  const isCustomSelected = selectedTime && !isPresetSelected;

  const handleCustomTimeChange = (new24) => {
    setCustomTimeVal(new24);
    const formatted = format24To12(new24);
    onSelectTime(`${formatted} (Custom)`);
  };

  const handleQuickTime = (t) => {
    setCustomTimeVal(format12To24(t));
    onSelectTime(`${t} (Custom)`);
  };

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
              className={`relative h-12 md:h-14 p-2 rounded-lg border text-sm font-semibold flex flex-col items-center justify-between transition-all ${statusBg} ${!isAdmin && (status === 'BLOCKED' || status === 'BOOKED') ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
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
          className="mt-8 pt-6 border-t border-ivory-200 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-obsidian-900">
              <Clock className="w-4 h-4 text-champagne-600" />
              <span>Select Time Slot for {selectedDate}:</span>
            </div>
            {selectedTime && (
              <span className="text-xs font-mono px-3 py-1 bg-champagne-500/20 text-obsidian-900 font-bold rounded-full border border-champagne-500/40 flex items-center gap-1.5 w-fit">
                <CheckCircle2 className="w-3.5 h-3.5 text-champagne-600" />
                <span>Selected: {selectedTime}</span>
              </span>
            )}
          </div>

          {/* Standard Recommended Slots */}
          <div>
            <span className="text-[11px] font-mono text-obsidian-800/70 uppercase tracking-wider block mb-2 font-semibold">
              Standard Recommended Slots (பரிந்துரைக்கப்பட்ட நேரங்கள்):
            </span>
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
          </div>

          {/* Customer Custom Time Selection */}
          <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
            isCustomSelected
              ? 'bg-champagne-50/70 border-champagne-500 shadow-sm ring-1 ring-champagne-500/50'
              : 'bg-ivory-50 border-ivory-300'
          } space-y-3`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-champagne-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian-900">
                  Customer Custom Time (வாடிக்கையாளர் விருப்ப நேரம்)
                </span>
              </div>
              {isCustomSelected && (
                <span className="text-[10px] font-mono uppercase bg-champagne-500 text-obsidian-950 px-2.5 py-0.5 rounded font-bold">
                  Custom Time Active
                </span>
              )}
            </div>

            <p className="text-xs text-obsidian-800/70 font-sans">
              மேலே உள்ள நேரங்கள் அல்லாமல் வேறு நேரம் (எ.கா. Early morning photoshoot, muhurtham, specific evening timing) தேவைப்பட்டால், கீழே உள்ள clock-ல் உங்கள் சரியான நேரத்தை தேர்வு செய்யவும்:
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <div className="relative flex-1">
                <input
                  type="time"
                  value={customTimeVal}
                  onChange={(e) => handleCustomTimeChange(e.target.value)}
                  className="w-full p-3 bg-white border border-ivory-300 rounded-lg text-sm font-mono font-bold text-obsidian-900 focus:outline-none focus:border-champagne-500 focus:ring-2 focus:ring-champagne-500/30 shadow-sm"
                  aria-label="Pick custom time"
                />
              </div>

              <button
                type="button"
                onClick={() => handleCustomTimeChange(customTimeVal)}
                className={`px-5 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 ${
                  isCustomSelected
                    ? 'bg-champagne-500 text-obsidian-950 shadow-sm border border-champagne-600'
                    : 'bg-obsidian-900 hover:bg-obsidian-800 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply: {format24To12(customTimeVal)}</span>
              </button>
            </div>

            {/* Quick Popular Times */}
            <div className="pt-2 border-t border-ivory-200 flex items-center flex-wrap gap-1.5">
              <span className="text-[10px] font-mono text-obsidian-800/60 uppercase">Quick Pick:</span>
              {['06:00 AM', '07:30 AM', '10:00 AM', '01:00 PM', '03:30 PM', '06:00 PM', '08:00 PM'].map((t) => {
                const isThisQuick = selectedTime === `${t} (Custom)` || selectedTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleQuickTime(t)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                      isThisQuick
                        ? 'bg-champagne-500 text-obsidian-950 font-bold border-champagne-600'
                        : 'bg-white text-obsidian-800 border-ivory-300 hover:border-obsidian-800'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
