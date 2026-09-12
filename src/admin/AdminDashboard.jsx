import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Eye
} from 'lucide-react';

export const AdminDashboard = () => {
  const { bookings, customers, enquiries, setAdminTab } = useApp();

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const totalCustomers = customers.length;

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

  const kpis = [
    { label: 'Total Bookings', val: totalBookings, icon: CalendarCheck, color: 'text-champagne-400' },
    { label: 'Upcoming Sessions', val: confirmedBookings, icon: Clock, color: 'text-blue-400' },
    { label: 'Pending Requests', val: pendingBookings, icon: Clock, color: 'text-amber-400' },
    { label: 'Completed Sessions', val: completedBookings, icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Total Customers', val: totalCustomers, icon: Users, color: 'text-purple-400' },
    { label: 'Total Estimated Value', val: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-obsidian-900">Studio Dashboard Overview</h1>
        <p className="text-xs font-mono text-obsidian-800/60 mt-1">Real-time booking metrics, financial estimates & activity feed</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-studio-card p-6 rounded-xl border border-studio-border shadow-editorial flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-obsidian-800/60 block">{kpi.label}</span>
                <span className="font-serif text-3xl font-bold text-obsidian-900 mt-1 block">{kpi.val}</span>
              </div>
              <div className="p-3 bg-obsidian-900 rounded-lg shadow-sm">
                <Icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Monthly Trend SVG Bar Chart */}
        <div className="bg-studio-card p-6 rounded-xl border border-studio-border shadow-editorial space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-obsidian-900">Monthly Booking Trends</h3>
            <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600">2026 FORECAST</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-ivory-200">
            {[
              { month: 'Jun', count: 4, height: '40%' },
              { month: 'Jul', count: 7, height: '65%' },
              { month: 'Aug', count: 9, height: '80%' },
              { month: 'Sep', count: 12, height: '100%' },
              { month: 'Oct', count: 10, height: '85%' },
              { month: 'Nov', count: 6, height: '55%' },
            ].map((m, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-obsidian-800">{m.count}</span>
                <div
                  className="w-full bg-obsidian-900 hover:bg-champagne-500 rounded-t transition-all duration-300"
                  style={{ height: m.height }}
                />
                <span className="text-[10px] font-mono text-obsidian-800/60">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Service Distribution */}
        <div className="bg-studio-card p-6 rounded-xl border border-studio-border shadow-editorial space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-obsidian-900">Popular Services Breakdown</h3>
            <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600">DEMAND</span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { name: 'Wedding Photography', pct: '45%', color: 'bg-champagne-500' },
              { name: 'Pre-Wedding Photography', pct: '25%', color: 'bg-obsidian-900' },
              { name: 'Fashion & Portraits', pct: '20%', color: 'bg-amber-600' },
              { name: 'Events & Birthdays', pct: '10%', color: 'bg-slate-400' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.pct}</span>
                </div>
                <div className="w-full h-2 bg-ivory-200 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Bookings Table Preview */}
      <div className="bg-studio-card rounded-xl border border-studio-border shadow-editorial overflow-hidden">
        <div className="p-6 border-b border-ivory-200 flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-obsidian-900">Recent Booking Requests</h3>
          <button
            onClick={() => setAdminTab('bookings')}
            className="text-xs font-mono uppercase tracking-widest text-champagne-600 hover:text-obsidian-900 flex items-center gap-1.5"
          >
            <span>VIEW ALL BOOKINGS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-ivory-100 text-obsidian-800 uppercase tracking-wider border-b border-ivory-200">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service & Package</th>
                <th className="p-4">Event Date</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {bookings.slice(0, 5).map((bk) => (
                <tr key={bk.id} className="hover:bg-ivory-50 transition-colors">
                  <td className="p-4 font-bold text-champagne-700">{bk.refNumber}</td>
                  <td className="p-4">
                    <span className="font-sans font-semibold text-obsidian-900 block">{bk.customerName}</span>
                    <span className="text-[10px] text-obsidian-800/60">{bk.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="block font-semibold">{bk.serviceName}</span>
                    <span className="text-[10px] text-champagne-600">{bk.packageName}</span>
                  </td>
                  <td className="p-4">{bk.eventDate}</td>
                  <td className="p-4 font-bold">${bk.price?.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      bk.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      bk.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      bk.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {bk.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
