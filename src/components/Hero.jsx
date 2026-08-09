import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Terminal, Flame, Github, Linkedin, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';

export default function Hero() {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  const handleStartChallenge = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse-glow" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-6"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-bounce" />
              <span>Challenge Starts September 1st</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
            >
              Build in Public for{' '}
              <span className="bg-gradient-to-r from-primary via-indigo-500 to-accent bg-clip-text text-transparent">
                60 Days
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed"
            >
              Stay consistent by coding daily, committing to GitHub, and sharing your learning on LinkedIn. Build your developer identity today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={handleStartChallenge}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark rounded-xl shadow-lg hover:shadow-primary/30 hover-lift text-center"
              >
                <span>Start Challenge</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <a
                href="#about"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 rounded-xl transition-all border border-transparent dark:border-slate-800"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Explore</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Illustration: Coding Dashboard */}
          <div className="lg:col-span-6 w-full max-w-[440px] lg:max-w-none mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full rounded-2xl glass-panel-heavy p-2.5 md:p-4 border border-slate-200/50 dark:border-slate-800/80 shadow-2xl"
            >
              {/* IDE Window Bar */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-md text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  <Terminal className="w-3 h-3 text-slate-400" />
                  <span>weather-dashboard.jsx</span>
                </div>
                <div className="w-12" />
              </div>

              {/* IDE Content */}
              <div className="grid grid-cols-12 gap-3 pt-3 font-mono text-[11px] leading-relaxed">
                {/* File Tree Left Pane (Desktop only) */}
                <div className="hidden sm:block sm:col-span-3 border-r border-slate-100 dark:border-slate-850 pr-2 select-none">
                  <div className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[9px] mb-2 tracking-wider">
                    Explorer
                  </div>
                  <div className="space-y-1.5 text-slate-500 dark:text-slate-400">
                    <div className="text-indigo-500 font-semibold">src/</div>
                    <div className="pl-3 text-slate-600 dark:text-slate-350">components/</div>
                    <div className="pl-6 text-primary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Weather.jsx</span>
                    </div>
                    <div className="pl-3 text-slate-600 dark:text-slate-350">pages/</div>
                    <div className="pl-3 text-slate-600 dark:text-slate-350">data/</div>
                    <div className="text-emerald-500">package.json</div>
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="col-span-12 sm:col-span-9 pl-0 sm:pl-2 text-left">
                  <div className="space-y-1 overflow-x-auto no-scrollbar max-h-56">
                    <div>
                      <span className="text-pink-500">import</span>{' '}
                      <span className="text-blue-500">React</span>, &#123;{' '}
                      <span className="text-purple-500">useState</span> &#125;{' '}
                      <span className="text-pink-500">from</span>{' '}
                      <span className="text-green-500">'react'</span>;
                    </div>
                    <div>
                      <span className="text-pink-500">import</span>{' '}
                      <span className="text-purple-500">&#123; useQuery &#125;</span>{' '}
                      <span className="text-pink-500">from</span>{' '}
                      <span className="text-green-500">'react-query'</span>;
                    </div>
                    <div className="h-2" />
                    <div>
                      <span className="text-pink-500">export default function</span>{' '}
                      <span className="text-yellow-600 dark:text-yellow-400 font-semibold">WeatherDashboard</span>() &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-500">const</span> [city, setCity] ={' '}
                      <span className="text-blue-500">useState</span>(
                      <span className="text-green-500">"New York"</span>);
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-500">const</span> fetchWeather ={' '}
                      <span className="text-pink-500">async</span> () =&gt; &#123;
                    </div>
                    <div className="pl-8">
                      <span className="text-pink-500">const</span> res ={' '}
                      <span className="text-pink-500">await</span>{' '}
                      <span className="text-blue-500">fetch</span>(
                      <span className="text-green-500">`/api/weather?q=$&#123;city&#125;`</span>);
                    </div>
                    <div className="pl-8">
                      <span className="text-pink-500">return</span> res.json();
                    </div>
                    <div className="pl-4">&#125;;
                    </div>
                    <div className="h-2" />
                    <div className="pl-4">
                      <span className="text-pink-500">return</span> (
                    </div>
                    <div className="pl-8 text-slate-400">
                      &lt;<span className="text-indigo-400">div</span> <span className="text-orange-400">className</span>=<span className="text-green-500">"glass-card animate-fade-in"</span>&gt;
                    </div>
                    <div className="pl-12 text-slate-400">
                      &lt;<span className="text-indigo-400">h2</span>&gt;Weather in &#123;city&#125;&lt;/<span className="text-indigo-400">h2</span>&gt;
                    </div>
                    <div className="pl-8 text-slate-400">
                      &lt;/<span className="text-indigo-400">div</span>&gt;
                    </div>
                    <div className="pl-4">);</div>
                    <div>&#125;</div>
                  </div>
                </div>
              </div>

              {/* Simulated Float widgets */}
              <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-accent/20 blur-xl -z-10" />
              
              {/* GitHub Commit Widget */}
              <div className="absolute -left-6 bottom-8 max-w-[170px] glass-panel-heavy p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <Github className="w-4 h-4" />
                </div>
                <div className="text-left font-sans select-none">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">GitHub Push</p>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">Day 12: Weather UI</p>
                </div>
              </div>

              {/* LinkedIn Share Widget */}
              <div className="absolute -right-6 top-10 max-w-[170px] glass-panel-heavy p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="text-left font-sans select-none">
                  <p className="text-[10px] font-semibold text-blue-100 uppercase tracking-wider">LinkedIn Post</p>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <span>Published</span>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode="signup" />
    </section>
  );
}
