
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useAdminData = (category: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<any[]>([]);

  const getTableName = (category: string) => {
    switch (category) {
      case 'mobile': return 'mobile_plans';
      case 'power': return 'power_deals';
      case 'internet': return 'internet_plans';
      case 'insurance': return 'insurance_plans';
      case 'bank': return 'bank_plans';
      case 'security': return 'home_security_plans';
      case 'tv-pakker': return 'tv_packages';
      default: return null;
    }
  };

  const fetchProviders = async () => {
    try {
      const tableName = getTableName(category);
      if (!tableName) return [];

      let providerField = 'provider';
      if (category === 'mobile') providerField = 'operator';
      if (category === 'power') providerField = 'supplier_name';

      // Get specific fields to avoid type inference issues
      let selectFields = `${providerField}, logo_url`;
      
      const { data: tableData, error } = await supabase
        .from(tableName as any)
        .select(selectFields);

      if (error) throw error;

      // Extract unique providers
      const uniqueProviders: any[] = [];
      const providerMap = new Map();
      
      tableData?.forEach((item: any) => {
        const providerName = item[providerField];
        if (providerName && !providerMap.has(providerName)) {
          providerMap.set(providerName, {
            id: `${category}-${providerName}`,
            navn: providerName,
            logo_url: item.logo_url || null,
            kategori: category
          });
        }
      });

      const providersArray = Array.from(providerMap.values());
      setProviders(providersArray);
      return providersArray;
    } catch (error) {
      console.error('Error fetching providers:', error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const tableName = getTableName(category);
      if (!tableName) return;

      // First fetch providers for this category
      await fetchProviders();

      // Then fetch all data from the table
      const { data: fetchedData, error } = await supabase
        .from(tableName as any)
        .select('*')
        .order('id');

      if (error) throw error;
      setData(fetchedData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke hente data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const tableName = getTableName(category);
      if (!tableName) return;

      // Remove logo_url from formData to prevent setting it through admin interface
      const { logo_url, ...dataToInsert } = formData;

      const { error } = await (supabase as any)
        .from(tableName)
        .insert(dataToInsert);
      
      if (error) throw error;
      toast({ title: "Suksess", description: "Element lagt til" });
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke lagre data",
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async (id: string | number, formData: any) => {
    try {
      const tableName = getTableName(category);
      if (!tableName) return;

      // Remove logo_url from formData to prevent updating it through admin interface
      const { logo_url, ...dataToUpdate } = formData;

      const { error } = await (supabase as any)
        .from(tableName)
        .update(dataToUpdate)
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Suksess", description: "Element oppdatert" });
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke oppdatere data",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Er du sikker på at du vil slette dette elementet?')) return;

    try {
      const tableName = getTableName(category);
      if (!tableName) return;

      const { error } = await (supabase as any)
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Suksess", description: "Element slettet" });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke slette element",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return {
    data,
    loading,
    providers,
    handleSubmit,
    handleUpdate,
    handleDelete,
    refetch: fetchData
  };
};
