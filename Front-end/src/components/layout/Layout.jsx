import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const Layout = ({ children }) => {
  return (
    <div
      className="flex min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--surface-page)' }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64 overflow-hidden min-h-screen">
        <Navbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
