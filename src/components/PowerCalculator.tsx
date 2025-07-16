
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PowerCalculatorHeader from '@/components/power/PowerCalculatorHeader';
import PowerFilters from '@/components/power/PowerFilters';
import PowerOffersList from '@/components/power/PowerOffersList';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  PowerOffer, 
  filterOffers, 
  sortOffersByPrice,
  hasValidPricing 
} from '@/utils/powerUtils';

interface PowerCalculatorProps {
  offers: PowerOffer[];
  onGetQuote: (offer: PowerOffer) => void;
  onProviderClick: (providerName: string) => void;
  loading?: boolean;
  onMunicipalityChange?: (municipality: string) => void;
}

const PowerCalculator: React.FC<PowerCalculatorProps> = ({ 
  offers, 
  onGetQuote, 
  onProviderClick, 
  loading = false,
  onMunicipalityChange 
}) => {
  const { t } = useLanguage();
  const [annualConsumption, setAnnualConsumption] = useState<number[]>([16000]);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [municipalities, setMunicipalities] = useState<string[]>([]);

  // Load municipalities from the unique_municipalities view for better performance
  useEffect(() => {
    const loadMunicipalities = async () => {
      try {
        const { data, error } = await supabase.from('unique_municipalities').select('clean_name').order('clean_name');
        if (error) throw error;
        setMunicipalities((data || []).map(item => item.clean_name));
      } catch (error) {
        // Fallback to extracting from offers
        const fallbackMunicipalities = Array.from(
          new Set(
            offers.map(offer => {
              if (!offer.municipality_name) return null;
              const cleanName = offer.municipality_name.split('-')[0].split('(')[0].trim();
              return cleanName;
            }).filter(Boolean)
          )
        ).sort();
        setMunicipalities(fallbackMunicipalities);
      }
    };
    loadMunicipalities();
  }, [offers]);

  // Filter and sort offers
  const filteredOffers = React.useMemo(() => {
    const filtered = filterOffers(offers, selectedMunicipality, selectedCategory);
    return sortOffersByPrice(filtered, annualConsumption[0]);
  }, [offers, selectedMunicipality, selectedCategory, annualConsumption]);

  const handleMunicipalitySelect = (municipality: string) => {
    setSelectedMunicipality(municipality);
    setHasSearched(true);
    if (onMunicipalityChange) {
      onMunicipalityChange(municipality);
    }
  };

  const handleFilterApply = () => {
    setShowFilteredResults(true);
  };

  const handleResetFilters = () => {
    setSelectedMunicipality('');
    setSelectedCategory('all');
    setShowFilteredResults(false);
    setHasSearched(false);
  };

  const handleShowAllOffers = () => {
    setShowFilteredResults(true);
  };

  // Get offers to display - filter out invalid pricing
  const validOffers = offers.filter(hasValidPricing);
  const displayOffers = hasSearched ? filteredOffers : validOffers.slice(0, 20);
  const showFilterButtons = (selectedMunicipality || selectedCategory !== 'all') && !hasSearched;

  return (
    <div className="space-y-8">
      {/* Hero Section with Calculator */}
      <PowerCalculatorHeader
        offersCount={filteredOffers.length}
        selectedMunicipality={selectedMunicipality}
        selectedCategory={selectedCategory}
        hasSearched={hasSearched}
        loading={loading}
      />

      {/* Interactive Controls */}
      <PowerFilters
        annualConsumption={annualConsumption}
        onConsumptionChange={setAnnualConsumption}
        municipalities={municipalities}
        selectedMunicipality={selectedMunicipality}
        onMunicipalitySelect={handleMunicipalitySelect}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        filteredOffersCount={filteredOffers.length}
        onApplyFilters={handleFilterApply}
        onResetFilters={handleResetFilters}
        showFilterButtons={showFilterButtons}
      />

      {/* Results Counter - moved below filters */}
      {hasSearched && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md border border-border">
            <span className="text-sm font-medium text-card-foreground">
              {loading ? t('power.loading') : `${filteredOffers.length} ${t('power.offersFound')}`}
            </span>
          </div>
        </div>
      )}

      {/* Power Offers List */}
      <PowerOffersList
        offers={displayOffers}
        annualConsumption={annualConsumption[0]}
        onGetQuote={onGetQuote}
        onProviderClick={onProviderClick}
        loading={loading}
        hasSearched={hasSearched}
        showFilteredResults={showFilteredResults}
        onShowAllOffers={handleShowAllOffers}
        totalOffersCount={filteredOffers.length}
      />
    </div>
  );
};

export default PowerCalculator;
