import React from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentalBenefits = () => {
  const benefits = [
    {
      icon: 'Leaf',
      title: 'Track Your Impact',
      description: 'Monitor your daily waste generation and see how your choices affect the environment'
    },
    {
      icon: 'Recycle',
      title: 'Improve Recycling',
      description: 'Learn to categorize waste properly and increase your recycling efficiency'
    },
    {
      icon: 'TrendingDown',
      title: 'Reduce Waste',
      description: 'Identify patterns in your waste generation and work towards reducing your footprint'
    },
    {
      icon: 'Award',
      title: 'Achieve Goals',
      description: 'Set environmental goals and track your progress towards a more sustainable lifestyle'
    }
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 bg-primary/5 p-8 lg:p-12">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Earth" size={40} color="white" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Make Every Day Count
          </h2>
          <p className="text-muted-foreground font-body">
            Join thousands of users making a positive environmental impact through conscious waste tracking
          </p>
        </div>

        {/* Benefits List */}
        <div className="space-y-6">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {benefit?.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-8 p-6 bg-card rounded-xl border border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                10K+
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Active Users
              </div>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                2.5M
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Items Tracked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalBenefits;