import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AdminLogin } from './AdminLogin';
import { AdminSidebar } from './AdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { BookingManager } from './BookingManager';
import { CustomerManager } from './CustomerManager';
import { CalendarManager } from './CalendarManager';
import { PortfolioManager } from './PortfolioManager';
import { PackageManager } from './PackageManager';
import { EnquiryInbox } from './EnquiryInbox';
import { SettingsManager } from './SettingsManager';
import { Menu, ShieldCheck } from 'lucide-react';

export const AdminLayout = () => {
  const { adminTab, isAdminAuthenticated } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  const renderActiveTab = () => {
    switch (adminTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'bookings': return <BookingManager />;
      case 'calendar': return <CalendarManager />;
      case 'customers': return <CustomerManager />;
      case 'portfolio': return <PortfolioManager />;
      case 'packages':
      case 'services': return <PackageManager />;
      case 'enquiries': return <EnquiryInbox />;
      case 'settings': return <SettingsManager />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-studio-bg font-sans text-obsidian-900 relative">
      {/* Sidebar - static on desktop, slide-out drawer on mobile */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar with Hamburger Button (3 lines) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-obsidian-950 text-ivory-50 border-b border-obsidian-800 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-obsidian-900 border border-obsidian-800 text-champagne-400 hover:text-champagne-300 hover:bg-obsidian-800 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-500 flex items-center justify-center"
              aria-label="Open navigation menu"
              title="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-champagne-400 shrink-0" />
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-champagne-400 font-bold block leading-none">
                  STUDIO PORTAL
                </span>
                <span className="font-serif text-base font-bold tracking-wider text-white leading-tight">
                  2M CONTROL
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-champagne-500/10 text-champagne-400 border border-champagne-500/30 font-semibold tracking-wider capitalize">
              {adminTab}
            </span>
          </div>
        </header>

        {/* Main View Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  );
};
