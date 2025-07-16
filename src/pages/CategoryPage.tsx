import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import PowerCalculator from '@/components/PowerCalculator';
import CategoryFilters from '@/components/category/CategoryFilters';
import LoadingSpinner from '@/components/LoadingSpinner';
import OffersGrid from '@/components/category/OffersGrid';
import CategoryPageHeader from '@/components/category/CategoryPageHeader';
import CategoryIconsRenderer from '@/components/category/CategoryIconsRenderer';
import ErrorState from '@/components/category/ErrorState';
import NoOffersState from '@/components/category/NoOffersState';

import { useCategoryData } from '@/hooks/useCategoryData';
import { useFilteredOffers } from '@/hooks/useFilteredOffers';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryPage = () => {
  const { kategori } = useParams<{ kategori: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [sortBy, setSortBy] = useState('bestMatch');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Category selection states
  const [selectedInsuranceCategory, setSelectedInsuranceCategory] = useState<string | null>(null);
  const [selectedTVCategory, setSelectedTVCategory] = useState<string | null>(null);
  const [selectedMobilCategory, setSelectedMobilCategory] = useState<string | null>(null);
  const [selectedInternetCategory, setSelectedInternetCategory] = useState<string | null>(null);
  const [selectedStromCategory, setSelectedStromCategory] = useState<string | null>(null);
  const [selectedLoanCategory, setSelectedLoanCategory] = useState<string | null>(null);
  const [selectedBoligalarmCategory, setSelectedBoligalarmCategory] = useState<string | null>(null);
  const [selectedHandverkereCategory, setSelectedHandverkereCategory] = useState<string | null>(null);
  const [selectedRenholdCategory, setSelectedRenholdCategory] = useState<string | null>(null);

  const { offers, providers, loading, initialLoading, error, refetch, fetchMunicipalities } = useCategoryData(kategori || '');

  // Immediate state updates for strom category using useLayoutEffect
  useLayoutEffect(() => {
    if (kategori === 'strom') {
      const searchParams = new URLSearchParams(location.search);
      const typeParam = searchParams.get('type');
      
      console.log('⚡ IMMEDIATE useLayoutEffect - Strom category update:', { 
        typeParam, 
        currentSelectedStromCategory: selectedStromCategory,
        pathname: location.pathname,
        search: location.search
      });

      if (!typeParam || typeParam === 'all') {
        console.log('⚡ IMMEDIATE: Setting selectedStromCategory to null for "all"');
        setSelectedStromCategory(null);
      } else {
        console.log('⚡ IMMEDIATE: Setting selectedStromCategory to:', typeParam);
        setSelectedStromCategory(typeParam);
      }
    }
  }, [location.search, location.pathname, kategori]);

  // Enhanced URL query parameters handling for all categories
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');
    const durationParam = searchParams.get('duration');
    
    console.log('🔄 CategoryPage useEffect - Processing filters:', { 
      typeParam, 
      durationParam, 
      kategori, 
      pathname: location.pathname,
      currentSelectedStromCategory: selectedStromCategory
    });
    
    if (kategori) {
      // Handle "all" or no type parameter - clear everything
      if (!typeParam || typeParam === 'all') {
        console.log('🧹 Clearing all filters for "all" selection or no parameters');
        setFilters({});
        if (kategori !== 'strom') { // Don't clear strom category here, handled by useLayoutEffect
          setSelectedInsuranceCategory(null);
          setSelectedTVCategory(null);
          setSelectedMobilCategory(null);
          setSelectedInternetCategory(null);
          setSelectedLoanCategory(null);
          setSelectedBoligalarmCategory(null);
          setSelectedHandverkereCategory(null);
          setSelectedRenholdCategory(null);
        }
        return;
      }
      
      if (typeParam) {
        console.log('🔄 Processing type parameter:', typeParam, 'for category:', kategori);
        const newFilters: { [key: string]: any } = { ...filters };
        
        switch (kategori) {
          case 'mobil':
            if (['lavpris', 'familie', 'ubegrenset', 'bedrift'].includes(typeParam)) {
              setSelectedMobilCategory(typeParam);
              console.log('📱 Applied mobile category type:', typeParam);
            }
            break;
            
          case 'strom':
            // Filters for strom category - handled by useLayoutEffect above
            if (typeParam === 'spot') {
              newFilters.contract_length = 'spot';
              setFilters(newFilters);
              console.log('⚡ Applied spot price filter');
            } else if (typeParam === 'fast') {
              if (durationParam) {
                newFilters.contract_length = durationParam;
                setFilters(newFilters);
                console.log('⚡ Applied fixed price contract length filter:', durationParam);
              } else {
                newFilters.price_type = 'fast';
                setFilters(newFilters);
                console.log('⚡ Applied general fixed price filter');
              }
            } else if (typeParam === 'variabel') {
              newFilters.price_type = 'variabel';
              setFilters(newFilters);
              console.log('⚡ Applied variable price filter');
            } else if (typeParam === 'gronn') {
              newFilters.energy_type = 'green';
              setFilters(newFilters);
              console.log('⚡ Applied green energy filter');
            } else if (typeParam === 'bolig') {
              newFilters.usage_type = 'residential';
              setFilters(newFilters);
              console.log('⚡ Applied home electricity filter');
            } else if (typeParam === 'hytte') {
              newFilters.usage_type = 'cabin';
              setFilters(newFilters);
              console.log('⚡ Applied cabin electricity filter');
            } else if (typeParam === 'bedrift') {
              newFilters.usage_type = 'business';
              setFilters(newFilters);
              console.log('⚡ Applied business electricity filter');
            }
            break;
            
          case 'internett':
            if (['fiber', 'adsl', 'mobilt', 'bedrift'].includes(typeParam)) {
              setSelectedInternetCategory(typeParam);
              console.log('🌐 Applied internet category type:', typeParam);
            }
            break;
            
          case 'forsikring':
            if (['bolig', 'kjoretoy', 'person', 'dyr_fritid'].includes(typeParam)) {
              setSelectedInsuranceCategory(typeParam);
              console.log('🛡️ Applied insurance category type:', typeParam);
            }
            break;
            
          case 'boligalarm':
            if (['innbrudd', 'brann', 'vannlekkasje', 'kamera', 'smartlås'].includes(typeParam)) {
              newFilters.alarm_types = typeParam;
              setSelectedBoligalarmCategory(typeParam);
              setFilters(newFilters);
              console.log('🚨 Applied alarm type:', typeParam);
            }
            break;
            
          case 'handverkere':
            if (['renovation', 'electrical', 'plumbing', 'painting'].includes(typeParam)) {
              newFilters.service_type = typeParam;
              setSelectedHandverkereCategory(typeParam);
              setFilters(newFilters);
              console.log('🔨 Applied handyman service type:', typeParam);
            }
            break;
            
          case 'renhold':
            setSelectedRenholdCategory(typeParam);
            console.log('🧽 Setting selectedRenholdCategory to:', typeParam);
            
            if (typeParam === 'bolig') {
              newFilters.service_type = 'home';
              setFilters(newFilters);
              console.log('🧽 Applied home cleaning type');
            } else if (typeParam === 'kontor') {
              newFilters.service_type = 'office';
              setFilters(newFilters);
              console.log('🧽 Applied office cleaning type');
            } else if (typeParam === 'storrengjoring') {
              newFilters.service_type = 'deep';
              setFilters(newFilters);
              console.log('🧽 Applied deep cleaning type');
            } else if (typeParam === 'fast_renhold') {
              newFilters.service_type = 'regular';
              setFilters(newFilters);
              console.log('🧽 Applied regular cleaning type');
            } else if (typeParam === 'flytterengjoring') {
              newFilters.service_type = 'moving';
              setFilters(newFilters);
              console.log('🧽 Applied moving cleaning type');
            }
            break;
            
          case 'lan':
            if (['forbrukslan', 'boliglan', 'refinansiering', 'billan'].includes(typeParam)) {
              setSelectedLoanCategory(typeParam);
              console.log('💰 Applied loan category type:', typeParam);
            }
            break;
            
          case 'tv-pakker':
            if (['standard', 'streaming', 'sport', 'flexible', 'cabin', 'combo', 'extras'].includes(typeParam)) {
              setSelectedTVCategory(typeParam);
              console.log('📺 Applied TV category type:', typeParam);
            }
            break;
        }
        
        setIsFilterOpen(true);
      }
    }
  }, [location.search, kategori]);

  const handleCategoryChange = (category: string, newCategory: string | null) => {
    console.log('🔄 Category change requested:', category, newCategory);
    
    if (newCategory === null) {
      // Reset to main category page
      navigate(`/${kategori}`, { replace: true });
    } else {
      // Navigate to specific category
      navigate(`/${kategori}?type=${newCategory}`, { replace: true });
    }
  };

  const getCategoryName = (category: string) => {
    const translations: { [key: string]: string } = {
      'mobil': t('categoryName.mobil'),
      'strom': t('categoryName.strom'),
      'internett': t('categoryName.internett'),
      'forsikring': t('categoryName.forsikring'),
      'lan': t('categoryName.lan'),
      'boligalarm': t('categoryName.boligalarm'),
      'tv-pakker': t('categoryName.tv-pakker'),
      'handverkere': t('categoryName.handverkere'),
      'renhold': t('categoryName.renhold')
    };
    return translations[category] || category;
  };

  const getSelectedCategory = () => {
    switch (kategori) {
      case 'forsikring': return selectedInsuranceCategory;
      case 'tv-pakker': return selectedTVCategory;
      case 'mobil': return selectedMobilCategory;
      case 'internett': return selectedInternetCategory;
      case 'strom': return selectedStromCategory;
      case 'lan': return selectedLoanCategory;
      case 'boligalarm': return selectedBoligalarmCategory;
      case 'handverkere': return selectedHandverkereCategory;
      case 'renhold': return selectedRenholdCategory;
      default: return null;
    }
  };

  const filteredOffers = useFilteredOffers(
    offers, 
    filters, 
    sortBy, 
    kategori || '', 
    getSelectedCategory()
  );

  const getLoadingMessage = (category: string) => {
    const messages: { [key: string]: string } = {
      'mobil': 'Finner de beste mobilabonnementene...',
      'strom': 'Finner de beste strømavtalene...',
      'internett': 'Finner de beste internettilbudene...',
      'forsikring': 'Finner de beste forsikringene...',
      'lan': 'Finner de beste lånetilbudene...',
      'boligalarm': 'Finner de beste alarmsystemene...',
      'tv-pakker': 'Finner de beste TV-pakkene...',
      'handverkere': 'Finner de beste håndverkerne...',
      'renhold': 'Finner de beste renholdstjenestene...'
    };
    return messages[category] || 'Laster tilbud...';
  };

  const handleBackClick = () => navigate('/');
  const handleGetQuote = (offer: any) => {
    setSelectedProvider(null);
    setShowQuoteForm(true);
  };
  const handleProviderClick = (providerName: string) => {
    const provider = providers.find(p => p.navn === providerName);
    setSelectedProvider(provider || { navn: providerName });
  };
  const handleMeldPaClick = () => setShowQuoteForm(true);

  const handleFilterChange = (key: string, value: any) => {
    console.log('Filter changed:', key, value);
    setFilters(prev => ({ ...prev, [key]: value }));
    if (kategori === 'strom' && key === 'municipality' && value && value.trim()) {
      refetch(kategori, { municipality: value });
    }
  };

  const handleMunicipalityChange = (municipality: string) => {
    if (kategori === 'strom' && municipality) {
      console.log('Municipality changed, refetching data:', municipality);
      setFilters(prev => ({ ...prev, municipality }));
      refetch(kategori, { municipality });
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    navigate(location.pathname, { replace: true });
  };

  const validCategories = ['mobil', 'strom', 'internett', 'forsikring', 'lan', 'boligalarm', 'tv-pakker', 'handverkere', 'renhold'];
  if (!kategori || !validCategories.includes(kategori)) {
    return (
      <div className="min-h-screen bg-background">
        <CategoryPageHeader 
          categoryName="Kategori ikke funnet"
          onBackClick={handleBackClick}
          onMeldPaClick={handleMeldPaClick}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Kategori ikke funnet</h1>
            <button onClick={handleBackClick} className="mt-4 text-blue-600 hover:underline">
              Gå tilbake til forsiden
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error && offers.length === 0 && !loading && !initialLoading) {
    return (
      <ErrorState
        categoryName={getCategoryName(kategori)}
        error={error}
        onBackClick={handleBackClick}
        onMeldPaClick={handleMeldPaClick}
        onRetry={() => refetch(kategori)}
      />
    );
  }

  const shouldShowQuoteFormOption = !initialLoading && !loading && offers.length === 0 && kategori !== 'strom' && !error;

  // Debug logging for render
  if (kategori === 'strom') {
    console.log('⚡ CategoryPage rendering with selectedStromCategory:', selectedStromCategory, 'URL params:', new URLSearchParams(location.search).get('type'));
  }

  return (
    <div className="min-h-screen bg-background">
      <CategoryPageHeader 
        categoryName={getCategoryName(kategori)}
        onBackClick={handleBackClick}
        onMeldPaClick={handleMeldPaClick}
      />

      

      <div className="container mx-auto px-4 py-8">
        {kategori === 'strom' ? (
          <PowerCalculator 
            offers={filteredOffers}
            onGetQuote={handleGetQuote}
            onProviderClick={handleProviderClick}
            loading={loading}
            onMunicipalityChange={handleMunicipalityChange}
          />
        ) : (
          <>
            {initialLoading ? (
              <LoadingSpinner 
                message={getLoadingMessage(kategori)}
                size="lg"
                className="py-16"
              />
            ) : shouldShowQuoteFormOption ? (
              <NoOffersState onShowQuoteForm={() => setShowQuoteForm(true)} />
            ) : (
              <>
                <CategoryIconsRenderer
                  kategori={kategori}
                  selectedInsuranceCategory={selectedInsuranceCategory}
                  setSelectedInsuranceCategory={(cat) => {
                    setSelectedInsuranceCategory(cat);
                    handleCategoryChange('forsikring', cat);
                  }}
                  selectedTVCategory={selectedTVCategory}
                  setSelectedTVCategory={(cat) => {
                    setSelectedTVCategory(cat);
                    handleCategoryChange('tv-pakker', cat);
                  }}
                  selectedMobilCategory={selectedMobilCategory}
                  setSelectedMobilCategory={(cat) => {
                    setSelectedMobilCategory(cat);
                    handleCategoryChange('mobil', cat);
                  }}
                  selectedInternetCategory={selectedInternetCategory}
                  setSelectedInternetCategory={(cat) => {
                    setSelectedInternetCategory(cat);
                    handleCategoryChange('internett', cat);
                  }}
                  selectedStromCategory={selectedStromCategory}
                  setSelectedStromCategory={(cat) => {
                    console.log('⚡ StromCategory change requested from UI:', cat, 'current state:', selectedStromCategory);
                    setSelectedStromCategory(cat);
                    handleCategoryChange('strom', cat);
                  }}
                  selectedLoanCategory={selectedLoanCategory}
                  setSelectedLoanCategory={(cat) => {
                    setSelectedLoanCategory(cat);
                    handleCategoryChange('lan', cat);
                  }}
                  selectedBoligalarmCategory={selectedBoligalarmCategory}
                  setSelectedBoligalarmCategory={(cat) => {
                    setSelectedBoligalarmCategory(cat);
                    handleCategoryChange('boligalarm', cat);
                  }}
                  selectedHandverkereCategory={selectedHandverkereCategory}
                  setSelectedHandverkereCategory={(cat) => {
                    setSelectedHandverkereCategory(cat);
                    handleCategoryChange('handverkere', cat);
                  }}
                  selectedRenholdCategory={selectedRenholdCategory}
                  setSelectedRenholdCategory={(cat) => {
                    setSelectedRenholdCategory(cat);
                    handleCategoryChange('renhold', cat);
                  }}
                />

                <CategoryFilters
                  kategori={kategori}
                  offers={offers}
                  providers={providers}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  isFilterOpen={isFilterOpen}
                  onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
                  filteredOffersCount={filteredOffers.length}
                  totalOffersCount={offers.length}
                />

                {loading ? (
                  <LoadingSpinner 
                    message={getLoadingMessage(kategori)}
                    size="lg"
                    className="py-8"
                  />
                ) : (
                  <OffersGrid
                    offers={filteredOffers}
                    onGetQuote={handleGetQuote}
                    onProviderClick={handleProviderClick}
                    category={kategori}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>

      {showQuoteForm && (
        <QuoteForm 
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)}
          selectedProvider={selectedProvider}
          preSelectedCategory={getCategoryName(kategori)}
        />
      )}
    </div>
  );
};

export default CategoryPage;
