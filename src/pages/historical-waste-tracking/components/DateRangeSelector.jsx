import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangeSelector = ({ selectedView, onViewChange, customRange, onCustomRangeChange }) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const viewOptions = [
    { id: 'week', label: 'Week', icon: 'Calendar' },
    { id: 'month', label: 'Month', icon: 'Calendar' },
    { id: 'year', label: 'Year', icon: 'Calendar' },
    { id: 'custom', label: 'Custom', icon: 'CalendarRange' }
  ];

  const handleViewChange = (viewId) => {
    onViewChange(viewId);
    if (viewId !== 'custom') {
      setShowCustomPicker(false);
    } else {
      setShowCustomPicker(true);
    }
  };

  const handleCustomDateChange = (field, value) => {
    onCustomRangeChange({
      ...customRange,
      [field]: value
    });
  };

  const formatDateRange = () => {
    const today = new Date();
    
    switch (selectedView) {
      case 'week':
        const weekStart = new Date(today);
        weekStart?.setDate(today?.getDate() - today?.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd?.setDate(weekStart?.getDate() + 6);
        return `${weekStart?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      
      case 'month':
        return today?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      case 'year':
        return today?.getFullYear()?.toString();
      
      case 'custom':
        if (customRange?.start && customRange?.end) {
          const start = new Date(customRange.start);
          const end = new Date(customRange.end);
          return `${start?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }
        return 'Select dates';
      
      default:
        return '';
    }
  };

  return (
    <div className="bg-card border-b border-border sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        {/* View Selector */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {viewOptions?.map((option) => (
              <button
                key={option?.id}
                onClick={() => handleViewChange(option?.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-body transition-smooth ${
                  selectedView === option?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={option?.icon} size={14} />
                <span>{option?.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Date Range Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="font-body font-medium text-foreground">
              {formatDateRange()}
            </span>
          </div>

          {selectedView !== 'custom' && (
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded hover:bg-muted transition-smooth">
                <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
              </button>
              <button className="p-1 rounded hover:bg-muted transition-smooth">
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* Custom Date Picker */}
        {showCustomPicker && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg animate-scale-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customRange?.start}
                  onChange={(e) => handleCustomDateChange('start', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm font-body focus:border-ring focus:ring-2 focus:ring-ring/20 transition-smooth"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={customRange?.end}
                  onChange={(e) => handleCustomDateChange('end', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm font-body focus:border-ring focus:ring-2 focus:ring-ring/20 transition-smooth"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeSelector;