import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/waste-log-dashboard');
    }

    // Set page title
    document.title = 'Sign In - WasteTracker';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <LoginHeader />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Marketing Content */}
            <div className="hidden lg:block">
              <div className="max-w-lg">
                <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                  Track Your Environmental Impact
                </h2>
                <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
                  Join thousands of users who are making a difference by tracking their daily waste disposal and improving their recycling habits.
                </p>
                
                {/* Features List */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-heading font-bold text-sm">📊</span>
                    </div>
                    <span className="text-foreground font-body">
                      Comprehensive waste tracking dashboard
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                      <span className="text-success font-heading font-bold text-sm">♻️</span>
                    </div>
                    <span className="text-foreground font-body">
                      Smart categorization for recyclables
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <span className="text-accent font-heading font-bold text-sm">📈</span>
                    </div>
                    <span className="text-foreground font-body">
                      Historical trends and insights
                    </span>
                  </div>
                </div>

                {/* Environmental Impact Stats */}
                <div className="mt-12 p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Community Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-heading font-bold text-primary">2.5M</div>
                      <div className="text-sm text-muted-foreground font-body">Items Tracked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-heading font-bold text-success">85%</div>
                      <div className="text-sm text-muted-foreground font-body">Recycled</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <LoginFooter />
    </div>
  );
};

export default UserLogin;