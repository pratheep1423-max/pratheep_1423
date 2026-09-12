import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Mail, Phone, Calendar, DollarSign, UserCheck } from 'lucide-react';

export const CustomerManager = () => {
  const { customers } = useApp();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-obsidian-900">Customer Directory</h1>
          <p className="text-xs font-mono text-obsidian-800/60 mt-1">Client relationship database & historical booking records</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-obsidian-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-studio-card border border-studio-border rounded text-xs font-mono focus:outline-none focus:border-champagne-600 w-64"
          />
        </div>
      </div>

      <div className="bg-studio-card rounded-xl border border-studio-border shadow-editorial overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-ivory-100 text-obsidian-800 uppercase tracking-wider border-b border-ivory-200">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Total Sessions</th>
                <th className="p-4">Last Reserved Date</th>
                <th className="p-4">Lifetime Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-ivory-50 transition-colors">
                  <td className="p-4 font-bold text-obsidian-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-champagne-600" />
                    <span>{c.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="block font-sans">{c.email}</span>
                    <span className="text-[10px] text-obsidian-800/60 block">{c.phone}</span>
                  </td>
                  <td className="p-4 font-bold text-champagne-700">{c.bookingsCount} Sessions</td>
                  <td className="p-4">{c.lastBookingDate}</td>
                  <td className="p-4 font-bold text-emerald-700">${c.totalSpent?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
