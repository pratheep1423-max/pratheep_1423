import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Save, Database, CheckCircle2, Sparkles, Image as ImageIcon, MessageSquare, Plus, Trash2 } from 'lucide-react';

export const SettingsManager = () => {
  const { siteSettings, updateSiteSettings, testimonials, addTestimonial, deleteTestimonial, showToast } = useApp();

  const [form, setForm] = useState({
    brandName: '',
    tagline: '',
    heroBadge: '',
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    heroCtaText: '',
    aboutSubtitle: '',
    aboutTitle: '',
    aboutDescription: '',
    directorName: '',
    directorRole: '',
    directorImage: '',
    bts1: '',
    bts2: '',
    bts3: '',
    bts4: '',
    beforeAfterOriginal: '',
    beforeAfterEdited: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: ''
  });

  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    event: '',
    quote: ''
  });

  useEffect(() => {
    if (siteSettings) {
      setForm({
        brandName: siteSettings.brandName || '2M PICTURES',
        tagline: siteSettings.tagline || 'Stories Worth Remembering.',
        heroBadge: siteSettings.heroBadge || 'FINE ART PHOTOGRAPHY STUDIO',
        heroTitle: siteSettings.heroTitle || 'Stories Worth Remembering.',
        heroSubtitle: siteSettings.heroSubtitle || 'We capture real moments and transform them into timeless visual stories.',
        heroImage: siteSettings.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90',
        heroCtaText: siteSettings.heroCtaText || 'BOOK YOUR SESSION',
        aboutSubtitle: siteSettings.aboutSubtitle || '02 / ABOUT THE STUDIO',
        aboutTitle: siteSettings.aboutTitle || "We don't take pictures. We craft heirlooms.",
        aboutDescription: siteSettings.aboutDescription || 'Founded in 2020, 2M PICTURES was built on a simple promise...',
        directorName: siteSettings.directorName || 'Pratheep',
        directorRole: siteSettings.directorRole || 'Creative Director & Founder',
        directorImage: siteSettings.directorImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        bts1: siteSettings.bts1 || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
        bts2: siteSettings.bts2 || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
        bts3: siteSettings.bts3 || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
        bts4: siteSettings.bts4 || 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
        beforeAfterOriginal: siteSettings.beforeAfterOriginal || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=50&sat=-40&con=-20',
        beforeAfterEdited: siteSettings.beforeAfterEdited || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        email: siteSettings.email || 'admin@2mpictures.com',
        phone: siteSettings.phone || '+91 9876543210',
        whatsapp: siteSettings.whatsapp || '919876543210',
        address: siteSettings.address || 'Main Studio Avenue, Luxury District'
      });
    }
  }, [siteSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await updateSiteSettings(form);
  };

  const handleAddTestimonialSubmit = (e) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.quote.trim()) return;
    addTestimonial(newTestimonial);
    setNewTestimonial({ name: '', event: '', quote: '' });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-obsidian-900">Studio Content & Site Editor</h1>
        <p className="text-xs font-mono text-obsidian-800/60 mt-1">Admin control to edit hero headers, about text, branding & customer testimonials live</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* 1. Hero Banner Editor */}
        <div className="bg-studio-card border border-studio-border rounded-xl p-6 md:p-8 shadow-editorial space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-ivory-200">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">SECTION 01</span>
              <h3 className="font-serif text-2xl font-bold text-obsidian-900">Homepage Hero Banner Content</h3>
            </div>
            <Sparkles className="w-6 h-6 text-champagne-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Hero Badge Pill</label>
              <input
                type="text"
                name="heroBadge"
                value={form.heroBadge}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded font-sans focus:outline-none focus:border-champagne-500"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Primary CTA Button Label</label>
              <input
                type="text"
                name="heroCtaText"
                value={form.heroCtaText}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded font-sans focus:outline-none focus:border-champagne-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Main Headline</label>
              <input
                type="text"
                name="heroTitle"
                value={form.heroTitle}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded font-serif text-lg font-bold focus:outline-none focus:border-champagne-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Subtitle Description</label>
              <textarea
                rows="2"
                name="heroSubtitle"
                value={form.heroSubtitle}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded font-sans focus:outline-none focus:border-champagne-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Hero Background Cover Image URL</label>
              <input
                type="url"
                name="heroImage"
                value={form.heroImage}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded font-sans focus:outline-none focus:border-champagne-500"
              />
              {form.heroImage && (
                <div className="mt-2 h-32 w-full rounded overflow-hidden border border-ivory-300 bg-obsidian-950">
                  <img src={form.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. About Section Editor */}
        <div className="bg-studio-card border border-studio-border rounded-xl p-6 md:p-8 shadow-editorial space-y-6">
          <div className="border-b pb-4 border-ivory-200">
            <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">SECTION 02</span>
            <h3 className="font-serif text-2xl font-bold text-obsidian-900">About Studio & Founder Story</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">About Subtitle Pill</label>
              <input
                type="text"
                name="aboutSubtitle"
                value={form.aboutSubtitle}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded focus:outline-none focus:border-champagne-500"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Director Name</label>
              <input
                type="text"
                name="directorName"
                value={form.directorName}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded focus:outline-none focus:border-champagne-500 font-bold text-obsidian-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">About Headline</label>
              <input
                type="text"
                name="aboutTitle"
                value={form.aboutTitle}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded font-serif text-lg focus:outline-none focus:border-champagne-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">About Studio Story Description</label>
              <textarea
                rows="4"
                name="aboutDescription"
                value={form.aboutDescription}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded focus:outline-none focus:border-champagne-500"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Director Role / Title</label>
              <input
                type="text"
                name="directorRole"
                value={form.directorRole}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded focus:outline-none focus:border-champagne-500"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Director Portrait Photo URL</label>
              <input
                type="url"
                name="directorImage"
                value={form.directorImage}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded focus:outline-none focus:border-champagne-500"
              />
            </div>
          </div>

          {/* BTS Photos Grid Inputs */}
          <div className="pt-4 border-t border-ivory-200">
            <span className="text-xs font-mono uppercase tracking-wider text-champagne-600 font-bold block mb-3">Behind The Scenes Gallery Photos (4 Photos)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 font-semibold text-obsidian-800 text-[10px]">BTS Image 1 URL</label>
                <input
                  type="url"
                  name="bts1"
                  value={form.bts1}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-ivory-50 border border-ivory-300 rounded"
                />
              </div>
              <div>
                <label className="block uppercase mb-1 font-semibold text-obsidian-800 text-[10px]">BTS Image 2 URL</label>
                <input
                  type="url"
                  name="bts2"
                  value={form.bts2}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-ivory-50 border border-ivory-300 rounded"
                />
              </div>
              <div>
                <label className="block uppercase mb-1 font-semibold text-obsidian-800 text-[10px]">BTS Image 3 URL</label>
                <input
                  type="url"
                  name="bts3"
                  value={form.bts3}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-ivory-50 border border-ivory-300 rounded"
                />
              </div>
              <div>
                <label className="block uppercase mb-1 font-semibold text-obsidian-800 text-[10px]">BTS Image 4 URL</label>
                <input
                  type="url"
                  name="bts4"
                  value={form.bts4}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-ivory-50 border border-ivory-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2.5 Before & After Slider Image Editor */}
        <div className="bg-studio-card border border-studio-border rounded-xl p-6 md:p-8 shadow-editorial space-y-6">
          <div className="border-b pb-4 border-ivory-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">SECTION 03</span>
              <h3 className="font-serif text-2xl font-bold text-obsidian-900">Before & After Photo Grading Slider</h3>
            </div>
            <ImageIcon className="w-6 h-6 text-champagne-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Original RAW Image URL (Before Edit)</label>
              <input
                type="url"
                name="beforeAfterOriginal"
                value={form.beforeAfterOriginal}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded focus:outline-none focus:border-champagne-500"
              />
              {form.beforeAfterOriginal && (
                <div className="mt-2 h-28 w-full rounded overflow-hidden border border-ivory-300 bg-obsidian-950">
                  <img src={form.beforeAfterOriginal} alt="RAW Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Finished Color Graded Image URL (After Edit)</label>
              <input
                type="url"
                name="beforeAfterEdited"
                value={form.beforeAfterEdited}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded focus:outline-none focus:border-champagne-500"
              />
              {form.beforeAfterEdited && (
                <div className="mt-2 h-28 w-full rounded overflow-hidden border border-ivory-300 bg-obsidian-950">
                  <img src={form.beforeAfterEdited} alt="Edited Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Studio Profile & Contact Info */}
        <div className="bg-studio-card border border-studio-border rounded-xl p-6 md:p-8 shadow-editorial space-y-6">
          <div className="border-b pb-4 border-ivory-200">
            <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">SECTION 03</span>
            <h3 className="font-serif text-2xl font-bold text-obsidian-900">Studio Branding & Contact Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Studio Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={form.brandName}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded font-bold text-obsidian-900"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Studio Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Direct Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">WhatsApp Contact Number</label>
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded"
              />
            </div>

            <div>
              <label className="block uppercase mb-1 font-semibold text-obsidian-900">Studio Address Location</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-champagne-500 text-obsidian-950 font-bold text-xs font-mono uppercase tracking-[0.2em] rounded hover:bg-champagne-400 transition-all shadow-gold-glow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE ALL SITE CHANGES</span>
          </button>
        </div>
      </form>

      {/* 4. Client Testimonials Manager */}
      <div className="bg-studio-card border border-studio-border rounded-xl p-6 md:p-8 shadow-editorial space-y-6">
        <div className="border-b pb-4 border-ivory-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">SECTION 04</span>
            <h3 className="font-serif text-2xl font-bold text-obsidian-900">Client Reviews & Testimonials</h3>
          </div>
          <MessageSquare className="w-6 h-6 text-champagne-600" />
        </div>

        {/* Existing Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials && testimonials.map((t) => (
            <div key={t.id} className="p-4 bg-ivory-50 border border-ivory-200 rounded-lg flex flex-col justify-between space-y-3 relative">
              <div>
                <span className="font-serif font-bold text-obsidian-900 block">{t.name}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-champagne-600 block mb-2">{t.event}</span>
                <p className="text-xs text-obsidian-800/80 italic font-serif">"{t.quote}"</p>
              </div>

              <div className="flex justify-end pt-2 border-t border-ivory-200">
                <button
                  type="button"
                  onClick={() => deleteTestimonial(t.id)}
                  className="text-rose-600 hover:text-rose-800 text-xs font-mono flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Testimonial Form */}
        <form onSubmit={handleAddTestimonialSubmit} className="p-4 bg-obsidian-950 text-ivory-50 rounded-xl space-y-3 text-xs font-mono border border-champagne-500/20">
          <span className="text-champagne-400 font-bold uppercase block text-[11px]">Add New Client Review</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Client Name (e.g. Alex & Sarah)"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
              className="p-2.5 bg-obsidian-900 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
            />
            <input
              type="text"
              placeholder="Event / Session Type (e.g. Pre-Wedding Shoot)"
              value={newTestimonial.event}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, event: e.target.value })}
              className="p-2.5 bg-obsidian-900 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
            />
          </div>

          <textarea
            rows="2"
            placeholder="Client testimonial quote..."
            value={newTestimonial.quote}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
            className="w-full p-2.5 bg-obsidian-900 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-champagne-500 text-obsidian-950 font-bold uppercase rounded hover:bg-champagne-400 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD TESTIMONIAL</span>
          </button>
        </form>
      </div>

      {/* Supabase Connection Card */}
      <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-champagne-400" />
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">Supabase Connection Readiness</h3>
              <span className="text-xs font-mono text-ivory-200/60 block">Architecture is pre-wired to drop in `@supabase/supabase-js`</span>
            </div>
          </div>

          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold rounded flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            READY
          </span>
        </div>

        <div className="space-y-3 text-xs font-mono text-ivory-200/80 bg-obsidian-950 p-4 rounded border border-obsidian-800">
          <p><strong className="text-champagne-400">Current Storage Engine:</strong> LocalStorage + In-Memory State (`src/services/dataService.js`)</p>
          <p className="text-[11px] text-ivory-200/50">
            * All data mutations in `src/services/dataService.js` are saved immediately and updated live across the customer site.
          </p>
        </div>
      </div>
    </div>
  );
};
