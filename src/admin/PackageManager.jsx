import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  Edit3,
  Trash2,
  Plus,
  Check,
  Camera,
  DollarSign,
  X,
  Upload,
  UploadCloud,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';

export const PackageManager = () => {
  const {
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    services,
    addService,
    updateService,
    deleteService,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'services'
  const [editingPkg, setEditingPkg] = useState(null);
  const [showAddPkgModal, setShowAddPkgModal] = useState(false);
  const [newPkg, setNewPkg] = useState({
    name: '',
    price: 1000,
    duration: 'Full Day',
    photographers: '2 Photographers',
    photosCount: '200 Edited Photos',
    image: '',
    features: ['Professional Photographer', 'High-Res Digital Gallery']
  });

  const [editingSrv, setEditingSrv] = useState(null);
  const [showAddSrvModal, setShowAddSrvModal] = useState(false);
  const [newSrv, setNewSrv] = useState({
    name: '',
    category: 'Weddings',
    description: '',
    startingPrice: 1500,
    duration: 'Full Day',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    features: ['2 Photographers', 'High-res digital gallery']
  });

  const [isCompressing, setIsCompressing] = useState(false);

  // Client-side image compression & optimization helper
  const processImageFile = (file, onSuccess) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }

    setIsCompressing(true);

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
        onSuccess(optimizedDataUrl);
        setIsCompressing(false);
        showToast('Photo uploaded & optimized successfully!');
      };

      img.onerror = () => {
        showToast('Failed to process image file.', 'error');
        setIsCompressing(false);
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      showToast('Error reading selected file.', 'error');
      setIsCompressing(false);
    };

    reader.readAsDataURL(file);
  };

  // Quick Photo upload directly from the card
  const handleQuickPkgImage = (pkg, file) => {
    processImageFile(file, (dataUrl) => {
      updatePackage({ ...pkg, image: dataUrl });
    });
  };

  const handleQuickSrvImage = (srv, file) => {
    processImageFile(file, (dataUrl) => {
      updateService({ ...srv, image: dataUrl });
    });
  };

  // Package Handlers
  const handleSavePkg = (e) => {
    e.preventDefault();
    if (editingPkg) {
      updatePackage(editingPkg);
      setEditingPkg(null);
    }
  };

  const handleAddPkg = (e) => {
    e.preventDefault();
    if (!newPkg.name.trim()) return;
    addPackage(newPkg);
    setShowAddPkgModal(false);
    setNewPkg({
      name: '',
      price: 1000,
      duration: 'Full Day',
      photographers: '2 Photographers',
      photosCount: '200 Edited Photos',
      image: '',
      features: ['Professional Photographer', 'High-Res Digital Gallery']
    });
  };

  // Service Handlers
  const handleSaveSrv = (e) => {
    e.preventDefault();
    if (editingSrv) {
      updateService(editingSrv);
      setEditingSrv(null);
    }
  };

  const handleAddSrv = (e) => {
    e.preventDefault();
    if (!newSrv.name.trim()) return;
    addService(newSrv);
    setShowAddSrvModal(false);
    setNewSrv({
      name: '',
      category: 'Weddings',
      description: '',
      startingPrice: 1500,
      duration: 'Full Day',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      features: ['2 Photographers', 'High-res digital gallery']
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-obsidian-900">Packages & Services Management</h1>
          <p className="text-xs font-mono text-obsidian-800/60 mt-1">
            Full Admin control to add, edit or delete pricing tiers and photography services with custom photo uploads
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase transition-all ${
              activeTab === 'packages'
                ? 'bg-obsidian-900 text-champagne-400 shadow-sm'
                : 'bg-studio-card text-obsidian-800/60 hover:text-obsidian-900 border border-studio-border'
            }`}
          >
            Packages ({packages?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase transition-all ${
              activeTab === 'services'
                ? 'bg-obsidian-900 text-champagne-400 shadow-sm'
                : 'bg-studio-card text-obsidian-800/60 hover:text-obsidian-900 border border-studio-border'
            }`}
          >
            Services ({services?.length || 0})
          </button>
        </div>
      </div>

      {/* PACKAGES TAB */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddPkgModal(true)}
              className="px-4 py-2 bg-champagne-500 text-obsidian-950 font-bold text-xs font-mono uppercase tracking-wider rounded hover:bg-champagne-400 transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW PACKAGE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-studio-card border border-studio-border rounded-xl overflow-hidden shadow-editorial flex flex-col justify-between"
              >
                {/* Package Cover Image Header */}
                <div className="relative h-44 bg-obsidian-950 overflow-hidden group">
                  {pkg.image ? (
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-ivory-200/40 text-xs font-mono bg-obsidian-900">
                      <ImageIcon className="w-8 h-8 mb-1 text-ivory-200/20" />
                      <span>No Package Cover Image</span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-obsidian-900/90 text-champagne-400 px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold border border-champagne-500/30">
                    {pkg.duration}
                  </div>

                  {/* Quick Change / Upload Photo Overlay */}
                  <div className="absolute inset-0 bg-obsidian-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                    <label className="px-3 py-1.5 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 rounded text-xs font-mono uppercase font-bold tracking-wider cursor-pointer flex items-center gap-1.5 shadow-gold-glow transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{pkg.image ? 'Change Photo' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleQuickPkgImage(pkg, e.target.files[0]);
                            e.target.value = '';
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b pb-4 border-ivory-200">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">
                          TIER
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-obsidian-900">{pkg.name}</h3>
                      </div>
                      <span className="font-serif text-3xl font-bold text-champagne-600">${pkg.price}</span>
                    </div>

                    <ul className="py-4 space-y-2 text-xs font-mono text-obsidian-800/80">
                      {pkg.features?.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-ivory-200">
                    <button
                      onClick={() => setEditingPkg(pkg)}
                      className="flex-1 py-2 bg-obsidian-900 text-ivory-50 text-xs font-mono uppercase tracking-wider rounded hover:bg-champagne-500 hover:text-obsidian-950 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>EDIT PACKAGE</span>
                    </button>

                    <button
                      onClick={() => deletePackage(pkg.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded transition-colors"
                      title="Delete Package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddSrvModal(true)}
              className="px-4 py-2 bg-champagne-500 text-obsidian-950 font-bold text-xs font-mono uppercase tracking-wider rounded hover:bg-champagne-400 transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW SERVICE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => (
              <div key={srv.id} className="bg-studio-card border border-studio-border rounded-xl overflow-hidden shadow-editorial flex flex-col justify-between">
                <div className="h-44 bg-obsidian-950 overflow-hidden relative group">
                  <img src={srv.image} alt={srv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-obsidian-900/90 text-champagne-400 px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold border border-champagne-500/30">
                    From ${srv.startingPrice}
                  </span>

                  {/* Quick Change Photo on Hover */}
                  <div className="absolute inset-0 bg-obsidian-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                    <label className="px-3 py-1.5 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 rounded text-xs font-mono uppercase font-bold tracking-wider cursor-pointer flex items-center gap-1.5 shadow-gold-glow transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleQuickSrvImage(srv, e.target.files[0]);
                            e.target.value = '';
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">
                    {srv.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-obsidian-900">{srv.name}</h3>
                  <p className="text-xs font-sans text-obsidian-800/70 line-clamp-2">{srv.description}</p>
                </div>

                <div className="p-4 border-t border-ivory-200 flex items-center gap-2 bg-ivory-50/50">
                  <button
                    onClick={() => setEditingSrv(srv)}
                    className="flex-1 py-2 bg-obsidian-900 text-ivory-50 text-xs font-mono uppercase tracking-wider rounded hover:bg-champagne-500 hover:text-obsidian-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>EDIT SERVICE</span>
                  </button>

                  <button
                    onClick={() => deleteService(srv.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <h3 className="font-serif text-2xl font-bold text-white">Edit {editingPkg.name} Package</h3>
              <button onClick={() => setEditingPkg(null)} className="text-ivory-200/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePkg} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Package Name</label>
                <input
                  type="text"
                  value={editingPkg.name}
                  onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                />
              </div>

              {/* Package Image Upload */}
              <div className="space-y-2 p-3 bg-obsidian-950/80 rounded-lg border border-obsidian-800">
                <div className="flex items-center justify-between">
                  <label className="block uppercase text-champagne-400 font-bold">Package Cover Image</label>
                  <label className="px-2.5 py-1 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold rounded cursor-pointer flex items-center gap-1 transition-colors text-[10px]">
                    <Upload className="w-3 h-3" />
                    <span>Upload from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          processImageFile(e.target.files[0], (dataUrl) => {
                            setEditingPkg((p) => ({ ...p, image: dataUrl }));
                          });
                          e.target.value = '';
                        }
                      }}
                    />
                  </label>
                </div>

                {editingPkg.image ? (
                  <div className="relative h-36 rounded overflow-hidden border border-obsidian-700 group">
                    <img src={editingPkg.image} alt={editingPkg.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setEditingPkg((p) => ({ ...p, image: '' }))}
                      className="absolute top-2 right-2 p-1 bg-rose-900/90 text-rose-200 rounded hover:bg-rose-800 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="h-24 rounded border border-dashed border-obsidian-800 flex flex-col items-center justify-center text-ivory-200/40 text-[11px]">
                    <ImageIcon className="w-5 h-5 mb-1 text-ivory-200/20" />
                    <span>No image set. Click "Upload from Device" or paste a URL below.</span>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Or paste image URL"
                  value={editingPkg.image || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, image: e.target.value })}
                  className="w-full p-2 bg-obsidian-900 border border-obsidian-800 rounded text-ivory-200 text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase mb-1 text-champagne-400">Package Price ($ USD)</label>
                  <input
                    type="number"
                    value={editingPkg.price}
                    onChange={(e) => setEditingPkg({ ...editingPkg, price: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                  />
                </div>

                <div>
                  <label className="block uppercase mb-1 text-champagne-400">Duration Description</label>
                  <input
                    type="text"
                    value={editingPkg.duration}
                    onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                    className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-obsidian-800">
                <button type="button" onClick={() => setEditingPkg(null)} className="px-4 py-2 bg-obsidian-800 text-ivory-200 rounded hover:bg-obsidian-700 transition-colors">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold rounded transition-colors shadow-gold-glow">
                  UPDATE PACKAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Package Modal */}
      {showAddPkgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <h3 className="font-serif text-2xl font-bold text-white">Add New Package Tier</h3>
              <button onClick={() => setShowAddPkgModal(false)} className="text-ivory-200/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPkg} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Package Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP DIAMOND"
                  value={newPkg.name}
                  onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                />
              </div>

              {/* Package Image Upload */}
              <div className="space-y-2 p-3 bg-obsidian-950/80 rounded-lg border border-obsidian-800">
                <div className="flex items-center justify-between">
                  <label className="block uppercase text-champagne-400 font-bold">Package Cover Image</label>
                  <label className="px-2.5 py-1 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold rounded cursor-pointer flex items-center gap-1 transition-colors text-[10px]">
                    <Upload className="w-3 h-3" />
                    <span>Upload from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          processImageFile(e.target.files[0], (dataUrl) => {
                            setNewPkg((p) => ({ ...p, image: dataUrl }));
                          });
                          e.target.value = '';
                        }
                      }}
                    />
                  </label>
                </div>

                {newPkg.image ? (
                  <div className="relative h-36 rounded overflow-hidden border border-obsidian-700">
                    <img src={newPkg.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setNewPkg((p) => ({ ...p, image: '' }))}
                      className="absolute top-2 right-2 p-1 bg-rose-900/90 text-rose-200 rounded hover:bg-rose-800 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="h-24 rounded border border-dashed border-obsidian-800 flex flex-col items-center justify-center text-ivory-200/40 text-[11px]">
                    <ImageIcon className="w-5 h-5 mb-1 text-ivory-200/20" />
                    <span>Click "Upload from Device" or paste an image URL</span>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Or paste image URL"
                  value={newPkg.image || ''}
                  onChange={(e) => setNewPkg({ ...newPkg, image: e.target.value })}
                  className="w-full p-2 bg-obsidian-900 border border-obsidian-800 rounded text-ivory-200 text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase mb-1 text-champagne-400">Price ($ USD)</label>
                  <input
                    type="number"
                    value={newPkg.price}
                    onChange={(e) => setNewPkg({ ...newPkg, price: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                  />
                </div>

                <div>
                  <label className="block uppercase mb-1 text-champagne-400">Duration</label>
                  <input
                    type="text"
                    placeholder="Full Day / 6 Hours"
                    value={newPkg.duration}
                    onChange={(e) => setNewPkg({ ...newPkg, duration: e.target.value })}
                    className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-obsidian-800">
                <button type="button" onClick={() => setShowAddPkgModal(false)} className="px-4 py-2 bg-obsidian-800 text-ivory-200 rounded hover:bg-obsidian-700 transition-colors">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold rounded transition-colors shadow-gold-glow">
                  CREATE PACKAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingSrv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <h3 className="font-serif text-2xl font-bold text-white">Edit Service</h3>
              <button onClick={() => setEditingSrv(null)} className="text-ivory-200/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSrv} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Service Name</label>
                <input
                  type="text"
                  value={editingSrv.name}
                  onChange={(e) => setEditingSrv({ ...editingSrv, name: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Starting Price ($ USD)</label>
                <input
                  type="number"
                  value={editingSrv.startingPrice}
                  onChange={(e) => setEditingSrv({ ...editingSrv, startingPrice: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Description</label>
                <textarea
                  rows="3"
                  value={editingSrv.description}
                  onChange={(e) => setEditingSrv({ ...editingSrv, description: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                />
              </div>

              {/* Service Image Upload */}
              <div className="space-y-2 p-3 bg-obsidian-950/80 rounded-lg border border-obsidian-800">
                <div className="flex items-center justify-between">
                  <label className="block uppercase text-champagne-400 font-bold">Service Cover Image</label>
                  <label className="px-2.5 py-1 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold rounded cursor-pointer flex items-center gap-1 transition-colors text-[10px]">
                    <Upload className="w-3 h-3" />
                    <span>Upload from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          processImageFile(e.target.files[0], (dataUrl) => {
                            setEditingSrv((s) => ({ ...s, image: dataUrl }));
                          });
                          e.target.value = '';
                        }
                      }}
                    />
                  </label>
                </div>

                {editingSrv.image ? (
                  <div className="relative h-36 rounded overflow-hidden border border-obsidian-700">
                    <img src={editingSrv.image} alt={editingSrv.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-24 rounded border border-dashed border-obsidian-800 flex flex-col items-center justify-center text-ivory-200/40 text-[11px]">
                    <ImageIcon className="w-5 h-5 mb-1 text-ivory-200/20" />
                    <span>No image set. Upload from device or enter URL.</span>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Or paste image URL"
                  value={editingSrv.image || ''}
                  onChange={(e) => setEditingSrv({ ...editingSrv, image: e.target.value })}
                  className="w-full p-2 bg-obsidian-900 border border-obsidian-800 rounded text-ivory-200 text-[11px]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-obsidian-800">
                <button type="button" onClick={() => setEditingSrv(null)} className="px-4 py-2 bg-obsidian-800 text-ivory-200 rounded hover:bg-obsidian-700 transition-colors">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold rounded transition-colors shadow-gold-glow">
                  UPDATE SERVICE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddSrvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <h3 className="font-serif text-2xl font-bold text-white">Add New Service</h3>
              <button onClick={() => setShowAddSrvModal(false)} className="text-ivory-200/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSrv} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drone Videography & Cinema"
                  value={newSrv.name}
                  onChange={(e) => setNewSrv({ ...newSrv, name: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Starting Price ($ USD)</label>
                <input
                  type="number"
                  value={newSrv.startingPrice}
                  onChange={(e) => setNewSrv({ ...newSrv, startingPrice: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe this service offering..."
                  value={newSrv.description}
                  onChange={(e) => setNewSrv({ ...newSrv, description: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white focus:outline-none focus:border-champagne-500"
                />
              </div>

              {/* Service Image Upload */}
              <div className="space-y-2 p-3 bg-obsidian-950/80 rounded-lg border border-obsidian-800">
                <div className="flex items-center justify-between">
                  <label className="block uppercase text-champagne-400 font-bold">Service Cover Image</label>
                  <label className="px-2.5 py-1 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold rounded cursor-pointer flex items-center gap-1 transition-colors text-[10px]">
                    <Upload className="w-3 h-3" />
                    <span>Upload from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          processImageFile(e.target.files[0], (dataUrl) => {
                            setNewSrv((s) => ({ ...s, image: dataUrl }));
                          });
                          e.target.value = '';
                        }
                      }}
                    />
                  </label>
                </div>

                {newSrv.image ? (
                  <div className="relative h-36 rounded overflow-hidden border border-obsidian-700">
                    <img src={newSrv.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-24 rounded border border-dashed border-obsidian-800 flex flex-col items-center justify-center text-ivory-200/40 text-[11px]">
                    <ImageIcon className="w-5 h-5 mb-1 text-ivory-200/20" />
                    <span>Click "Upload from Device" or paste an image URL</span>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newSrv.image || ''}
                  onChange={(e) => setNewSrv({ ...newSrv, image: e.target.value })}
                  className="w-full p-2 bg-obsidian-900 border border-obsidian-800 rounded text-ivory-200 text-[11px]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-obsidian-800">
                <button type="button" onClick={() => setShowAddSrvModal(false)} className="px-4 py-2 bg-obsidian-800 text-ivory-200 rounded hover:bg-obsidian-700 transition-colors">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 hover:bg-champagne-400 text-obsidian-950 font-bold rounded transition-colors shadow-gold-glow">
                  CREATE SERVICE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
