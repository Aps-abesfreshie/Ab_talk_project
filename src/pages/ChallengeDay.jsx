import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubmissionForm from '../components/SubmissionForm';
import DemoController from '../components/DemoController';
import BottomNav from '../components/BottomNav';
import StreakCountdown from '../components/StreakCountdown';
import { 
  ChevronLeft, BookOpen, Clock, Lightbulb, Play, CheckCircle2, 
  HelpCircle, ArrowRight, BookOpen as BookIcon 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChallengeDay() {
  const { challenges, handleCheckboxToggle, demoMode, day12Submission } = useApp();
  const [showHint, setShowHint] = useState(false);

  // We are on Day 12
  const dayNum = 12;
  const challenge = challenges.find(c => c.day === dayNum) || challenges[0];

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-500/10';
      case 'medium':
        return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-500/10';
      case 'hard':
        return 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border-rose-500/10';
      default:
        return 'bg-slate-50 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16 md:pb-0">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Back navigation */}
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Challenge Header Block */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left mb-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tl-full -z-10" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              Challenge Day {challenge.day}
            </span>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getDifficultyColor(challenge.difficulty)}`}>
                <span>{challenge.difficulty}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{challenge.estimatedTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight m-0">
            {challenge.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            {challenge.objective}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: checklist and description */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Checklist */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2 pb-2 border-b border-slate-100 dark:border-slate-850">
                Task Checklist
              </h3>
              <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">
                Check off tasks as you build them. Complete all deliverables to unlock today's XP points.
              </p>

              <div className="space-y-3">
                {challenge.checklist && challenge.checklist.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      item.completed
                        ? 'bg-success/5 border-success/20 dark:border-success/30 text-slate-800 dark:text-slate-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleCheckboxToggle(challenge.day, item.id)}
                      className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary focus:ring-opacity-25"
                    />
                    <div className="flex-grow">
                      <span className={`text-xs font-semibold ${item.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                        {item.text}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">
                Learning Outcomes
              </h3>
              <div className="flex flex-wrap gap-2">
                {challenge.learningOutcomes && challenge.learningOutcomes.map((outcome, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-slate-850 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400"
                  >
                    {outcome}
                  </span>
                ))}
              </div>
            </div>

            {/* Hint Section */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
              <button
                onClick={() => setShowHint(!showHint)}
                className="w-full flex items-center justify-between font-bold text-sm text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4.5 h-4.5 text-yellow-500" />
                  <span>Hints & Tips</span>
                </div>
                <span className="text-[10px] text-primary">{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>

              {showHint && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-850 text-xs text-slate-650 dark:text-slate-450 leading-relaxed"
                >
                  <p className="mb-2">
                    {challenge.hint}
                  </p>
                  <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg text-[10px] font-mono overflow-x-auto text-slate-700 dark:text-slate-350">
                    {`try {
  const response = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=YOUR_API_KEY\`);
  if (!response.ok) throw new Error('City not found');
  const data = await response.json();
  // Update state with weather details
} catch (error) {
  setError(error.message);
}`}
                  </pre>
                </motion.div>
              )}
            </div>

          </div>

          {/* Right Column: submission & resources */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Challenge Progress */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Global Challenge Progress
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {dayNum} / 60 Days
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200/10">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${(dayNum / 60) * 100}%` }}
                />
              </div>
            </div>

            {/* Live countdown — thoughtful late-night nudge */}
            <StreakCountdown submitted={day12Submission.submitted} />

            {/* Submissions form */}
            <SubmissionForm day={challenge.day} />

            {/* Resources Link list */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-850">
                <BookIcon className="w-4 h-4 text-primary" />
                <span>Reference Resources</span>
              </h3>
              
              <div className="flex flex-col gap-3">
                {challenge.resources && challenge.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100/50 hover:bg-slate-200/50 dark:bg-slate-900/30 dark:hover:bg-slate-850/50 text-slate-700 dark:text-slate-350 hover:text-primary transition-all text-xs font-medium border border-transparent dark:border-slate-850"
                  >
                    <span>{res.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <BottomNav activeDay={dayNum} />

      <Footer />
      <DemoController />
    </div>
  );
}
