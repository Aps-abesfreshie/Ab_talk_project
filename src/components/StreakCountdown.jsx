import React, { useState, useEffect } from 'react';
import { Clock, Flame, CheckCircle2 } from 'lucide-react';

/**
 * Thoughtful idea: ABTalks students code late at night after college and lose streaks
 * simply by falling asleep before submitting. This widget shows a live countdown to
 * midnight (local time) so "how much time do I have left tonight?" is answered at a
 * glance — turning a silent deadline into a visible, motivating one.
 */
export default function StreakCountdown({ submitted = false, compact = false }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diffMs = midnight - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 30000);
    return () => clearInterval(id);
  }, []);

  const urgent = timeLeft.hours < 3;

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-2.5 rounded-xl border ${
          compact ? 'p-2.5' : 'p-3.5'
        } bg-success/5 border-success/20 text-left`}
      >
        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
        <div>
          <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Streak secured for today</p>
          <p className="text-[9px] text-slate-500 dark:text-slate-400">You've already submitted — rest easy tonight.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border text-left ${compact ? 'p-2.5' : 'p-3.5'} ${
        urgent
          ? 'bg-rose-500/5 border-rose-500/20'
          : 'bg-primary/5 border-primary/20'
      }`}
    >
      {urgent ? (
        <Flame className="w-4 h-4 text-rose-500 flex-shrink-0 animate-pulse" />
      ) : (
        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
      )}
      <div>
        <p className={`text-[10px] font-bold ${urgent ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
          {timeLeft.hours}h {timeLeft.minutes}m left to submit today
        </p>
        <p className="text-[9px] text-slate-500 dark:text-slate-400">
          {urgent ? "Don't lose your streak — submit before midnight!" : 'Ship today\'s proof of work before the day resets.'}
        </p>
      </div>
    </div>
  );
}
