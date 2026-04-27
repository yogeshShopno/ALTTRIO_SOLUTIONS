import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header
      className="h-16 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--surface-card)',
        borderBottom: '1px solid var(--border-soft)',
      }}
    >
      {/* Spacer */}
      <div />

      {/* Right: divider + profile */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-px" style={{ backgroundColor: 'var(--border-base)' }} />

        <div
          className="flex items-center gap-3 cursor-pointer rounded-xl p-1.5 pr-3 transition-colors"
          style={{ ':hover': { backgroundColor: 'var(--surface-subtle)' } }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-subtle)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{
              backgroundColor: 'rgba(2,33,53,0.1)',
              color: 'var(--primary)',
              border: '1px solid rgba(2,33,53,0.2)',
            }}
          >
            RT
          </div>
          <div className="hidden md:block text-left">
            <p
              className="text-sm font-bold leading-none"
              style={{ color: 'var(--text-primary)' }}
            >
              Ratan Tata
            </p>
            <p
              className="text-xs mt-0.5 font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};