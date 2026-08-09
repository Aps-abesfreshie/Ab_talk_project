import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className="glass-panel p-6 md:p-8 rounded-2xl text-left border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group hover:border-primary/20 dark:hover:border-primary/30"
    >
      {/* Absolute glow backing */}
      <div className={`absolute -right-10 -top-10 w-28 h-28 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300`} />

      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center text-white mb-6 shadow-md`}>
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
