import React from 'react';
import Icon from '../../../components/AppIcon';

const TodaySummaryCard = ({ todayStats }) => {
  const { totalItems, recyclables, landfill, environmentalScore } = todayStats;
  const recyclablePercentage = totalItems > 0 ? Math.round((recyclables / totalItems) * 100) : 0;
  const landfillPercentage = totalItems > 0 ? Math.round((landfill / totalItems) * 100) : 0;

  const getScoreBadge = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-success text-success-foreground', icon: 'Award' };
    if (score >= 60) return { label: 'Good', color: 'bg-accent text-accent-foreground', icon: 'Star' };
    if (score >= 40) return { label: 'Fair', color: 'bg-warning text-warning-foreground', icon: 'AlertCircle' };
    return { label: 'Needs Work', color: 'bg-error text-error-foreground', icon: 'AlertTriangle' };
  };

  const scoreBadge = getScoreBadge(environmentalScore);

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">Today's Summary</h2>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-caption ${scoreBadge?.color}`}>
          <Icon name={scoreBadge?.icon} size={14} />
          <span>{scoreBadge?.label}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-foreground">{totalItems}</div>
          <div className="text-sm font-body text-muted-foreground">Items Logged</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-primary">{environmentalScore}</div>
          <div className="text-sm font-body text-muted-foreground">Eco Score</div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Recycle" size={16} className="text-success" />
              <span className="text-sm font-body text-foreground">Recyclables</span>
            </div>
            <span className="text-sm font-body font-medium text-foreground">{recyclables} ({recyclablePercentage}%)</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${recyclablePercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Trash2" size={16} className="text-error" />
              <span className="text-sm font-body text-foreground">Landfill</span>
            </div>
            <span className="text-sm font-body font-medium text-foreground">{landfill} ({landfillPercentage}%)</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-error h-2 rounded-full transition-all duration-300"
              style={{ width: `${landfillPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaySummaryCard;