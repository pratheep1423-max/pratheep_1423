import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Users,
  Camera,
  Layers,
  Inbox,
  Settings,
  ArrowLeft,
  ShieldCheck,
  Database,
  LogOut
} from 'lucide-react';

export const AdminSidebar = () => {
  const { adminTab, setAdminTab, navigateTo, logoutAdmin, adminUser } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'calendar', label: 'Availability Calendar', icon: CalendarDays },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'portfolio', label: 'Portfolio Gallery', icon: Camera },
    { id: 'packages', label: 'Packages & Services', icon: Layers },
    { id: 'enquiries', label: 'Enquiry Inbox', icon: Inbox },
    { id: 'settings', label: 'Studio Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-obsidian-950 text-ivory-50 border-r border-obsidian-800 flex flex-col justify-between p-6 shrink-0 min-h-screen">
      <div>
        {/* Admin Header */}
        <div className="pb-6 border-b border-obsidian-800">
          <div className="flex items-center gap-2 text-champagne-400">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold">
              STUDIO PORTAL
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-wider text-white mt-1">
            2M CONTROL
          </h2>
        </div>

        {/* Navigation */}
        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-mono tracking-wider transition-all ${
                  isActive
                    ? 'bg-champagne-500 text-obsidian-950 font-bold shadow-gold-glow'
                    : 'text-ivory-200/70 hover:bg-obsidian-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Logout */}
      <div className="pt-6 border-t border-obsidian-800 space-y-3">
        {/* Admin User Badge */}
        <div className="p-3 bg-obsidian-900 rounded border border-obsidian-800 flex items-center justify-between text-[11px] font-mono">
          <div className="truncate">
            <span className="text-white font-bold block truncate">{adminUser?.name || 'Studio Admin'}</span>
            <span className="text-[9px] text-champagne-400 block tracking-wider uppercase font-semibold">{adminUser?.role || 'Super Admin'}</span>
          </div>
        </div>

        <button
          onClick={logoutAdmin}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900 hover:border-rose-500 text-rose-300 text-xs font-mono uppercase tracking-wider rounded transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>LOGOUT SESSION</span>
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-obsidian-900 border border-obsidian-800 hover:border-champagne-500 text-ivory-200/70 hover:text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>CUSTOMER SITE</span>
        </button>
      </div>
    </aside>
  );
};
