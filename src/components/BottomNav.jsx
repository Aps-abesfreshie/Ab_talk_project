import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, User } from 'lucide-react';

/**
 * Sticky mobile-only bottom navigation: Dashboard / Today's Task / Profile.
 * Hidden on md+ (desktop uses the top Navbar instead).
 */
export default function BottomNav({ activeDay = 12 }) {
  const location = useLocation();

  const items = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, match: (p) => p === '/dashboard' },
    { to: `/day/${activeDay}`, label: "Today's Task", icon: CheckSquare, match: (p) => p.startsWith('/day/') },
    { to: '/dashboard', label: 'Profile', icon: User, match: () => false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-900 md:hidden py-2.5 px-6 flex justify-around items-center shadow-inner">
      {items.map(({ to, label, icon: Icon, match }) => {
        const active = match(location.pathname);
        return (
          <Link
            key={label}
            to={to}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
              active ? 'text-primary' : 'text-slate-500 hover:text-primary dark:hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? 'text-primary' : ''}`} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
