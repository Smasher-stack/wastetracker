import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAddButtons = ({ onQuickAdd }) => {
  const quickAddItems = [
    {
      id: 'plastic-bottle',
      label: 'Plastic Bottle',
      icon: 'Bottle',
      category: 'recyclable',
      description: 'Plastic water/soda bottle'
    },
    {
      id: 'food-waste',
      label: 'Food Waste',
      icon: 'Apple',
      category: 'landfill',
      description: 'Food scraps and leftovers'
    },
    {
      id: 'paper',
      label: 'Paper',
      icon: 'FileText',
      category: 'recyclable',
      description: 'Paper documents, newspapers'
    },
    {
      id: 'cardboard',
      label: 'Cardboard',
      icon: 'Package',
      category: 'recyclable',
      description: 'Cardboard boxes, packaging'
    },
    {
      id: 'glass',
      label: 'Glass',
      icon: 'Wine',
      category: 'recyclable',
      description: 'Glass bottles, jars'
    },
    {
      id: 'general-trash',
      label: 'General Trash',
      icon: 'Trash2',
      category: 'landfill',
      description: 'Non-recyclable waste'
    }
  ];

  const handleQuickAdd = (item) => {
    onQuickAdd({
      id: Date.now(),
      description: item?.description,
      category: item?.category,
      quantity: 1,
      notes: `Added via quick-add: ${item?.label}`,
      timestamp: new Date()
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-accent" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Quick Add
        </h3>
        <span className="text-sm text-muted-foreground font-body">
          Common items
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickAddItems?.map((item) => (
          <Button
            key={item?.id}
            variant="outline"
            onClick={() => handleQuickAdd(item)}
            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-muted/50 transition-smooth"
          >
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center
              ${item?.category === 'recyclable' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }
            `}>
              <Icon name={item?.icon} size={20} />
            </div>
            <span className="text-xs font-body font-medium text-center leading-tight">
              {item?.label}
            </span>
          </Button>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground font-body">
            Quick add buttons automatically categorize common items. You can edit details after adding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickAddButtons;