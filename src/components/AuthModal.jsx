import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Code2, Zap, ArrowRight, Loader2 } from 'lucide-react';

const TRACKS = ['Frontend Engineering', 'Backend Architecture', 'Full-Stack JavaScript', 'AI Engineering'];

export default function AuthModal({ open, onClose, initialMode = 'login' }) {
  const { login } = useApp();
  const navigate = useNavigate();

  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [track, setTrack] = useState(TRACKS[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError('');
      setLoading(false);
    }
  }, [open, initialMode]);

  if (!open) return null;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && name.trim().length < 2) {
      setError('Enter your full name to create a profile.');
      return;
    }
    if (!emailValid) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setLoading(true);
    // Simulate a network round-trip so the flow feels real (no backend needed per spec).
    setTimeout(() => {
      login({
        name: mode === 'signup' ? name.trim() : email.split('@')[0],
        email,
        track: mode === 'signup' ? track : 'Frontend Engineering',
        isNew: mode === 'signup'
      });
      setLoading(false);
      onClose();
      navigate('/dashboard');
    }, 600);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login({ name: 'Abhay', email: 'abhay@demo.dev', track: 'Frontend Engineering', isNew: false });
      setLoading(false);
      onClose();
      navigate('/dashboard');
    }, 350);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-800 shadow-2xl p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-glow-primary mb-4">
            <Code2 className="w-5.5 h-5.5" />
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Start your 60-day streak'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
            {mode === 'login'
              ? 'Log in to continue tracking your daily proof of work.'
              : 'Create your profile and pick a track. Takes 20 seconds.'}
          </p>

          {/* Mode Switch */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-850 rounded-xl mb-5">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'login' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'signup' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Get Started
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-slate-100/60 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none dark:text-white"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="w-full bg-slate-100/60 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none dark:text-white"
              />
            </div>

            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-100/60 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none dark:text-white"
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 mt-1">
                  Choose a track
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TRACKS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTrack(t)}
                      className={`text-left px-2.5 py-2 rounded-lg text-[10px] font-bold border transition-all ${
                        track === t
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : 'bg-slate-50 dark:bg-slate-850/40 border-slate-200 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="text-[10px] text-rose-500 font-semibold bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 text-xs font-extrabold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark rounded-xl shadow-md hover:shadow-primary/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Log In' : 'Create Profile & Start'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full mt-3 py-2.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Quick Demo Login (skip the form)</span>
          </button>

          <p className="text-[9px] text-slate-400 text-center mt-4 leading-relaxed">
            This is a hackathon prototype — no real accounts or passwords are stored anywhere.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
