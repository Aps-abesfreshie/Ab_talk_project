import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Menu, X, Code, ArrowRight, LogOut, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { theme, toggleTheme, isAuthenticated, user, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  
  const navigate = useNavigate();
  const location = useLocation();

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + sectionId);
      // Wait for navigation then scroll
      setTimeout(() => {
        const el = document.querySelector(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-glow-primary group-hover:scale-105 transition-transform duration-200">
            <Code className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            ABTalks <span className="text-primary">60D</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => handleNavClick('#about')}
            className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('#challenge')}
            className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
          >
            Challenge
          </button>
          <button
            onClick={() => handleNavClick('#faq')}
            className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 transition-colors border border-transparent dark:border-slate-850"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-850 hover:border-primary/30 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-[11px] font-extrabold">
                  {user.name?.[0]?.toUpperCase() || 'S'}
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-900 dark:hover:bg-rose-950/30 text-slate-500 hover:text-rose-500 transition-colors border border-transparent dark:border-slate-850"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => openAuth('login')}
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
              >
                Login
              </button>

              <button
                onClick={() => openAuth('signup')}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark rounded-xl shadow-md hover:shadow-primary/20 hover-lift"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Mobile controls (hamburger & theme toggler) */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-6 flex flex-col gap-5 shadow-inner"
          >
            <nav className="flex flex-col gap-4 text-base font-semibold">
              <button
                onClick={() => handleNavClick('#about')}
                className="text-left py-1 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('#challenge')}
                className="text-left py-1 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
              >
                Challenge
              </button>
              <button
                onClick={() => handleNavClick('#faq')}
                className="text-left py-1 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
              >
                FAQ
              </button>
            </nav>

            <div className="h-px bg-slate-100 dark:bg-slate-900" />

            <div className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xs font-extrabold">
                      {user.name?.[0]?.toUpperCase() || 'S'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-500">{user.track}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 text-white bg-gradient-to-r from-primary to-accent font-semibold text-sm rounded-xl shadow-md"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-rose-500 font-semibold text-sm rounded-xl border border-rose-200 dark:border-rose-900/40"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuth('login')}
                    className="w-full text-center py-2.5 text-slate-700 dark:text-slate-300 hover:text-primary font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-850"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuth('signup')}
                    className="w-full text-center py-2.5 text-white bg-gradient-to-r from-primary to-accent font-semibold text-sm rounded-xl shadow-md"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </header>
  );
}
