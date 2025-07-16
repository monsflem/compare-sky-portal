
import { supabase } from '@/integrations/supabase/client';

export const useMunicipalityData = () => {
  const fetchMunicipalities = async () => {
    try {
      const { data, error } = await supabase
        .from('unique_municipalities')
        .select('clean_name, original_name')
        .order('clean_name');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching municipalities:', error);
      return [];
    }
  };

  return { fetchMunicipalities };
};
