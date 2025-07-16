
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useOfferData = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(async (category: string, filters?: any) => {
    if (!category) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching offers for category: ${category}`);

      let offers: any[] = [];

      switch (category) {
        case 'mobil':
          offers = await fetchMobileOffers();
          break;
        case 'strom':
          offers = await fetchPowerOffers(filters);
          break;
        case 'internett':
          offers = await fetchInternetOffers();
          break;
        case 'forsikring':
          offers = await fetchInsuranceOffers();
          break;
        case 'tv-pakker':
          offers = await fetchTVOffers();
          break;
        case 'lan':
          offers = await fetchBankOffers();
          break;
        case 'boligalarm':
          offers = await fetchSecurityOffers();
          break;
        case 'handverkere':
          offers = await fetchHandymenOffers();
          break;
        case 'renhold':
          offers = await fetchCleaningOffers();
          break;
        default:
          console.warn(`Unknown category: ${category}`);
          offers = [];
      }
      
      console.log(`Offers loaded for ${category}:`, offers.length);
      setOffers(offers);
      
    } catch (error: any) {
      console.error(`Error fetching offers for ${category}:`, error);
      setOffers([]);
      setError('Det oppstod en feil ved lasting av tilbud');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMobileOffers = async () => {
    const { data, error } = await supabase.from('mobile_plans').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'mobile' }));
  };

  const fetchPowerOffers = async (filters?: any) => {
    if (!filters || !filters.municipality) return [];
    
    const searchTerm = filters.municipality.toLowerCase().trim();
    const { data, error } = await supabase
      .from('power_deals')
      .select('*')
      .or(`municipality_name.ilike.%${searchTerm}%,municipality_name.ilike.${searchTerm}%`)
      .order('price', { ascending: true });
    
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'power' }));
  };

  const fetchInternetOffers = async () => {
    const { data, error } = await supabase.from('internet_plans').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'internet' }));
  };

  const fetchInsuranceOffers = async () => {
    const { data, error } = await supabase.from('insurance_plans').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'insurance' }));
  };

  const fetchTVOffers = async () => {
    const { data, error } = await supabase.from('tv_packages').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'tv' }));
  };

  const fetchBankOffers = async () => {
    const { data, error } = await supabase
      .from('bank_plans')
      .select('*')
      .order('effective_rate', { ascending: true });
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'bank' }));
  };

  const fetchSecurityOffers = async () => {
    const { data, error } = await supabase.from('home_security_plans').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'security' }));
  };

  const fetchHandymenOffers = async () => {
    console.log('Fetching handymen services...');
    const { data, error } = await supabase.from('handymen_services').select('*');
    
    if (error) {
      console.error('Handymen fetch error:', error);
      throw error;
    }
    console.log('Handymen data fetched:', data);
    return (data || []).map((offer: any) => ({ ...offer, type: 'handymen' }));
  };

  const fetchCleaningOffers = async () => {
    console.log('Fetching cleaning services...');
    const { data, error } = await supabase.from('cleaning_services').select('*');
    
    if (error) {
      console.error('Cleaning fetch error:', error);
      throw error;
    }
    console.log('Cleaning data fetched:', data);
    return (data || []).map((offer: any) => ({ ...offer, type: 'cleaning' }));
  };

  return { offers, loading, error, fetchOffers };
};
