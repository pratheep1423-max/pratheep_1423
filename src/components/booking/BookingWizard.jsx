import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { CalendarView } from './CalendarView';
import { sendBookingToWhatsApp } from '../../services/whatsappService';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Users,
  FileText,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Camera,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export const BookingWizard = () => {
  const {
    services,
    packages,
    selectedServiceForBooking,
    selectedPackageForBooking,
    createBooking,
    navigateTo,
    showToast
  } = useApp();

  const [step, setStep] = useState(1);

  // Form selections
  const [chosenService, setChosenService] = useState(selectedServiceForBooking || services[0] || null);
  const [chosenPackage, setChosenPackage] = useState(selectedPackageForBooking || packages[1] || null);
  const [chosenDate, setChosenDate] = useState('2026-10-20');
  const [chosenTime, setChosenTime] = useState('04:30 PM (Golden Hour)');

  // Customer Form Data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Weddings',
    eventLocation: '',
    peopleCount: '2',
    requirements: ''
  });

  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedServiceForBooking) setChosenService(selectedServiceForBooking);
    if (selectedPackageForBooking) setChosenPackage(selectedPackageForBooking);
  }, [selectedServiceForBooking, selectedPackageForBooking]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep5 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.eventLocation.trim()) errs.eventLocation = 'Event location is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 5) {
      if (!validateStep5()) return;
      submitBooking();
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const submitBooking = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        serviceId: chosenService?.id,
        serviceName: chosenService?.name || 'Custom Photography Session',
        packageId: chosenPackage?.id,
        packageName: chosenPackage?.name || 'Standard Tier',
        price: chosenPackage?.price || 2800,
        eventDate: chosenDate,
        eventTime: chosenTime,
        eventType: formData.eventType || chosenService?.category || 'General',
        location: formData.eventLocation,
        peopleCount: parseInt(formData.peopleCount) || 1,
        requirements: formData.requirements
      };

      const result = await createBooking(payload);
      setConfirmedBooking(result);
      setStep(6);
      // Trigger WhatsApp alert to +91 8248149082
      setTimeout(() => {
        sendBookingToWhatsApp(result);
      }, 600);
    } catch (err) {
      showToast('Failed to reserve session. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Service' },
    { num: 2, title: 'Package' },
    { num: 3, title: 'Date' },
    { num: 4, title: 'Time' },
    { num: 5, title: 'Details' },
    { num: 6, title: 'Confirmed' }
  ];

  return (
    <section className="py-20 bg-studio-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
            RESERVATION PORTAL
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-obsidian-900 mt-2">
            Book Your Photography Session
          </h2>
          <p className="mt-3 text-sm text-obsidian-800/70 font-light">
            Reserve your dates in our studio calendar in six simple steps.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-ivory-300 z-0" />
            {stepsList.map((s) => {
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      isCurrent
                        ? 'bg-obsidian-900 text-champagne-400 border-2 border-champagne-500 shadow-md ring-4 ring-champagne-500/20'
                        : isDone
                        ? 'bg-champagne-500 text-obsidian-950'
                        : 'bg-studio-card text-obsidian-800/50 border border-ivory-300'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`text-[10px] uppercase font-mono tracking-wider hidden sm:block ${
                    isCurrent ? 'text-obsidian-900 font-bold' : 'text-obsidian-800/60'
                  }`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Wizard Card */}
          <div className="lg:col-span-2 bg-studio-card border border-studio-border rounded-xl p-6 md:p-10 shadow-editorial">
            <AnimatePresence mode="wait">
              {/* STEP 1: Select Service */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl font-bold text-obsidian-900">
                    Step 1: Select Your Photography Service
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((srv) => {
                      const isChosen = chosenService?.id === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setChosenService(srv)}
                          className={`p-5 rounded-lg border cursor-pointer transition-all ${
                            isChosen
                              ? 'bg-obsidian-900 text-ivory-50 border-champagne-500 shadow-md'
                              : 'bg-ivory-50 text-obsidian-900 border-ivory-300 hover:border-obsidian-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400">
                              {srv.category}
                            </span>
                            {isChosen && <CheckCircle2 className="w-5 h-5 text-champagne-400" />}
                          </div>
                          <h4 className="font-serif text-xl font-bold">{srv.name}</h4>
                          <p className="mt-2 text-xs opacity-80 line-clamp-2">{srv.description}</p>
                          <div className="mt-4 text-xs font-mono font-bold text-champagne-400">
                            Starting from ${srv.startingPrice}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Select Package */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl font-bold text-obsidian-900">
                    Step 2: Select Package Tier
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {packages.map((pkg) => {
                      const isChosen = chosenPackage?.id === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setChosenPackage(pkg)}
                          className={`p-6 rounded-lg border cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                            isChosen
                              ? 'bg-obsidian-900 text-ivory-50 border-champagne-500 shadow-md'
                              : 'bg-ivory-50 text-obsidian-900 border-ivory-300 hover:border-obsidian-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif text-2xl font-bold">{pkg.name}</h4>
                              {pkg.featured && (
                                <span className="px-2 py-0.5 bg-champagne-500 text-obsidian-950 text-[9px] font-mono uppercase font-bold rounded">
                                  FEATURED
                                </span>
                              )}
                            </div>
                            <p className="text-xs opacity-80 mt-1 font-mono">
                              {pkg.duration} • {pkg.photographers} • {pkg.photosCount}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-serif text-3xl font-bold text-champagne-400">
                              ${pkg.price.toLocaleString()}
                            </span>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                              isChosen ? 'border-champagne-400 bg-champagne-500 text-obsidian-950' : 'border-ivory-400'
                            }`}>
                              {isChosen && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Select Date */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl font-bold text-obsidian-900">
                    Step 3: Select Event Date
                  </h3>
                  <CalendarView
                    selectedDate={chosenDate}
                    onSelectDate={(date) => setChosenDate(date)}
                  />
                </motion.div>
              )}

              {/* STEP 4: Select Time */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl font-bold text-obsidian-900">
                    Step 4: Select Preferred Time Slot
                  </h3>
                  <CalendarView
                    selectedDate={chosenDate}
                    onSelectDate={setChosenDate}
                    selectedTime={chosenTime}
                    onSelectTime={setChosenTime}
                  />
                </motion.div>
              )}

              {/* STEP 5: Customer Details Form */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl font-bold text-obsidian-900">
                    Step 5: Customer Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3.5 text-obsidian-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Victoria Sterling"
                          className="w-full pl-10 pr-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                        />
                      </div>
                      {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3.5 text-obsidian-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="victoria@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                        />
                      </div>
                      {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3.5 text-obsidian-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 234-5678"
                          className="w-full pl-10 pr-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Event Type */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                        Event Type
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                      >
                        <option value="Weddings">Weddings</option>
                        <option value="Pre-Wedding">Pre-Wedding</option>
                        <option value="Birthdays">Birthdays</option>
                        <option value="Portraits">Portraits</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Events">Events</option>
                        <option value="Fashion">Fashion</option>
                      </select>
                    </div>

                    {/* Event Location */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                        Event Location / Venue *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-obsidian-400" />
                        <input
                          type="text"
                          name="eventLocation"
                          value={formData.eventLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. Plaza Hotel, 5th Ave, New York"
                          className="w-full pl-10 pr-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                        />
                      </div>
                      {errors.eventLocation && <p className="text-xs text-rose-600 mt-1">{errors.eventLocation}</p>}
                    </div>

                    {/* Number of People */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                        Number of People
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-3 top-3.5 text-obsidian-400" />
                        <input
                          type="number"
                          name="peopleCount"
                          value={formData.peopleCount}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full pl-10 pr-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                        />
                      </div>
                    </div>

                    {/* Additional Requirements */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                        Additional Requirements & Notes
                      </label>
                      <textarea
                        name="requirements"
                        rows="3"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        placeholder="Any special requests, drone interest, or lighting preferences..."
                        className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Confirmation Screen */}
              {step === 6 && confirmedBooking && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-gold-glow">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-bold">
                      RESERVATION COMPLETE
                    </span>
                    <h3 className="font-serif text-4xl font-bold text-obsidian-900 mt-1">
                      Your Session Is Reserved.
                    </h3>
                  </div>

                  <div className="inline-block p-4 bg-obsidian-900 text-ivory-50 rounded-lg border border-champagne-500/50 text-center font-mono">
                    <span className="text-xs text-champagne-400 block uppercase tracking-widest">
                      BOOKING REFERENCE NUMBER
                    </span>
                    <span className="text-2xl font-bold tracking-wider text-white">
                      {confirmedBooking.refNumber}
                    </span>
                  </div>

                  <p className="text-sm text-obsidian-800/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-obsidian-900">{confirmedBooking.customerName}</strong>. A confirmation email and calendar request has been dispatched to <strong className="text-obsidian-900">{confirmedBooking.email}</strong>.
                  </p>

                  {/* WhatsApp Quick Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => sendBookingToWhatsApp(confirmedBooking)}
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-[0.15em] rounded-lg shadow-lg flex items-center justify-center gap-2 mx-auto transition-all"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>SEND DETAILS VIA WHATSAPP (+91 8248149082)</span>
                    </button>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => navigateTo('home')}
                      className="px-6 py-3 bg-obsidian-900 text-ivory-50 text-xs font-semibold uppercase tracking-[0.2em] rounded hover:bg-champagne-500 hover:text-obsidian-950 transition-all"
                    >
                      RETURN TO HOME
                    </button>
                    <button
                      onClick={() => navigateTo('admin', { tab: 'bookings' })}
                      className="px-6 py-3 border border-obsidian-900 text-obsidian-900 text-xs font-semibold uppercase tracking-[0.2em] rounded hover:bg-obsidian-900 hover:text-ivory-50 transition-all"
                    >
                      VIEW IN ADMIN DASHBOARD
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step < 6 && (
              <div className="mt-10 pt-6 border-t border-ivory-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded border ${
                    step === 1
                      ? 'opacity-40 border-transparent cursor-not-allowed'
                      : 'border-ivory-300 hover:border-obsidian-900 text-obsidian-900'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-champagne-500 text-obsidian-950 text-xs font-semibold uppercase tracking-[0.2em] rounded hover:bg-champagne-400 transition-colors shadow-gold-glow flex items-center gap-2"
                >
                  <span>{step === 5 ? (isSubmitting ? 'RESERVING...' : 'CONFIRM RESERVATION') : 'CONTINUE STEP'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Dynamic Booking Summary Sidebar */}
          <div className="bg-obsidian-900 text-ivory-50 rounded-xl p-6 md:p-8 border border-champagne-500/30 flex flex-col justify-between shadow-2xl h-fit">
            <div>
              <div className="flex items-center gap-2 text-champagne-400 font-mono text-xs uppercase tracking-[0.25em] mb-4 pb-3 border-b border-obsidian-800">
                <Camera className="w-4 h-4" />
                <span>DYNAMIC SUMMARY</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-ivory-200/50 uppercase block">Selected Service</span>
                  <span className="font-serif text-xl font-bold text-white block mt-0.5">
                    {chosenService?.name || 'Not selected'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-ivory-200/50 uppercase block">Package Tier</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-serif text-lg text-champagne-300">
                      {chosenPackage?.name || 'Not selected'}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      ${chosenPackage?.price?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-ivory-200/50 uppercase block">Date & Time</span>
                  <div className="text-xs font-mono text-ivory-200/80 mt-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-champagne-400" />
                      <span>{chosenDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-champagne-400" />
                      <span>{chosenTime}</span>
                    </div>
                  </div>
                </div>

                {formData.fullName && (
                  <div className="pt-3 border-t border-obsidian-800">
                    <span className="text-[10px] font-mono text-ivory-200/50 uppercase block">Reserved For</span>
                    <span className="text-xs font-semibold text-white block mt-0.5">{formData.fullName}</span>
                    <span className="text-[11px] text-ivory-200/60 block">{formData.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-obsidian-800 space-y-3">
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="text-ivory-200/70">Estimated Total:</span>
                <span className="text-2xl font-serif font-bold text-champagne-400">
                  ${chosenPackage?.price?.toLocaleString() || 0}
                </span>
              </div>
              <p className="text-[10px] text-ivory-200/50 font-mono leading-relaxed">
                * Zero payment required upfront. Full session terms will be sent upon confirmation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
