import React from 'react';

export const Card = ({ children, className = '', title, subtitle, icon: Icon, borderAluminum = false, showHandle = false }) => {
  return (
    <div
      className={`rounded-xl shadow-sm overflow-hidden relative transition-colors duration-300 ${borderAluminum ? 'border-aluminum' : ''} ${className}`}
      style={borderAluminum ? {} : {
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-base)',
      }}
    >
      {showHandle && <div className="aluminum-handle" />}

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

      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
};
