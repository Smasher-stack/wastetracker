import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const SaveProgressIndicator = ({ isVisible, message = 'Auto-saved', type = 'success' }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!show) return null;

  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: 'Check', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' };
      case 'error':
        return { icon: 'X', color: 'text-error', bgColor: 'bg-error/10', borderColor: 'border-error/20' };
      case 'loading':
        return { icon: 'Loader2', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' };
      default:
        return { icon: 'Info', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' };
    }
  };

  const { icon, color, bgColor, borderColor } = getIconAndColor();

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg border shadow-lg
        ${bgColor} ${borderColor} backdrop-blur-sm
      `}>
        <Icon 
          name={icon} 
          size={16} 
          className={`${color} ${type === 'loading' ? 'animate-spin' : ''}`}
        />
        <span className={`text-sm font-body font-medium ${color}`}>
          {message}
        </span>
      </div>
    </div>
  );
};

export default SaveProgressIndicator;