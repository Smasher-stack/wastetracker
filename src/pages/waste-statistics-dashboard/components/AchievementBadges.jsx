import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements, nextGoals }) => {
  const getBadgeIcon = (type) => {
    const icons = {
      streak: 'Flame',
      recycling: 'Recycle',
      consistency: 'Calendar',
      milestone: 'Trophy',
      environmental: 'Leaf',
      community: 'Users'
    };
    return icons?.[type] || 'Award';
  };

  const getBadgeColor = (type) => {
    const colors = {
      streak: 'bg-accent/10 text-accent border-accent/20',
      recycling: 'bg-success/10 text-success border-success/20',
      consistency: 'bg-primary/10 text-primary border-primary/20',
      milestone: 'bg-warning/10 text-warning border-warning/20',
      environmental: 'bg-success/10 text-success border-success/20',
      community: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[type] || 'bg-muted/10 text-muted-foreground border-muted/20';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Achievements
        </h3>
        <div className="text-sm text-muted-foreground font-body">
          {achievements?.length} earned
        </div>
      </div>
      {/* Earned Badges */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-body font-medium text-foreground">Earned Badges</h4>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`border rounded-lg p-3 transition-smooth hover:scale-105 ${getBadgeColor(achievement?.type)}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={getBadgeIcon(achievement?.type)} size={20} />
                <span className="text-sm font-body font-semibold">
                  {achievement?.title}
                </span>
              </div>
              <p className="text-xs opacity-80 mb-2">
                {achievement?.description}
              </p>
              <div className="text-xs opacity-60">
                Earned {achievement?.earnedDate}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Progress Toward Next Goals */}
      <div className="space-y-4">
        <h4 className="text-sm font-body font-medium text-foreground">Next Goals</h4>
        <div className="space-y-3">
          {nextGoals?.map((goal) => (
            <div key={goal?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={getBadgeIcon(goal?.type)} size={16} className="text-muted-foreground" />
                  <span className="text-sm font-body font-medium text-foreground">
                    {goal?.title}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-body">
                  {goal?.current}/{goal?.target}
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    goal?.type === 'streak' ? 'bg-accent' :
                    goal?.type === 'recycling' ? 'bg-success' :
                    goal?.type === 'consistency'? 'bg-primary' : 'bg-warning'
                  }`}
                  style={{ width: `${Math.min((goal?.current / goal?.target) * 100, 100)}%` }}
                />
              </div>
              
              <p className="text-xs text-muted-foreground">
                {goal?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Motivational Message */}
      <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/10">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-primary" />
          <span className="text-sm font-body text-foreground">
            You're {nextGoals?.length > 0 ? `${Math.round((nextGoals?.[0]?.current / nextGoals?.[0]?.target) * 100)}% of the way` : 'doing great!'} to your next achievement!
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;