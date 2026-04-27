import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border-aluminum transition-colors duration-300"
      >
        {/* Hyper-realistic Aluminum Corner Screws */}
        <div className="aluminum-screw screw-tl"></div>
        <div className="aluminum-screw screw-tr"></div>
        <div className="aluminum-screw screw-bl"></div>
        <div className="aluminum-screw screw-br"></div>

        {/* Sliding glass pane with venturi effect */}
        <div className="aluminum-glass-pane">
          <div className="aluminum-handle"></div>
        </div>

        {/* Inner modal content wrapper */}
        <div 
          className="w-full h-full rounded-lg flex flex-col relative z-0" 
          style={{ backgroundColor: 'var(--surface-card)' }}
        >
          <div
            className="flex items-center justify-between p-6"
            style={{ borderBottom: '1px solid var(--border-soft)' }}
          >
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors relative z-20"
              style={{ color: 'var(--text-faint)' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-faint)';
              }}
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
