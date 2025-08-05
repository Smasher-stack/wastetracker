import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatsHeader = ({ selectedPeriod, onPeriodChange, onShare }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const handlePeriodSelect = (period) => {
    onPeriodChange(period);
    setIsDropdownOpen(false);
  };

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center lg:hidden">
              <Icon name="BarChart3" size={18} color="white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-heading font-bold text-foreground">
                Statistics
              </h1>
              <p className="text-sm text-muted-foreground font-body hidden lg:block">
                Track your environmental impact
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Period Selector */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                iconName="ChevronDown"
                iconPosition="right"
                className="text-sm"
              >
                {periods?.find(p => p?.value === selectedPeriod)?.label}
              </Button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 min-w-[140px]">
                  {periods?.map((period) => (
                    <button
                      key={period?.value}
                      onClick={() => handlePeriodSelect(period?.value)}
                      className={`w-full text-left px-3 py-2 text-sm font-body hover:bg-muted transition-smooth first:rounded-t-lg last:rounded-b-lg ${
                        selectedPeriod === period?.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                      }`}
                    >
                      {period?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Share Button */}
            <Button
              variant="ghost"
              onClick={onShare}
              iconName="Share2"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;