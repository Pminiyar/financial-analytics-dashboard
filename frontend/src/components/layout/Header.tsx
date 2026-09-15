import React from 'react';
import { Menu, LogOut, User, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      showToast('info', 'You have been safely signed out.', 'Logged Out');
    } catch {
      showToast('error', 'Failed to log out cleanly.', 'Error');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8 transition-all">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center text-xs font-medium text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-lg">
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
          <span>{currentDate}</span>
          <span className="mx-2 text-slate-300">•</span>
          <span className="text-emerald-600 font-semibold flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            Live Systems
          </span>
        </div>
      </div>

      {/* Right: Notifications & User profile */}
      <div className="flex items-center space-x-3">
        {/* User Card */}
        <div className="flex items-center space-x-3 pl-3 sm:border-l sm:border-slate-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-tight">
              {user?.name || 'Financial Analyst'}
            </div>
            <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
              {user?.email || 'demo@loopr-dashboard.com'}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
