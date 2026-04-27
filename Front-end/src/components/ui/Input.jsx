import React from 'react';

export const Input = ({ label, error, className = '', icon: Icon, ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-faint)' }}
          >
            <Icon size={18} />
          </div>
        )}
        <input
          className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 outline-none
            ${Icon ? 'pl-10' : ''}
            ${error
              ? 'border-red-500 focus:ring-4 focus:ring-red-100'
              : 'focus:ring-4 focus:ring-brand/10'
            }`}
          style={{
            backgroundColor: 'var(--surface-input)',
            color: 'var(--text-primary)',
            borderColor: error ? '#ef4444' : 'var(--border-strong)',
            '--placeholder-color': 'var(--text-faint)',
          }}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export const Select = ({ label, error, options = [], className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 outline-none appearance-none cursor-pointer
          ${error
            ? 'border-red-500 focus:ring-4 focus:ring-red-100'
            : 'focus:ring-4 focus:ring-brand/10'
          }`}
        style={{
          backgroundColor: 'var(--surface-input)',
          color: 'var(--text-primary)',
          borderColor: error ? '#ef4444' : 'var(--border-strong)',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25rem',
        }}
        {...props}
      >
        <option value="" disabled style={{ backgroundColor: 'var(--surface-input)', color: 'var(--text-faint)' }}>Select option</option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            style={{ backgroundColor: 'var(--surface-input)', color: 'var(--text-primary)' }}
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
