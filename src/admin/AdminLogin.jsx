import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

export const AdminLogin = () => {
  const { loginAdmin, navigateTo } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username/email and password.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const res = await loginAdmin(username, password);
      if (!res.success) {
        setError(res.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setError('An unexpected login error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-ivory-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Subtle Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-champagne-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-champagne-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-obsidian-900 border border-champagne-500/30 rounded-2xl p-8 md:p-10 shadow-2xl relative z-10 backdrop-blur-xl"
      >
        {/* Logo & Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 bg-obsidian-950 border border-champagne-500/50 text-champagne-400 rounded-2xl flex items-center justify-center mx-auto shadow-gold-glow">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-champagne-400 font-bold block mt-3">
              RESTRICTED ACCESS PORTAL
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white mt-1">
              Studio Admin Portal
            </h1>
            <p className="text-xs text-ivory-200/60 font-mono mt-1">
              Sign in with credentials to manage reservations & studio content
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username / Email */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ivory-200/80 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-ivory-200/40" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@2mpictures.com"
                className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-obsidian-800 rounded-lg text-sm text-white focus:outline-none focus:border-champagne-500 font-mono transition-colors"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ivory-200/80 mb-1.5">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-ivory-200/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-obsidian-950 border border-obsidian-800 rounded-lg text-sm text-white focus:outline-none focus:border-champagne-500 font-mono transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-ivory-200/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-champagne-500 text-obsidian-950 font-semibold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-champagne-400 transition-all shadow-gold-glow flex items-center justify-center gap-2 mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & ENTER'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Back to Client Site */}
        <div className="mt-8 pt-6 border-t border-obsidian-800 text-center">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-mono text-ivory-200/60 hover:text-champagne-400 flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Customer Website</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
