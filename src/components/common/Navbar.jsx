// Navbar Component - Pratheep Photography Studio
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Menu, X, ShieldCheck, ArrowRight, Camera, Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  const { currentView, navigateTo, setCursorText, setCursorVariant, isAdminMode, theme, toggleTheme, siteSettings, isAdminAuthenticated } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', view: 'home' },
    { name: 'PORTFOLIO', view: 'portfolio' },
    { name: 'SERVICES', view: 'services' },
    { name: 'PACKAGES', view: 'packages' },
    { name: 'ABOUT', view: 'about' },
    { name: 'CONTACT', view: 'contact' },
  ];

  const handleNavClick = (view) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  const brandName = siteSettings?.brandName || '2M PICTURES';
  const isDarkHeader = theme === 'dark' || (currentView === 'home' && !scrolled);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isAdminAuthenticated ? 'top-10' : 'top-0'
        } ${
          scrolled
            ? 'py-3 glass-panel shadow-editorial border-b border-ivory-300/60 dark:border-obsidian-800'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            onMouseEnter={() => { setCursorText('2M'); setCursorVariant('hover'); }}
            onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
            className="group text-left focus:outline-none"
          >
            <span className={`font-serif text-2xl md:text-3xl font-bold tracking-wider transition-colors ${
              isDarkHeader ? 'text-ivory-50 group-hover:text-champagne-400' : 'text-obsidian-900 group-hover:text-champagne-600'
            }`}>
              {brandName}
            </span>
            <span className={`block text-[9px] uppercase tracking-[0.35em] font-mono -mt-1 ${
              isDarkHeader ? 'text-ivory-200/60' : 'text-obsidian-800/60'
            }`}>
              Fine Art Photography
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentView === link.view && !isAdminMode;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.view)}
                  onMouseEnter={() => { setCursorText(''); setCursorVariant('hover'); }}
                  onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors py-1 ${
                    isActive
                      ? isDarkHeader
                        ? 'text-champagne-400 font-bold'
                        : 'text-champagne-600 font-semibold'
                      : isDarkHeader
                        ? 'text-ivory-100/90 hover:text-white font-medium'
                        : 'text-obsidian-900/80 hover:text-obsidian-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isDarkHeader ? 'bg-champagne-400' : 'bg-champagne-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => { setCursorText(theme === 'dark' ? 'LIGHT' : 'DARK'); setCursorVariant('hover'); }}
              onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
              className={`p-2 rounded-full border transition-all duration-300 backdrop-blur-md flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${
                isDarkHeader
                  ? 'border-obsidian-800 bg-obsidian-900/80 text-ivory-100 hover:border-champagne-500 hover:text-champagne-400'
                  : 'border-ivory-300 bg-white/70 text-obsidian-900 hover:border-champagne-500 hover:text-champagne-600'
              }`}
              title={theme === 'dark' ? 'Switch to Bright Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme Mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-champagne-400" />
                  <span className="text-[10px] tracking-wider uppercase text-champagne-400 font-semibold">BRIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-obsidian-900" />
                  <span className="text-[10px] tracking-wider uppercase text-obsidian-800 font-semibold">DARK</span>
                </>
              )}
            </button>

            {/* Admin View Toggle */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-2 text-[11px] uppercase tracking-wider px-3 py-2 rounded border transition-colors ${
                isAdminMode
                  ? 'bg-obsidian-900 text-champagne-400 border-champagne-500'
                  : isDarkHeader
                    ? 'text-ivory-100 border-obsidian-700 hover:border-champagne-400 hover:text-white bg-obsidian-900/40'
                    : 'text-obsidian-800/70 border-ivory-300 hover:border-obsidian-900 hover:text-obsidian-900'
              }`}
              title="Toggle Studio Admin System"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
              <span>Admin Portal</span>
            </button>

            {/* BOOK NOW CTA Button */}
            <button
              onClick={() => handleNavClick('booking')}
              onMouseEnter={() => { setCursorText('BOOK'); setCursorVariant('hover'); }}
              onMouseLeave={() => { setCursorText(''); setCursorVariant('default'); }}
              className="relative group overflow-hidden bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] rounded border border-champagne-500 transition-all shadow-gold-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                BOOK NOW
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 focus:outline-none transition-colors ${
                isDarkHeader ? 'text-ivory-100 hover:text-champagne-400' : 'text-obsidian-900 hover:text-champagne-600'
              }`}
              title={theme === 'dark' ? 'Switch to Bright Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-champagne-400" /> : <Moon className="w-5 h-5 text-obsidian-900" />}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 transition-colors ${
                isDarkHeader ? 'text-ivory-100 hover:text-champagne-400' : 'text-obsidian-900 hover:text-champagne-600'
              }`}
              title="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5 text-champagne-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors ${
                isDarkHeader ? 'text-ivory-100 hover:text-champagne-400' : 'text-obsidian-900 hover:text-champagne-600'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 ${isAdminAuthenticated ? 'top-[112px]' : 'top-[72px]'} z-30 bg-studio-bg/95 backdrop-blur-xl flex flex-col justify-between p-8 border-t border-ivory-300 lg:hidden`}
          >
            <div className="space-y-6 pt-4">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleNavClick(link.view)}
                  className={`block w-full text-left font-serif text-3xl tracking-wide transition-colors ${
                    currentView === link.view ? 'text-champagne-600 italic' : 'text-obsidian-900'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <div className="space-y-4 pb-8 border-t border-ivory-300 pt-6">
              <button
                onClick={toggleTheme}
                className="w-full py-3.5 border border-ivory-300 text-obsidian-900 text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-champagne-400" /> : <Moon className="w-4 h-4 text-obsidian-900" />}
                <span>{theme === 'dark' ? 'SWITCH TO BRIGHT THEME' : 'SWITCH TO DARK THEME'}</span>
              </button>

              <button
                onClick={() => handleNavClick('booking')}
                className="w-full py-4 bg-obsidian-900 text-ivory-50 text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4 text-champagne-400" />
                <span>BOOK YOUR SESSION</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-3 border border-obsidian-900 text-obsidian-900 text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>GO TO ADMIN DASHBOARD</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
