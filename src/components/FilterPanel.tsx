
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { FilterRenderer } from '@/components/filters/FilterRenderer';
import { getFilterConfigs } from '@/components/filters/FilterConfigs';
import OfferCountDisplay from '@/components/category/OfferCountDisplay';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterPanelProps {
  category: string;
  filters: { [key: string]: any };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
  providers?: any[];
  offers?: any[];
  sortBy?: string;
  onSortChange?: (value: string) => void;
  getSortOptions?: () => { value: string; label: string }[];
  getDisplayValue?: () => string;
  filteredOffersCount?: number;
  totalOffersCount?: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  category,
  filters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onToggle,
  providers = [],
  offers = [],
  sortBy,
  onSortChange,
  getSortOptions,
  getDisplayValue,
  filteredOffersCount = 0,
  totalOffersCount = 0
}) => {
  const { t } = useLanguage();
  const filterConfigs = getFilterConfigs(category, providers, offers, t);

  if (!isOpen) {
    return (
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 w-full">
          {/* Left side: Filter button */}
          <Button 
            onClick={onToggle} 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Filter className="w-5 h-5 mr-2" />
            {t('filters.title')}
          </Button>
          
          {/* Right side: Offer count and sort dropdown */}
          <div className="flex items-center gap-4">
            <OfferCountDisplay 
              filteredOffersCount={filteredOffersCount}
              totalOffersCount={totalOffersCount}
            />
            
            {sortBy && onSortChange && getSortOptions && getDisplayValue && (
              <div className="bg-card rounded-lg shadow-sm border border-border p-1">
                <Select value={getDisplayValue()} onValueChange={onSortChange}>
                  <SelectTrigger className="w-48 border-0 shadow-none focus:ring-0 text-foreground">
                    <SelectValue placeholder={t('filters.sort')} />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border shadow-lg">
                    {getSortOptions().map(option => (
                      <SelectItem key={option.value} value={option.value} className="hover:bg-accent text-foreground">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {/* Top controls - always visible */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 w-full">
        {/* Left side: Filter button */}
        <Button 
          onClick={onToggle} 
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Filter className="w-5 h-5 mr-2" />
            {t('filters.title')}
        </Button>
        
        {/* Right side: Offer count and sort dropdown */}
        <div className="flex items-center gap-4">
          <OfferCountDisplay 
            filteredOffersCount={filteredOffersCount}
            totalOffersCount={totalOffersCount}
          />
          
          {sortBy && onSortChange && getSortOptions && getDisplayValue && (
            <div className="bg-card rounded-lg shadow-sm border border-border p-1">
              <Select value={getDisplayValue()} onValueChange={onSortChange}>
                <SelectTrigger className="w-48 border-0 shadow-none focus:ring-0 text-foreground">
                  <SelectValue placeholder={t('filters.sort')} />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border shadow-lg">
                  {getSortOptions().map(option => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-accent text-foreground">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Filter panel */}
      <Card className="shadow-xl border border-border bg-gradient-to-br from-card to-accent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
          <CardTitle className="text-xl font-bold">{t('filters.title')}</CardTitle>
          <div className="flex gap-2">
            <Button onClick={onClearFilters} variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 font-semibold">
              {t('filters.clear')}
            </Button>
            <Button onClick={onToggle} variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {filterConfigs.map(config => (
            <FilterRenderer
              key={config.key}
              config={config}
              value={filters[config.key]}
              onValueChange={(value) => onFilterChange(config.key, value)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPanel;
