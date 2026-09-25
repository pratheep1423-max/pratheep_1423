import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Save, Database, CheckCircle2, Sparkles, Image as ImageIcon, MessageSquare, Plus, Trash2, Upload, Film, ArrowRight } from 'lucide-react';

export const SettingsManager = () => {
  const { siteSettings, updateSiteSettings, testimonials, addTestimonial, deleteTestimonial, showToast, setAdminTab } = useApp();

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

  const handleImageFileUpload = (key, file) => {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 1200;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const optimized = canvas.toDataURL('image/jpeg', 0.85);
        setForm((prev) => ({ ...prev, [key]: optimized }));
        showToast(`Image uploaded & optimized.`);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
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
          <div className="pt-6 border-t border-ivory-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-champagne-600 font-bold block">
                  Behind The Scenes Gallery Photos (4 Photos)
                </span>
                <p className="text-[11px] font-mono text-obsidian-800/60 mt-0.5">
                  Upload photos directly from your computer or switch to the dedicated Behind The Scenes Manager.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAdminTab('bts')}
                className="px-3.5 py-1.5 bg-champagne-500/20 hover:bg-champagne-500 text-champagne-800 hover:text-obsidian-950 rounded text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors w-fit"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Open BTS Studio Manager</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              {[
                { key: 'bts1', label: 'BTS Image 1' },
                { key: 'bts2', label: 'BTS Image 2' },
                { key: 'bts3', label: 'BTS Image 3' },
                { key: 'bts4', label: 'BTS Image 4' }
              ].map(({ key, label }) => (
                <div key={key} className="p-3 bg-ivory-50 border border-ivory-300 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block uppercase font-semibold text-obsidian-800 text-[10px]">{label}</label>
                    <label className="text-[10px] text-champagne-700 hover:text-champagne-900 font-bold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageFileUpload(key, e.target.files[0]);
                            e.target.value = '';
                          }
                        }}
                      />
                    </label>
                  </div>

                  {form[key] ? (
                    <div className="aspect-video w-full rounded overflow-hidden bg-obsidian-900 border border-ivory-200 relative group">
                      <img src={form[key]} alt={label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-obsidian-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="px-2 py-1 bg-champagne-500 text-obsidian-950 rounded text-[10px] font-bold cursor-pointer flex items-center gap-1">
                          <Upload className="w-3 h-3" />
                          <span>Change</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageFileUpload(key, e.target.files[0]);
                                e.target.value = '';
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded border border-dashed border-ivory-300 flex items-center justify-center text-[10px] text-obsidian-800/40">
                      No Photo
                    </div>
                  )}

                  <input
                    type="text"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    placeholder="URL or uploaded data"
                    className="w-full p-1.5 bg-white border border-ivory-300 rounded text-[10px] truncate"
                  />
                </div>
              ))}
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
