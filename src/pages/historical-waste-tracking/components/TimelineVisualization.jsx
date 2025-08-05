import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineVisualization = ({ entries, selectedDate, onDateSelect }) => {
  const groupedEntries = entries?.reduce((acc, entry) => {
    const date = entry?.date?.toDateString();
    if (!acc?.[date]) {
      acc[date] = [];
    }
    acc?.[date]?.push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedEntries)?.sort((a, b) => new Date(b) - new Date(a));

  const getCategoryStats = (dayEntries) => {
    const recyclable = dayEntries?.filter(entry => entry?.category === 'recyclable')?.length;
    const landfill = dayEntries?.filter(entry => entry?.category === 'landfill')?.length;
    return { recyclable, landfill, total: recyclable + landfill };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {sortedDates?.map((dateString) => {
        const dayEntries = groupedEntries?.[dateString];
        const stats = getCategoryStats(dayEntries);
        const isSelected = selectedDate && selectedDate?.toDateString() === dateString;

        return (
          <div key={dateString} className="relative">
            {/* Timeline dot */}
            <div className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-background z-10">
              <div className={`w-full h-full rounded-full ${
                stats?.recyclable > stats?.landfill ? 'bg-success' : 'bg-muted-foreground'
              }`} />
            </div>
            {/* Timeline line */}
            <div className="absolute left-1.5 top-9 w-0.5 h-full bg-border" />
            {/* Content */}
            <div className="ml-8">
              <button
                onClick={() => onDateSelect(new Date(dateString))}
                className={`w-full text-left p-4 rounded-lg border transition-smooth ${
                  isSelected 
                    ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-semibold text-foreground">
                    {formatDate(dateString)}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-body text-muted-foreground">
                      {stats?.total} items
                    </span>
                    <Icon 
                      name={isSelected ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm font-body text-muted-foreground">
                      {stats?.recyclable} recyclable
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    <span className="text-sm font-body text-muted-foreground">
                      {stats?.landfill} landfill
                    </span>
                  </div>
                </div>
              </button>

              {/* Expanded entries */}
              {isSelected && (
                <div className="mt-3 space-y-2 animate-scale-in">
                  {dayEntries?.map((entry) => (
                    <div
                      key={entry?.id}
                      className="p-3 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon 
                              name={entry?.category === 'recyclable' ? 'Recycle' : 'Trash2'} 
                              size={16} 
                              className={entry?.category === 'recyclable' ? 'text-success' : 'text-muted-foreground'}
                            />
                            <span className="font-body font-medium text-foreground">
                              {entry?.description}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground font-body">
                            {entry?.timestamp?.toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button className="p-1 rounded hover:bg-muted transition-smooth">
                            <Icon name="Edit2" size={14} className="text-muted-foreground" />
                          </button>
                          <button className="p-1 rounded hover:bg-muted transition-smooth">
                            <Icon name="Trash2" size={14} className="text-error" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineVisualization;