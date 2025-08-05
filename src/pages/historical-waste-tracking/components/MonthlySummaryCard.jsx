import React from 'react';
import Icon from '../../../components/AppIcon';

const MonthlySummaryCard = ({ month, year, stats }) => {
  const recyclingRate = stats?.total > 0 ? Math.round((stats?.recyclable / stats?.total) * 100) : 0;
  const previousRate = stats?.previousRecyclingRate || 0;
  const rateChange = recyclingRate - previousRate;

  const formatMonth = (month, year) => {
    const date = new Date(year, month - 1);
    return date?.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          {formatMonth(month, year)} Summary
        </h3>
        <div className="flex items-center space-x-1">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-body text-success">
            {rateChange >= 0 ? '+' : ''}{rateChange}%
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Items */}
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Package" size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">{stats?.total}</p>
          <p className="text-sm font-body text-muted-foreground">Total Items</p>
        </div>

        {/* Recyclable */}
        <div className="text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Recycle" size={20} className="text-success" />
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">{stats?.recyclable}</p>
          <p className="text-sm font-body text-muted-foreground">Recyclable</p>
        </div>

        {/* Landfill */}
        <div className="text-center">
          <div className="w-12 h-12 bg-muted-foreground/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Trash2" size={20} className="text-muted-foreground" />
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">{stats?.landfill}</p>
          <p className="text-sm font-body text-muted-foreground">Landfill</p>
        </div>

        {/* Recycling Rate */}
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={20} className="text-accent" />
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">{recyclingRate}%</p>
          <p className="text-sm font-body text-muted-foreground">Recycling Rate</p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-muted-foreground">Recycling Progress</span>
          <span className="text-sm font-body font-medium text-foreground">{recyclingRate}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-success h-2 rounded-full transition-all duration-500"
            style={{ width: `${recyclingRate}%` }}
          />
        </div>
      </div>
      {/* Trend Indicator */}
      <div className="mt-3 flex items-center justify-center space-x-2">
        <Icon 
          name={rateChange >= 0 ? "TrendingUp" : "TrendingDown"} 
          size={14} 
          className={rateChange >= 0 ? "text-success" : "text-error"}
        />
        <span className={`text-sm font-body ${rateChange >= 0 ? "text-success" : "text-error"}`}>
          {Math.abs(rateChange)}% from last month
        </span>
      </div>
    </div>
  );
};

export default MonthlySummaryCard;