import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RecyclingTrendChart = ({ data, period }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-body font-medium text-foreground mb-1">
            {label}
          </p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatXAxisLabel = (tickItem) => {
    if (period === 'week') {
      return new Date(tickItem)?.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (period === 'month') {
      return new Date(tickItem)?.toLocaleDateString('en-US', { day: 'numeric' });
    } else {
      return new Date(tickItem)?.toLocaleDateString('en-US', { month: 'short' });
    }
  };

  const getAverageRate = () => {
    const sum = data?.reduce((acc, item) => acc + item?.recyclingRate, 0);
    return (sum / data?.length)?.toFixed(1);
  };

  const getBestRate = () => {
    return Math.max(...data?.map(item => item?.recyclingRate));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Recycling Rate Trend
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-muted-foreground font-body">
            Avg: {getAverageRate()}%
          </div>
          <div className="text-success font-body">
            Best: {getBestRate()}%
          </div>
        </div>
      </div>
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              domain={[0, 100]}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="recyclingRate" 
              stroke="var(--color-success)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
              name="Recycling Rate"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-3 bg-success/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full" />
          <span className="text-sm font-body text-foreground">
            {data?.length > 1 && data?.[data?.length - 1]?.recyclingRate > data?.[data?.length - 2]?.recyclingRate
              ? `📈 Improving! Up ${(data?.[data?.length - 1]?.recyclingRate - data?.[data?.length - 2]?.recyclingRate)?.toFixed(1)}% from last period`
              : data?.length > 1 && data?.[data?.length - 1]?.recyclingRate < data?.[data?.length - 2]?.recyclingRate
              ? `📉 Down ${(data?.[data?.length - 2]?.recyclingRate - data?.[data?.length - 1]?.recyclingRate)?.toFixed(1)}% from last period`
              : '📊 Keep up the great work!'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecyclingTrendChart;