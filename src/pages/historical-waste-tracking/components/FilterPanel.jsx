import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, resultsCount }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { id: 'recyclable', label: 'Recyclable', icon: 'Recycle', color: 'text-success' },
    { id: 'landfill', label: 'Landfill', icon: 'Trash2', color: 'text-muted-foreground' }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev?.categories, categoryId]
        : prev?.categories?.filter(id => id !== categoryId)
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev?.dateRange,
        [field]: value
      }
    }));
  };

  const handleSearchChange = (e) => {
    setLocalFilters(prev => ({
      ...prev,
      searchTerm: e?.target?.value
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const resetFilters = () => {
    const defaultFilters = {
      categories: ['recyclable', 'landfill'],
      dateRange: { start: '', end: '' },
      searchTerm: ''
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50
        transform transition-transform duration-300 ease-out
        lg:relative lg:transform-none lg:w-full lg:h-auto lg:border-l-0 lg:border lg:rounded-lg
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0">
          <h3 className="font-heading font-semibold text-foreground">Filters</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-body text-muted-foreground">
              {resultsCount} results
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-muted transition-smooth lg:hidden"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] lg:max-h-none">
          {/* Search */}
          <div>
            <Input
              label="Search items"
              type="search"
              placeholder="Search waste items..."
              value={localFilters?.searchTerm}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">Categories</h4>
            <div className="space-y-2">
              {categoryOptions?.map((category) => (
                <div key={category?.id} className="flex items-center space-x-3">
                  <Checkbox
                    checked={localFilters?.categories?.includes(category?.id)}
                    onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                  />
                  <Icon name={category?.icon} size={16} className={category?.color} />
                  <span className="font-body text-foreground">{category?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">Date Range</h4>
            <div className="space-y-3">
              <Input
                label="Start Date"
                type="date"
                value={localFilters?.dateRange?.start}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={localFilters?.dateRange?.end}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
              />
            </div>
          </div>

          {/* Quick Date Filters */}
          <div>
            <h4 className="font-body font-medium text-foreground mb-3">Quick Filters</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const today = new Date();
                  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                  handleDateRangeChange('start', lastWeek?.toISOString()?.split('T')?.[0]);
                  handleDateRangeChange('end', today?.toISOString()?.split('T')?.[0]);
                }}
              >
                Last Week
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const today = new Date();
                  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                  handleDateRangeChange('start', lastMonth?.toISOString()?.split('T')?.[0]);
                  handleDateRangeChange('end', today?.toISOString()?.split('T')?.[0]);
                }}
              >
                Last Month
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const today = new Date();
                  const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
                  handleDateRangeChange('start', lastYear?.toISOString()?.split('T')?.[0]);
                  handleDateRangeChange('end', today?.toISOString()?.split('T')?.[0]);
                }}
              >
                Last Year
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleDateRangeChange('start', '');
                  handleDateRangeChange('end', '');
                }}
              >
                All Time
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              onClick={applyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;