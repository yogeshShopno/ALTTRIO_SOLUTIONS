import React from 'react';

export const Card = ({ children, className = '', title, subtitle, icon: Icon }) => {
  return (
    <div className={`border-aluminum shadow-sm relative transition-colors duration-300 ${className}`}>
      {/* Hyper-realistic Aluminum Corner Screws */}
      <div className="aluminum-screw screw-tl"></div>
      <div className="aluminum-screw screw-tr"></div>
      <div className="aluminum-screw screw-bl"></div>
      <div className="aluminum-screw screw-br"></div>

      {/* Sliding glass pane with venturi effect (animated in CSS) */}
      <div className="aluminum-glass-pane">
        <div className="aluminum-handle"></div>
      </div>

      {/* Inner card content wrapper */}
      <div 
        className="w-full h-full rounded-lg flex flex-col relative z-0" 
        style={{ backgroundColor: 'var(--surface-card)' }}
      >
        {(title || Icon) && (
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--border-soft)' }}
          >
            <div>
              {title && (
                <h3
                  className="text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
            {Icon && <Icon className="w-5 h-5 text-brand" />}
          </div>
        )}

        <div className="px-6 py-4 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
