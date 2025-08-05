import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const DateSelector = ({ 
  value, 
  onChange, 
  className = '',
  placeholder = 'Select date',
  label,
  error,
  required = false,
  minDate,
  maxDate,
  showToday = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const today = new Date();
  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target) &&
          buttonRef?.current && !buttonRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const isToday = (date) => {
    if (!date) return false;
    return date?.toDateString() === today?.toDateString();
  };

  const handleDateSelect = (date) => {
    if (isDateDisabled(date)) return;
    onChange(date);
    setIsOpen(false);
  };

  const handleTodayClick = () => {
    handleDateSelect(today);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-3 py-2
          bg-input border border-border rounded-md
          text-left font-body
          hover:border-ring focus:border-ring focus:ring-2 focus:ring-ring/20
          transition-smooth
          ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
          ${selectedDate ? 'text-foreground' : 'text-muted-foreground'}
        `}
      >
        <span>{selectedDate ? formatDate(selectedDate) : placeholder}</span>
        <Icon 
          name="Calendar" 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {error && (
        <p className="mt-1 text-sm text-error font-body">{error}</p>
      )}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 animate-scale-in"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-3 border-b border-border">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-1 rounded hover:bg-muted transition-smooth"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            
            <span className="font-heading font-semibold text-foreground">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </span>
            
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-1 rounded hover:bg-muted transition-smooth"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-3">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays?.map(day => (
                <div key={day} className="text-center text-xs font-caption font-medium text-muted-foreground py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth)?.map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => date && handleDateSelect(date)}
                  disabled={!date || isDateDisabled(date)}
                  className={`
                    h-8 w-8 text-sm font-body rounded transition-smooth
                    ${!date ? 'invisible' : ''}
                    ${isDateSelected(date) 
                      ? 'bg-primary text-primary-foreground' 
                      : isToday(date)
                        ? 'bg-accent/20 text-accent font-semibold' :'hover:bg-muted text-foreground'
                    }
                    ${isDateDisabled(date) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>

            {/* Today Button */}
            {showToday && (
              <div className="mt-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={handleTodayClick}
                  className="w-full py-2 text-sm font-body text-primary hover:bg-primary/10 rounded transition-smooth"
                >
                  Today
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;