import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import DashboardHeader from './components/DashboardHeader';
import TodaySummaryCard from './components/TodaySummaryCard';
import RecentEntriesCard from './components/RecentEntriesCard';
import WeeklyProgressChart from './components/WeeklyProgressChart';
import CategoryDistributionChart from './components/CategoryDistributionChart';
import QuickStatsCards from './components/QuickStatsCards';
import SearchBar from './components/SearchBar';

const WasteLogDashboard = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for dashboard
  const mockWasteEntries = [
    {
      id: 1,
      description: "Plastic water bottle",
      category: "recyclable",
      timestamp: new Date(2025, 7, 5, 8, 30),
      date: "2025-08-05"
    },
    {
      id: 2,
      description: "Food packaging wrapper",
      category: "landfill",
      timestamp: new Date(2025, 7, 5, 12, 15),
      date: "2025-08-05"
    },
    {
      id: 3,
      description: "Glass jar",
      category: "recyclable",
      timestamp: new Date(2025, 7, 5, 14, 45),
      date: "2025-08-05"
    },
    {
      id: 4,
      description: "Aluminum can",
      category: "recyclable",
      timestamp: new Date(2025, 7, 5, 16, 20),
      date: "2025-08-05"
    },
    {
      id: 5,
      description: "Disposable coffee cup",
      category: "landfill",
      timestamp: new Date(2025, 7, 5, 18, 10),
      date: "2025-08-05"
    }
  ];

  const mockWeeklyData = [
    { hasEntries: true, count: 3 }, // Sunday
    { hasEntries: true, count: 5 }, // Monday
    { hasEntries: false, count: 0 }, // Tuesday
    { hasEntries: true, count: 2 }, // Wednesday
    { hasEntries: true, count: 4 }, // Thursday
    { hasEntries: true, count: 6 }, // Friday (today)
    { hasEntries: false, count: 0 }  // Saturday (future)
  ];

  // Filter entries based on current date and search term
  const filteredEntries = mockWasteEntries?.filter(entry => {
    const entryDate = entry?.date === currentDate?.toISOString()?.split('T')?.[0];
    const matchesSearch = entry?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         entry?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return entryDate && matchesSearch;
  });

  // Calculate today's stats
  const todayStats = {
    totalItems: filteredEntries?.length,
    recyclables: filteredEntries?.filter(entry => entry?.category === 'recyclable')?.length,
    landfill: filteredEntries?.filter(entry => entry?.category === 'landfill')?.length,
    environmentalScore: filteredEntries?.length > 0 
      ? Math.round((filteredEntries?.filter(entry => entry?.category === 'recyclable')?.length / filteredEntries?.length) * 100)
      : 0
  };

  // Calculate category distribution
  const categoryData = {
    recyclables: todayStats?.recyclables,
    landfill: todayStats?.landfill
  };

  // Calculate monthly stats
  const monthlyStats = {
    daysLogged: 18,
    totalDaysInMonth: 31,
    recyclingRate: 72,
    recyclingRateChange: 8,
    totalItems: 156,
    itemsChange: 12,
    currentStreak: 5
  };

  const handleAddEntry = () => {
    navigate('/daily-waste-entry');
  };

  const handleEditEntry = (entry) => {
    navigate('/daily-waste-entry', { state: { editEntry: entry } });
  };

  const handleDeleteEntry = (entryId) => {
    // In a real app, this would delete from the backend
    console.log('Delete entry:', entryId);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Pull to refresh for mobile
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;

    const handleTouchStart = (e) => {
      startY = e?.touches?.[0]?.clientY;
    };

    const handleTouchMove = (e) => {
      currentY = e?.touches?.[0]?.clientY;
      pullDistance = currentY - startY;

      if (pullDistance > 0 && window.scrollY === 0) {
        e?.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 100 && window.scrollY === 0) {
        handleRefresh();
      }
      pullDistance = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onAddEntry={handleAddEntry}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Refresh Indicator */}
        {isRefreshing && (
          <div className="text-center py-4">
            <div className="inline-flex items-center space-x-2 text-primary">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm font-body">Refreshing...</span>
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            <TodaySummaryCard todayStats={todayStats} />
            <WeeklyProgressChart weeklyData={mockWeeklyData} />
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-5 space-y-6">
            <RecentEntriesCard
              recentEntries={filteredEntries}
              onEditEntry={handleEditEntry}
              onDeleteEntry={handleDeleteEntry}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 space-y-6">
            <CategoryDistributionChart categoryData={categoryData} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          <TodaySummaryCard todayStats={todayStats} />
          
          <QuickStatsCards monthlyStats={monthlyStats} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <WeeklyProgressChart weeklyData={mockWeeklyData} />
            <CategoryDistributionChart categoryData={categoryData} />
          </div>
          
          <RecentEntriesCard
            recentEntries={filteredEntries}
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        </div>

        {/* Desktop Quick Stats */}
        <div className="hidden lg:block mt-6">
          <QuickStatsCards monthlyStats={monthlyStats} />
        </div>
      </div>

      {/* Navigation */}
      <BottomTabNavigation />
      <FloatingActionButton onClick={handleAddEntry} />
    </div>
  );
};

export default WasteLogDashboard;