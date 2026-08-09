import React, { createContext, useContext, useState, useEffect } from 'react';
import initialStudentData from '../data/student.json';
import initialChallengeData from '../data/challenge.json';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const AUTH_KEY = 'abtalks_user';
const SUBMISSION_KEY = 'abtalks_day12_submission';
const CHECKLIST_KEY = 'abtalks_checklist_day12';

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // ---- Auth (mocked, localStorage-backed) ----
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const isAuthenticated = !!user;

  // demoMode: 'active' | 'new' | 'no-streak' | 'missed-yesterday' | 'empty-achievements' | 'no-submissions'
  const [demoMode, setDemoMode] = useState('active');
  const [student, setStudent] = useState(initialStudentData);
  const [challenges, setChallenges] = useState(initialChallengeData.challenges);
  
  // Track submissions for day 12 specifically — hydrate from localStorage if a real user saved progress
  const [day12Submission, setDay12Submission] = useState(() => {
    try {
      const saved = localStorage.getItem(SUBMISSION_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      githubRepo: 'https://github.com/abhay/weather-dashboard',
      githubCommit: 'https://github.com/abhay/weather-dashboard/commit/8f2c34d',
      linkedinPost: 'https://linkedin.com/posts/abhay-dev_60daysofcode-day12-weatherdashboard',
      reflection: 'Integrated OpenWeather API successfully using dynamic fetch calls. Managed skeleton loaders for smoother UX!',
      submitted: true
    };
  });

  const login = (userObj) => {
    const payload = { ...userObj, loggedInAt: new Date().toISOString() };
    setUser(payload);
    localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
    // A brand-new signup starts their journey at Day 0 with the "new student" experience.
    // An existing login resumes their in-progress challenge.
    setDemoMode(userObj.isNew ? 'new' : 'active');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    setDemoMode('active');
  };

  // Handle HTML document class toggling for dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync state whenever demoMode changes
  useEffect(() => {
    const baseStudent = JSON.parse(JSON.stringify(initialStudentData));
    const baseChallenges = JSON.parse(JSON.stringify(initialChallengeData.challenges));
    
    // Update Day 12 checklist state depending on demoMode
    const d12Index = baseChallenges.findIndex(c => c.day === 12);

    switch (demoMode) {
      case 'new':
        setStudent({
          ...baseStudent,
          streak: 0,
          completedDays: [],
          progress: 0,
          rank: 'Unranked',
          xp: 0,
          badges: [],
          recentActivity: []
        });
        setDay12Submission({
          githubRepo: '',
          githubCommit: '',
          linkedinPost: '',
          reflection: '',
          submitted: false
        });
        if (d12Index !== -1) {
          baseChallenges[d12Index].checklist = baseChallenges[d12Index].checklist.map(item => ({
            ...item,
            completed: false
          }));
        }
        break;

      case 'no-streak':
        setStudent({
          ...baseStudent,
          streak: 0,
          completedDays: [1, 2, 3],
          progress: 3,
          rank: 1450,
          xp: 320,
          badges: [],
          recentActivity: [
            {
              type: "commit",
              title: "GitHub Commit",
              detail: "Fix: Layout alignment on mobile",
              time: "4 days ago"
            }
          ]
        });
        setDay12Submission({
          githubRepo: '',
          githubCommit: '',
          linkedinPost: '',
          reflection: '',
          submitted: false
        });
        if (d12Index !== -1) {
          baseChallenges[d12Index].checklist = baseChallenges[d12Index].checklist.map(item => ({
            ...item,
            completed: false
          }));
        }
        break;

      case 'missed-yesterday':
        // Missed day 11 yesterday, streak reset/frozen to 0
        setStudent({
          ...baseStudent,
          streak: 0,
          completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Missed day 11
          progress: 10,
          rank: 412,
          xp: 1020,
          // Let badges stay, they are historical achievements
          recentActivity: [
            {
              type: "reflection",
              title: "System Note",
              detail: "You missed Day 11 yesterday! Complete Day 11 now to resume streak.",
              time: "1 day ago"
            }
          ]
        });
        setDay12Submission({
          githubRepo: '',
          githubCommit: '',
          linkedinPost: '',
          reflection: '',
          submitted: false
        });
        if (d12Index !== -1) {
          baseChallenges[d12Index].checklist = baseChallenges[d12Index].checklist.map(item => ({
            ...item,
            completed: false
          }));
        }
        break;

      case 'empty-achievements':
        setStudent({
          ...baseStudent,
          badges: []
        });
        setDay12Submission({
          githubRepo: 'https://github.com/abhay/weather-dashboard',
          githubCommit: 'https://github.com/abhay/weather-dashboard/commit/8f2c34d',
          linkedinPost: 'https://linkedin.com/posts/abhay-dev-weather-dashboard',
          reflection: 'Completed all objectives! Clean structure.',
          submitted: true
        });
        break;

      case 'no-submissions':
        setStudent(baseStudent);
        setDay12Submission({
          githubRepo: '',
          githubCommit: '',
          linkedinPost: '',
          reflection: '',
          submitted: false
        });
        if (d12Index !== -1) {
          // Keep checklist items completed so they can submit, but inputs are empty
          baseChallenges[d12Index].checklist = baseChallenges[d12Index].checklist.map(item => ({
            ...item,
            completed: false
          }));
        }
        break;

      case 'active':
      default: {
        setStudent(baseStudent);
        // Respect real progress the user already saved in this browser, instead of
        // silently overwriting it with the seed mock data every time.
        let restoredSubmission = null;
        let restoredChecklist = null;
        try {
          const savedSub = localStorage.getItem(SUBMISSION_KEY);
          if (savedSub) restoredSubmission = JSON.parse(savedSub);
          const savedChecklist = localStorage.getItem(CHECKLIST_KEY);
          if (savedChecklist) restoredChecklist = JSON.parse(savedChecklist);
        } catch {}

        setDay12Submission(
          restoredSubmission || {
            githubRepo: 'https://github.com/abhay/weather-dashboard',
            githubCommit: 'https://github.com/abhay/weather-dashboard/commit/8f2c34d',
            linkedinPost: 'https://linkedin.com/posts/abhay-dev_60daysofcode-day12-weatherdashboard',
            reflection: 'Integrated OpenWeather API successfully using dynamic fetch calls. Managed skeleton loaders for smoother UX!',
            submitted: true
          }
        );

        if (restoredChecklist && d12Index !== -1) {
          baseChallenges[d12Index].checklist = restoredChecklist;
        }
        break;
      }
    }

    setChallenges(baseChallenges);
  }, [demoMode]);

  // Persist real user edits (checklist + submission) so refreshing the page doesn't lose progress.
  // Only persists while in the normal "active" demo state, so switching edge-case demos stays clean.
  useEffect(() => {
    if (demoMode !== 'active') return;
    try {
      localStorage.setItem(SUBMISSION_KEY, JSON.stringify(day12Submission));
    } catch {}
  }, [day12Submission, demoMode]);

  useEffect(() => {
    if (demoMode !== 'active') return;
    const d12 = challenges.find(c => c.day === 12);
    if (d12 && d12.checklist) {
      try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(d12.checklist));
      } catch {}
    }
  }, [challenges, demoMode]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleCheckboxToggle = (day, itemId) => {
    setChallenges(prevChallenges => {
      const copy = JSON.parse(JSON.stringify(prevChallenges));
      const targetChallenge = copy.find(c => c.day === day);
      if (targetChallenge && targetChallenge.checklist) {
        const item = targetChallenge.checklist.find(i => i.id === itemId);
        if (item) {
          item.completed = !item.completed;
        }
      }
      return copy;
    });
  };

  const submitDay12 = (formData) => {
    setDay12Submission({
      ...formData,
      submitted: true
    });
    // Add to activity feed
    setStudent(prev => ({
      ...prev,
      streak: prev.streak === 0 ? 1 : prev.streak + (demoMode === 'missed-yesterday' ? 0 : 0), // handle streak increase if appropriate
      completedDays: prev.completedDays.includes(12) ? prev.completedDays : [...prev.completedDays, 12],
      recentActivity: [
        {
          type: "commit",
          title: "GitHub Commit",
          detail: "GitHub Repo submitted for Day 12",
          time: "Just now"
        },
        {
          type: "linkedin",
          title: "LinkedIn Share",
          detail: "LinkedIn Post shared for Day 12",
          time: "Just now"
        },
        ...prev.recentActivity
      ]
    }));
  };

  // ---- Thoughtful feature: one-tap LinkedIn proof-of-work share ----
  // The single biggest daily friction point for students is writing a LinkedIn post from
  // scratch every night. This generates on-brand caption copy and opens LinkedIn's real
  // share dialog pre-filled, so "posting proof" takes one tap instead of ten minutes of typing.
  const buildLinkedInShareUrl = ({ day, title, streak }) => {
    const summary =
      `Day ${day}/60 of the #ABTalks60Day Challenge ✅\n\n` +
      `Just shipped: ${title}.\n` +
      `Current streak: ${streak} day${streak === 1 ? '' : 's'} 🔥\n\n` +
      `Building in public, one commit at a time. #100DaysOfCode #BuildInPublic #ABTalks`;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      'https://abtalks.dev/day/' + day
    )}&summary=${encodeURIComponent(summary)}`;
    return { shareUrl, summary };
  };

  const shareToLinkedIn = ({ day, title, streak }) => {
    const { shareUrl } = buildLinkedInShareUrl({ day, title, streak });
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        demoMode,
        setDemoMode,
        student,
        challenges,
        day12Submission,
        setDay12Submission,
        handleCheckboxToggle,
        submitDay12,
        user,
        isAuthenticated,
        login,
        logout,
        shareToLinkedIn,
        buildLinkedInShareUrl
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
