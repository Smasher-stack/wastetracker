import React from 'react';
import Icon from '../../../components/AppIcon';
import DateSelector from '../../../components/ui/DateSelector';

const DateHeader = ({ selectedDate, onDateChange, itemCount = 0 }) => {
  const formatHeaderDate = (date) => {
    if (!date) return 'Select Date';
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(today?.getDate() - 1);
    
    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-card border-b border-border">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Date Display */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-heading font-bold text-foreground">
                {formatHeaderDate(selectedDate)}
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Log your waste items
              </p>
            </div>
          </div>

          {/* Date Selector & Progress */}
          <div className="flex items-center space-x-4">
            {/* Item Count Badge */}
            {itemCount > 0 && (
              <div className="hidden sm:flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
                <Icon name="Package" size={16} className="text-primary" />
                <span className="text-sm font-body font-medium text-primary">
                  {itemCount} item{itemCount !== 1 ? 's' : ''} logged
                </span>
              </div>
            )}

            {/* Date Selector */}
            <div className="w-40 lg:w-48">
              <DateSelector
                value={selectedDate}
                onChange={onDateChange}
                placeholder="Change date"
                maxDate={new Date()}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile Item Count */}
        {itemCount > 0 && (
          <div className="sm:hidden mt-3 flex items-center justify-center">
            <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
              <Icon name="Package" size={14} className="text-primary" />
              <span className="text-sm font-body font-medium text-primary">
                {itemCount} item{itemCount !== 1 ? 's' : ''} logged today
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateHeader;