import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  // Use inline styles for dark-mode-sensitive variants so they always look correct
  const baseClass = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  if (variant === 'primary') {
    return (
      <button
        className={`${baseClass} text-white ${className}`}
        style={{ backgroundColor: 'var(--primary)' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--primary)'}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        className={`${baseClass} ${className}`}
        style={{
          backgroundColor: 'var(--surface-card)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-strong)',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-subtle)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--surface-card)'}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        className={`${baseClass} ${className}`}
        style={{
          backgroundColor: 'transparent',
          color: 'var(--primary)',
          border: '1px solid var(--primary)',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(2,33,53,0.06)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === 'ghost') {
    return (
      <button
        className={`${baseClass} ${className}`}
        style={{
          backgroundColor: 'transparent',
          color: 'var(--text-muted)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === 'danger') {
    return (
      <button
        className={`${baseClass} text-white ${className}`}
        style={{ backgroundColor: '#dc2626' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc2626'}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
