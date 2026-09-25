import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Film,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  Save,
  Check,
  Eye,
  Sparkles,
  ExternalLink,
  Upload,
  Layers
} from 'lucide-react';

const DEFAULT_BTS = {
  btsTitle: 'Behind The Scenes',
  btsBadge: 'IN THE STUDIO',
  bts1: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
  bts2: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
  bts3: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  bts4: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80'
};

export const BtsManager = () => {
  const { siteSettings, updateSiteSettings, navigateTo, showToast } = useApp();

  const [formData, setFormData] = useState({
    btsTitle: DEFAULT_BTS.btsTitle,
    btsBadge: DEFAULT_BTS.btsBadge,
    bts1: DEFAULT_BTS.bts1,
    bts2: DEFAULT_BTS.bts2,
    bts3: DEFAULT_BTS.bts3,
    bts4: DEFAULT_BTS.bts4
  });

  const [metaInfo, setMetaInfo] = useState({
    bts1: { name: '', size: '' },
    bts2: { name: '', size: '' },
    bts3: { name: '', size: '' },
    bts4: { name: '', size: '' }
  });

  const [isProcessing, setIsProcessing] = useState({});
  const [activeTabMode, setActiveTabMode] = useState({}); // 'upload' | 'url'
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // File input refs for each of the 4 photos
  const fileRefs = {
    bts1: useRef(null),
    bts2: useRef(null),
    bts3: useRef(null),
    bts4: useRef(null)
  };

  useEffect(() => {
    if (siteSettings) {
      setFormData({
        btsTitle: siteSettings.btsTitle || DEFAULT_BTS.btsTitle,
        btsBadge: siteSettings.btsBadge || DEFAULT_BTS.btsBadge,
        bts1: siteSettings.bts1 || DEFAULT_BTS.bts1,
        bts2: siteSettings.bts2 || DEFAULT_BTS.bts2,
        bts3: siteSettings.bts3 || DEFAULT_BTS.bts3,
        bts4: siteSettings.bts4 || DEFAULT_BTS.bts4
      });
    }
  }, [siteSettings]);

  // Client-side image compression & optimization to max 1200px
  const processImageFile = (key, file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }

    setIsProcessing((prev) => ({ ...prev, [key]: true }));

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

        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const approxKb = Math.round((optimizedDataUrl.length * (3 / 4)) / 1024);

        setFormData((prev) => ({ ...prev, [key]: optimizedDataUrl }));
        setMetaInfo((prev) => ({
          ...prev,
          [key]: { name: file.name, size: `${approxKb} KB` }
        }));
        setIsProcessing((prev) => ({ ...prev, [key]: false }));
        showToast(`Photo ${key.replace('bts', '#')} ready! Click Save to apply.`);
      };

      img.onerror = () => {
        showToast('Failed to parse this image file. Please try another.', 'error');
        setIsProcessing((prev) => ({ ...prev, [key]: false }));
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      showToast('Error reading image file.', 'error');
      setIsProcessing((prev) => ({ ...prev, [key]: false }));
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (key, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(key, e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUrlChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setMetaInfo((prev) => ({ ...prev, [key]: { name: 'Web Link', size: '' } }));
  };

  const handleRemovePhoto = (key) => {
    setFormData((prev) => ({ ...prev, [key]: '' }));
    setMetaInfo((prev) => ({ ...prev, [key]: { name: '', size: '' } }));
    showToast(`Photo ${key.replace('bts', '#')} cleared.`);
  };

  const handleResetDefault = (key) => {
    setFormData((prev) => ({ ...prev, [key]: DEFAULT_BTS[key] }));
    setMetaInfo((prev) => ({ ...prev, [key]: { name: 'Default Sample', size: '' } }));
    showToast(`Photo ${key.replace('bts', '#')} restored to default.`);
  };

  const handleSaveAll = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateSiteSettings(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      showToast('Behind The Scenes gallery updated successfully!');
    } catch (err) {
      showToast('Error updating settings.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const photos = [
    { key: 'bts1', num: 1, title: 'BTS Photo 01', hint: 'Studio Lighting / Equipment' },
    { key: 'bts2', num: 2, title: 'BTS Photo 02', hint: 'Director in Action' },
    { key: 'bts3', num: 3, title: 'BTS Photo 03', hint: 'Editing & Color Grading' },
    { key: 'bts4', num: 4, title: 'BTS Photo 04', hint: 'Outdoor / Candid Setup' }
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-ivory-200 pb-8">
        <div>
          <div className="flex items-center gap-2 text-champagne-600 mb-1">
            <Film className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold">
              STUDIO STORY MEDIA
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-obsidian-900 tracking-tight">
            Behind The Scenes Manager
          </h2>
          <p className="text-sm text-obsidian-800/70 mt-1 font-light">
            Upload studio photography directly from your device to showcase your production craft on the About page.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('about')}
            className="px-4 py-2.5 bg-ivory-100 hover:bg-ivory-200 text-obsidian-800 border border-ivory-300 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4 text-champagne-600" />
            <span>View On Website</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className={`px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 transition-all shadow-md ${
              saveSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 shadow-gold-glow'
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Section Titles Config */}
      <div className="bg-studio-card border border-studio-border rounded-xl p-6 shadow-editorial">
        <div className="flex items-center gap-2 mb-4 text-champagne-600">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold">
            Header & Tagline Settings
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="block uppercase mb-1 font-semibold text-obsidian-900">
              Section Title
            </label>
            <input
              type="text"
              value={formData.btsTitle}
              onChange={(e) => setFormData((p) => ({ ...p, btsTitle: e.target.value }))}
              placeholder="e.g. Behind The Scenes"
              className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-lg focus:outline-none focus:border-champagne-500 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block uppercase mb-1 font-semibold text-obsidian-900">
              Top Badge Text
            </label>
            <input
              type="text"
              value={formData.btsBadge}
              onChange={(e) => setFormData((p) => ({ ...p, btsBadge: e.target.value }))}
              placeholder="e.g. IN THE STUDIO"
              className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-lg focus:outline-none focus:border-champagne-500 text-sm font-sans"
            />
          </div>
        </div>
      </div>

      {/* 4 Photos Upload Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-obsidian-900">
              Gallery Photos (4 Slots)
            </h3>
            <p className="text-xs font-mono text-obsidian-800/60 mt-0.5">
              Click "Upload from Device" to choose files directly from your computer, or drag and drop into any card.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {photos.map(({ key, num, title, hint }) => {
            const currentImg = formData[key];
            const meta = metaInfo[key];
            const isBusy = isProcessing[key];
            const isUrlMode = activeTabMode[key] === 'url';

            return (
              <div
                key={key}
                className="bg-studio-card border border-studio-border rounded-xl p-4 flex flex-col justify-between shadow-editorial hover:shadow-lg transition-all"
              >
                {/* Card Top */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-ivory-200">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-champagne-500/20 text-champagne-700 font-mono text-[10px] font-bold flex items-center justify-center">
                      {num}
                    </span>
                    <span className="font-semibold text-sm text-obsidian-900">{title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-obsidian-800/50 uppercase">
                    {hint}
                  </span>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileRefs[key]}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      processImageFile(key, e.target.files[0]);
                      e.target.value = '';
                    }
                  }}
                />

                {/* Dropzone & Preview Box */}
                <div
                  onDrop={(e) => handleDrop(key, e)}
                  onDragOver={handleDragOver}
                  className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-dashed border-ivory-300 hover:border-champagne-500 bg-ivory-50 flex flex-col items-center justify-center transition-colors group"
                >
                  {isBusy ? (
                    <div className="flex flex-col items-center gap-2 p-4 text-center">
                      <RefreshCw className="w-7 h-7 text-champagne-600 animate-spin" />
                      <span className="text-xs font-mono text-obsidian-800 font-semibold">
                        Optimizing photo...
                      </span>
                    </div>
                  ) : currentImg ? (
                    <>
                      <img
                        src={currentImg}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover Overlay with Change / Delete actions */}
                      <div className="absolute inset-0 bg-obsidian-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                        <button
                          type="button"
                          onClick={() => fileRefs[key].current?.click()}
                          className="w-full py-2 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 rounded text-xs font-mono uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow transition-all"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload New Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleResetDefault(key)}
                          className="w-full py-1.5 bg-obsidian-800 hover:bg-obsidian-700 text-ivory-100 rounded text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                        >
                          <RefreshCw className="w-3 h-3 text-champagne-400" />
                          <span>Reset Sample</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(key)}
                          className="w-full py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800/50 rounded text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Empty State: Prompt to Upload */
                    <div
                      onClick={() => fileRefs[key].current?.click()}
                      className="cursor-pointer flex flex-col items-center text-center p-4 w-full h-full justify-center hover:bg-ivory-100/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-champagne-500/15 text-champagne-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-obsidian-900 mb-1">
                        Click to Upload Photo
                      </span>
                      <span className="text-[10px] font-mono text-obsidian-800/60 leading-tight">
                        or drag & drop here<br />(JPG, PNG, WebP)
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload Status / Metadata */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => fileRefs[key].current?.click()}
                      className="px-2.5 py-1.5 bg-champagne-500/20 hover:bg-champagne-500 text-champagne-800 hover:text-obsidian-950 font-bold rounded flex items-center gap-1.5 transition-colors"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload from Device</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveTabMode((prev) => ({
                          ...prev,
                          [key]: prev[key] === 'url' ? 'upload' : 'url'
                        }))
                      }
                      className="text-obsidian-800/60 hover:text-champagne-700 underline text-[10px]"
                    >
                      {isUrlMode ? 'Hide URL input' : 'Or paste URL'}
                    </button>
                  </div>

                  {meta.name && (
                    <div className="text-[10px] font-mono text-obsidian-800/70 truncate bg-ivory-100 px-2 py-1 rounded border border-ivory-200">
                      📁 {meta.name} {meta.size ? `(${meta.size})` : ''}
                    </div>
                  )}

                  {/* URL Input Fallback */}
                  {isUrlMode && (
                    <div className="pt-2 border-t border-ivory-200">
                      <label className="block text-[10px] font-mono uppercase text-obsidian-800/70 mb-1 font-semibold">
                        Image Web URL
                      </label>
                      <input
                        type="url"
                        value={currentImg}
                        onChange={(e) => handleUrlChange(key, e.target.value)}
                        placeholder="https://..."
                        className="w-full p-2 bg-ivory-50 border border-ivory-300 rounded text-xs font-mono focus:outline-none focus:border-champagne-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Preview on Public Page */}
      <div className="bg-obsidian-950 text-ivory-50 rounded-2xl p-6 md:p-8 border border-obsidian-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-champagne-400 font-bold block">
              LIVE PREVIEW
            </span>
            <h4 className="font-serif text-2xl font-bold text-white mt-0.5">
              How It Looks On The About Page
            </h4>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-champagne-400 font-semibold px-3 py-1 bg-obsidian-900 border border-obsidian-800 rounded-full w-fit">
            {formData.btsBadge}
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-3xl font-bold text-white">{formData.btsTitle}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map(({ key, num }) => (
              <div
                key={`preview-${key}`}
                className="aspect-square rounded-lg overflow-hidden bg-obsidian-900 border border-obsidian-800 relative group"
              >
                {formData[key] ? (
                  <img
                    src={formData[key]}
                    alt={`Preview BTS ${num}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-ivory-200/40 text-xs font-mono">
                    <ImageIcon className="w-6 h-6 mb-1 text-ivory-200/20" />
                    <span>Slot {num} Empty</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-obsidian-950/80 backdrop-blur-sm text-[10px] font-mono text-champagne-400 border border-champagne-500/20">
                  BTS 0{num}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Save Footer */}
      <div className="sticky bottom-6 z-20 bg-obsidian-950/90 backdrop-blur-md text-ivory-50 border border-champagne-500/40 rounded-xl p-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-ivory-200">
            Unsaved changes will apply immediately to your live studio website upon saving.
          </span>
        </div>
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-6 py-2.5 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 rounded-lg text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 shadow-gold-glow transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes Now</span>
        </button>
      </div>
    </div>
  );
};
