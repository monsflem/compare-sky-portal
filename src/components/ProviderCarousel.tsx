import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ImageWithFallback from './ImageWithFallback';

interface Provider {
  id: string;
  navn: string;
  logo_url: string | null;
  kategori: string;
}

interface ProviderCarouselProps {
  onProviderClick: (provider: Provider) => void;
}

const ProviderCarousel: React.FC<ProviderCarouselProps> = ({ onProviderClick }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoized fetch function to prevent re-renders
  const fetchProviders = useCallback(async () => {
    try {
      console.log('Fetching providers from different tables...');
      
      // Fetch from all tables in parallel
      const [
        mobileResult,
        internetResult,
        insuranceResult,
        powerResult,
        bankResult,
        securityResult,
        tvResult
      ] = await Promise.allSettled([
        supabase.from('mobile_plans').select('id, operator, logo_url').limit(10),
        supabase.from('internet_plans').select('id, provider, logo_url').limit(10),
        supabase.from('insurance_plans').select('id, provider, logo_url').limit(10),
        supabase.from('power_deals').select('id, supplier_name, logo_url').limit(10),
        supabase.from('bank_plans').select('id, provider, logo_url').limit(10),
        supabase.from('home_security_plans').select('id, provider, logo_url').limit(10),
        supabase.from('tv_packages').select('id, provider, logo_url').limit(10)
      ]);

      const allProviders: Provider[] = [];

      // Process mobile plans
      if (mobileResult.status === 'fulfilled' && mobileResult.value.data) {
        mobileResult.value.data.forEach(item => {
          if (item.operator && item.logo_url) {
            allProviders.push({
              id: `mobile-${item.id}`,
              navn: item.operator,
              logo_url: item.logo_url,
              kategori: 'mobil'
            });
          }
        });
      }

      // Process internet plans
      if (internetResult.status === 'fulfilled' && internetResult.value.data) {
        internetResult.value.data.forEach(item => {
          if (item.provider && item.logo_url) {
            allProviders.push({
              id: `internet-${item.id}`,
              navn: item.provider,
              logo_url: item.logo_url,
              kategori: 'internett'
            });
          }
        });
      }

      // Process insurance plans
      if (insuranceResult.status === 'fulfilled' && insuranceResult.value.data) {
        insuranceResult.value.data.forEach(item => {
          if (item.provider && item.logo_url) {
            allProviders.push({
              id: `insurance-${item.id}`,
              navn: item.provider,
              logo_url: item.logo_url,
              kategori: 'forsikring'
            });
          }
        });
      }

      // Process power deals
      if (powerResult.status === 'fulfilled' && powerResult.value.data) {
        powerResult.value.data.forEach(item => {
          if (item.supplier_name && item.logo_url) {
            allProviders.push({
              id: `power-${item.id}`,
              navn: item.supplier_name,
              logo_url: item.logo_url,
              kategori: 'strom'
            });
          }
        });
      }

      // Process bank plans
      if (bankResult.status === 'fulfilled' && bankResult.value.data) {
        bankResult.value.data.forEach(item => {
          if (item.provider && item.logo_url) {
            allProviders.push({
              id: `bank-${item.id}`,
              navn: item.provider,
              logo_url: item.logo_url,
              kategori: 'lan'
            });
          }
        });
      }

      // Process security plans
      if (securityResult.status === 'fulfilled' && securityResult.value.data) {
        securityResult.value.data.forEach(item => {
          if (item.provider && item.logo_url) {
            allProviders.push({
              id: `security-${item.id}`,
              navn: item.provider,
              logo_url: item.logo_url,
              kategori: 'boligalarm'
            });
          }
        });
      }

      // Process TV packages
      if (tvResult.status === 'fulfilled' && tvResult.value.data) {
        tvResult.value.data.forEach(item => {
          if (item.provider && item.logo_url) {
            allProviders.push({
              id: `tv-${item.id}`,
              navn: item.provider,
              logo_url: item.logo_url,
              kategori: 'tv-pakker'
            });
          }
        });
      }

      // Remove duplicates based on navn and kategori
      const uniqueProviders = allProviders.filter((provider, index, self) => 
        index === self.findIndex(p => p.navn === provider.navn && p.kategori === provider.kategori)
      );

      console.log('Fetched providers:', uniqueProviders);
      console.log('Number of providers:', uniqueProviders.length);
      
      setProviders(uniqueProviders);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Ingen partnere funnet for øyeblikket.
      </div>
    );
  }

  // Duplicate providers to ensure seamless loop
  const duplicatedProviders = [...providers, ...providers];

  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
        <div className="flex min-w-full">
          {duplicatedProviders.map((provider, index) => (
            <div
              key={`${provider.id}-${index}`}
              onClick={() => onProviderClick(provider)}
              className="flex-shrink-0 w-44 h-28 mx-4 flex items-center justify-center bg-white hover:bg-white/90 transition-all duration-300 cursor-pointer group hover:scale-105 p-3 rounded-xl border border-gray-200 shadow-sm"
            >
              <ImageWithFallback
                src={provider.logo_url || '/placeholder.svg'}
                alt={provider.navn}
                className="max-w-36 max-h-20 object-contain transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Fade effects on both sides */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default ProviderCarousel;
