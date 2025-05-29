import React from 'react';

interface TabProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabProps[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'contained' | 'pills';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onChange,
  variant = 'underline',
  className = '',
}) => {
  const baseStyles = 'flex space-x-2';
  
  const variantStyles = {
    underline: 'border-b border-gray-200',
    contained: 'bg-gray-100 p-1 rounded-lg',
    pills: 'space-x-1',
  };
  
  const tabBaseStyles = 'flex items-center px-4 py-2 text-sm font-medium transition-all focus:outline-none';
  
  const tabVariantStyles = {
    underline: {
      active: 'text-primary-600 border-b-2 border-primary-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300',
    },
    contained: {
      active: 'bg-white text-primary-600 rounded-md shadow-sm',
      inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md',
    },
    pills: {
      active: 'bg-primary-100 text-primary-700 rounded-full',
      inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full',
    },
  };
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={value === tab.value}
          aria-controls={`panel-${tab.value}`}
          id={`tab-${tab.value}`}
          className={`
            ${tabBaseStyles}
            ${
              value === tab.value
                ? tabVariantStyles[variant].active
                : tabVariantStyles[variant].inactive
            }
            ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={() => !tab.disabled && onChange(tab.value)}
          disabled={tab.disabled}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export interface TabPanelProps {
  children: React.ReactNode;
  value: string;
  tabValue: string;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  tabValue,
  className = '',
}) => {
  if (value !== tabValue) return null;
  
  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${tabValue}`}
      id={`panel-${tabValue}`}
      className={className}
    >
      {children}
    </div>
  );
};

export default Tabs;