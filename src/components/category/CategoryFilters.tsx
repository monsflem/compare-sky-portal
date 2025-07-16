
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FilterPanel from '@/components/FilterPanel';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryFiltersProps {
  kategori: string;
  offers: any[];
  providers: any[];
  filters: { [key: string]: any };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  filteredOffersCount?: number;
  totalOffersCount?: number;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  kategori,
  offers,
  providers,
  filters,
  onFilterChange,
  onClearFilters,
  sortBy,
  onSortChange,
  isFilterOpen,
  onToggleFilter,
  filteredOffersCount = 0,
  totalOffersCount = 0
}) => {
  const { t } = useLanguage();
  
  const getSortOptions = () => {
    const baseOptions = [
      { value: 'bestMatch', label: t('sorting.bestMatch') },
      { value: 'price_asc', label: t('sorting.priceLowToHigh') },
      { value: 'price_desc', label: t('sorting.priceHighToLow') }
    ];

    if (kategori === 'mobil') {
      baseOptions.push({ value: 'data_desc', label: t('sorting.dataHighToLow') });
    }

    if (kategori === 'internett') {
      baseOptions.push({ value: 'speed_desc', label: t('sorting.speedHighToLow') });
    }

    if (kategori === 'lan') {
      // For loans, show rate-based sorting
      return [
        { value: 'bestMatch', label: t('sorting.bestMatch') },
        { value: 'rate_asc', label: t('sorting.rateLowToHigh') },
        { value: 'rate_desc', label: t('sorting.rateHighToLow') }
      ];
    }

    return baseOptions;
  };

  // Don't show the current value if it's 'random' - instead show the first available option
  const getDisplayValue = () => {
    if (sortBy === 'random') {
      const options = getSortOptions();
      return options[0]?.value || 'price_asc';
    }
    return sortBy;
  };

  return (
    <>
      {offers.length > 0 && (
        <FilterPanel
          category={kategori || ''}
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          isOpen={isFilterOpen}
          onToggle={onToggleFilter}
          providers={providers}
          offers={offers}
          sortBy={sortBy}
          onSortChange={onSortChange}
          getSortOptions={getSortOptions}
          getDisplayValue={getDisplayValue}
          filteredOffersCount={filteredOffersCount}
          totalOffersCount={totalOffersCount}
        />
      )}
    </>
  );
};

export default CategoryFilters;
