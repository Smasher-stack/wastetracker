import React from 'react';

import Icon from '../../../components/AppIcon';

const LoginFooter = ({ className = '' }) => {
  const currentYear = new Date()?.getFullYear();

  return (
    <footer className={`bg-background border-t border-border mt-auto ${className}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Environmental Message */}
          <div className="text-center max-w-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Recycle" size={20} className="text-primary" />
              <span className="text-sm font-body font-semibold text-foreground">
                Join the Green Movement
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              Track your waste, reduce your footprint, and make a positive impact on our planet
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <button 
              onClick={() => alert('Privacy Policy would be displayed here')}
              className="text-muted-foreground hover:text-foreground transition-smooth font-body"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => alert('Terms of Service would be displayed here')}
              className="text-muted-foreground hover:text-foreground transition-smooth font-body"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => alert('Contact support would be available here')}
              className="text-muted-foreground hover:text-foreground transition-smooth font-body"
            >
              Contact Support
            </button>
          </div>

          {/* Environmental Badges */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 px-3 py-1 bg-primary/10 rounded-full">
              <Icon name="Award" size={14} className="text-primary" />
              <span className="text-xs font-caption text-primary font-medium">
                Eco-Certified
              </span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-success/10 rounded-full">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="text-xs font-caption text-success font-medium">
                Carbon Neutral
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-border w-full">
            <p className="text-xs text-muted-foreground font-body">
              © {currentYear} WasteTracker. All rights reserved. 
              <span className="block sm:inline sm:ml-1">
                Making sustainability accessible for everyone.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;