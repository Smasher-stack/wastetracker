import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const WasteEntryForm = ({ onAddItem, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    category: initialData?.category || 'recyclable',
    quantity: initialData?.quantity || 1,
    notes: initialData?.notes || ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    {
      id: 'recyclable',
      label: 'Recyclable',
      icon: 'Recycle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success',
      description: 'Items that can be recycled'
    },
    {
      id: 'landfill',
      label: 'Landfill',
      icon: 'Trash2',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-muted-foreground/20',
      description: 'Items that go to landfill'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.description?.trim()) {
      newErrors.description = 'Item description is required';
    }
    
    if (formData?.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onAddItem({
        ...formData,
        id: initialData?.id || Date.now(),
        timestamp: initialData?.timestamp || new Date()
      });
      
      // Reset form if not editing
      if (!initialData) {
        setFormData({
          description: '',
          category: 'recyclable',
          quantity: 1,
          notes: ''
        });
      }
    }
  };

  const adjustQuantity = (delta) => {
    const newQuantity = Math.max(1, formData?.quantity + delta);
    handleInputChange('quantity', newQuantity);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Description */}
        <div>
          <Input
            label="What did you throw away?"
            type="text"
            placeholder="e.g., Plastic water bottle, Food container, Paper..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            error={errors?.description}
            required
            className="text-base"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-3">
            Category <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories?.map((category) => (
              <button
                key={category?.id}
                type="button"
                onClick={() => handleInputChange('category', category?.id)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200
                  ${formData?.category === category?.id
                    ? `${category?.borderColor} ${category?.bgColor}`
                    : 'border-border bg-background hover:bg-muted/50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${formData?.category === category?.id ? category?.bgColor : 'bg-muted'}
                  `}>
                    <Icon 
                      name={category?.icon} 
                      size={20} 
                      className={formData?.category === category?.id ? category?.color : 'text-muted-foreground'}
                    />
                  </div>
                  <div className="text-left">
                    <div className={`font-body font-semibold ${
                      formData?.category === category?.id ? category?.color : 'text-foreground'
                    }`}>
                      {category?.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {category?.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => adjustQuantity(-1)}
              disabled={formData?.quantity <= 1}
            >
              <Icon name="Minus" size={16} />
            </Button>
            
            <div className="flex-1 max-w-24">
              <Input
                type="number"
                value={formData?.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e?.target?.value) || 1)}
                min="1"
                className="text-center"
              />
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => adjustQuantity(1)}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          {errors?.quantity && (
            <p className="mt-1 text-sm text-error font-body">{errors?.quantity}</p>
          )}
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={formData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
            placeholder="Any additional details about this item..."
            rows={3}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground font-body resize-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-smooth"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="submit"
            variant="default"
            iconName="Plus"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            {initialData ? 'Update Item' : 'Add Item'}
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WasteEntryForm;