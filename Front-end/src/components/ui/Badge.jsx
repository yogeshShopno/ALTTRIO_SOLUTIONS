import React from 'react';

export const Badge = ({ children, variant = 'gray', className = '' }) => {
  // Color-safe variants using explicit colors that work in both modes
  const variants = {
    gray:    { bg: 'var(--surface-subtle)', color: 'var(--text-secondary)', border: 'var(--border-base)' },
    brand:   { bg: 'rgba(2,33,53,0.12)',    color: 'var(--primary)',        border: 'rgba(2,33,53,0.25)' },
    success: { bg: 'rgba(16,185,129,0.12)', color: '#059669',               border: 'rgba(16,185,129,0.25)' },
    warning: { bg: 'rgba(245,158,11,0.12)', color: '#d97706',               border: 'rgba(245,158,11,0.25)' },
    danger:  { bg: 'rgba(239,68,68,0.12)',  color: '#dc2626',               border: 'rgba(239,68,68,0.25)' },
    info:    { bg: 'rgba(59,130,246,0.12)', color: '#2563eb',               border: 'rgba(59,130,246,0.25)' },
  };

  const v = variants[variant] || variants.gray;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${className}`}
      style={{ backgroundColor: v.bg, color: v.color, borderColor: v.border }}
    >
      {children}
    </span>
  );
};
