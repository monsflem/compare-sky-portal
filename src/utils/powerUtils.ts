export interface PowerOffer {
  id: number;
  supplier_name: string;
  product_name: string;
  price: number;
  price_unit: string;
  contract_length: string;
  municipality_name: string;
  logo_url?: string;
  additional_fees?: number;
  total_price?: number;
}

export interface CategoryInfo {
  key: string;
  label: string;
  labelKey: string;
  icon: string;
  color: string;
}

export const POWER_CATEGORIES: CategoryInfo[] = [
  { key: 'all', label: 'Alle', labelKey: 'power.contractTypes.all', icon: 'Zap', color: 'gray' },
  { key: 'spot', label: 'Spotpris', labelKey: 'power.contractTypes.spot', icon: 'TrendingUp', color: 'blue' },
  { key: 'fixed', label: 'Fastpris', labelKey: 'power.contractTypes.fixed', icon: 'Zap', color: 'green' },
  { key: 'variable', label: 'Variabel', labelKey: 'power.contractTypes.variable', icon: 'Clock', color: 'orange' },
  { key: 'green', label: 'Grønn strøm', labelKey: 'power.contractTypes.green', icon: 'Leaf', color: 'emerald' },
  { key: 'residential', label: 'Boligstrøm', labelKey: 'power.contractTypes.residential', icon: 'Home', color: 'purple' },
  { key: 'cabin', label: 'Hyttestrøm', labelKey: 'power.contractTypes.cabin', icon: 'Mountain', color: 'amber' }
];

// Calculate monthly cost based on consumption and offer data
export const calculateMonthlyCost = (offer: PowerOffer, consumption: number): number => {
  // Use total_price if available, otherwise calculate from price
  let pricePerKwh = offer.price || 0;
  
  // If total_price exists and price is 0 or null, use total_price as øre/kWh
  if (offer.total_price && (!offer.price || offer.price === 0)) {
    pricePerKwh = offer.total_price;
  }
  
  return Math.round((consumption * pricePerKwh / 100) / 12);
};

// Get display price - use total_price if price is 0 or null
export const getDisplayPrice = (offer: PowerOffer): number => {
  return (offer.price && offer.price > 0) ? offer.price : (offer.total_price || 0);
};

// Check if offer has valid pricing data
export const hasValidPricing = (offer: PowerOffer): boolean => {
  return (offer.price && offer.price > 0) || (offer.total_price && offer.total_price > 0);
};

// Categorize offer based on product name and contract length
export const categorizeOffer = (offer: PowerOffer): string => {
  const productLower = offer.product_name?.toLowerCase() || '';
  const contractLower = offer.contract_length?.toLowerCase() || '';
  
  // Check product name first for more accurate categorization
  if (productLower.includes('spot')) return 'spot';
  if (productLower.includes('fast') || productLower.includes('fastpris')) return 'fixed';
  if (productLower.includes('grønn') || productLower.includes('groen')) return 'green';
  if (productLower.includes('hytte')) return 'cabin';
  if (productLower.includes('bolig') || productLower.includes('boligpakka')) return 'residential';
  if (productLower.includes('variabel')) return 'variable';
  
  // Check contract length as fallback
  if (contractLower.includes('spot')) return 'spot';
  if (contractLower.includes('fast')) return 'fixed';
  if (contractLower.includes('variabel')) return 'variable';
  if (contractLower.includes('grønn')) return 'green';
  
  // Default categorization based on binding period
  if (productLower.includes('12') || productLower.includes('1 år') || productLower.includes('år')) return 'fixed';
  if (productLower.includes('6') || productLower.includes('måneder')) return 'fixed';
  
  return 'all';
};

// Get contract badge color
export const getContractBadgeColor = (category: string): string => {
  switch (category) {
    case 'spot': return 'bg-blue-100 text-blue-800';
    case 'fixed': return 'bg-green-100 text-green-800';
    case 'green': return 'bg-emerald-100 text-emerald-800';
    case 'residential': return 'bg-purple-100 text-purple-800';
    case 'cabin': return 'bg-amber-100 text-amber-800';
    case 'variable': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Format consumption value
export const formatConsumption = (value: number): string => {
  return value.toLocaleString('no-NO') + ' kWh';
};

// Filter offers by category and municipality
export const filterOffers = (
  offers: PowerOffer[], 
  selectedMunicipality: string, 
  selectedCategory: string
): PowerOffer[] => {
  let filtered = offers.filter(hasValidPricing); // Only show offers with valid pricing

  // Filter by municipality with improved case-insensitive matching
  if (selectedMunicipality) {
    const searchTerm = selectedMunicipality.toLowerCase().trim();
    filtered = filtered.filter(offer => {
      if (!offer.municipality_name) return false;
      
      const municipalityName = offer.municipality_name.toLowerCase();
      
      // Multiple matching strategies
      return municipalityName.includes(searchTerm) ||
             searchTerm.includes(municipalityName.split('-')[0].split('(')[0].trim()) ||
             municipalityName.startsWith(searchTerm) ||
             municipalityName.split('-')[0].split('(')[0].trim().includes(searchTerm);
    });
  }

  // Filter by category
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(offer => {
      const offerCategory = categorizeOffer(offer);
      return offerCategory === selectedCategory;
    });
  }

  return filtered;
};

// Sort offers by monthly cost
export const sortOffersByPrice = (offers: PowerOffer[], consumption: number): PowerOffer[] => {
  return [...offers].sort((a, b) => {
    const costA = calculateMonthlyCost(a, consumption);
    const costB = calculateMonthlyCost(b, consumption);
    return costA - costB;
  });
};