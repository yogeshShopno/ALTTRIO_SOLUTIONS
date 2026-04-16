import React from 'react';

export const Input = ({ label, error, className = '', icon: Icon, ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 outline-hidden
            ${Icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:ring-4 focus:ring-red-100' 
              : 'border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10'
            }
            bg-white text-gray-900 placeholder:text-gray-400`}
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
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 rounded-lg border bg-white transition-all duration-200 outline-hidden appearance-none cursor-pointer
          ${error 
            ? 'border-red-500 focus:ring-4 focus:ring-red-100' 
            : 'border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10'
          }
          text-gray-900`}
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
        {...props}
      >
        <option value="" disabled>Select option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
