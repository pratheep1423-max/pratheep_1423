import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View mode state
  const [currentView, setCurrentView] = useState('home'); // 'home', 'portfolio', 'services', 'packages', 'about', 'contact', 'booking', 'admin'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'bookings', 'calendar', 'customers', 'services', 'packages', 'portfolio', 'enquiries', 'settings'
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('2m_admin_authenticated') === 'true';
  });
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('2m_admin_user');
    return saved ? JSON.parse(saved) : { name: 'Studio Director', email: 'admin@2mpictures.com', role: 'Super Admin' };
  });

  const loginAdmin = async (username, password) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAdminAuthenticated(true);
          if (data.user) setAdminUser(data.user);
          localStorage.setItem('2m_admin_authenticated', 'true');
          if (data.user) localStorage.setItem('2m_admin_user', JSON.stringify(data.user));
          showToast('Welcome back, Admin! Access Granted.');
          return { success: true };
        }
      }
    } catch (e) {
      console.log('Backend auth unavailable, checking local fallback credentials...');
    }

    // Local Fallback Credentials Check
    const u = (username || '').trim().toLowerCase();
    if ((u === 'admin' || u === 'admin@2mpictures.com') && password === 'pratheep@217') {
      const user = { name: 'Studio Director', email: 'admin@2mpictures.com', role: 'Super Admin' };
      setIsAdminAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem('2m_admin_authenticated', 'true');
      localStorage.setItem('2m_admin_user', JSON.stringify(user));
      showToast('Welcome back, Admin! Access Granted.');
      return { success: true };
    }

    showToast('Invalid credentials. Access Denied.', 'error');
    return { success: false, error: 'Invalid username/email or password.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setIsAdminMode(false);
    localStorage.removeItem('2m_admin_authenticated');
    localStorage.removeItem('2m_admin_user');
    showToast('Admin Session Terminated.');
    setCurrentView('home');
  };

  // Pre-selected parameters for booking wizard
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState(null);

  // Core Data States
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  // Cursor State
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  // Color Theme State (Bright / Light vs Dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('2m_theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('2m_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Bright'} Mode`);
      return nextTheme;
    });
  };

  // Load initial data
  const loadData = async () => {
    setLoading(true);
    try {
      const [b, c, p, s, pk, e, bd] = await Promise.all([
        dataService.getBookings(),
        dataService.getCustomers(),
        dataService.getPortfolio(),
        dataService.getServices(),
        dataService.getPackages(),
        dataService.getEnquiries(),
        dataService.getBlockedDates()
      ]);
      setBookings(b);
      setCustomers(c);
      setPortfolio(p);
      setServices(s);
      setPackages(pk);
      setEnquiries(e);
      setBlockedDates(bd);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Helper actions
  const navigateTo = (view, extra = {}) => {
    if (view === 'admin') {
      setIsAdminMode(true);
      if (extra.tab) setAdminTab(extra.tab);
    } else {
      setIsAdminMode(false);
    }
    if (extra.service) setSelectedServiceForBooking(extra.service);
    if (extra.package) setSelectedPackageForBooking(extra.package);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Data mutation handlers
  const createBooking = async (bookingData) => {
    const newBk = await dataService.createBooking(bookingData);
    const updated = await dataService.getBookings();
    const updatedCust = await dataService.getCustomers();
    setBookings(updated);
    setCustomers(updatedCust);
    showToast(`Session reserved! Ref: ${newBk.refNumber}`);
    return newBk;
  };

  const updateBookingStatus = async (id, status) => {
    const updated = await dataService.updateBookingStatus(id, status);
    setBookings(updated);
    showToast(`Booking status updated to ${status}`);
  };

  const createEnquiry = async (enquiryData) => {
    const newEnq = await dataService.createEnquiry(enquiryData);
    const updated = await dataService.getEnquiries();
    setEnquiries(updated);
    showToast('Your message has been sent successfully.');
    return newEnq;
  };

  const updateEnquiryStatus = async (id, status) => {
    const updated = await dataService.updateEnquiryStatus(id, status);
    setEnquiries(updated);
    showToast(`Enquiry marked as ${status}`);
  };

  const toggleBlockDate = async (dateStr) => {
    const updated = await dataService.toggleBlockDate(dateStr);
    setBlockedDates(updated);
    showToast(updated.includes(dateStr) ? `Blocked ${dateStr}` : `Unblocked ${dateStr}`);
  };

  const addPortfolioItem = async (item) => {
    await dataService.addPortfolioItem(item);
    const updated = await dataService.getPortfolio();
    setPortfolio(updated);
    showToast('Portfolio item added.');
  };

  const deletePortfolioItem = async (id) => {
    const updated = await dataService.deletePortfolioItem(id);
    setPortfolio(updated);
    showToast('Portfolio item removed.');
  };

  const toggleFeaturedPortfolio = async (id) => {
    const updated = await dataService.toggleFeaturedPortfolio(id);
    setPortfolio(updated);
    showToast('Portfolio status updated.');
  };

  const updatePackage = async (pkg) => {
    const updated = await dataService.updatePackage(pkg);
    setPackages(updated);
    showToast('Package updated.');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        isAdminMode,
        setIsAdminMode,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin,
        navigateTo,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        selectedPackageForBooking,
        setSelectedPackageForBooking,
        bookings,
        customers,
        portfolio,
        services,
        packages,
        enquiries,
        blockedDates,
        loading,
        toast,
        showToast,
        cursorText,
        setCursorText,
        cursorVariant,
        setCursorVariant,
        theme,
        setTheme,
        toggleTheme,
        createBooking,
        updateBookingStatus,
        createEnquiry,
        updateEnquiryStatus,
        toggleBlockDate,
        addPortfolioItem,
        deletePortfolioItem,
        toggleFeaturedPortfolio,
        updatePackage,
        reloadAll: loadData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
