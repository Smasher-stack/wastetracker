import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = ({ monthlyStats }) => {
  const stats = [
    {
      id: 1,
      title: 'Days Logged This Month',
      value: monthlyStats?.daysLogged,
      total: monthlyStats?.totalDaysInMonth,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      title: 'Recycling Rate',
      value: `${monthlyStats?.recyclingRate}%`,
      change: monthlyStats?.recyclingRateChange,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 3,
      title: 'Items This Month',
      value: monthlyStats?.totalItems,
      change: monthlyStats?.itemsChange,
      icon: 'Package',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 4,
      title: 'Current Streak',
      value: `${monthlyStats?.currentStreak} days`,
      icon: 'Flame',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const formatChange = (change) => {
    if (!change) return null;
    const isPositive = change > 0;
    return (
      <div className={`flex items-center space-x-1 text-xs font-caption ${
        isPositive ? 'text-success' : 'text-error'
      }`}>
        <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={12} />
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card rounded-xl border border-border p-4 shadow-subtle">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            {stat?.change && formatChange(stat?.change)}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-heading font-bold text-foreground">
                {stat?.value}
              </span>
              {stat?.total && (
                <span className="text-sm font-body text-muted-foreground">
                  / {stat?.total}
                </span>
              )}
            </div>
            <p className="text-sm font-body text-muted-foreground leading-tight">
              {stat?.title}
            </p>
          </div>

          {stat?.total && (
            <div className="mt-3">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    stat?.color?.replace('text-', 'bg-')
                  }`}
                  style={{ width: `${Math.min((stat?.value / stat?.total) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;