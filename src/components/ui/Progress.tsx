import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  className?: string;
  label?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  showValue = false,
  color = 'primary',
  className = '',
  label,
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  const colorStyles = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };
  
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium text-gray-700">{label}</div>
          {showValue && (
            <div className="text-sm font-medium text-gray-500">{percentage}%</div>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        ></div>
      </div>
    </div>
  );
};

export default Progress;