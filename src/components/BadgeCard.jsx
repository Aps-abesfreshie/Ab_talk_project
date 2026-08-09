import React from 'react';
import * as Icons from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Lock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import EmptyState from './EmptyState';

export default function BadgeCard() {
  const { student, demoMode } = useApp();
  
  const hasBadges = student.badges && student.badges.length > 0;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-850">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          <span>Earned Badges & Achievements</span>
        </h3>
        <span className="text-[10px] font-bold text-slate-400">
          {hasBadges ? `${student.badges.length} / ${student.allAvailableBadges.length}` : '0 / 6'} Unlocked
        </span>
      </div>

      {!hasBadges ? (
        <EmptyState
          icon={Lock}
          title="No Badges Unlocked Yet"
          description="Streaks, late-night commits, and social shares unlock premium badges. Complete today's task to start!"
        />
      ) : (
        /* Achievements Grid */
        <div className="grid grid-cols-3 gap-3">
          {student.allAvailableBadges.map((badge) => {
            const isUnlocked = student.badges.some(b => b.id === badge.id);
            // Dynamically lookup the icon component
            const LucideIcon = Icons[badge.icon] || Icons.Award;

            return (
              <motion.div
                key={badge.id}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                className={`relative rounded-xl p-3 flex flex-col items-center text-center transition-all ${
                  isUnlocked
                    ? `bg-gradient-to-br ${badge.color}/10 border border-slate-200/50 dark:border-slate-800/40 shadow-sm cursor-pointer`
                    : 'bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200/20 dark:border-slate-850/20 opacity-40 select-none'
                }`}
              >
                {/* Lock icon overlay for locked achievements */}
                {!isUnlocked && (
                  <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <Lock className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                )}

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 text-white shadow-sm ${
                    isUnlocked ? `bg-gradient-to-tr ${badge.color}` : 'bg-slate-300 dark:bg-slate-800'
                  }`}
                >
                  <LucideIcon className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {badge.name}
                </span>

                <span className="text-[8px] text-slate-400 dark:text-slate-500 leading-normal mt-1 block h-5 overflow-hidden">
                  {badge.description}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
