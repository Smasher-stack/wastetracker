import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import all components
import DateHeader from './components/DateHeader';
import WasteEntryForm from './components/WasteEntryForm';
import QuickAddButtons from './components/QuickAddButtons';
import RecentSuggestions from './components/RecentSuggestions';
import DailySummaryPreview from './components/DailySummaryPreview';
import SaveProgressIndicator from './components/SaveProgressIndicator';

const DailyWasteEntry = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [wasteItems, setWasteItems] = useState([]);
  const [showMultipleEntry, setShowMultipleEntry] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState({ show: false, message: '', type: 'success' });
  const [recentSuggestions, setRecentSuggestions] = useState([]);

  // Mock recent suggestions data
  const mockRecentSuggestions = [
    { description: "Plastic water bottle", category: "recyclable", quantity: 1 },
    { description: "Coffee cup", category: "landfill", quantity: 1 },
    { description: "Newspaper", category: "recyclable", quantity: 1 },
    { description: "Food container", category: "recyclable", quantity: 1 },
    { description: "Banana peel", category: "landfill", quantity: 1 },
    { description: "Cardboard box", category: "recyclable", quantity: 1 },
    { description: "Tissue paper", category: "landfill", quantity: 1 },
    { description: "Glass jar", category: "recyclable", quantity: 1 }
  ];

  useEffect(() => {
    // Load recent suggestions
    setRecentSuggestions(mockRecentSuggestions);
    
    // Load saved items for selected date
    const dateKey = selectedDate?.toDateString();
    const savedItems = localStorage.getItem(`waste-items-${dateKey}`);
    if (savedItems) {
      setWasteItems(JSON.parse(savedItems));
    } else {
      setWasteItems([]);
    }
  }, [selectedDate]);

  const handleAddItem = (item) => {
    const newItems = [...wasteItems, item];
    setWasteItems(newItems);
    
    // Auto-save to localStorage
    const dateKey = selectedDate?.toDateString();
    localStorage.setItem(`waste-items-${dateKey}`, JSON.stringify(newItems));
    
    // Show save indicator
    setSaveIndicator({
      show: true,
      message: 'Item added successfully!',
      type: 'success'
    });

    // Update recent suggestions
    const updatedSuggestions = [item, ...recentSuggestions?.filter(s => s?.description !== item?.description)]?.slice(0, 8);
    setRecentSuggestions(updatedSuggestions);
  };

  const handleQuickAdd = (item) => {
    handleAddItem(item);
  };

  const handleSelectSuggestion = (suggestion) => {
    const newItem = {
      ...suggestion,
      id: Date.now(),
      timestamp: new Date()
    };
    handleAddItem(newItem);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLogAllItems = () => {
    if (wasteItems?.length === 0) {
      setSaveIndicator({
        show: true,
        message: 'No items to log',
        type: 'error'
      });
      return;
    }

    // Simulate logging process
    setSaveIndicator({
      show: true,
      message: 'Logging items...',
      type: 'loading'
    });

    setTimeout(() => {
      setSaveIndicator({
        show: true,
        message: `${wasteItems?.length} items logged successfully!`,
        type: 'success'
      });
      
      // Navigate to dashboard after successful logging
      setTimeout(() => {
        navigate('/waste-log-dashboard');
      }, 1500);
    }, 1000);
  };

  const toggleMultipleEntry = () => {
    setShowMultipleEntry(!showMultipleEntry);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Save Progress Indicator */}
      <SaveProgressIndicator
        isVisible={saveIndicator?.show}
        message={saveIndicator?.message}
        type={saveIndicator?.type}
      />
      {/* Date Header */}
      <DateHeader
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        itemCount={wasteItems?.length}
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Entry Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Suggestions */}
            <RecentSuggestions
              suggestions={recentSuggestions}
              onSelectSuggestion={handleSelectSuggestion}
            />

            {/* Quick Add Buttons */}
            <QuickAddButtons onQuickAdd={handleQuickAdd} />

            {/* Main Entry Form */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold text-foreground">
                  Add Waste Item
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMultipleEntry}
                  iconName={showMultipleEntry ? "Minus" : "Plus"}
                  iconPosition="left"
                >
                  {showMultipleEntry ? 'Single Entry' : 'Multiple Entry'}
                </Button>
              </div>

              <WasteEntryForm onAddItem={handleAddItem} />

              {/* Additional Entry Form for Multiple Entry Mode */}
              {showMultipleEntry && (
                <div className="mt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Plus" size={16} className="text-primary" />
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      Add Another Item
                    </h3>
                  </div>
                  <WasteEntryForm onAddItem={handleAddItem} />
                </div>
              )}
            </div>

            {/* Current Session Items */}
            {wasteItems?.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Today's Entries ({wasteItems?.length})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => navigate('/waste-log-dashboard')}
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {wasteItems?.map((item) => (
                    <div key={item?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center
                          ${item?.category === 'recyclable' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                          }
                        `}>
                          <Icon 
                            name={item?.category === 'recyclable' ? 'Recycle' : 'Trash2'} 
                            size={16} 
                          />
                        </div>
                        <div>
                          <div className="text-sm font-body font-medium text-foreground">
                            {item?.description}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item?.category} • Qty: {item?.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item?.timestamp?.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary (Desktop Only) */}
          <div className="hidden lg:block">
            <DailySummaryPreview
              items={wasteItems}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
      {/* Fixed Bottom Action Button (Mobile) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleLogAllItems}
          iconName="Save"
          iconPosition="left"
          disabled={wasteItems?.length === 0}
        >
          Log {wasteItems?.length} Item{wasteItems?.length !== 1 ? 's' : ''}
        </Button>
      </div>
      {/* Desktop Action Button */}
      <div className="hidden lg:block fixed bottom-6 right-6">
        <Button
          variant="default"
          size="lg"
          onClick={handleLogAllItems}
          iconName="Save"
          iconPosition="left"
          disabled={wasteItems?.length === 0}
        >
          Log {wasteItems?.length} Item{wasteItems?.length !== 1 ? 's' : ''}
        </Button>
      </div>
      {/* Bottom Navigation */}
      <BottomTabNavigation />
      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default DailyWasteEntry;