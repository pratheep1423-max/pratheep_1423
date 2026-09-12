import React from 'react';
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

export const AdminLayout = () => {
  const { adminTab, isAdminAuthenticated } = useApp();

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
    <div className="flex min-h-screen bg-studio-bg font-sans text-obsidian-900">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};
