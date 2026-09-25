import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { sendEnquiryToWhatsApp } from '../../services/whatsappService';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Instagram, Facebook, Twitter } from 'lucide-react';

export const ContactForm = () => {
  const { createEnquiry } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required.';
    if (!formData.message.trim()) errs.message = 'Message cannot be empty.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await createEnquiry(formData);
      sendEnquiryToWhatsApp(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-studio-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-obsidian-900 mt-2">
            Let's Tell Your Story
          </h2>
          <p className="mt-3 text-sm text-obsidian-800/70 font-light">
            Have a question about availability, custom destination shoots, or bespoke package additions? Drop us a line below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Studio Contact Information */}
          <div className="lg:col-span-2 bg-obsidian-900 text-ivory-50 rounded-xl p-8 md:p-10 border border-champagne-500/30 shadow-2xl space-y-8">
            <div>
              <h3 className="font-serif text-3xl font-bold tracking-wide">
                2M PICTURES
              </h3>
              <p className="text-champagne-400 font-serif italic text-sm mt-1">
                Fine Art Photography Studio
              </p>
            </div>

            <div className="space-y-6 text-xs font-mono">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory-200/50 uppercase block text-[10px]">Studio Location</span>
                  <span className="text-sm font-sans font-light text-white block mt-0.5">
                    120 Fine Art Avenue, Suite 400<br />New York, NY 10012
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory-200/50 uppercase block text-[10px]">Direct Phone</span>
                  <span className="text-sm font-sans font-light text-white block mt-0.5">
                    +1 (800) 2M-STUDIO / +1 (555) 019-2834
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory-200/50 uppercase block text-[10px]">Electronic Mail</span>
                  <span className="text-sm font-sans font-light text-white block mt-0.5">
                    hello@2mpictures.com
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory-200/50 uppercase block text-[10px]">Business Hours</span>
                  <span className="text-sm font-sans font-light text-white block mt-0.5">
                    Mon - Sat: 09:00 AM - 07:00 PM<br />Sun: Private Appointments Only
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-obsidian-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ivory-200/50 block mb-3">
                SOCIAL MEDIA
              </span>
              <div className="flex gap-3">
                <a href="#inst" className="p-3 bg-obsidian-950 border border-obsidian-800 rounded text-champagne-400 hover:text-white hover:border-champagne-400 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#fb" className="p-3 bg-obsidian-950 border border-obsidian-800 rounded text-champagne-400 hover:text-white hover:border-champagne-400 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#tw" className="p-3 bg-obsidian-950 border border-obsidian-800 rounded text-champagne-400 hover:text-white hover:border-champagne-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-3 bg-studio-card border border-studio-border rounded-xl p-8 md:p-10 shadow-editorial">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <CheckCircle2 className="w-16 h-16 text-champagne-600 mx-auto" />
                <h3 className="font-serif text-3xl font-bold text-obsidian-900">
                  Enquiry Received
                </h3>
                <p className="text-sm text-obsidian-800/70 max-w-md mx-auto">
                  Thank you for reaching out to 2M PICTURES. Our studio manager will respond to your message within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-obsidian-900 text-ivory-50 text-xs font-mono uppercase tracking-widest rounded"
                >
                  SEND ANOTHER ENQUIRY
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-obsidian-900">
                  Send an Enquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Claire Dupont"
                      className="w-full px-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                    />
                    {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="claire@example.com"
                      className="w-full px-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                    />
                    {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-obsidian-900 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your event, location, dates, or vision..."
                    className="w-full p-4 bg-ivory-50 border border-ivory-300 rounded text-sm focus:outline-none focus:border-champagne-600"
                  />
                  {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-champagne-500 text-obsidian-950 font-semibold text-xs uppercase tracking-[0.2em] rounded hover:bg-champagne-400 transition-colors shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'SENDING...' : 'TRANSMIT ENQUIRY'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
