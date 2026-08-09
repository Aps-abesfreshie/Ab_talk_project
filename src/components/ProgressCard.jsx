import React from 'react';
import { Flame, Target, Trophy, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgressCard({ student, demoMode }) {
  const isMissed = demoMode === 'missed-yesterday';
  const isNew = demoMode === 'new';
  const isNoStreak = demoMode === 'no-streak';

  // Stats definition
  const stats = [
    {
      id: 'streak',
      title: 'Current Streak',
      value: isMissed ? 'Broken ❄️' : `${student.streak} Days`,
      detail: isMissed 
        ? 'Missed yesterday! Solve catch-up.' 
        : isNew 
        ? 'No streak active.' 
        : 'Keep committing daily!',
      icon: Flame,
      color: isMissed 
        ? 'from-red-500 to-rose-600 shadow-rose-500/20' 
        : isNew || isNoStreak
        ? 'from-slate-400 to-slate-500 shadow-slate-400/20'
        : 'from-orange-500 to-red-500 shadow-orange-500/20',
      glow: isMissed ? 'rgba(239, 68, 68, 0.4)' : isNew || isNoStreak ? 'rgba(100, 116, 139, 0.2)' : 'rgba(249, 115, 22, 0.4)'
    },
    {
      id: 'xp',
      title: 'Total XP Earned',
      value: `${student.xp} XP`,
      detail: isNew ? 'Join a track to earn XP' : `Level ${Math.floor(student.xp / 500) + 1} Coder`,
      icon: Sparkles,
      color: 'from-cyan-400 to-blue-500 shadow-cyan-400/20',
      glow: 'rgba(6, 182, 212, 0.4)'
    },
    {
      id: 'rank',
      title: 'Global Rank',
      value: student.rank === 'Unranked' ? 'Unranked' : `#${student.rank}`,
      detail: isNew ? 'Complete tasks to enter board' : 'Top 8% this week',
      icon: Trophy,
      color: 'from-yellow-400 to-amber-500 shadow-yellow-400/20',
      glow: 'rgba(234, 179, 8, 0.4)'
    },
    {
      id: 'progress',
      title: 'Task Progress',
      value: `${student.progress} / ${student.totalDays}`,
      detail: `${Math.round((student.progress / student.totalDays) * 100)}% Completed`,
      icon: TrendingUp,
      color: 'from-emerald-400 to-teal-500 shadow-emerald-400/20',
      glow: 'rgba(34, 197, 94, 0.4)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden flex flex-col justify-between text-left group"
          >
            {/* Soft decorative glow behind the card */}
            <div 
              className="absolute -right-8 -bottom-8 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: stat.glow }}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {stat.title}
                </span>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </h3>
            </div>

            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-2 truncate">
              {stat.detail}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
