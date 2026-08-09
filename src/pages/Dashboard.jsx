import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressCard from '../components/ProgressCard';
import BadgeCard from '../components/BadgeCard';
import Calendar from '../components/Calendar';
import TaskCard from '../components/TaskCard';
import DemoController from '../components/DemoController';
import BottomNav from '../components/BottomNav';
import EmptyState from '../components/EmptyState';
import { Sparkles, Calendar as CalIcon, Award, MessageSquare, Flame, AlertCircle, Quote, Github, Linkedin, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { student, demoMode, theme, user, isAuthenticated, shareToLinkedIn } = useApp();
  const [activeBar, setActiveBar] = useState(null);

  // Mock Weekly Chart data: hours spent coding per day
  const weeklyChartData = [
    { day: 'Mon', hours: 1.5, height: '40%' },
    { day: 'Tue', hours: 2.2, height: '60%' },
    { day: 'Wed', hours: 1.8, height: '50%' },
    { day: 'Thu', hours: 0.8, height: '25%' },
    { day: 'Fri', hours: 2.5, height: '70%' },
    { day: 'Sat', hours: 3.2, height: '90%' },
    { day: 'Sun', hours: 1.2, height: '35%' },
  ];

  // Rotate a quote based on current date index or demoMode
  const quote = student.quotes[demoMode === 'new' ? 1 : 0] || student.quotes[0];

  const isMissed = demoMode === 'missed-yesterday';
  const isNew = demoMode === 'new';
  const displayName = isNew ? (user?.name || 'New Developer') : (user?.name || student.name);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16 md:pb-0">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Warning Banner: Missed Yesterday */}
        {isMissed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-left"
          >
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 animate-bounce" />
            <div>
              <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400">
                Streak Freeze Active!
              </h4>
              <p className="text-[10px] text-rose-700/80 dark:text-rose-400/80 leading-relaxed">
                You missed Day 11 yesterday. Complete the Day 11 catch-up task to restore your streak before it resets to zero!
              </p>
            </div>
          </motion.div>
        )}

        {/* Top Greeting */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 text-left">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 m-0">
              <span>Good Evening, {isNew ? 'New Developer' : displayName}</span>
              <span className="animate-wiggle">👋</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isNew 
                ? 'Welcome! Complete your first challenge to initiate your streak.' 
                : 'Ready to build in public? Track your metrics and commit logs below.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frontend Track</span>
          </div>
        </div>

        {/* Global Progress Metrics Grid */}
        <section className="mb-6">
          <ProgressCard student={student} demoMode={demoMode} />
        </section>

        {/* Real function: one-tap LinkedIn proof-of-work share */}
        {!isNew && student.streak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-600/10 via-primary/10 to-accent/10 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                <Linkedin className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  Post today's proof of work in one tap
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed max-w-sm">
                  We'll auto-write your caption with your streak and today's build — no typing required.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                shareToLinkedIn({
                  day: student.progress || 12,
                  title: 'Weather Dashboard',
                  streak: student.streak
                })
              }
              className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-md"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share to LinkedIn</span>
            </button>
          </motion.div>
        )}

        {/* Main Dashboard Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Today's Task & Calendar */}
          <div className="lg:col-span-8 space-y-6">
            <TaskCard />
            
            {/* Weekly Progress Chart */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-850">
                <CalIcon className="w-4 h-4 text-primary" />
                <span>Weekly Coding Activity</span>
              </h3>

              {isNew ? (
                <EmptyState
                  icon={CalIcon}
                  dashed={false}
                  title="No Activity Recorded"
                  description="Once you push code, your weekly coding session log will display here."
                />
              ) : (
                /* Premium Column Bar Graph */
                <div className="flex items-end justify-between h-40 pt-4 px-2 relative">
                  {weeklyChartData.map((bar, i) => (
                    <div key={i} className="flex flex-col items-center flex-grow group relative cursor-pointer">
                      {/* Bar Container */}
                      <div className="w-8 sm:w-10 bg-slate-100 dark:bg-slate-900 rounded-lg h-32 flex items-end overflow-hidden border border-slate-200/20">
                        {/* Interactive fill */}
                        <div
                          style={{ height: bar.height }}
                          className={`w-full bg-gradient-to-t from-primary to-accent rounded-b-lg transition-all duration-500 group-hover:brightness-110 chart-bar-glow`}
                        />
                      </div>
                      
                      {/* Day Label */}
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-2">
                        {bar.day}
                      </span>

                      {/* Tooltip on Hover */}
                      <div className="absolute bottom-full mb-1 bg-slate-950 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {bar.hours} hrs
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Calendar />
          </div>

          {/* Right Column: Badges, Recent Activity, Quote */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Achievements/Badges Panel */}
            <BadgeCard />

            {/* Recent Activity Feed */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-850">
                <CalIcon className="w-4 h-4 text-primary" />
                <span>Recent Activity</span>
              </h3>

              {isNew || student.recentActivity.length === 0 ? (
                <EmptyState
                  icon={Flame}
                  compact
                  title="No Submissions"
                  description="Submit Day 12's weather dashboard to log your first GitHub commit."
                />
              ) : (
                /* Activity List items */
                <div className="space-y-4">
                  {student.recentActivity.map((activity, idx) => {
                    let IconComp = Flame;
                    let iconColor = 'text-primary';
                    if (activity.type === 'commit') {
                      IconComp = Github;
                      iconColor = 'text-slate-800 dark:text-slate-200';
                    } else if (activity.type === 'linkedin') {
                      IconComp = Linkedin;
                      iconColor = 'text-blue-500';
                    } else if (activity.type === 'reflection') {
                      IconComp = MessageSquare;
                      iconColor = 'text-purple-500';
                    }

                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850/50 flex items-center justify-center flex-shrink-0">
                          <IconComp className={`w-3.5 h-3.5 ${iconColor}`} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-bold text-slate-900 dark:text-slate-200">
                              {activity.title}
                            </h4>
                            <span className="text-[8px] text-slate-400 font-medium">
                              {activity.time}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed break-words line-clamp-2">
                            {activity.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Motivational Quote Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left relative overflow-hidden bg-gradient-to-br from-indigo-500/5 to-cyan-500/5">
              <Quote className="absolute right-4 top-4 w-12 h-12 text-primary/10 -z-10" />
              <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-primary mb-3">
                Daily Motivation
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-350 italic leading-relaxed mb-4">
                "{quote.text}"
              </p>
              <p className="text-[10px] font-bold text-slate-900 dark:text-slate-200">
                — {quote.author}
              </p>
            </div>

          </div>
        </div>
      </main>

      <BottomNav />

      <Footer />
      <DemoController />
    </div>
  );
}
