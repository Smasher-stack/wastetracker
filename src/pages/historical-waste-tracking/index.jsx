import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import TimelineVisualization from './components/TimelineVisualization';
import FilterPanel from './components/FilterPanel';
import MonthlySummaryCard from './components/MonthlySummaryCard';
import DateRangeSelector from './components/DateRangeSelector';
import LoadingSkeleton from './components/LoadingSkeleton';

const HistoricalWasteTracking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedView, setSelectedView] = useState('month');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [filters, setFilters] = useState({
    categories: ['recyclable', 'landfill'],
    dateRange: { start: '', end: '' },
    searchTerm: ''
  });

  // Mock historical waste data
  const mockWasteEntries = [
    {
      id: 1,
      description: "Plastic water bottle",
      category: "recyclable",
      date: new Date(2025, 7, 4),
      timestamp: new Date(2025, 7, 4, 14, 30)
    },
    {
      id: 2,
      description: "Food packaging",
      category: "landfill",
      date: new Date(2025, 7, 4),
      timestamp: new Date(2025, 7, 4, 18, 15)
    },
    {
      id: 3,
      description: "Aluminum can",
      category: "recyclable",
      date: new Date(2025, 7, 3),
      timestamp: new Date(2025, 7, 3, 12, 45)
    },
    {
      id: 4,
      description: "Paper towels",
      category: "landfill",
      date: new Date(2025, 7, 3),
      timestamp: new Date(2025, 7, 3, 16, 20)
    },
    {
      id: 5,
      description: "Glass jar",
      category: "recyclable",
      date: new Date(2025, 7, 3),
      timestamp: new Date(2025, 7, 3, 19, 10)
    },
    {
      id: 6,
      description: "Cardboard box",
      category: "recyclable",
      date: new Date(2025, 7, 2),
      timestamp: new Date(2025, 7, 2, 10, 30)
    },
    {
      id: 7,
      description: "Plastic bag",
      category: "landfill",
      date: new Date(2025, 7, 2),
      timestamp: new Date(2025, 7, 2, 15, 45)
    },
    {
      id: 8,
      description: "Newspaper",
      category: "recyclable",
      date: new Date(2025, 7, 1),
      timestamp: new Date(2025, 7, 1, 8, 20)
    },
    {
      id: 9,
      description: "Coffee cup",
      category: "landfill",
      date: new Date(2025, 7, 1),
      timestamp: new Date(2025, 7, 1, 11, 15)
    },
    {
      id: 10,
      description: "Metal can",
      category: "recyclable",
      date: new Date(2025, 7, 1),
      timestamp: new Date(2025, 7, 1, 17, 30)
    },
    {
      id: 11,
      description: "Tissue paper",
      category: "landfill",
      date: new Date(2025, 6, 31),
      timestamp: new Date(2025, 6, 31, 13, 45)
    },
    {
      id: 12,
      description: "Wine bottle",
      category: "recyclable",
      date: new Date(2025, 6, 31),
      timestamp: new Date(2025, 6, 31, 20, 15)
    },
    {
      id: 13,
      description: "Pizza box",
      category: "recyclable",
      date: new Date(2025, 6, 30),
      timestamp: new Date(2025, 6, 30, 19, 30)
    },
    {
      id: 14,
      description: "Disposable utensils",
      category: "landfill",
      date: new Date(2025, 6, 30),
      timestamp: new Date(2025, 6, 30, 12, 20)
    },
    {
      id: 15,
      description: "Magazine",
      category: "recyclable",
      date: new Date(2025, 6, 29),
      timestamp: new Date(2025, 6, 29, 16, 10)
    }
  ];

  // Mock monthly summary data
  const monthlySummaries = [
    {
      month: 8,
      year: 2025,
      stats: {
        total: 45,
        recyclable: 28,
        landfill: 17,
        previousRecyclingRate: 58
      }
    },
    {
      month: 7,
      year: 2025,
      stats: {
        total: 52,
        recyclable: 30,
        landfill: 22,
        previousRecyclingRate: 55
      }
    }
  ];

  // Filter entries based on current filters
  const filteredEntries = mockWasteEntries?.filter(entry => {
    // Category filter
    if (!filters?.categories?.includes(entry?.category)) return false;
    
    // Search filter
    if (filters?.searchTerm && !entry?.description?.toLowerCase()?.includes(filters?.searchTerm?.toLowerCase())) {
      return false;
    }
    
    // Date range filter
    if (filters?.dateRange?.start && entry?.date < new Date(filters.dateRange.start)) return false;
    if (filters?.dateRange?.end && entry?.date > new Date(filters.dateRange.end)) return false;
    
    return true;
  });

  const handleDateSelect = (date) => {
    setSelectedDate(selectedDate && selectedDate?.toDateString() === date?.toDateString() ? null : date);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = "data:text/csv;charset=utf-8," + "Date,Description,Category,Time\n" +
      filteredEntries?.map(entry => 
        `${entry?.date?.toLocaleDateString()},${entry?.description},${entry?.category},${entry?.timestamp?.toLocaleTimeString()}`
      )?.join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link?.setAttribute("href", encodedUri);
    link?.setAttribute("download", "waste_history.csv");
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const loadMoreData = useCallback(() => {
    setIsLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement?.scrollTop !== document.documentElement?.offsetHeight || isLoading) {
        return;
      }
      loadMoreData();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, loadMoreData]);

  return (
    <div className="min-h-screen bg-background">
      {/* Date Range Selector - Sticky Header */}
      <DateRangeSelector
        selectedView={selectedView}
        onViewChange={setSelectedView}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
      />
      <div className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <FilterPanel
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                resultsCount={filteredEntries?.length}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Waste History
              </h1>
              <Button
                variant="outline"
                iconName="Filter"
                iconPosition="left"
                onClick={() => setIsFilterOpen(true)}
              >
                Filters ({filteredEntries?.length})
              </Button>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex lg:items-center lg:justify-between lg:mb-6">
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Waste History
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-body text-muted-foreground">
                  {filteredEntries?.length} entries found
                </span>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExport}
                >
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Monthly Summary Cards */}
            {monthlySummaries?.map((summary) => (
              <MonthlySummaryCard
                key={`${summary?.month}-${summary?.year}`}
                month={summary?.month}
                year={summary?.year}
                stats={summary?.stats}
              />
            ))}

            {/* Timeline Visualization */}
            {filteredEntries?.length > 0 ? (
              <TimelineVisualization
                entries={filteredEntries}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  No entries found
                </h3>
                <p className="text-muted-foreground font-body mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    categories: ['recyclable', 'landfill'],
                    dateRange: { start: '', end: '' },
                    searchTerm: ''
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Loading Skeleton */}
            {isLoading && <LoadingSkeleton count={3} />}
          </div>
        </div>
      </div>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultsCount={filteredEntries?.length}
      />
      {/* Navigation */}
      <BottomTabNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default HistoricalWasteTracking;