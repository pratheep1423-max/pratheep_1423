import React, { useState } from 'react';
import { CalendarView } from '../components/booking/CalendarView';
import { useApp } from '../context/AppContext';
import { Lock, Unlock, Calendar as CalendarIcon, Info } from 'lucide-react';

export const CalendarManager = () => {
  const { blockedDates, toggleBlockDate } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-10-18');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-obsidian-900">Availability & Studio Calendar</h1>
        <p className="text-xs font-mono text-obsidian-800/60 mt-1">
          Click any calendar date to toggle BLOCKED / AVAILABLE status for client bookings.
        </p>
      </div>

      <div className="p-4 bg-champagne-50 border border-champagne-300 rounded-lg flex items-center justify-between text-xs font-mono text-obsidian-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-champagne-700 shrink-0" />
          <span>Currently {blockedDates.length} studio blackout dates enforced.</span>
        </div>
        <span className="font-bold text-champagne-800">Admin Live Control Active</span>
      </div>

      <CalendarView
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        isAdmin={true}
      />
    </div>
  );
};
