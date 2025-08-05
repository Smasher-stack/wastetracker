import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryBreakdownTable = ({ data }) => {
  const [sortBy, setSortBy] = useState('frequency');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'recyclingRate') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Plastic Bottles': 'Bottle',
      'Food Waste': 'Apple',
      'Paper': 'FileText',
      'Glass': 'Wine',
      'Electronics': 'Smartphone',
      'Cardboard': 'Package',
      'Metal Cans': 'Cylinder',
      'Organic': 'Leaf'
    };
    return icons?.[category] || 'Package';
  };

  const getRecyclingRateColor = (rate) => {
    const numRate = parseFloat(rate);
    if (numRate >= 80) return 'text-success';
    if (numRate >= 60) return 'text-warning';
    return 'text-error';
  };

  const getTotalItems = () => {
    return data?.reduce((sum, item) => sum + item?.frequency, 0);
  };

  const getAverageRecyclingRate = () => {
    const sum = data?.reduce((acc, item) => acc + parseFloat(item?.recyclingRate), 0);
    return (sum / data?.length)?.toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Category Breakdown
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-muted-foreground font-body">
            Total: {getTotalItems()} items
          </div>
          <div className="text-muted-foreground font-body">
            Avg Rate: {getAverageRecyclingRate()}%
          </div>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {sortedData?.map((item, index) => (
          <div key={index} className="border border-border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={getCategoryIcon(item?.category)} size={16} className="text-muted-foreground" />
                <span className="font-body font-medium text-foreground">
                  {item?.category}
                </span>
              </div>
              <span className={`text-sm font-body font-semibold ${getRecyclingRateColor(item?.recyclingRate)}`}>
                {item?.recyclingRate}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-body">
                {item?.frequency} items
              </span>
              <span className="text-muted-foreground font-body">
                Last: {item?.lastLogged}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <span>Category</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2">
                <button
                  onClick={() => handleSort('frequency')}
                  className="flex items-center justify-end space-x-1 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <span>Frequency</span>
                  <Icon name={getSortIcon('frequency')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2">
                <button
                  onClick={() => handleSort('recyclingRate')}
                  className="flex items-center justify-end space-x-1 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <span>Recycling Rate</span>
                  <Icon name={getSortIcon('recyclingRate')} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2">
                <span className="text-sm font-body font-medium text-muted-foreground">
                  Last Logged
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((item, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/50 transition-smooth">
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={getCategoryIcon(item?.category)} size={16} className="text-muted-foreground" />
                    <span className="font-body text-foreground">
                      {item?.category}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="font-body text-foreground">
                    {item?.frequency}
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className={`font-body font-semibold ${getRecyclingRateColor(item?.recyclingRate)}`}>
                    {item?.recyclingRate}%
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="text-sm font-body text-muted-foreground">
                    {item?.lastLogged}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-heading font-bold text-foreground">
              {data?.length}
            </div>
            <div className="text-xs text-muted-foreground font-body">
              Categories
            </div>
          </div>
          <div>
            <div className="text-lg font-heading font-bold text-foreground">
              {getTotalItems()}
            </div>
            <div className="text-xs text-muted-foreground font-body">
              Total Items
            </div>
          </div>
          <div>
            <div className="text-lg font-heading font-bold text-success">
              {getAverageRecyclingRate()}%
            </div>
            <div className="text-xs text-muted-foreground font-body">
              Avg Recycling
            </div>
          </div>
          <div>
            <div className="text-lg font-heading font-bold text-primary">
              {data?.filter(item => parseFloat(item?.recyclingRate) >= 80)?.length}
            </div>
            <div className="text-xs text-muted-foreground font-body">
              High Performers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdownTable;