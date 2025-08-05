import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CategoryDistributionChart = ({ categoryData }) => {
  const data = [
    { name: 'Recyclables', value: categoryData?.recyclables, color: '#27AE60' },
    { name: 'Landfill', value: categoryData?.landfill, color: '#E74C3C' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-body font-medium text-foreground">{data?.name}</p>
          <p className="text-sm font-caption text-muted-foreground">
            {data?.value} items ({Math.round((data?.value / (categoryData?.recyclables + categoryData?.landfill)) * 100)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-sm font-body text-foreground">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const totalItems = categoryData?.recyclables + categoryData?.landfill;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">Category Distribution</h2>
        <div className="flex items-center space-x-1 text-sm font-caption text-muted-foreground">
          <Icon name="PieChart" size={14} />
          <span>Today</span>
        </div>
      </div>
      {totalItems === 0 ? (
        <div className="text-center py-8">
          <Icon name="PieChart" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-body">No data to display</p>
          <p className="text-sm text-muted-foreground font-caption mt-1">Start logging waste items!</p>
        </div>
      ) : (
        <>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-xl font-heading font-bold text-success">{categoryData?.recyclables}</div>
              <div className="text-sm font-body text-muted-foreground">Recyclables</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-heading font-bold text-error">{categoryData?.landfill}</div>
              <div className="text-sm font-body text-muted-foreground">Landfill</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDistributionChart;