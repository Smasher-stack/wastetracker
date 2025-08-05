import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import DailyWasteEntry from './pages/daily-waste-entry';
import HistoricalWasteTracking from './pages/historical-waste-tracking';
import WasteLogDashboard from './pages/waste-log-dashboard';
import WasteStatisticsDashboard from './pages/waste-statistics-dashboard';
import UserRegistration from './pages/user-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DailyWasteEntry />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/daily-waste-entry" element={<DailyWasteEntry />} />
        <Route path="/historical-waste-tracking" element={<HistoricalWasteTracking />} />
        <Route path="/waste-log-dashboard" element={<WasteLogDashboard />} />
        <Route path="/waste-statistics-dashboard" element={<WasteStatisticsDashboard />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
