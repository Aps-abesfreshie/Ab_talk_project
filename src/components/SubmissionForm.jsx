import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Github, Linkedin, MessageSquare, CheckCircle, Save, ExternalLink, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubmissionForm({ day }) {
  const { day12Submission, submitDay12, student, shareToLinkedIn, buildLinkedInShareUrl } = useApp();
  
  const [repoUrl, setRepoUrl] = useState('');
  const [commitUrl, setCommitUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [savedReflection, setSavedReflection] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [captionCopied, setCaptionCopied] = useState(false);

  // Sync state with Context when demoMode resets submissions
  useEffect(() => {
    setRepoUrl(day12Submission.githubRepo || '');
    setCommitUrl(day12Submission.githubCommit || '');
    setLinkedinUrl(day12Submission.linkedinPost || '');
    setReflectionText(day12Submission.reflection || '');
    setSavedReflection(!!day12Submission.reflection);
  }, [day12Submission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!repoUrl.trim() || !commitUrl.trim() || !linkedinUrl.trim()) {
      setValidationError('Please fill in all submission URLs before submitting.');
      return;
    }
    
    // Quick simple URL checks
    if (!repoUrl.includes('github.com')) {
      setValidationError('GitHub Repository URL must be a valid github.com link.');
      return;
    }
    if (!commitUrl.includes('github.com')) {
      setValidationError('GitHub Commit URL must be a valid github.com commit link.');
      return;
    }
    if (!linkedinUrl.includes('linkedin.com')) {
      setValidationError('LinkedIn Post URL must be a valid linkedin.com post link.');
      return;
    }

    setValidationError('');
    submitDay12({
      githubRepo: repoUrl,
      githubCommit: commitUrl,
      linkedinPost: linkedinUrl,
      reflection: reflectionText
    });
  };

  const handleSaveReflection = () => {
    setSavedReflection(true);
    setTimeout(() => setSavedReflection(false), 2500); // Visual save pop
  };

  // Pre-submission helper: generate the LinkedIn caption + open the real share dialog
  // *before* the student has a post URL yet, so they don't have to write it from scratch.
  const handleGeneratePost = async () => {
    const { summary } = buildLinkedInShareUrl({ day, title: 'Weather Dashboard', streak: (student?.streak || 0) + 1 });
    try {
      await navigator.clipboard.writeText(summary);
      setCaptionCopied(true);
      setTimeout(() => setCaptionCopied(false), 2500);
    } catch {
      // Clipboard API can fail without HTTPS/permissions — sharing still works either way.
    }
    shareToLinkedIn({ day, title: 'Weather Dashboard', streak: (student?.streak || 0) + 1 });
  };

  return (
    <div className="space-y-6">
      {/* Reflection Area */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-3">
          <MessageSquare className="w-4.5 h-4.5 text-primary" />
          <span>Daily Reflection</span>
        </h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
          What did you learn today? Documenting your learning helps reinforce key engineering concepts.
        </p>

        <textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder="I learned how to fetch weather data, handle api errors, and style skeletons using tailwind..."
          className="w-full h-24 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none dark:text-white"
        />

        <button
          onClick={handleSaveReflection}
          className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors border border-transparent dark:border-slate-800"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{savedReflection ? 'Reflection Saved!' : 'Save Reflection'}</span>
        </button>
      </div>

      {/* Main URLs Submission Form */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left relative overflow-hidden">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-850">
          <CheckCircle className="w-4.5 h-4.5 text-success" />
          <span>Submit Challenge Deliverables</span>
        </h3>

        {day12Submission.submitted ? (
          /* Success Approved Banner */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-4 text-emerald-600 dark:text-emerald-400"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-bold text-xs uppercase tracking-wide">Approved & Verified!</span>
            </div>
            <p className="text-[10px] text-emerald-600/80 dark:text-emerald-450 leading-relaxed mb-3">
              Your challenge was submitted, committed, and logged! +50 XP and consistency points have been loaded to your profile.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[9px] bg-white/40 dark:bg-slate-900/40 p-2.5 rounded-lg border border-emerald-500/10">
              <a href={repoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between hover:underline text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1"><Github className="w-3 h-3 text-slate-400" /> Repository</span>
                <span className="flex items-center gap-0.5 truncate max-w-[150px]">{repoUrl} <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
              <a href={commitUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between hover:underline text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1"><Github className="w-3 h-3 text-slate-400" /> Commit</span>
                <span className="flex items-center gap-0.5 truncate max-w-[150px]">{commitUrl} <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between hover:underline text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-slate-400" /> LinkedIn Share</span>
                <span className="flex items-center gap-0.5 truncate max-w-[150px]">{linkedinUrl} <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
            </div>

            <button
              onClick={() =>
                shareToLinkedIn({ day, title: 'Weather Dashboard', streak: student?.streak || 1 })
              }
              className="w-full mt-3 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Post Another Update to LinkedIn</span>
            </button>
          </motion.div>
        ) : (
          /* Interactive Submission Inputs */
          <form onSubmit={handleSubmit} className="space-y-4">
            {validationError && (
              <div className="text-[10px] text-rose-500 font-semibold bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg">
                {validationError}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                GitHub Repository URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/project-repo"
                  className="w-full bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                GitHub Commit URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <input
                  type="url"
                  required
                  value={commitUrl}
                  onChange={(e) => setCommitUrl(e.target.value)}
                  placeholder="https://github.com/username/project-repo/commit/hash"
                  className="w-full bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  LinkedIn Post URL
                </label>
                <button
                  type="button"
                  onClick={handleGeneratePost}
                  className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Share2 className="w-3 h-3" />
                  <span>{captionCopied ? 'Caption copied!' : 'Generate post & open LinkedIn'}</span>
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <input
                  type="url"
                  required
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/posts/activity-id"
                  className="w-full bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none dark:text-white"
                />
              </div>
              <p className="text-[9px] text-slate-400 mt-1 leading-relaxed">
                Tip: click "Generate post" to auto-write your caption and open LinkedIn's share dialog — then paste your published post's URL back here.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 text-xs font-extrabold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark rounded-xl shadow-md hover:shadow-primary/20 transition-all text-center"
            >
              Submit Deliverables
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
