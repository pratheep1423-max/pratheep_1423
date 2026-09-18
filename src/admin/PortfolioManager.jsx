import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, Star, Image as ImageIcon, X, UploadCloud, Link as LinkIcon, RefreshCw, AlertCircle, Eye, Maximize2 } from 'lucide-react';

export const PortfolioManager = () => {
  const { portfolio, addPortfolioItem, deletePortfolioItem, toggleFeaturedPortfolio } = useApp();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' | 'url'
  const [isDragging, setIsDragging] = useState(false);
  const [imageFileName, setImageFileName] = useState('');
  const [imageFileSize, setImageFileSize] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [imageFitMode, setImageFitMode] = useState('contain'); // 'contain' (full photo no cut) | 'cover' (fill frame)
  const [previewItem, setPreviewItem] = useState(null);
  
  const fileInputRef = useRef(null);

  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Weddings',
    image: '',
    location: '',
    description: ''
  });

  const resetForm = () => {
    setNewItem({
      title: '',
      category: 'Weddings',
      image: '',
      location: '',
      description: ''
    });
    setImageFileName('');
    setImageFileSize('');
    setUploadError('');
    setIsProcessingImage(false);
    setImageInputMode('upload');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processImageFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP, etc.).');
      return;
    }

    setUploadError('');
    setIsProcessingImage(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Optimize to max 1400px to keep localStorage crisp and within limits
        const maxDimension = 1400;
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
        setNewItem((prev) => ({ ...prev, image: optimizedDataUrl }));
        setImageFileName(file.name);
        setImageFileSize(`${(optimizedDataUrl.length * (3 / 4) / 1024).toFixed(0)} KB`);
        setIsProcessingImage(false);
      };

      img.onerror = () => {
        setUploadError('Failed to process this image. Please try another file.');
        setIsProcessingImage(false);
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      setUploadError('Error reading the selected file.');
      setIsProcessingImage(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setNewItem((prev) => ({ ...prev, image: '' }));
    setImageFileName('');
    setImageFileSize('');
    setUploadError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;

    if (!newItem.image || !newItem.image.trim()) {
      setUploadError('Please upload an image or provide an image URL before saving.');
      return;
    }

    addPortfolioItem(newItem);
    setShowAddModal(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-obsidian-900">Portfolio Gallery Manager</h1>
          <p className="text-xs font-mono text-obsidian-800/60 mt-1">Upload, feature, or remove fine art story publications</p>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          {/* Photo Fit Mode Selector */}
          <div className="flex items-center gap-1 bg-studio-card p-1 rounded-lg border border-studio-border text-xs font-mono">
            <span className="text-obsidian-800/60 px-2 font-medium text-[11px]">View:</span>
            <button
              onClick={() => setImageFitMode('contain')}
              className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase transition-all ${
                imageFitMode === 'contain'
                  ? 'bg-obsidian-900 text-champagne-400 shadow-sm'
                  : 'text-obsidian-800/60 hover:text-obsidian-900'
              }`}
              title="Show full photo without cropping"
            >
              Fit Photo (No Crop)
            </button>
            <button
              onClick={() => setImageFitMode('cover')}
              className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase transition-all ${
                imageFitMode === 'cover'
                  ? 'bg-obsidian-900 text-champagne-400 shadow-sm'
                  : 'text-obsidian-800/60 hover:text-obsidian-900'
              }`}
              title="Fill frame (top aligned)"
            >
              Fill Frame
            </button>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="px-4 py-2 bg-champagne-500 text-obsidian-950 font-semibold text-xs font-mono uppercase tracking-wider rounded hover:bg-champagne-400 transition-colors shadow-sm flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>ADD PORTFOLIO STORY</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <div key={item.id} className="bg-studio-card border border-studio-border rounded-lg overflow-hidden shadow-editorial flex flex-col justify-between">
            {/* Image Container: responsive height with ambient blurred background */}
            <div className="relative h-64 sm:h-56 bg-obsidian-950 overflow-hidden flex items-center justify-center group/cardimg">
              {/* Ambient blur background to gracefully fill frame without black bars */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              <img
                src={item.image}
                alt={item.title}
                onClick={() => setPreviewItem(item)}
                className={`relative z-10 w-full h-full cursor-pointer transition-all duration-300 ${
                  imageFitMode === 'contain'
                    ? 'object-contain p-1.5'
                    : 'object-cover object-top'
                }`}
                title="Click to view full photo"
              />

              {/* Action buttons on card image */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                <button
                  onClick={() => setPreviewItem(item)}
                  className="p-1.5 rounded-full bg-obsidian-900/80 hover:bg-obsidian-800 text-ivory-200 border border-ivory-100/20 backdrop-blur-sm transition-colors shadow-sm"
                  title="View full resolution"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleFeaturedPortfolio(item.id)}
                  className={`p-1.5 rounded-full border shadow-sm transition-colors backdrop-blur-sm ${
                    item.featured
                      ? 'bg-champagne-500 text-obsidian-950 border-champagne-400'
                      : 'bg-obsidian-900/80 text-ivory-200 border-ivory-100/20 hover:bg-obsidian-800'
                  }`}
                  title={item.featured ? 'Featured in Showcase' : 'Toggle Featured'}
                >
                  <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-obsidian-950' : ''}`} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">
                {item.category}
              </span>
              <h4 className="font-serif text-xl font-bold text-obsidian-900">{item.title}</h4>
              <p className="text-xs text-obsidian-800/70 line-clamp-2">{item.description}</p>
            </div>

            <div className="p-4 border-t border-ivory-200 flex justify-between items-center text-xs font-mono">
              <span className="text-obsidian-800/60">{item.location || 'Studio Shot'}</span>
              <button
                onClick={() => deletePortfolioItem(item.id)}
                className="text-rose-600 hover:text-rose-800 p-1"
                title="Delete item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-ivory-200/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-serif text-2xl font-bold text-ivory-50">Add Portfolio Story</h3>
              <p className="text-[11px] font-mono text-champagne-400/80 mt-1">Upload an image and details to publish to the showcase</p>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400 font-semibold tracking-wider">Story Title *</label>
                <input
                  type="text"
                  required
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. Royal Venetian Gala"
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500 transition-colors"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400 font-semibold tracking-wider">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500 transition-colors"
                >
                  <option value="Weddings">Weddings</option>
                  <option value="Pre-Wedding">Pre-Wedding</option>
                  <option value="Post-Wedding">Post-Wedding</option>
                  <option value="Birthdays">Birthdays</option>
                  <option value="Portraits">Portraits</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Events">Events</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              {/* Image Input Section: Upload vs URL */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="uppercase text-champagne-400 font-semibold tracking-wider">Portfolio Photo *</label>
                  <div className="flex gap-1 bg-obsidian-950 p-0.5 rounded border border-obsidian-800">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('upload')}
                      className={`px-2 py-1 rounded text-[10px] uppercase font-bold flex items-center gap-1 transition-colors ${
                        imageInputMode === 'upload'
                          ? 'bg-champagne-500 text-obsidian-950'
                          : 'text-ivory-200/70 hover:text-ivory-50'
                      }`}
                    >
                      <UploadCloud className="w-3 h-3" />
                      <span>Upload Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-2 py-1 rounded text-[10px] uppercase font-bold flex items-center gap-1 transition-colors ${
                        imageInputMode === 'url'
                          ? 'bg-champagne-500 text-obsidian-950'
                          : 'text-ivory-200/70 hover:text-ivory-50'
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>URL</span>
                    </button>
                  </div>
                </div>

                {/* Upload Mode */}
                {imageInputMode === 'upload' ? (
                  <div className="space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {!newItem.image ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                          isDragging
                            ? 'border-champagne-400 bg-champagne-500/10 scale-[0.99]'
                            : 'border-obsidian-800 hover:border-champagne-500/60 bg-obsidian-950/60 hover:bg-obsidian-950'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-champagne-500/10 border border-champagne-500/20 flex items-center justify-center text-champagne-400">
                          {isProcessingImage ? (
                            <RefreshCw className="w-6 h-6 animate-spin" />
                          ) : (
                            <UploadCloud className="w-6 h-6" />
                          )}
                        </div>

                        <div className="text-center">
                          <p className="font-medium text-ivory-100 text-xs">
                            {isProcessingImage ? 'Processing image...' : 'Click to browse or drag & drop photo'}
                          </p>
                          <p className="text-[10px] text-ivory-200/50 mt-1">
                            Supports JPG, PNG, WEBP (Automatically optimized)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-lg border border-champagne-500/30 bg-obsidian-950 overflow-hidden p-3">
                        <div className="relative h-44 w-full rounded overflow-hidden bg-obsidian-900 flex items-center justify-center">
                          <img
                            src={newItem.image}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg transition-colors"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <div className="truncate pr-2">
                            <span className="font-medium text-ivory-100 block truncate">{imageFileName || 'Uploaded Photo'}</span>
                            {imageFileSize && <span className="text-[10px] text-champagne-400/80 font-mono">{imageFileSize}</span>}
                          </div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2.5 py-1 bg-obsidian-800 hover:bg-obsidian-700 text-champagne-400 rounded transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Change</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* URL Input Mode */
                  <div className="space-y-3">
                    <input
                      type="url"
                      value={newItem.image}
                      onChange={(e) => {
                        setNewItem({ ...newItem, image: e.target.value });
                        setImageFileName('');
                        setImageFileSize('');
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500 transition-colors"
                    />

                    {newItem.image && (
                      <div className="relative h-32 w-full rounded border border-obsidian-800 overflow-hidden bg-obsidian-950">
                        <img
                          src={newItem.image}
                          alt="URL Preview"
                          className="w-full h-full object-contain"
                          onError={() => setUploadError('Unable to load image from URL. Please check the link.')}
                        />
                      </div>
                    )}
                  </div>
                )}

                {uploadError && (
                  <div className="mt-2 flex items-center gap-1.5 text-rose-400 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400 font-semibold tracking-wider">Location</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  placeholder="e.g. Venice, Italy"
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500 transition-colors"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400 font-semibold tracking-wider">Description</label>
                <textarea
                  rows="3"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Add editorial notes or story description..."
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500 transition-colors"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-obsidian-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-ivory-200 rounded transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className="px-6 py-2 bg-champagne-500 hover:bg-champagne-400 disabled:opacity-50 text-obsidian-950 font-bold rounded transition-colors shadow-sm"
                >
                  SAVE STORY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Photo Lightbox Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/90 backdrop-blur-md transition-opacity"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-obsidian-900 border border-champagne-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-obsidian-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold block">
                  {previewItem.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                  {previewItem.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-ivory-200 hover:text-white transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo View */}
            <div className="bg-obsidian-950 flex items-center justify-center p-3 sm:p-6 min-h-[320px] max-h-[75vh] overflow-hidden">
              <img
                src={previewItem.image}
                alt={previewItem.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Footer with description and location */}
            {(previewItem.location || previewItem.description) && (
              <div className="p-4 border-t border-obsidian-800 bg-obsidian-900/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-ivory-200/70 gap-2">
                <span>{previewItem.location || 'Studio Shot'}</span>
                {previewItem.description && <p className="text-ivory-200/50 truncate max-w-md">{previewItem.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
