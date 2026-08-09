import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable empty-state block used across Dashboard, BadgeCard, Activity Feed, etc.
 * Keeps every "nothing here yet" moment on-brand instead of a blank hole in the UI.
 */
export default function EmptyState({ icon: Icon, title, description, dashed = true, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center ${compact ? 'py-6 px-3' : 'py-8 px-4'} ${
        dashed ? 'border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl' : ''
      }`}
    >
      {Icon && (
        <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
      )}
      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300">{title}</h4>
      {description && (
        <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-[220px] mt-1 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
