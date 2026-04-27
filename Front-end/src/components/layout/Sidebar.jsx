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
        ? 'bg-brand text-white shadow-md shadow-brand/20'
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      }
    `}
  >
    <Icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
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
    // 1. Clear stored auth data
    // 2. (Optional) Clear session storage
    sessionStorage.clear();
    localStorage.clear()

    // 3. Redirect to login page
    navigate('/login');
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <aside className="w-64 h-screen flex flex-col fixed left-0 top-0 z-50 bg-white border-r border-gray-100">
      <div className="p-6 flex items-center gap-3">
        <div className="w-20 flex items-center justify-center">
          <img src='/logo.jpg' alt="Logo" className="rounded" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-none">ALTTRIO SOLUTIONS</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
        <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarLink to="/products" icon={Package} label="Products" />
        <SidebarLink to="/purchases" icon={ShoppingCart} label="Purchases" />
        <SidebarLink to="/projects" icon={Briefcase} label="Projects" />
        <SidebarLink to="/reports" icon={BarChart3} label="Reports" />
        
        {/* Added Role and Permission Management */}
        <div className="pt-4 mt-2 border-t border-gray-100">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Access Control</p>
          <SidebarLink to="/roles" icon={Shield} label="Role Management" />
          <SidebarLink to="/permissions" icon={UserCog} label="Permissions" />
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center justify-between px-4 py-3 mb-2 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-sm font-medium text-gray-700">Theme</span>
          <button 
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-brand transition-colors"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <SidebarLink to="/settings" icon={Settings} label="Settings" />
        
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Plan</p>
          <p className="text-sm font-bold text-gray-900">Pro Enterprise</p>
          <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand w-3/4 h-full rounded-full"></div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="mt-2 w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};
