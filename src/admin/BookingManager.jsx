import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  sendBookingToWhatsApp,
  sendStatusUpdateToCustomerWhatsApp,
  sendCustomerEmailUpdate,
  formatCustomerStatusMessage
} from '../services/whatsappService';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  X,
  MessageSquare,
  Mail,
  Send,
  Sparkles,
  Phone,
  Copy
} from 'lucide-react';

export const BookingManager = () => {
  const { bookings, updateBookingStatus, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Status Notification Modal state
  const [notificationModalBooking, setNotificationModalBooking] = useState(null);
  const [pendingNewStatus, setPendingNewStatus] = useState('');

  const filtered = bookings.filter((bk) => {
    const matchesSearch =
      (bk.customerName || '').toLowerCase().includes(search.toLowerCase()) ||
      (bk.refNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (bk.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (bk.phone || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || (bk.status || '').toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (booking, newStatus) => {
    await updateBookingStatus(booking.id, newStatus);
    const updatedBk = { ...booking, status: newStatus };
    setNotificationModalBooking(updatedBk);
    setPendingNewStatus(newStatus);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Customer notification message copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-obsidian-900">Booking Management</h1>
          <p className="text-xs font-mono text-obsidian-800/60 mt-1">
            Review bookings, approve reservations & notify customers via WhatsApp and Email
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-obsidian-400" />
            <input
              type="text"
              placeholder="Search ref, name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-studio-card border border-studio-border rounded text-xs font-mono focus:outline-none focus:border-champagne-600 w-64"
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
                <th className="p-4">Event Date</th>
                <th className="p-4">Price</th>
                <th className="p-4">Booking Status</th>
                <th className="p-4 text-center">Notify Customer</th>
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
                    <span className="text-[10px] text-champagne-600 font-bold">{bk.packageName}</span>
                  </td>
                  <td className="p-4">
                    <span className="block">{bk.eventDate}</span>
                    <span className="text-[10px] text-obsidian-800/60 block">{bk.eventTime}</span>
                  </td>
                  <td className="p-4 font-bold text-obsidian-900">${bk.price?.toLocaleString()}</td>
                  <td className="p-4">
                    <select
                      value={bk.status}
                      onChange={(e) => handleStatusChange(bk, e.target.value)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border focus:outline-none cursor-pointer transition-all ${
                        bk.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold' :
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
                  <td className="p-4 text-center">
                    {/* Notify Customer Buttons */}
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => sendStatusUpdateToCustomerWhatsApp(bk, bk.status)}
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold uppercase flex items-center gap-1 transition-colors shadow-sm"
                        title={`Send WhatsApp confirmation directly to customer (${bk.phone})`}
                      >
                        <MessageSquare className="w-3 h-3 fill-white" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        onClick={() => sendCustomerEmailUpdate(bk, bk.status)}
                        className="px-2 py-1 bg-obsidian-900 hover:bg-champagne-500 hover:text-obsidian-950 text-ivory-100 rounded text-[10px] font-bold uppercase flex items-center gap-1 transition-colors shadow-sm"
                        title={`Send Email update to customer (${bk.email})`}
                      >
                        <Mail className="w-3 h-3" />
                        <span>Email</span>
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedBooking(bk)}
                      className="p-2 bg-obsidian-900 text-ivory-50 rounded hover:bg-champagne-500 hover:text-obsidian-950 transition-colors"
                      title="View Full Booking Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-obsidian-800/60 font-mono">
                    No bookings found matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Notification Prompt Modal (Triggered on Status Update) */}
      {notificationModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-md">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setNotificationModalBooking(null)}
              className="absolute top-4 right-4 text-ivory-200/60 hover:text-white p-1 rounded bg-obsidian-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-champagne-400 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                BOOKING STATUS UPDATED TO: {notificationModalBooking.status.toUpperCase()}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Notify Customer: {notificationModalBooking.customerName}
              </h3>
              <p className="text-xs font-mono text-ivory-200/70 mt-1">
                Send the confirmation message directly to customer's phone or email now:
              </p>
            </div>

            {/* Quick Action Notification Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  sendStatusUpdateToCustomerWhatsApp(notificationModalBooking, notificationModalBooking.status);
                }}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  sendCustomerEmailUpdate(notificationModalBooking, notificationModalBooking.status);
                }}
                className="w-full py-3 px-4 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </button>
            </div>

            {/* Preview of Message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-ivory-200/60">
                <span>Message Preview:</span>
                <button
                  type="button"
                  onClick={() => handleCopyMessage(formatCustomerStatusMessage(notificationModalBooking, notificationModalBooking.status))}
                  className="text-champagne-400 hover:text-champagne-300 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Message</span>
                </button>
              </div>
              <pre className="p-3 bg-obsidian-950 border border-obsidian-800 rounded-lg text-xs font-mono text-ivory-200/80 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                {formatCustomerStatusMessage(notificationModalBooking, notificationModalBooking.status)}
              </pre>
            </div>

            <div className="pt-2 border-t border-obsidian-800 flex justify-end">
              <button
                onClick={() => setNotificationModalBooking(null)}
                className="px-5 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-ivory-200 text-xs font-mono uppercase tracking-wider rounded transition-colors"
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div>
                <strong className="text-champagne-400">Status:</strong>{' '}
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                  selectedBooking.status === 'Confirmed' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                }`}>
                  {selectedBooking.status}
                </span>
              </div>
              {selectedBooking.requirements && (
                <div><strong className="text-champagne-400">Notes:</strong> {selectedBooking.requirements}</div>
              )}
            </div>

            {/* Direct Notify Customer Buttons */}
            <div className="space-y-2 pt-2 border-t border-obsidian-800">
              <span className="text-[10px] font-mono uppercase text-ivory-200/50 block">Notify Customer:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => sendStatusUpdateToCustomerWhatsApp(selectedBooking, selectedBooking.status)}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Customer</span>
                </button>

                <button
                  onClick={() => sendCustomerEmailUpdate(selectedBooking, selectedBooking.status)}
                  className="py-2.5 px-3 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 text-xs font-mono uppercase font-bold tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Customer</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
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
