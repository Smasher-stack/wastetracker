import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      clearSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Mobile Search Toggle */}
      <div className="lg:hidden">
        {!isExpanded ? (
          <button
            onClick={toggleExpanded}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 transition-smooth"
          >
            <Icon name="Search" size={18} className="text-muted-foreground" />
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-card rounded-lg border border-border p-2">
            <Icon name="Search" size={16} className="text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e?.target?.value)}
              placeholder="Search entries..."
              className="flex-1 bg-transparent text-sm font-body text-foreground placeholder-muted-foreground outline-none"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="p-1 rounded hover:bg-muted transition-smooth"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            )}
            <button
              onClick={toggleExpanded}
              className="p-1 rounded hover:bg-muted transition-smooth"
            >
              <Icon name="ChevronUp" size={14} className="text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
      {/* Desktop Search */}
      <div className="hidden lg:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={16} className="text-muted-foreground" />
          </div>
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => handleSearch(e?.target?.value)}
            placeholder="Search waste entries..."
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Icon name="X" size={16} className="text-muted-foreground hover:text-foreground transition-smooth" />
            </button>
          )}
        </div>
      </div>
      {/* Search Results Indicator */}
      {searchTerm && (
        <div className="mt-2 text-xs font-caption text-muted-foreground">
          Searching for "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;