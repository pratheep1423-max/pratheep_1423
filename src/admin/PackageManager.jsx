import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Edit3, DollarSign, Check } from 'lucide-react';

export const PackageManager = () => {
  const { packages, updatePackage } = useApp();
  const [editingPkg, setEditingPkg] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    if (editingPkg) {
      updatePackage(editingPkg);
      setEditingPkg(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-obsidian-900">Packages & Tier Management</h1>
        <p className="text-xs font-mono text-obsidian-800/60 mt-1">Configure baseline pricing tiers, deliverables & features</p>
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

            <button
              onClick={() => setEditingPkg(pkg)}
              className="w-full py-2.5 bg-obsidian-900 text-ivory-50 text-xs font-mono uppercase tracking-wider rounded hover:bg-champagne-500 hover:text-obsidian-950 transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT PACKAGE PRICING</span>
            </button>
          </div>
        ))}
      </div>

      {/* Edit Package Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold">Edit {editingPkg.name} Package</h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
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
                  UPDATE TIER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
