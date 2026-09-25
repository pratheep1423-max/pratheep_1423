import React from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Shield } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, siteSettings } = useApp();

  const brandName = siteSettings?.brandName || '2M PICTURES';
  const tagline = siteSettings?.tagline || 'Stories Worth Remembering.';
  const address = siteSettings?.address || '120 Fine Art Avenue, Suite 400\nNew York, NY 10012';
  const phone = siteSettings?.phone || '+1 (800) 2M-STUDIO';
  const email = siteSettings?.email || 'admin@2mpictures.com';

  return (
    <footer className="bg-obsidian-900 text-ivory-100 pt-20 pb-12 border-t border-obsidian-800 relative overflow-hidden film-grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-obsidian-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-wider text-ivory-50">
                {brandName}
              </h3>
              <p className="text-champagne-400 font-serif italic text-lg mt-1">
                "{tagline}"
              </p>
            </div>
            <p className="text-ivory-200/70 text-sm leading-relaxed max-w-sm font-light">
              Fine art photography studio crafting timeless visual stories for weddings, pre-weddings, portraits, outdoor, events, and fashion.
            </p>
            <div className="flex items-center gap-4 text-champagne-400">
              <a href="#instagram" className="p-2 border border-obsidian-800 rounded hover:border-champagne-500 hover:text-ivory-50 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="p-2 border border-obsidian-800 rounded hover:border-champagne-500 hover:text-ivory-50 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2 border border-obsidian-800 rounded hover:border-champagne-500 hover:text-ivory-50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne-400">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-200/70 font-light">
              <li><button onClick={() => navigateTo('home')} className="hover:text-champagne-300 transition-colors">Home</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-champagne-300 transition-colors">Portfolio</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-champagne-300 transition-colors">Services & Pricing</button></li>
              <li><button onClick={() => navigateTo('packages')} className="hover:text-champagne-300 transition-colors">Packages</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-champagne-300 transition-colors">About Studio</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-champagne-300 transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne-400">
              CATEGORIES
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-200/70 font-light">
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-champagne-300 transition-colors">Weddings</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-champagne-300 transition-colors">Pre-Wedding</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-champagne-300 transition-colors">Birthdays</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-champagne-300 transition-colors">Portraits</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-champagne-300 transition-colors">Outdoor</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-champagne-300 transition-colors">Events & Fashion</button></li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne-400">
              STUDIO
            </h4>
            <ul className="space-y-3 text-xs text-ivory-200/70 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-champagne-500 shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-champagne-500 shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory-200/50">
          <p>© {new Date().getFullYear()} 2M PICTURES Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1.5 hover:text-champagne-400 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </button>
            <span className="hidden md:inline">•</span>
            <span>Terms of Service</span>
            <span className="hidden md:inline">•</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
