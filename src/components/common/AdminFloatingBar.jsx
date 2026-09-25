import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Edit, Layers, Camera, LogOut, Settings, LayoutDashboard } from 'lucide-react';

export const AdminFloatingBar = () => {
  const { isAdminAuthenticated, navigateTo, setAdminTab, logoutAdmin, adminUser } = useApp();

  if (!isAdminAuthenticated) return null;

  const handleOpenTab = (tab) => {
    setAdminTab(tab);
    navigateTo('admin');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-obsidian-950/95 border-b border-champagne-500/40 text-ivory-50 px-4 py-2 shadow-2xl backdrop-blur-md flex items-center justify-between text-xs font-mono">
      <div className="flex items-center gap-3">
        <span className="px-2 py-0.5 bg-champagne-500 text-obsidian-950 font-bold rounded text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-gold-glow">
          <ShieldCheck className="w-3.5 h-3.5" />
          ADMIN EDIT ACCESS
        </span>
        <span className="hidden sm:inline text-ivory-200/80 text-[11px]">
          Logged in as: <strong className="text-champagne-300">{adminUser?.name || 'Studio Director'}</strong>
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto py-0.5">
        <button
          onClick={() => handleOpenTab('settings')}
          className="px-2.5 py-1 bg-obsidian-900 border border-champagne-500/30 hover:border-champagne-400 text-champagne-300 hover:text-white rounded text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition-all whitespace-nowrap"
          title="Edit Hero Title, Subtitle, About, Contact & Site Content"
        >
          <Edit className="w-3 h-3" />
          <span>Edit Site Copy & Hero</span>
        </button>

        <button
          onClick={() => handleOpenTab('packages')}
          className="px-2.5 py-1 bg-obsidian-900 border border-obsidian-700 hover:border-champagne-400 text-ivory-200 hover:text-white rounded text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition-all whitespace-nowrap"
          title="Manage Services and Packages"
        >
          <Layers className="w-3 h-3 text-champagne-400" />
          <span>Packages & Services</span>
        </button>

        <button
          onClick={() => handleOpenTab('portfolio')}
          className="px-2.5 py-1 bg-obsidian-900 border border-obsidian-700 hover:border-champagne-400 text-ivory-200 hover:text-white rounded text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition-all whitespace-nowrap"
          title="Manage Portfolio Showcase"
        >
          <Camera className="w-3 h-3 text-champagne-400" />
          <span>Portfolio</span>
        </button>

        <button
          onClick={() => handleOpenTab('dashboard')}
          className="px-2.5 py-1 bg-champagne-500 text-obsidian-950 hover:bg-champagne-400 font-bold rounded text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all whitespace-nowrap"
        >
          <LayoutDashboard className="w-3 h-3" />
          <span>Control Center</span>
        </button>

        <button
          onClick={logoutAdmin}
          className="px-2 py-1 bg-rose-950/60 border border-rose-700/60 hover:bg-rose-900 text-rose-300 rounded text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition-all ml-1"
          title="Logout Admin Session"
        >
          <LogOut className="w-3 h-3" />
          <span className="hidden md:inline">Exit Admin</span>
        </button>
      </div>
    </div>
  );
};
