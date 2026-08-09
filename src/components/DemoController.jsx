import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, ShieldAlert, Sparkles, AlertCircle, Award, CheckCircle, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoController() {
  const { demoMode, setDemoMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const states = [
    { id: 'active', label: 'Active Challenge', icon: Sparkles, color: 'text-indigo-500' },
    { id: 'new', label: 'New Student (Empty)', icon: ShieldAlert, color: 'text-cyan-500' },
    { id: 'no-streak', label: 'No Streak (0 Days)', icon: Flame, color: 'text-gray-400' },
    { id: 'missed-yesterday', label: 'Missed Yesterday', icon: AlertCircle, color: 'text-red-500' },
    { id: 'empty-achievements', label: 'Empty Badges', icon: Award, color: 'text-purple-500' },
    { id: 'no-submissions', label: 'No Submissions', icon: CheckCircle, color: 'text-emerald-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-72 glass-panel-heavy rounded-2xl p-4 shadow-2xl border border-slate-200/50 dark:border-slate-800/80"
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Settings className="w-4 h-4 text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
              <h4 className="font-semibold text-xs text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Edge Case Demo Panel
              </h4>
            </div>
            
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">
              Use this controller to dynamically toggle mock states and verify empty states or layout variants.
            </p>

            <div className="flex flex-col gap-1.5">
              {states.map((st) => {
                const Icon = st.icon;
                const isSelected = demoMode === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setDemoMode(st.id)}
                    className={`w-full flex items-center justify-between text-left text-xs font-medium px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-slate-800 dark:text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${st.color}`} />
                      <span>{st.label}</span>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-white rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold text-xs tracking-wide"
      >
        <Settings className={`w-4 h-4 ${isOpen ? 'rotate-90' : ''} transition-transform duration-300`} />
        <span>Demo Controls</span>
      </button>
    </div>
  );
}
