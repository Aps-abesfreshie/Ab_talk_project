import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import Timeline from '../components/Timeline';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { Users, BarChart3, Briefcase, Calendar, MessageSquare, ChevronDown, Award, Star, BookOpen, Clock, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Landing() {
  const { theme, isAuthenticated } = useApp();
  const navigate = useNavigate();

  // FAQ Accordion Active Index
  const [activeFaq, setActiveFaq] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  const handleStartJourney = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setAuthOpen(true);
    }
  };

  const statsData = [
    { label: 'Active Students', value: '10,000+', icon: Users, color: 'from-blue-500 to-indigo-500' },
    { label: 'GitHub Commits', value: '2M+', icon: BarChart3, color: 'from-emerald-500 to-teal-500' },
    { label: 'Projects Built', value: '50,000+', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { label: 'Platform Rating', value: '4.9 ⭐', icon: Star, color: 'from-yellow-400 to-amber-500' }
  ];

  const benefitsData = [
    {
      title: 'Daily Coding',
      description: 'Strengthen muscle memory by writing clean, modular code every day. Get curated tasks matching your difficulty.',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'GitHub Portfolio',
      description: 'Turn your GitHub green! Exit the challenge with a high-fidelity proof-of-work portfolio that recruiters love.',
      icon: Award,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Recruiter Visibility',
      description: 'Stand out in hiring searches. Sharing daily on LinkedIn builds your network and drives inbound messages.',
      icon: Briefcase,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Build Consistency',
      description: 'Break tutorial hell. Gamified streaks, Leaderboards, and community reviews keep you accountable throughout.',
      icon: Calendar,
      color: 'from-pink-500 to-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sahil Sharma',
      role: 'Frontend Dev at TechCorp',
      content: 'I went from struggling with consistency to writing code 60 days straight. Two weeks after finishing, a recruiter reached out about my LinkedIn weather dashboard post. Got hired!',
      avatar: 'SS',
      color: 'bg-indigo-500'
    },
    {
      name: 'Pooja Patil',
      role: 'Self-Taught Engineer',
      content: 'This challenge broke tutorial hell for me. Building in public forced me to refine my repo readme and explain my logic. The community support was incredible!',
      avatar: 'PP',
      color: 'bg-emerald-500'
    },
    {
      name: 'Naman Gupta',
      role: 'Computer Science Student',
      content: 'The 60-day roadmap is gold. It bridges the gap between basic tutorials and building real-world SaaS products. Tracking streaks kept me motivated every single night.',
      avatar: 'NG',
      color: 'bg-orange-500'
    }
  ];

  const faqs = [
    {
      q: 'What if I miss a day?',
      a: 'You get up to 3 streak freeze passes! If you miss more, your streak resets, but you can always complete the catch-up challenge to restore your streak instantly and save your progress.'
    },
    {
      q: 'Is this challenge free?',
      a: 'Yes, it is completely free! We believe building in public should be accessible to all. We provide curation, templates, and badges to foster peer accountability.'
    },
    {
      q: 'What track should I choose?',
      a: 'We offer Frontend, Backend, and Full-Stack tracks. If you are starting out or enjoy styling interfaces, Frontend is highly recommended.'
    },
    {
      q: 'Do recruiters actually look at this?',
      a: 'Absolutely. Tech teams value proof-of-work. A consistent 60-day commit log combined with technical LinkedIn writeups proves you write code, communicate well, and ship product.'
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Social Proof (Stats) */}
        <section className="py-12 border-y border-slate-200/50 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statsData.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="about" className="py-20 md:py-28 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                Why Take the Challenge?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                Curation and consistency beat random tutorials. Establish habits that accelerate your software engineering career.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefitsData.map((benefit, i) => (
                <FeatureCard key={i} {...benefit} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="challenge" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-900/10 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                The 5-Step Formula
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                How we turn raw aspiration into verified code commitments and career visibility.
              </p>
            </div>

            <Timeline />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28 border-t border-slate-200/50 dark:border-slate-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                Loved by 10,000+ Students
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                Hear from peers who pushed commits, shared writing, and unlocked developer careers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((test, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left flex flex-col justify-between"
                >
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mb-6">
                    "{test.content}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-sans ${test.color} shadow-sm`}>
                      {test.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{test.name}</h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">{test.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-900/10 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                Everything you need to know about the rules, requirements, and achievements.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="glass-panel rounded-2xl border border-slate-200/50 dark:border-slate-800/40 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900 pt-3">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-24 border-t border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent -z-10 animate-pulse-glow" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight mb-4">
              Ready to build your developer identity?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              Don't study code in isolation. Join 10k+ developers and start shipping daily.
            </p>
            
            <button
              onClick={handleStartJourney}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-extrabold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark rounded-xl shadow-lg hover:shadow-primary/20 hover-lift"
            >
              <span>Start My Journey</span>
              <Heart className="w-4 h-4 fill-white" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode="signup" />
    </div>
  );
}
