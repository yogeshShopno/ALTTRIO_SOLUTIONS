import React from 'react';
import { Search, Bell, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96 max-w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products, projects, or orders..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-brand/20 transition-all outline-hidden text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors group">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
        </button>

        <div className="h-8 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-colors">
          <div className="w-9 h-9 bg-brand/10 text-brand rounded-full flex items-center justify-center font-bold text-sm border border-brand/20">
            YM
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-bold text-gray-900 leading-none">Yogesh Sharma</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};
