import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Briefcase,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  UserCog,
  Moon,
  Sun
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${isActive
        ? 'bg-brand text-white shadow-md shadow-brand/30'
        : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--text-primary)]'
      }
    `}
  >
    <Icon size={20} className="transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const Sidebar = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <aside
      className="w-64 h-screen flex flex-col fixed left-0 top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--surface-card)',
        borderRight: '1px solid var(--border-soft)',
      }}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-16 flex items-center justify-center">
          <img src='/logo.jpg' alt="Logo" className="rounded w-full" />
        </div>
        <div>
          <h1
            className="text-base font-bold leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            ALTTRIO<br />SOLUTIONS
          </h1>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
        <SidebarLink to="/dashboard"  icon={LayoutDashboard} label="Dashboard" />
        <SidebarLink to="/products"   icon={Package}         label="Products" />
        <SidebarLink to="/purchases"  icon={ShoppingCart}    label="Purchases" />
        <SidebarLink to="/projects"   icon={Briefcase}       label="Projects" />
        <SidebarLink to="/reports"    icon={BarChart3}       label="Reports" />

        {/* Access Control section */}
        <div className="pt-4 mt-2" style={{ borderTop: '1px solid var(--border-soft)' }}>
          <p
            className="px-4 text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-faint)' }}
          >
            Access Control
          </p>
          <SidebarLink to="/roles"       icon={Shield}   label="Role Management" />
          <SidebarLink to="/permissions" icon={UserCog}  label="Permissions" />
        </div>
      </nav>

      {/* Footer */}
      <div
        className="p-4 flex flex-col gap-2"
        style={{ borderTop: '1px solid var(--border-soft)' }}
      >
        {/* Dark mode toggle */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ backgroundColor: 'var(--surface-subtle)' }}
        >
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--surface-card)',
              border: '1px solid var(--border-base)',
              color: isDarkMode ? '#F4911D' : 'var(--text-muted)'
            }}
            title="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <SidebarLink to="/settings" icon={Settings} label="Settings" />

        {/* Plan card */}
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--surface-subtle)',
            border: '1px solid var(--border-soft)'
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: 'var(--text-faint)' }}
          >
            Plan
          </p>
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            Pro Enterprise
          </p>
          <div
            className="mt-2 w-full h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--border-base)' }}
          >
            <div className="bg-brand w-3/4 h-full rounded-full" />
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          style={{ color: '#ef4444' }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};
