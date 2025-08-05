import React from 'react';
import AuthenticationHeader from '../../components/ui/AuthenticationHeader';
import RegistrationForm from './components/RegistrationForm';
import EnvironmentalBenefits from './components/EnvironmentalBenefits';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Authentication Header */}
      <AuthenticationHeader />

      {/* Main Content */}
      <main className="flex-1">
        <div className="lg:flex lg:min-h-[calc(100vh-80px)]">
          {/* Registration Form Section */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              <RegistrationForm />
            </div>
          </div>

          {/* Environmental Benefits Section - Desktop Only */}
          <EnvironmentalBenefits />
        </div>
      </main>

      {/* Mobile Environmental Benefits */}
      <div className="lg:hidden bg-primary/5 p-6">
        <div className="text-center">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Start Your Environmental Journey
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            Track your waste, improve your habits, and make a positive impact on the planet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;