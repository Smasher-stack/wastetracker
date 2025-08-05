import React from 'react';
import Icon from '../../../components/AppIcon';

const LoggingConsistencyCalendar = ({ data, period }) => {
  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-muted';
    if (count <= 2) return 'bg-success/30';
    if (count <= 5) return 'bg-success/60';
    return 'bg-success';
  };

  const getDaysInPeriod = () => {
    const today = new Date();
    const days = [];
    
    if (period === 'week') {
      // Get last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date?.setDate(today?.getDate() - i);
        days?.push(date);
      }
    } else if (period === 'month') {
      // Get last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date?.setDate(today?.getDate() - i);
        days?.push(date);
      }
    } else {
      // Get last 365 days for year view
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date?.setDate(today?.getDate() - i);
        days?.push(date);
      }
    }
    
    return days;
  };

  const days = getDaysInPeriod();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getDataForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return data?.find(d => d?.date === dateStr)?.count || 0;
  };

  const renderWeekView = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-2">
        {weekDays?.map(day => (
          <div key={day} className="text-center text-xs font-caption font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days?.map((date, index) => {
          const count = getDataForDate(date);
          return (
            <div
              key={index}
              className={`aspect-square rounded-md flex items-center justify-center text-xs font-body font-medium transition-smooth hover:scale-105 cursor-pointer ${getIntensityClass(count)}`}
              title={`${date?.toLocaleDateString()}: ${count} items logged`}
            >
              {date?.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMonthView = () => {
    const weeks = [];
    let currentWeek = [];
    
    days?.forEach((date, index) => {
      if (index > 0 && date?.getDay() === 0 && currentWeek?.length > 0) {
        weeks?.push(currentWeek);
        currentWeek = [];
      }
      currentWeek?.push(date);
    });
    
    if (currentWeek?.length > 0) {
      weeks?.push(currentWeek);
    }

    return (
      <div className="space-y-1">
        {weeks?.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week?.map((date, dayIndex) => {
              const count = getDataForDate(date);
              return (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm transition-smooth hover:scale-125 cursor-pointer ${getIntensityClass(count)}`}
                  title={`${date?.toLocaleDateString()}: ${count} items logged`}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const monthGroups = {};
    days?.forEach(date => {
      const monthKey = `${date?.getFullYear()}-${date?.getMonth()}`;
      if (!monthGroups?.[monthKey]) {
        monthGroups[monthKey] = [];
      }
      monthGroups?.[monthKey]?.push(date);
    });

    return (
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(monthGroups)?.map(([monthKey, monthDays]) => {
          const [year, month] = monthKey?.split('-');
          const monthName = months?.[parseInt(month)];
          
          return (
            <div key={monthKey} className="space-y-2">
              <div className="text-xs font-caption font-medium text-muted-foreground text-center">
                {monthName}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {monthDays?.map((date, index) => {
                  const count = getDataForDate(date);
                  return (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-sm transition-smooth hover:scale-150 cursor-pointer ${getIntensityClass(count)}`}
                      title={`${date?.toLocaleDateString()}: ${count} items logged`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getStreakInfo = () => {
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    
    const sortedData = [...data]?.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedData?.length; i++) {
      if (sortedData?.[i]?.count > 0) {
        tempStreak++;
        if (i === 0) currentStreak = tempStreak;
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        tempStreak = 0;
      }
    }
    maxStreak = Math.max(maxStreak, tempStreak);
    
    return { currentStreak, maxStreak };
  };

  const { currentStreak, maxStreak } = getStreakInfo();

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Logging Consistency
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Flame" size={14} className="text-accent" />
            <span className="font-body text-foreground">{currentStreak} day streak</span>
          </div>
          <div className="text-muted-foreground font-body">
            Best: {maxStreak} days
          </div>
        </div>
      </div>
      <div className="mb-4">
        {period === 'week' && renderWeekView()}
        {period === 'month' && renderMonthView()}
        {period === 'year' && renderYearView()}
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground font-body">Less</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <div className="w-3 h-3 rounded-sm bg-success/30" />
            <div className="w-3 h-3 rounded-sm bg-success/60" />
            <div className="w-3 h-3 rounded-sm bg-success" />
          </div>
          <span className="text-muted-foreground font-body">More</span>
        </div>
        <div className="text-muted-foreground font-body">
          {data?.filter(d => d?.count > 0)?.length} active days
        </div>
      </div>
    </div>
  );
};

export default LoggingConsistencyCalendar;