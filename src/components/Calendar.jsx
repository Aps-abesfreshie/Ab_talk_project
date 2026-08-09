import React from 'react';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Calendar() {
  const { student, demoMode } = useApp();
  
  const completed = student.completedDays || [];
  const totalDays = student.totalDays || 60;
  
  // Decide which day is "Today". 
  // If it's a new student, Day 1 is today. Otherwise, Day 12.
  const today = demoMode === 'new' ? 1 : 12;

  // Render 60 circles
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-850">
        <CalendarIcon className="w-4 h-4 text-primary" />
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
          Challenge Progress Calendar
        </h3>
      </div>

      <div className="grid grid-cols-6 xs:grid-cols-8 sm:grid-cols-10 gap-2">
        {days.map((day) => {
          const isCompleted = completed.includes(day);
          const isToday = day === today;
          const isFuture = day > today;

          let bgClass = 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800';
          if (isCompleted) {
            bgClass = 'bg-success text-white border border-success-dark shadow-sm';
          } else if (isToday) {
            bgClass = 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-white border-2 border-primary shadow-glow-primary animate-pulse';
          }

          return (
            <div
              key={day}
              className={`relative flex items-center justify-center rounded-full aspect-square text-xs font-bold transition-all duration-200 group cursor-default`}
            >
              {/* Day circle */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${bgClass}`}>
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3px]" />
                ) : (
                  <span>{day}</span>
                )}
              </div>

              {/* Simple Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-20 bg-slate-950 text-white text-[9px] px-2.5 py-1 rounded shadow-lg whitespace-nowrap">
                {isCompleted ? `Day ${day}: Completed` : isToday ? `Day ${day}: Active Today` : `Day ${day}: Locked`}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-850 text-[10px] font-semibold text-slate-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border-2 border-primary" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
          <span>Future Tasks</span>
        </div>
      </div>
    </div>
  );
}
