import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentEntriesCard = ({ recentEntries, onEditEntry, onDeleteEntry }) => {
  const [swipedItemId, setSwipedItemId] = useState(null);

  const getCategoryIcon = (category) => {
    return category === 'recyclable' ? 'Recycle' : 'Trash2';
  };

  const getCategoryColor = (category) => {
    return category === 'recyclable' ? 'text-success' : 'text-error';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSwipe = (itemId) => {
    setSwipedItemId(swipedItemId === itemId ? null : itemId);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">Recent Entries</h2>
        <Button variant="ghost" iconName="MoreHorizontal" iconSize={16} />
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recentEntries?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-body">No entries logged today</p>
            <p className="text-sm text-muted-foreground font-caption mt-1">Start tracking your waste!</p>
          </div>
        ) : (
          recentEntries?.map((entry) => (
            <div
              key={entry?.id}
              className="relative overflow-hidden rounded-lg border border-border bg-background"
            >
              <div
                className={`flex items-center p-4 transition-transform duration-200 ${
                  swipedItemId === entry?.id ? '-translate-x-20' : 'translate-x-0'
                }`}
                onClick={() => handleSwipe(entry?.id)}
              >
                <div className={`p-2 rounded-full bg-muted mr-3 ${getCategoryColor(entry?.category)}`}>
                  <Icon name={getCategoryIcon(entry?.category)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">
                    {entry?.description}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {formatTime(entry?.timestamp)}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-caption px-2 py-1 rounded-full ${
                    entry?.category === 'recyclable' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                  }`}>
                    {entry?.category === 'recyclable' ? 'Recyclable' : 'Landfill'}
                  </span>
                </div>
              </div>

              {/* Swipe Actions */}
              {swipedItemId === entry?.id && (
                <div className="absolute right-0 top-0 h-full flex items-center bg-muted">
                  <Button
                    variant="ghost"
                    iconName="Edit2"
                    iconSize={14}
                    onClick={() => onEditEntry(entry)}
                    className="h-full px-3 rounded-none text-accent hover:bg-accent/10"
                  />
                  <Button
                    variant="ghost"
                    iconName="Trash2"
                    iconSize={14}
                    onClick={() => onDeleteEntry(entry?.id)}
                    className="h-full px-3 rounded-none text-error hover:bg-error/10"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentEntriesCard;