import React from 'react';
import Icon from '../../../components/AppIcon';

const KeyMetricsCards = ({ metrics, period }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const cards = [
    {
      title: 'Total Items Logged',
      value: formatNumber(metrics?.totalItems),
      trend: metrics?.totalItemsTrend,
      icon: 'Package',
      color: 'bg-primary/10 text-primary'
    },
    {
      title: 'Recycling Rate',
      value: `${metrics?.recyclingRate}%`,
      trend: metrics?.recyclingTrend,
      icon: 'Recycle',
      color: 'bg-success/10 text-success'
    },
    {
      title: 'Impact Score',
      value: formatNumber(metrics?.impactScore),
      trend: metrics?.impactTrend,
      icon: 'Leaf',
      color: 'bg-accent/10 text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards?.map((card, index) => {
        const trendInfo = getTrendIcon(card?.trend);
        
        return (
          <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card?.color}`}>
                <Icon name={card?.icon} size={20} />
              </div>
              <div className="flex items-center space-x-1">
                <Icon name={trendInfo?.icon} size={14} className={trendInfo?.color} />
                <span className={`text-xs font-body font-medium ${trendInfo?.color}`}>
                  {Math.abs(card?.trend)}%
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-1">
                {card?.value}
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                {card?.title}
              </p>
              <p className="text-xs text-muted-foreground font-caption mt-1">
                vs previous {period}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KeyMetricsCards;