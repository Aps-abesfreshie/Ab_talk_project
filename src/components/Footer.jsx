import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-900/60 py-12 px-4 sm:px-6 lg:px-8 mt-auto select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        {/* Logo and Tagline */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-glow-primary">
              <Code className="w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              ABTalks <span className="text-primary">60D</span>
            </span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            A premier gamified developer community built to establish consistent shipping schedules and recruiter visibility. Build in public, code daily, and make it count.
          </p>
          <div className="flex gap-3 text-slate-400 dark:text-slate-500 mt-2">
            <a href="https://github.com font-medium hover:text-primary dark:hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com hover:text-primary dark:hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com hover:text-primary dark:hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Challenge Tracks */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-widest uppercase mb-4">
            Tracks
          </h4>
          <ul className="space-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Frontend Engineering</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Backend Architecture</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Full-Stack Javascript</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">AI Engineering</Link></li>
          </ul>
        </div>

        {/* Resources & Support */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-widest uppercase mb-4">
            Platform
          </h4>
          <ul className="space-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <li><Link to="/" className="hover:text-primary transition-colors">Leaderboard</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Daily Deliverables</Link></li>
            <li><a href="#faq" className="hover:text-primary transition-colors">Accordion FAQs</a></li>
            <li><a href="mailto:support@abtalks.com" className="hover:text-primary transition-colors">Email Support</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-900/60 mt-8 pt-8 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
        <span>© {new Date().getFullYear()} ABTalks. All rights reserved.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
