import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Award, Sparkles, Edit3, UploadCloud, X, Save, RefreshCw, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutSection = () => {
  const { siteSettings, updateSiteSettings, isAdminAuthenticated, navigateTo } = useApp();

  const subtitle = siteSettings?.aboutSubtitle || '02 / ABOUT THE STUDIO';
  const title = siteSettings?.aboutTitle || "We don't take pictures. We craft heirlooms.";
  const description = siteSettings?.aboutDescription || "Founded in 2020, 2M PICTURES was built on a simple promise: to capture life’s most profound transitions—weddings, milestones, high-fashion editorials, and quiet intimate gazes—with elevated artistic rigor.";
  const directorName = siteSettings?.directorName || 'Pratheep';
  const directorRole = siteSettings?.directorRole || 'Creative Director & Founder';
  const directorImage = siteSettings?.directorImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80';

  const btsTitle = siteSettings?.btsTitle || 'Behind The Scenes';
  const btsBadge = siteSettings?.btsBadge || 'IN THE STUDIO';
  const bts1 = siteSettings?.bts1 || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80';
  const bts2 = siteSettings?.bts2 || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80';
  const bts3 = siteSettings?.bts3 || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80';
  const bts4 = siteSettings?.bts4 || 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80';

  // Modal State for Editing BTS Photos
  const [showBtsModal, setShowBtsModal] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(1); // 1, 2, 3, 4
  const [btsForm, setBtsForm] = useState({
    btsTitle: '',
    btsBadge: '',
    bts1: '',
    bts2: '',
    bts3: '',
    bts4: ''
  });

  const fileInputRef = useRef(null);

  const openBtsEditModal = (idx = 1) => {
    if (!isAdminAuthenticated) {
      navigateTo('admin');
      return;
    }
    setSelectedPhotoIndex(idx);
    setBtsForm({
      btsTitle: siteSettings?.btsTitle || 'Behind The Scenes',
      btsBadge: siteSettings?.btsBadge || 'IN THE STUDIO',
      bts1,
      bts2,
      bts3,
      bts4
    });
    setShowBtsModal(true);
  };

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
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
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        const currentKey = `bts${selectedPhotoIndex}`;
        setBtsForm((prev) => ({ ...prev, [currentKey]: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBts = async (e) => {
    e.preventDefault();
    await updateSiteSettings(btsForm);
    setShowBtsModal(false);
  };

  return (
    <section className="py-24 bg-studio-bg text-obsidian-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne-600 font-semibold">
              {subtitle}
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-obsidian-900 mt-2 leading-[1.1]">
              {title}
            </h2>
            <p className="mt-6 text-base text-obsidian-800/80 font-light leading-relaxed">
              {description}
            </p>
          </div>

          <div className="relative group/director">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-obsidian-900 border border-ivory-300">
              <img
                src={directorImage}
                alt={directorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-obsidian-900 text-ivory-50 p-6 rounded-lg border border-champagne-500/40 shadow-xl hidden sm:block">
              <span className="font-serif text-2xl font-bold text-champagne-400">{directorName}</span>
              <span className="block text-xs font-mono uppercase tracking-widest text-ivory-200/60">{directorRole}</span>
            </div>
          </div>
        </div>

        {/* Pillars / Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-ivory-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-champagne-500/20 text-champagne-600 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Unscripted Authenticity</h3>
            <p className="text-sm text-obsidian-800/70 font-light leading-relaxed">
              We avoid stiff artificial poses. Our documentary approach allows spontaneous laughter and quiet emotional glances to unfold organically.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-champagne-500/20 text-champagne-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Editorial Aesthetics</h3>
            <p className="text-sm text-obsidian-800/70 font-light leading-relaxed">
              Every image undergoes meticulous color harmonization and dynamic range tuning inspired by European fashion publications.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-champagne-500/20 text-champagne-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Heirloom Printing</h3>
            <p className="text-sm text-obsidian-800/70 font-light leading-relaxed">
              We design museum-quality archival albums and physical prints engineered to retain vivid fidelity across generations.
            </p>
          </div>
        </div>

        {/* Behind The Scenes Gallery */}
        <div className="space-y-6 pt-12 border-t border-ivory-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-3xl font-bold">{btsTitle}</h3>
              {isAdminAuthenticated && (
                <button
                  onClick={() => openBtsEditModal(1)}
                  className="px-3 py-1.5 bg-champagne-500/20 hover:bg-champagne-500 text-champagne-700 hover:text-obsidian-950 border border-champagne-500/40 rounded text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                  title="Admin: Edit Behind The Scenes Gallery Photos"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>EDIT BTS PHOTOS</span>
                </button>
              )}
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-champagne-600 font-semibold">{btsBadge}</span>
          </div>

          {/* BTS 4 Photos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 1, src: bts1, key: 'bts1', label: 'Photo 1' },
              { id: 2, src: bts2, key: 'bts2', label: 'Photo 2' },
              { id: 3, src: bts3, key: 'bts3', label: 'Photo 3' },
              { id: 4, src: bts4, key: 'bts4', label: 'Photo 4' }
            ].map((item) => (
              <div
                key={item.id}
                className="aspect-square rounded-lg overflow-hidden bg-obsidian-900 border border-ivory-300 relative group/bts"
              >
                <img
                  src={item.src}
                  alt={`Behind The Scenes ${item.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/bts:scale-105"
                />

                {/* Admin Quick Edit Button on each photo */}
                {isAdminAuthenticated ? (
                  <div className="absolute inset-0 bg-obsidian-950/60 opacity-0 group-hover/bts:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <button
                      onClick={() => openBtsEditModal(item.id)}
                      className="px-3 py-2 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 rounded text-xs font-mono uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-gold-glow transition-all"
                    >
                      <Camera className="w-4 h-4" />
                      <span>CHANGE PHOTO</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigateTo('admin')}
                    className="absolute bottom-2 right-2 p-1.5 rounded-full bg-obsidian-900/60 hover:bg-obsidian-900 text-ivory-100/60 hover:text-champagne-400 opacity-0 group-hover/bts:opacity-100 transition-opacity"
                    title="Admin login to edit this photo"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BTS Photos Editor Modal */}
      <AnimatePresence>
        {showBtsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowBtsModal(false)}
                className="absolute top-5 right-5 text-ivory-200/60 hover:text-white p-1 rounded-lg bg-obsidian-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-champagne-400 font-bold block">
                  ADMIN GALLERY CONTROLLER
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1">
                  Edit Behind The Scenes Photos
                </h3>
                <p className="text-xs font-mono text-ivory-200/60 mt-1">
                  Upload photos directly from your computer or provide web image URLs
                </p>
              </div>

              {/* Tab Selector for which Photo to edit */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {[1, 2, 3, 4].map((num) => {
                  const key = `bts${num}`;
                  const isSelected = selectedPhotoIndex === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(num)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-mono ${
                        isSelected
                          ? 'border-champagne-400 bg-champagne-500/20 text-champagne-300 font-bold shadow-gold-glow'
                          : 'border-obsidian-800 bg-obsidian-950 text-ivory-200/70 hover:border-obsidian-700'
                      }`}
                    >
                      <div className="w-full aspect-square rounded-lg overflow-hidden bg-obsidian-900 border border-obsidian-800">
                        <img src={btsForm[key]} alt={`Thumbnail ${num}`} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] uppercase tracking-wider">Photo {num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Selected Photo Editor */}
              <div className="p-4 bg-obsidian-950 rounded-xl border border-obsidian-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-champagne-400 font-bold">
                    Editing Photo #{selectedPhotoIndex}
                  </span>
                  <span className="text-[10px] font-mono text-ivory-200/50">Auto-compressed for ultra fast load</span>
                </div>

                {/* Upload Button & Drag Area */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) processFile(file);
                    }}
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-champagne-500/40 hover:border-champagne-400 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer bg-obsidian-900/60 hover:bg-obsidian-900 transition-all text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-champagne-500/20 text-champagne-400 flex items-center justify-center">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        Click to Upload Photo from Computer / Phone
                      </p>
                      <p className="text-[10px] font-mono text-ivory-200/50 mt-0.5">
                        Supports JPG, PNG, WEBP (No upload limits)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image URL input fallback */}
                <div className="text-xs font-mono space-y-1">
                  <label className="uppercase text-ivory-200/70 text-[10px] block">Or Paste Web Image URL:</label>
                  <input
                    type="url"
                    value={btsForm[`bts${selectedPhotoIndex}`]}
                    onChange={(e) => {
                      const key = `bts${selectedPhotoIndex}`;
                      setBtsForm((prev) => ({ ...prev, [key]: e.target.value }));
                    }}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-obsidian-900 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500 text-xs"
                  />
                </div>
              </div>

              {/* Title & Badge Customization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <label className="block uppercase mb-1 text-ivory-200/70 text-[10px]">Section Title</label>
                  <input
                    type="text"
                    value={btsForm.btsTitle}
                    onChange={(e) => setBtsForm({ ...btsForm, btsTitle: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                  />
                </div>
                <div>
                  <label className="block uppercase mb-1 text-ivory-200/70 text-[10px]">Section Tag / Badge</label>
                  <input
                    type="text"
                    value={btsForm.btsBadge}
                    onChange={(e) => setBtsForm({ ...btsForm, btsBadge: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-obsidian-800 flex justify-end gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setShowBtsModal(false)}
                  className="px-4 py-2.5 bg-obsidian-800 hover:bg-obsidian-700 text-ivory-200 rounded uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBts}
                  className="px-6 py-2.5 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold uppercase tracking-wider rounded transition-colors shadow-gold-glow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
