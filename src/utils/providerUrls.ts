
import { Provider, Category } from '../types';

export const getCategorySpecificUrl = (provider: Provider, category: Category): string => {
  const categoryUrl = provider.categoryUrls[category];
  
  if (categoryUrl) {
    // Add affiliate tracking parameter
    const affiliateUrl = categoryUrl + (categoryUrl.includes('?') ? '&' : '?') + 'ref=skycompare';
    return affiliateUrl;
  }
  
  // Fallback to main URL with affiliate tracking
  return provider.url + (provider.url.includes('?') ? '&' : '?') + 'ref=skycompare';
};

export const formatPriceWithFreshness = (provider: Provider): { priceText: string; freshnessIndicator: string } => {
  const priceText = `${provider.price} ${provider.priceUnit}`;
  
  if (provider.isLivePrice) {
    const lastUpdated = new Date(provider.priceLastUpdated);
    const now = new Date();
    const minutesAgo = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60));
    
    if (minutesAgo < 5) {
      return { priceText, freshnessIndicator: 'Live Price' };
    } else if (minutesAgo < 60) {
      return { priceText, freshnessIndicator: `Updated ${minutesAgo}m ago` };
    } else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      return { priceText, freshnessIndicator: `Updated ${hoursAgo}h ago` };
    }
  }
  
  return { priceText, freshnessIndicator: 'Static Price' };
};
