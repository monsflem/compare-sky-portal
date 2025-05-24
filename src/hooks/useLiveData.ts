
import { useState, useEffect, useCallback } from 'react';
import { Provider } from '../types';
import { LiveDataService, LivePriceUpdate } from '../services/LiveDataService';
import { getProvidersByCategory } from '../data/mockProviders';

export const useLiveData = (category: string) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updatePrices = useCallback(async () => {
    setIsUpdating(true);
    setError(null);
    
    try {
      console.log(`Updating live prices for ${category} category`);
      const updates = await LiveDataService.updateAllPrices(category);
      
      setProviders(currentProviders => {
        return currentProviders.map(provider => {
          const update = updates.find(u => u.providerId === provider.id);
          if (update) {
            return {
              ...provider,
              price: update.price,
              priceLastUpdated: update.lastUpdated,
              isLivePrice: true,
            };
          }
          return provider;
        });
      });
      
      setLastUpdate(new Date());
      console.log(`Successfully updated ${updates.length} providers`);
    } catch (err) {
      console.error('Failed to update prices:', err);
      setError('Failed to update live prices');
    } finally {
      setIsUpdating(false);
    }
  }, [category]);

  useEffect(() => {
    // Load initial data
    const initialProviders = getProvidersByCategory(category);
    setProviders(initialProviders);
    
    // Start periodic updates
    updatePrices();
    
    // Set up auto-update every 10 minutes
    const interval = setInterval(updatePrices, 10 * 60 * 1000);
    
    return () => {
      clearInterval(interval);
      LiveDataService.stopAutoUpdate();
    };
  }, [category, updatePrices]);

  return {
    providers,
    isUpdating,
    lastUpdate,
    error,
    refreshPrices: updatePrices,
  };
};
