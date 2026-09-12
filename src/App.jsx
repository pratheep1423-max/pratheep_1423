import React from 'react';
import { useApp } from './context/AppContext';
import { CustomCursor } from './components/common/CustomCursor';
import { Toast } from './components/common/Toast';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { PortfolioPage } from './pages/PortfolioPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { AdminLayout } from './admin/AdminLayout';

export default function App() {
  const { currentView, isAdminMode } = useApp();

  if (isAdminMode || currentView === 'admin') {
    return (
      <>
        <AdminLayout />
        <Toast />
      </>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'services':
      case 'packages':
        return <ServicesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'booking':
        return <BookingPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative min-h-screen bg-studio-bg text-obsidian-900 selection:bg-champagne-500 selection:text-obsidian-950 font-sans">
      <CustomCursor />
      <Navbar />
      {renderView()}
      <Footer />
      <Toast />
    </div>
  );
}
