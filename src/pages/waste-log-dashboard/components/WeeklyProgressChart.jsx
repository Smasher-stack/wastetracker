import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyProgressChart = ({ weeklyData }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date()?.getDay();

  const getProgressColor = (dayIndex, hasEntries) => {
    if (dayIndex > today) return 'bg-muted'; // Future days
    if (hasEntries) return 'bg-success'; // Completed days
    return 'bg-error'; // Missed days
  };

  const getProgressSize = (dayIndex, hasEntries) => {
    if (dayIndex === today) return 'w-4 h-4'; // Today is larger
    return 'w-3 h-3'; // Other days
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">Weekly Progress</h2>
        <div className="flex items-center space-x-1 text-sm font-caption text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>This Week</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        {daysOfWeek?.map((day, index) => (
          <div key={day} className="flex flex-col items-center space-y-2">
            <span className={`text-xs font-caption ${
              index === today ? 'text-primary font-semibold' : 'text-muted-foreground'
            }`}>
              {day}
            </span>
            <div
              className={`rounded-full transition-all duration-200 ${
                getProgressSize(index, weeklyData?.[index]?.hasEntries)
              } ${
                getProgressColor(index, weeklyData?.[index]?.hasEntries)
              }`}
            />
            {weeklyData?.[index]?.hasEntries && (
              <span className="text-xs font-caption text-muted-foreground">
                {weeklyData?.[index]?.count}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4 text-xs font-caption">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full" />
          <span className="text-muted-foreground">Logged</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-error rounded-full" />
          <span className="text-muted-foreground">Missed</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-muted rounded-full" />
          <span className="text-muted-foreground">Future</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgressChart;