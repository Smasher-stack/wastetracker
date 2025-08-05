import React from 'react';
import Icon from '../../../components/AppIcon';

const DailySummaryPreview = ({ items, selectedDate }) => {
  const recyclableItems = items?.filter(item => item?.category === 'recyclable');
  const landfillItems = items?.filter(item => item?.category === 'landfill');
  
  const totalRecyclableQuantity = recyclableItems?.reduce((sum, item) => sum + item?.quantity, 0);
  const totalLandfillQuantity = landfillItems?.reduce((sum, item) => sum + item?.quantity, 0);

  const formatDate = (date) => {
    if (!date) return 'Today';
    const today = new Date();
    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    }
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 sticky top-24">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Daily Summary
        </h3>
      </div>
      <div className="space-y-4">
        {/* Date */}
        <div className="text-sm text-muted-foreground font-body">
          {formatDate(selectedDate)}
        </div>

        {/* Total Items */}
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-body font-medium text-foreground">
              Total Items
            </span>
            <span className="text-lg font-heading font-bold text-foreground">
              {items?.length}
            </span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3">
          {/* Recyclable */}
          <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Recycle" size={16} className="text-success" />
              </div>
              <div>
                <div className="text-sm font-body font-medium text-foreground">
                  Recyclable
                </div>
                <div className="text-xs text-muted-foreground">
                  {recyclableItems?.length} item{recyclableItems?.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-heading font-bold text-success">
                {totalRecyclableQuantity}
              </div>
              <div className="text-xs text-muted-foreground">
                quantity
              </div>
            </div>
          </div>

          {/* Landfill */}
          <div className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Icon name="Trash2" size={16} className="text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm font-body font-medium text-foreground">
                  Landfill
                </div>
                <div className="text-xs text-muted-foreground">
                  {landfillItems?.length} item{landfillItems?.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-heading font-bold text-muted-foreground">
                {totalLandfillQuantity}
              </div>
              <div className="text-xs text-muted-foreground">
                quantity
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        {recyclableItems?.length > 0 && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Leaf" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-body font-medium text-primary">
                  Great job recycling!
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  You've diverted {totalRecyclableQuantity} item{totalRecyclableQuantity !== 1 ? 's' : ''} from landfill today.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Items List */}
        {items?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-body font-medium text-foreground mb-2">
              Recent Entries
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {items?.slice(-5)?.reverse()?.map((item) => (
                <div key={item?.id} className="flex items-center space-x-2 p-2 bg-muted/20 rounded">
                  <div className={`
                    w-4 h-4 rounded-full flex items-center justify-center
                    ${item?.category === 'recyclable' ?'bg-success/20 text-success' :'bg-muted text-muted-foreground'
                    }
                  `}>
                    <Icon 
                      name={item?.category === 'recyclable' ? 'Recycle' : 'Trash2'} 
                      size={8} 
                    />
                  </div>
                  <span className="text-xs font-body text-foreground flex-1 truncate">
                    {item?.description}
                  </span>
                  {item?.quantity > 1 && (
                    <span className="text-xs text-muted-foreground">
                      ×{item?.quantity}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailySummaryPreview;