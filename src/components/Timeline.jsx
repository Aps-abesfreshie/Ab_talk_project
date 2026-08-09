import React from 'react';
import { CheckCircle2, Award, ArrowUpRight, Flame, Code, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Timeline() {
  const steps = [
    {
      step: 'Step 1',
      title: 'Choose a Track',
      description: 'Select Frontend, Backend, or Full-Stack. Get curated daily roadmaps built by industry experts.',
      icon: Code,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      step: 'Step 2',
      title: 'Complete Daily Task',
      description: 'Spend 1-2 hours solving practical coding problems and building actual user interfaces.',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      step: 'Step 3',
      title: 'Push GitHub Commit',
      description: 'Keep your contribution graph green! Commit code to your public challenge repository.',
      icon: ArrowUpRight,
      color: 'from-purple-500 to-pink-500',
    },
    {
      step: 'Step 4',
      title: 'Publish LinkedIn Post',
      description: 'Build in public. Write a short breakdown of what you built, sharing your wins and blockers.',
      icon: CheckCircle2,
      color: 'from-pink-500 to-rose-500',
    },
    {
      step: 'Step 5',
      title: 'Maintain Your Streak',
      description: 'Unlock exclusive badges, climbs the global leaderboard, and get recommended to hiring teams.',
      icon: Flame,
      color: 'from-rose-500 to-orange-500',
    },
  ];

  return (
    <div className="relative max-w-lg mx-auto">
      {/* Central Timeline Rail */}
      <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800" />

      <div className="space-y-10">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-16 group"
            >
              {/* Timeline bubble */}
              <div className={`absolute left-0 top-1 w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md border-4 border-slate-50 dark:border-slate-950 group-hover:scale-105 transition-transform duration-200`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Card content */}
              <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 hover:border-primary/20 transition-all">
                <span className={`inline-block text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r ${item.color} text-white mb-2`}>
                  {item.step}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
