import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sendBookingToWhatsApp } from '../services/whatsappService';
import { Search, Filter, Eye, CheckCircle2, Clock, XCircle, FileText, X, MessageSquare } from 'lucide-react';

export const BookingManager = () => {
  const { bookings, updateBookingStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filtered = bookings.filter((bk) => {
    const matchesSearch =
      (bk.customerName || '').toLowerCase().includes(search.toLowerCase()) ||
      (bk.refNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (bk.email || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || (bk.status || '').toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-obsidian-900">Booking Management</h1>
          <p className="text-xs font-mono text-obsidian-800/60 mt-1">
            Review, approve, modify, or send reservations via WhatsApp (+91 8248149082)
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-obsidian-400" />
            <input
              type="text"
              placeholder="Search ref, name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-studio-card border border-studio-border rounded text-xs font-mono focus:outline-none focus:border-champagne-600 w-60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-studio-card border border-studio-border rounded text-xs font-mono focus:outline-none focus:border-champagne-600"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-studio-card rounded-xl border border-studio-border shadow-editorial overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-ivory-100 text-obsidian-800 uppercase tracking-wider border-b border-ivory-200">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Service & Package</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {filtered.map((bk) => (
                <tr key={bk.id} className="hover:bg-ivory-50 transition-colors">
                  <td className="p-4 font-bold text-champagne-700">{bk.refNumber}</td>
                  <td className="p-4">
                    <span className="font-sans font-semibold text-obsidian-900 block">{bk.customerName}</span>
                    <span className="text-[10px] text-obsidian-800/60 block">{bk.email}</span>
                    <span className="text-[10px] text-obsidian-800/60 block">{bk.phone}</span>
                  </td>
                  <td className="p-4">
                    <span className="block font-semibold">{bk.serviceName}</span>
                    <span className="text-[10px] text-champagne-600">{bk.packageName}</span>
                  </td>
                  <td className="p-4">
                    <span className="block">{bk.eventDate}</span>
                    <span className="text-[10px] text-obsidian-800/60 block">{bk.eventTime}</span>
                  </td>
                  <td className="p-4 font-bold text-obsidian-900">${bk.price?.toLocaleString()}</td>
                  <td className="p-4">
                    <select
                      value={bk.status}
                      onChange={(e) => updateBookingStatus(bk.id, e.target.value)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border focus:outline-none ${
                        bk.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        bk.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        bk.status === 'Completed' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => sendBookingToWhatsApp(bk)}
                        className="p-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                        title="Send Details to WhatsApp (+91 8248149082)"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                      </button>
                      <button
                        onClick={() => setSelectedBooking(bk)}
                        className="p-2 bg-obsidian-900 text-ivory-50 rounded hover:bg-champagne-500 hover:text-obsidian-950 transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-obsidian-800/60 font-mono">
                    No bookings found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 text-ivory-200/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 block">
                RESERVATION DETAILS
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Ref: {selectedBooking.refNumber}
              </h3>
            </div>

            <div className="space-y-3 text-xs font-mono bg-obsidian-950 p-4 rounded border border-obsidian-800">
              <div><strong className="text-champagne-400">Customer:</strong> {selectedBooking.customerName}</div>
              <div><strong className="text-champagne-400">Email:</strong> {selectedBooking.email}</div>
              <div><strong className="text-champagne-400">Phone:</strong> {selectedBooking.phone}</div>
              <div><strong className="text-champagne-400">Service:</strong> {selectedBooking.serviceName}</div>
              <div><strong className="text-champagne-400">Package:</strong> {selectedBooking.packageName} (${selectedBooking.price})</div>
              <div><strong className="text-champagne-400">Event Date & Time:</strong> {selectedBooking.eventDate} at {selectedBooking.eventTime}</div>
              <div><strong className="text-champagne-400">Location:</strong> {selectedBooking.location}</div>
              <div><strong className="text-champagne-400">Guests:</strong> {selectedBooking.peopleCount}</div>
              {selectedBooking.requirements && (
                <div><strong className="text-champagne-400">Notes:</strong> {selectedBooking.requirements}</div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => sendBookingToWhatsApp(selectedBooking)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono uppercase tracking-wider rounded flex items-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Alert (+91 8248149082)</span>
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-obsidian-800 text-xs font-mono uppercase tracking-widest rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
