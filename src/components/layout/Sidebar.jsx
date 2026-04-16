import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Briefcase,
  BarChart3,
  Settings,
  Factory,
  LogOut
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

  const handleLogout = () => {
    // 1. Clear stored auth data

    // 2. (Optional) Clear session storage
    sessionStorage.clear();
    localStorage.clear()

    // 3. Redirect to login page
    navigate('/login');
  };
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-gray-50">
        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/30">
          <Factory size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-none">Indian manufecturer</h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">The Indian manufecturer</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarLink to="/products" icon={Package} label="Products" />
        <SidebarLink to="/purchases" icon={ShoppingCart} label="Purchases" />
        <SidebarLink to="/projects" icon={Briefcase} label="Projects" />
        <SidebarLink to="/reports" icon={BarChart3} label="Reports" />
      </nav>

      <div className="p-4 border-t border-gray-50">
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Plan</p>
          <p className="text-sm font-bold text-gray-900">Pro Enterprise</p>
          <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand w-3/4 h-full rounded-full"></div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="  flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </aside>
  );
};
