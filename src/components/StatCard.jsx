import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group"
    >
      {/* Glow highlight */}
      <div className={`absolute -right-6 -bottom-6 w-20 h-20 bg-gradient-to-tr ${color} opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500`} />

      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center text-white mb-4 shadow-md`}>
        <Icon className="w-5 h-5" />
      </div>

      <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
        {value}
      </span>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}
