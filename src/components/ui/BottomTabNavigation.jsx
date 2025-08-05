import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/waste-log-dashboard',
      label: 'Home',
      icon: 'Home',
      description: 'Dashboard overview'
    },
    {
      path: '/daily-waste-entry',
      label: 'Log',
      icon: 'PlusCircle',
      description: 'Add waste entry'
    },
    {
      path: '/waste-statistics-dashboard',
      label: 'Stats',
      icon: 'BarChart3',
      description: 'View statistics'
    },
    {
      path: '/historical-waste-tracking',
      label: 'History',
      icon: 'Clock',
      description: 'Track history'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 ${className}`}>
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => (
            <NavLink
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-smooth ${
                isActive(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item?.description}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`mb-1 ${isActive(item?.path) ? 'text-primary' : ''}`}
              />
              <span className="text-xs font-caption font-medium truncate">
                {item?.label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
      {/* Desktop Top Navigation */}
      <nav className={`hidden lg:block bg-card border-b border-border ${className}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground">
                WasteTracker
              </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <NavLink
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                    isActive(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={item?.description}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className={isActive(item?.path) ? 'text-primary' : ''}
                  />
                  <span className="font-body font-medium">
                    {item?.label}
                  </span>
                </NavLink>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
                <Icon name="Bell" size={18} />
              </button>
              <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
                <Icon name="Settings" size={18} />
              </button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;