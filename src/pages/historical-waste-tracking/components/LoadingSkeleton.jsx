import React from 'react';

const LoadingSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="relative">
          {/* Timeline dot skeleton */}
          <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-muted animate-pulse" />
          
          {/* Timeline line skeleton */}
          <div className="absolute left-1.5 top-9 w-0.5 h-20 bg-muted animate-pulse" />
          
          {/* Content skeleton */}
          <div className="ml-8">
            <div className="p-4 rounded-lg border border-border bg-card">
              {/* Header skeleton */}
              <div className="flex items-center justify-between mb-3">
                <div className="h-5 bg-muted rounded w-32 animate-pulse" />
                <div className="h-4 bg-muted rounded w-16 animate-pulse" />
              </div>
              
              {/* Stats skeleton */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 bg-muted rounded w-20 animate-pulse" />
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 bg-muted rounded w-16 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;