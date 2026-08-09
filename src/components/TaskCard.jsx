import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Code, ChevronRight, Award, Zap, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StreakCountdown from './StreakCountdown';

export default function TaskCard() {
  const { challenges, demoMode, day12Submission } = useApp();
  
  // Decide active task day. 
  // If 'new' student, Day 1 is current. Otherwise, Day 12 is active.
  const activeDay = demoMode === 'new' ? 1 : 12;
  const currentTask = challenges.find(c => c.day === activeDay) || challenges[0];

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-250/20';
      case 'medium':
        return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-250/20';
      case 'hard':
        return 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border-rose-250/20';
      default:
        return 'bg-slate-50 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200/20';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left relative overflow-hidden group">
      {/* Decorative layout accent */}
      <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full -z-10" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Today's Challenge
          </span>
        </div>
        <span className="text-xs font-extrabold text-primary">
          Day {currentTask.day} of 60
        </span>
      </div>

      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        {currentTask.title}
      </h3>

      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
        {currentTask.objective}
      </p>

      {/* Meta Indicators */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getDifficultyColor(currentTask.difficulty)}`}>
          <BookOpen className="w-3.5 h-3.5" />
          <span>{currentTask.difficulty}</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-semibold border border-transparent dark:border-slate-850">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentTask.estimatedTime}</span>
        </div>
      </div>

      {/* Thoughtful idea: live countdown to midnight so late-night coders never lose a streak by surprise */}
      <div className="mb-5">
        <StreakCountdown submitted={demoMode === 'active' && day12Submission.submitted} compact />
      </div>

      {/* Button trigger */}
      <Link
        to={demoMode === 'new' ? '/day/12' : `/day/${currentTask.day}`}
        className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-extrabold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark rounded-xl shadow-md hover:shadow-primary/20 hover-lift text-center"
      >
        <span>{demoMode === 'new' ? 'Start Challenge' : 'Continue Challenge'}</span>
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
