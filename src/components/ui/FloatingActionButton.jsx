import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingActionButton = ({ 
  className = '',
  onClick,
  icon = 'Plus',
  ariaLabel = 'Add new waste entry'
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Show FAB only on dashboard and stats pages
  const showFAB = ['/waste-log-dashboard', '/waste-statistics-dashboard', '/historical-waste-tracking']?.includes(location.pathname);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/daily-waste-entry');
    }
  };

  if (!showFAB) return null;

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`
        fixed bottom-20 right-4 lg:bottom-6 lg:right-6
        w-14 h-14 lg:w-16 lg:h-16
        bg-primary hover:bg-primary/90 active:bg-primary/80
        text-primary-foreground
        rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-200 ease-out
        hover:scale-105 active:scale-95
        z-40
        ${className}
      `}
    >
      <Icon 
        name={icon} 
        size={24} 
        color="white"
        className="transition-transform duration-200"
      />
    </button>
  );
};

export default FloatingActionButton;