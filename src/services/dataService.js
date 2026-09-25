import {
  INITIAL_SERVICES,
  INITIAL_PACKAGES,
  INITIAL_PORTFOLIO,
  INITIAL_BOOKINGS,
  INITIAL_CUSTOMERS,
  INITIAL_ENQUIRIES,
  INITIAL_BLOCKED_DATES,
  TESTIMONIALS,
  INITIAL_SITE_SETTINGS
} from '../data/mockData';

// Helper to load or store in LocalStorage with fallback
const getStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(`2mp_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn('LocalStorage error:', e);
    return fallback;
  }
};

const setStorage = (key, value) => {
  try {
    localStorage.setItem(`2mp_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
};

/**
 * Data Service Abstraction Layer
 * Structured so Supabase client methods can be swapped into these async functions seamlessly.
 */
import { getWhatsAppLink, ADMIN_WHATSAPP_NUMBER } from './whatsappService';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const dataService = {
  // === SITE SETTINGS ===
  async getSiteSettings() {
    return getStorage('site_settings', INITIAL_SITE_SETTINGS);
  },

  async updateSiteSettings(newSettings) {
    const current = getStorage('site_settings', INITIAL_SITE_SETTINGS);
    const updated = { ...current, ...newSettings };
    setStorage('site_settings', updated);
    return updated;
  },

  // === TESTIMONIALS ===
  async getTestimonials() {
    return getStorage('testimonials', TESTIMONIALS);
  },

  async addTestimonial(item) {
    const tests = getStorage('testimonials', TESTIMONIALS);
    const newItem = { id: `test-${Date.now()}`, ...item };
    const updated = [newItem, ...tests];
    setStorage('testimonials', updated);
    return updated;
  },

  async updateTestimonial(item) {
    const tests = getStorage('testimonials', TESTIMONIALS);
    const updated = tests.map(t => t.id === item.id ? item : t);
    setStorage('testimonials', updated);
    return updated;
  },

  async deleteTestimonial(id) {
    const tests = getStorage('testimonials', TESTIMONIALS);
    const updated = tests.filter(t => t.id !== id);
    setStorage('testimonials', updated);
    return updated;
  },

  // === BOOKINGS ===
  async getBookings() {
    try {
      const res = await fetch(`${BACKEND_URL}/bookings`);
      if (res.ok) {
        const data = await res.json();
        if (data.bookings && data.bookings.length > 0) {
          return data.bookings;
        }
      }
    } catch (e) {
      console.log('Backend server offline, falling back to storage:', e.message);
    }
    return getStorage('bookings', INITIAL_BOOKINGS);
  },

  async createBooking(bookingData) {
    const bookings = getStorage('bookings', INITIAL_BOOKINGS);
    
    // Generate reference ID: 2MP-2026-XXXXX
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const refNumber = `2MP-2026-${randomNum}`;

    let newBooking = {
      id: `bk-${Date.now()}`,
      refNumber,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...bookingData
    };

    // Try posting to Backend API Server
    try {
      const res = await fetch(`${BACKEND_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.booking) {
          newBooking = result.booking;
        }
        if (result.whatsappUrl) {
          newBooking.whatsappUrl = result.whatsappUrl;
        }
      }
    } catch (e) {
      console.log('Backend server offline, saving locally:', e.message);
    }

    if (!newBooking.whatsappUrl) {
      newBooking.whatsappUrl = getWhatsAppLink(newBooking, ADMIN_WHATSAPP_NUMBER);
    }

    const updated = [newBooking, ...bookings];
    setStorage('bookings', updated);

    // Automatically record or update customer
    await this.recordCustomerFromBooking(newBooking);

    return newBooking;
  },

  async updateBookingStatus(id, newStatus) {
    const bookings = getStorage('bookings', INITIAL_BOOKINGS);
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setStorage('bookings', updated);
    return updated;
  },

  // === CUSTOMERS ===
  async getCustomers() {
    return getStorage('customers', INITIAL_CUSTOMERS);
  },

  async recordCustomerFromBooking(booking) {
    const customers = getStorage('customers', INITIAL_CUSTOMERS);
    const existingIndex = customers.findIndex(c => c.email.toLowerCase() === booking.email.toLowerCase());
    
    let updated;
    if (existingIndex >= 0) {
      updated = [...customers];
      updated[existingIndex] = {
        ...updated[existingIndex],
        bookingsCount: updated[existingIndex].bookingsCount + 1,
        lastBookingDate: booking.eventDate,
        totalSpent: updated[existingIndex].totalSpent + (booking.price || 0)
      };
    } else {
      const newCustomer = {
        id: `cust-${Date.now()}`,
        name: booking.customerName,
        email: booking.email,
        phone: booking.phone,
        bookingsCount: 1,
        lastBookingDate: booking.eventDate,
        totalSpent: booking.price || 0
      };
      updated = [newCustomer, ...customers];
    }
    setStorage('customers', updated);
  },

  // === PORTFOLIO ===
  async getPortfolio() {
    return getStorage('portfolio', INITIAL_PORTFOLIO);
  },

  async addPortfolioItem(item) {
    const portfolio = getStorage('portfolio', INITIAL_PORTFOLIO);
    const newItem = {
      id: `port-${Date.now()}`,
      featured: false,
      aspect: 'tall',
      ...item
    };
    const updated = [newItem, ...portfolio];
    setStorage('portfolio', updated);
    return newItem;
  },

  async deletePortfolioItem(id) {
    const portfolio = getStorage('portfolio', INITIAL_PORTFOLIO);
    const updated = portfolio.filter(item => item.id !== id);
    setStorage('portfolio', updated);
    return updated;
  },

  async toggleFeaturedPortfolio(id) {
    const portfolio = getStorage('portfolio', INITIAL_PORTFOLIO);
    const updated = portfolio.map(item => item.id === id ? { ...item, featured: !item.featured } : item);
    setStorage('portfolio', updated);
    return updated;
  },

  // === SERVICES & PACKAGES ===
  async getServices() {
    return getStorage('services', INITIAL_SERVICES);
  },

  async addService(serviceData) {
    const srvs = getStorage('services', INITIAL_SERVICES);
    const newSrv = { id: `srv-${Date.now()}`, ...serviceData };
    const updated = [...srvs, newSrv];
    setStorage('services', updated);
    return updated;
  },

  async updateService(updatedSrv) {
    const srvs = getStorage('services', INITIAL_SERVICES);
    const updated = srvs.map(s => s.id === updatedSrv.id ? updatedSrv : s);
    setStorage('services', updated);
    return updated;
  },

  async deleteService(id) {
    const srvs = getStorage('services', INITIAL_SERVICES);
    const updated = srvs.filter(s => s.id !== id);
    setStorage('services', updated);
    return updated;
  },

  async getPackages() {
    return getStorage('packages', INITIAL_PACKAGES);
  },

  async addPackage(packageData) {
    const pkgs = getStorage('packages', INITIAL_PACKAGES);
    const newPkg = { id: `pkg-${Date.now()}`, ...packageData };
    const updated = [...pkgs, newPkg];
    setStorage('packages', updated);
    return updated;
  },

  async updatePackage(updatedPkg) {
    const pkgs = getStorage('packages', INITIAL_PACKAGES);
    const updated = pkgs.map(p => p.id === updatedPkg.id ? updatedPkg : p);
    setStorage('packages', updated);
    return updated;
  },

  async deletePackage(id) {
    const pkgs = getStorage('packages', INITIAL_PACKAGES);
    const updated = pkgs.filter(p => p.id !== id);
    setStorage('packages', updated);
    return updated;
  },

  // === ENQUIRIES ===
  async getEnquiries() {
    return getStorage('enquiries', INITIAL_ENQUIRIES);
  },

  async createEnquiry(enquiryData) {
    const enquiries = getStorage('enquiries', INITIAL_ENQUIRIES);
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      status: 'New',
      date: new Date().toISOString(),
      ...enquiryData
    };
    const updated = [newEnquiry, ...enquiries];
    setStorage('enquiries', updated);
    return newEnquiry;
  },

  async updateEnquiryStatus(id, status) {
    const enquiries = getStorage('enquiries', INITIAL_ENQUIRIES);
    const updated = enquiries.map(e => e.id === id ? { ...e, status } : e);
    setStorage('enquiries', updated);
    return updated;
  },

  // === AVAILABILITY & BLOCKED DATES ===
  async getBlockedDates() {
    return getStorage('blocked_dates', INITIAL_BLOCKED_DATES);
  },

  async toggleBlockDate(dateStr) {
    const blocked = getStorage('blocked_dates', INITIAL_BLOCKED_DATES);
    let updated;
    if (blocked.includes(dateStr)) {
      updated = blocked.filter(d => d !== dateStr);
    } else {
      updated = [...blocked, dateStr];
    }
    setStorage('blocked_dates', updated);
    return updated;
  }
};

