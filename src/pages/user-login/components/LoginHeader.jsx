import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = ({ className = '' }) => {
  return (
    <header className={`bg-background border-b border-border ${className}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-smooth">
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
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
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

            {/* Help Link */}
            <button 
              onClick={() => alert('Help documentation would be available here')}
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="HelpCircle" size={16} />
              <span className="text-sm font-body">Help</span>
            </button>
          </div>
        </div>

        {/* Mobile Registration Link */}
        <div className="sm:hidden mt-4 text-center">
          <span className="text-sm text-muted-foreground font-body">
            Don't have an account?{' '}
          </span>
          <Link
            to="/user-registration"
            className="text-sm text-primary hover:text-primary/80 font-body font-semibold transition-smooth"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;