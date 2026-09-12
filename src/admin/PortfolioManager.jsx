import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, Star, Image as ImageIcon, X } from 'lucide-react';

export const PortfolioManager = () => {
  const { portfolio, addPortfolioItem, deletePortfolioItem, toggleFeaturedPortfolio } = useApp();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    location: '',
    description: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;
    addPortfolioItem(newItem);
    setShowAddModal(false);
    setNewItem({
      title: '',
      category: 'Weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      location: '',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-obsidian-900">Portfolio Gallery Manager</h1>
          <p className="text-xs font-mono text-obsidian-800/60 mt-1">Upload, feature, or remove fine art story publications</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-champagne-500 text-obsidian-950 font-semibold text-xs font-mono uppercase tracking-wider rounded hover:bg-champagne-400 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>ADD PORTFOLIO STORY</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <div key={item.id} className="bg-studio-card border border-studio-border rounded-lg overflow-hidden shadow-editorial flex flex-col justify-between">
            <div className="relative h-48 bg-obsidian-900">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <button
                onClick={() => toggleFeaturedPortfolio(item.id)}
                className={`absolute top-3 right-3 p-2 rounded-full border shadow-sm transition-colors ${
                  item.featured
                    ? 'bg-champagne-500 text-obsidian-950 border-champagne-400'
                    : 'bg-obsidian-900/80 text-ivory-200 border-ivory-100/20'
                }`}
                title="Toggle Featured"
              >
                <Star className={`w-4 h-4 ${item.featured ? 'fill-obsidian-950' : ''}`} />
              </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 text-ivory-50 border border-champagne-500/40 rounded-xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-ivory-200/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl font-bold">Add Portfolio Image</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase mb-1 text-champagne-400">Story Title</label>
                <input
                  type="text"
                  required
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. Royal Venetian Gala"
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                >
                  <option value="Weddings">Weddings</option>
                  <option value="Pre-Wedding">Pre-Wedding</option>
                  <option value="Birthdays">Birthdays</option>
                  <option value="Portraits">Portraits</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Events">Events</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Image URL</label>
                <input
                  type="text"
                  required
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Location</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  placeholder="e.g. Venice, Italy"
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block uppercase mb-1 text-champagne-400">Description</label>
                <textarea
                  rows="3"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-obsidian-800 rounded text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-obsidian-800 rounded">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2 bg-champagne-500 text-obsidian-950 font-bold rounded">
                  SAVE STORY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
