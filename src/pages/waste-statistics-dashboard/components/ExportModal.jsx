import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportModal = ({ isOpen, onClose, stats, period }) => {
  const [exportFormat, setExportFormat] = useState('summary');
  const [shareMethod, setShareMethod] = useState('email');

  if (!isOpen) return null;

  const generateSummaryText = () => {
    return `🌱 My WasteTracker ${period} Summary:\n\n` +
           `📦 Total Items Logged: ${stats?.totalItems}\n` +
           `♻️ Recycling Rate: ${stats?.recyclingRate}%\n` +
           `🌍 Environmental Impact Score: ${stats?.impactScore}\n` +
           `🔥 Current Streak: ${stats?.currentStreak} days\n\n` +
           `Making a difference, one item at a time! #WasteTracker #Sustainability`;
  };

  const generateDetailedReport = () => {
    return `WasteTracker ${period?.charAt(0)?.toUpperCase() + period?.slice(1)} Report\n` +
           `Generated on ${new Date()?.toLocaleDateString()}\n\n` +
           `OVERVIEW\n` +
           `--------\n` +
           `Total Items Logged: ${stats?.totalItems}\n` +
           `Recycling Rate: ${stats?.recyclingRate}%\n` +
           `Environmental Impact Score: ${stats?.impactScore}\n` +
           `Logging Streak: ${stats?.currentStreak} days\n\n` +
           `TOP CATEGORIES\n` +
           `--------------\n` +
           `1. Plastic Bottles (${stats?.topCategories?.[0]?.count || 0} items)\n` +
           `2. Food Waste (${stats?.topCategories?.[1]?.count || 0} items)\n` +
           `3. Paper (${stats?.topCategories?.[2]?.count || 0} items)\n\n` +
           `Keep up the great work! 🌱`;
  };

  const handleExport = () => {
    const content = exportFormat === 'summary' ? generateSummaryText() : generateDetailedReport();
    
    if (shareMethod === 'email') {
      const subject = `My WasteTracker ${period} Report`;
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
      window.open(mailtoLink);
    } else if (shareMethod === 'copy') {
      navigator.clipboard?.writeText(content)?.then(() => {
        alert('Report copied to clipboard!');
      });
    } else if (shareMethod === 'download') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wastetracker-${period}-report.txt`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Export Statistics
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        <div className="p-4 space-y-6">
          {/* Export Format */}
          <div className="space-y-3">
            <label className="text-sm font-body font-medium text-foreground">
              Export Format
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="summary"
                  checked={exportFormat === 'summary'}
                  onChange={(e) => setExportFormat(e?.target?.value)}
                  className="text-primary focus:ring-primary"
                />
                <div>
                  <div className="text-sm font-body text-foreground">Social Media Summary</div>
                  <div className="text-xs text-muted-foreground">Short, shareable format</div>
                </div>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="detailed"
                  checked={exportFormat === 'detailed'}
                  onChange={(e) => setExportFormat(e?.target?.value)}
                  className="text-primary focus:ring-primary"
                />
                <div>
                  <div className="text-sm font-body text-foreground">Detailed Report</div>
                  <div className="text-xs text-muted-foreground">Complete statistics breakdown</div>
                </div>
              </label>
            </div>
          </div>

          {/* Share Method */}
          <div className="space-y-3">
            <label className="text-sm font-body font-medium text-foreground">
              Share Method
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setShareMethod('email')}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                  shareMethod === 'email' ?'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted'
                }`}
              >
                <Icon name="Mail" size={18} />
                <div className="text-left">
                  <div className="text-sm font-body font-medium">Email</div>
                  <div className="text-xs opacity-70">Send via email client</div>
                </div>
              </button>
              
              <button
                onClick={() => setShareMethod('copy')}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                  shareMethod === 'copy' ?'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted'
                }`}
              >
                <Icon name="Copy" size={18} />
                <div className="text-left">
                  <div className="text-sm font-body font-medium">Copy to Clipboard</div>
                  <div className="text-xs opacity-70">Copy text to share anywhere</div>
                </div>
              </button>
              
              <button
                onClick={() => setShareMethod('download')}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                  shareMethod === 'download' 
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted'
                }`}
              >
                <Icon name="Download" size={18} />
                <div className="text-left">
                  <div className="text-sm font-body font-medium">Download File</div>
                  <div className="text-xs opacity-70">Save as text file</div>
                </div>
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <label className="text-sm font-body font-medium text-foreground">
              Preview
            </label>
            <div className="p-3 bg-muted rounded-lg text-xs font-data text-foreground max-h-32 overflow-y-auto">
              {exportFormat === 'summary' ? generateSummaryText() : generateDetailedReport()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 p-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} iconName="Share2" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;