import React from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">



  


        <div className="h-8 w-px bg-gray-200"></div>

        {/* Profile + Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-colors">
            <div className="w-9 h-9 bg-brand/10 text-brand rounded-full flex items-center justify-center font-bold text-sm border border-brand/20">
              RT
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-gray-900 leading-none">Ratan Tata</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Administrator</p>
            </div>
          </div>
          

          {/* Logout Button */}

        </div>


    </header>
  );
};