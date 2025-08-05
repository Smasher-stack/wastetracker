import React, { useState, useEffect } from 'react';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import StatsHeader from './components/StatsHeader';
import KeyMetricsCards from './components/KeyMetricsCards';
import CategoryDistributionChart from './components/CategoryDistributionChart';
import LoggingConsistencyCalendar from './components/LoggingConsistencyCalendar';
import RecyclingTrendChart from './components/RecyclingTrendChart';
import AchievementBadges from './components/AchievementBadges';
import CategoryBreakdownTable from './components/CategoryBreakdownTable';
import ExportModal from './components/ExportModal';

const WasteStatisticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Mock data for statistics
  const mockMetrics = {
    totalItems: 247,
    totalItemsTrend: 12.5,
    recyclingRate: 73,
    recyclingTrend: 8.2,
    impactScore: 1850,
    impactTrend: 15.3,
    currentStreak: 12
  };

  const mockCategoryDistribution = [
    { name: "Plastic Bottles", value: 45, total: 247 },
    { name: "Food Waste", value: 38, total: 247 },
    { name: "Paper", value: 32, total: 247 },
    { name: "Glass", value: 28, total: 247 },
    { name: "Electronics", value: 15, total: 247 },
    { name: "Cardboard", value: 42, total: 247 },
    { name: "Metal Cans", value: 25, total: 247 },
    { name: "Organic", value: 22, total: 247 }
  ];

  const mockConsistencyData = [
    { date: "2025-01-29", count: 3 },
    { date: "2025-01-30", count: 5 },
    { date: "2025-01-31", count: 2 },
    { date: "2025-02-01", count: 4 },
    { date: "2025-02-02", count: 6 },
    { date: "2025-02-03", count: 1 },
    { date: "2025-02-04", count: 3 },
    { date: "2025-02-05", count: 4 },
    { date: "2025-02-06", count: 0 },
    { date: "2025-02-07", count: 2 },
    { date: "2025-02-08", count: 5 },
    { date: "2025-02-09", count: 3 },
    { date: "2025-02-10", count: 4 },
    { date: "2025-02-11", count: 2 },
    { date: "2025-02-12", count: 6 },
    { date: "2025-02-13", count: 1 },
    { date: "2025-02-14", count: 3 },
    { date: "2025-02-15", count: 4 },
    { date: "2025-02-16", count: 5 },
    { date: "2025-02-17", count: 2 },
    { date: "2025-02-18", count: 3 },
    { date: "2025-02-19", count: 4 },
    { date: "2025-02-20", count: 1 },
    { date: "2025-02-21", count: 5 },
    { date: "2025-02-22", count: 3 },
    { date: "2025-02-23", count: 2 },
    { date: "2025-02-24", count: 4 },
    { date: "2025-02-25", count: 6 },
    { date: "2025-02-26", count: 1 },
    { date: "2025-02-27", count: 3 }
  ];

  const mockRecyclingTrend = [
    { date: "2025-01-29", recyclingRate: 65 },
    { date: "2025-01-30", recyclingRate: 68 },
    { date: "2025-01-31", recyclingRate: 70 },
    { date: "2025-02-01", recyclingRate: 72 },
    { date: "2025-02-02", recyclingRate: 69 },
    { date: "2025-02-03", recyclingRate: 74 },
    { date: "2025-02-04", recyclingRate: 76 },
    { date: "2025-02-05", recyclingRate: 73 },
    { date: "2025-02-06", recyclingRate: 71 },
    { date: "2025-02-07", recyclingRate: 75 },
    { date: "2025-02-08", recyclingRate: 78 },
    { date: "2025-02-09", recyclingRate: 77 },
    { date: "2025-02-10", recyclingRate: 79 },
    { date: "2025-02-11", recyclingRate: 81 },
    { date: "2025-02-12", recyclingRate: 80 },
    { date: "2025-02-13", recyclingRate: 82 },
    { date: "2025-02-14", recyclingRate: 84 },
    { date: "2025-02-15", recyclingRate: 83 },
    { date: "2025-02-16", recyclingRate: 85 },
    { date: "2025-02-17", recyclingRate: 87 },
    { date: "2025-02-18", recyclingRate: 86 },
    { date: "2025-02-19", recyclingRate: 88 },
    { date: "2025-02-20", recyclingRate: 85 },
    { date: "2025-02-21", recyclingRate: 89 },
    { date: "2025-02-22", recyclingRate: 87 },
    { date: "2025-02-23", recyclingRate: 90 },
    { date: "2025-02-24", recyclingRate: 88 },
    { date: "2025-02-25", recyclingRate: 91 },
    { date: "2025-02-26", recyclingRate: 89 },
    { date: "2025-02-27", recyclingRate: 92 }
  ];

  const mockAchievements = [
    {
      id: 1,
      type: "streak",
      title: "Week Warrior",
      description: "Logged waste for 7 consecutive days",
      earnedDate: "Feb 1, 2025"
    },
    {
      id: 2,
      type: "recycling",
      title: "Recycling Champion",
      description: "Achieved 80% recycling rate",
      earnedDate: "Jan 28, 2025"
    },
    {
      id: 3,
      type: "consistency",
      title: "Consistent Logger",
      description: "Logged waste 25 days this month",
      earnedDate: "Jan 25, 2025"
    },
    {
      id: 4,
      type: "milestone",
      title: "Century Club",
      description: "Logged 100 waste items",
      earnedDate: "Jan 20, 2025"
    },
    {
      id: 5,
      type: "environmental",
      title: "Eco Warrior",
      description: "Saved 50kg CO2 equivalent",
      earnedDate: "Jan 15, 2025"
    }
  ];

  const mockNextGoals = [
    {
      id: 1,
      type: "streak",
      title: "Two Week Streak",
      description: "Log waste for 14 consecutive days",
      current: 12,
      target: 14
    },
    {
      id: 2,
      type: "recycling",
      title: "Recycling Master",
      description: "Achieve 90% recycling rate",
      current: 73,
      target: 90
    },
    {
      id: 3,
      type: "milestone",
      title: "Triple Century",
      description: "Log 300 waste items total",
      current: 247,
      target: 300
    }
  ];

  const mockCategoryBreakdown = [
    {
      category: "Plastic Bottles",
      frequency: 45,
      recyclingRate: "95.6",
      lastLogged: "Today"
    },
    {
      category: "Food Waste",
      frequency: 38,
      recyclingRate: "12.3",
      lastLogged: "Yesterday"
    },
    {
      category: "Cardboard",
      frequency: 42,
      recyclingRate: "89.2",
      lastLogged: "Today"
    },
    {
      category: "Paper",
      frequency: 32,
      recyclingRate: "87.5",
      lastLogged: "2 days ago"
    },
    {
      category: "Glass",
      frequency: 28,
      recyclingRate: "92.1",
      lastLogged: "Today"
    },
    {
      category: "Metal Cans",
      frequency: 25,
      recyclingRate: "96.8",
      lastLogged: "Yesterday"
    },
    {
      category: "Organic",
      frequency: 22,
      recyclingRate: "45.2",
      lastLogged: "3 days ago"
    },
    {
      category: "Electronics",
      frequency: 15,
      recyclingRate: "78.9",
      lastLogged: "1 week ago"
    }
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleShare = () => {
    setIsExportModalOpen(true);
  };

  const exportStats = {
    ...mockMetrics,
    topCategories: mockCategoryBreakdown?.slice(0, 3)?.map(cat => ({
      name: cat?.category,
      count: cat?.frequency
    }))
  };

  useEffect(() => {
    document.title = 'Statistics - WasteTracker';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <StatsHeader 
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        onShare={handleShare}
      />

      <main className="container mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
        <KeyMetricsCards metrics={mockMetrics} period={selectedPeriod} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CategoryDistributionChart data={mockCategoryDistribution} />
          <LoggingConsistencyCalendar 
            data={mockConsistencyData} 
            period={selectedPeriod} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RecyclingTrendChart 
            data={mockRecyclingTrend} 
            period={selectedPeriod} 
          />
          <AchievementBadges 
            achievements={mockAchievements}
            nextGoals={mockNextGoals}
          />
        </div>

        <CategoryBreakdownTable data={mockCategoryBreakdown} />
      </main>

      <BottomTabNavigation />
      <FloatingActionButton />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        stats={exportStats}
        period={selectedPeriod}
      />
    </div>
  );
};

export default WasteStatisticsDashboard;