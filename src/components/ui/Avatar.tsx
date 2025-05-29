import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  fallback,
}) => {
  const [hasError, setHasError] = React.useState(false);
  
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
  };
  
  const handleError = () => {
    setHasError(true);
  };
  
  // Get initials from alt text
  const getInitials = () => {
    if (!fallback && !alt) return '?';
    
    if (fallback) return fallback;
    
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };
  
  return (
    <div
      className={`
        relative inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : (
        <span className="font-medium text-gray-600">{getInitials()}</span>
      )}
    </div>
  );
};

export default Avatar;