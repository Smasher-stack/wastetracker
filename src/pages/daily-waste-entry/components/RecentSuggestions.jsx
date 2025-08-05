import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSuggestions = ({ suggestions, onSelectSuggestion }) => {
  if (!suggestions || suggestions?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Clock" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Recent Items
        </h3>
        <span className="text-sm text-muted-foreground font-body">
          Tap to add again
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions?.slice(0, 8)?.map((suggestion, index) => (
          <Button
            key={`${suggestion?.description}-${index}`}
            variant="ghost"
            onClick={() => onSelectSuggestion(suggestion)}
            className="h-auto p-2 bg-muted/30 hover:bg-muted/60 border border-border/50 rounded-full transition-smooth"
          >
            <div className="flex items-center space-x-2">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center
                ${suggestion?.category === 'recyclable' ?'bg-success/20 text-success' :'bg-muted-foreground/20 text-muted-foreground'
                }
              `}>
                <Icon 
                  name={suggestion?.category === 'recyclable' ? 'Recycle' : 'Trash2'} 
                  size={12} 
                />
              </div>
              <span className="text-sm font-body text-foreground">
                {suggestion?.description}
              </span>
              {suggestion?.quantity > 1 && (
                <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-body font-medium">
                  {suggestion?.quantity}
                </span>
              )}
            </div>
          </Button>
        ))}
      </div>
      {suggestions?.length > 8 && (
        <div className="mt-3 text-center">
          <span className="text-sm text-muted-foreground font-body">
            +{suggestions?.length - 8} more recent items
          </span>
        </div>
      )}
    </div>
  );
};

export default RecentSuggestions;