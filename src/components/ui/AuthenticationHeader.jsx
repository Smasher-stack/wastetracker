import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationHeader = ({ className = '' }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/user-login';
  const isRegistrationPage = location.pathname === '/user-registration';

  return (
    <header className={`bg-background border-b border-border ${className}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-subtle">
              <Icon name="Leaf" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-foreground">
                WasteTracker
              </span>
              <span className="text-sm font-caption text-muted-foreground">
                Track your environmental impact
              </span>
            </div>
          </div>

          {/* Authentication Toggle */}
          <div className="flex items-center space-x-4">
            {isLoginPage && (
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground font-body">
                  Don't have an account?
                </span>
                <Link
                  to="/user-registration"
                  className="text-primary hover:text-primary/80 font-body font-semibold transition-smooth"
                >
                  Sign up
                </Link>
              </div>
            )}
            
            {isRegistrationPage && (
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground font-body">
                  Already have an account?
                </span>
                <Link
                  to="/user-login"
                  className="text-primary hover:text-primary/80 font-body font-semibold transition-smooth"
                >
                  Sign in
                </Link>
              </div>
            )}

            {/* Help Link */}
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-smooth">
              <Icon name="HelpCircle" size={16} />
              <span className="text-sm font-body">Help</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticationHeader;