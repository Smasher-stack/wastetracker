import React from 'react';

import Button from '../../../components/ui/Button';

const DashboardHeader = ({ currentDate, onDateChange, onAddEntry }) => {
  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(currentDate?.getDate() + direction);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = currentDate?.toDateString() === new Date()?.toDateString();

  return (
    <div className="bg-card border-b border-border p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              iconName="ChevronLeft"
              iconSize={16}
              onClick={() => navigateDate(-1)}
              className="p-2"
            />
            <div className="text-center min-w-0">
              <h1 className="text-lg lg:text-xl font-heading font-semibold text-foreground truncate">
                {formatDate(currentDate)}
              </h1>
              {!isToday && (
                <button
                  onClick={goToToday}
                  className="text-sm font-caption text-primary hover:text-primary/80 transition-smooth"
                >
                  Go to Today
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              iconName="ChevronRight"
              iconSize={16}
              onClick={() => navigateDate(1)}
              className="p-2"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="Search"
            iconSize={16}
            className="p-2 lg:hidden"
          />
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            onClick={onAddEntry}
            className="hidden lg:flex"
          >
            Add Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;