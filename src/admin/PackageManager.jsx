import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Edit3, Trash2, Plus, Check, Camera, DollarSign, X } from 'lucide-react';

export const PackageManager = () => {
  const {
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    services,
    addService,
    updateService,
    deleteService
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
          <p className="text-xs font-mono text-obsidian-800/60 mt-1">Full Admin control to add, edit or delete pricing tiers and photography services</p>
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
              <div key={pkg.id} className="bg-studio-card border border-studio-border rounded-xl p-6 shadow-editorial flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b pb-4 border-ivory-200">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-600 font-bold block">
                        {pkg.duration}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-obsidian-900">{pkg.name}</h3>
                    </div>
                    <span className="font-serif text-3xl font-bold text-champagne-600">${pkg.price}</span>
                  </div>

                  <ul className="py-4 space-y-2 text-xs font-mono text-obsidian-800/80">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-ivory-200">
                  <button
                    onClick={() => setEditingPkg(pkg)}
                    className="flex-1 py-2 bg-obsidian-900 text-ivory-50 text-xs font-mono uppercase tracking-wider rounded hover:bg-champagne-500 hover:text-obsidian-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>EDIT</span>
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
                <div className="h-44 bg-obsidian-950 overflow-hidden relative">
                  <img src={srv.image} alt={srv.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-obsidian-900/90 text-champagne-400 px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold border border-champagne-500/30">
                    From ${srv.startingPrice}
                  </span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold">Edit {editingPkg.name} Package</h3>

            <form onSubmit={handleSavePkg} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Package Name</label>
                <input
                  type="text"
                  value={editingPkg.name}
                  onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Package Price ($ USD)</label>
                <input
                  type="number"
                  value={editingPkg.price}
                  onChange={(e) => setEditingPkg({ ...editingPkg, price: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Duration Description</label>
                <input
                  type="text"
                  value={editingPkg.duration}
                  onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingPkg(null)} className="px-4 py-2 bg-obsidian-800 rounded">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 text-obsidian-950 font-bold rounded">
                  UPDATE PACKAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Package Modal */}
      {showAddPkgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold">Add New Package Tier</h3>

            <form onSubmit={handleAddPkg} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Package Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP DIAMOND"
                  value={newPkg.name}
                  onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Price ($ USD)</label>
                <input
                  type="number"
                  value={newPkg.price}
                  onChange={(e) => setNewPkg({ ...newPkg, price: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Duration</label>
                <input
                  type="text"
                  placeholder="Full Day / 6 Hours"
                  value={newPkg.duration}
                  onChange={(e) => setNewPkg({ ...newPkg, duration: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddPkgModal(false)} className="px-4 py-2 bg-obsidian-800 rounded">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 text-obsidian-950 font-bold rounded">
                  CREATE PACKAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingSrv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold">Edit Service</h3>

            <form onSubmit={handleSaveSrv} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Service Name</label>
                <input
                  type="text"
                  value={editingSrv.name}
                  onChange={(e) => setEditingSrv({ ...editingSrv, name: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Starting Price ($ USD)</label>
                <input
                  type="number"
                  value={editingSrv.startingPrice}
                  onChange={(e) => setEditingSrv({ ...editingSrv, startingPrice: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Description</label>
                <textarea
                  rows="3"
                  value={editingSrv.description}
                  onChange={(e) => setEditingSrv({ ...editingSrv, description: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Image URL</label>
                <input
                  type="url"
                  value={editingSrv.image}
                  onChange={(e) => setEditingSrv({ ...editingSrv, image: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingSrv(null)} className="px-4 py-2 bg-obsidian-800 rounded">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 text-obsidian-950 font-bold rounded">
                  UPDATE SERVICE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddSrvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold">Add New Service</h3>

            <form onSubmit={handleAddSrv} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drone Videography & Cinema"
                  value={newSrv.name}
                  onChange={(e) => setNewSrv({ ...newSrv, name: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Starting Price ($ USD)</label>
                <input
                  type="number"
                  value={newSrv.startingPrice}
                  onChange={(e) => setNewSrv({ ...newSrv, startingPrice: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe this service offering..."
                  value={newSrv.description}
                  onChange={(e) => setNewSrv({ ...newSrv, description: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newSrv.image}
                  onChange={(e) => setNewSrv({ ...newSrv, image: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddSrvModal(false)} className="px-4 py-2 bg-obsidian-800 rounded">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 text-obsidian-950 font-bold rounded">
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
