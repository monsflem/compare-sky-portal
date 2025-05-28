
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SupabaseService } from '@/services/supabaseService';
import { Category, Provider, Offer } from '@/types/supabase';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: SupabaseService.getCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => SupabaseService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  });
};

export const useProviders = () => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: SupabaseService.getProviders,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProvidersByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['providers', 'category', categoryId],
    queryFn: () => SupabaseService.getProvidersByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProviderById = (id: string) => {
  return useQuery({
    queryKey: ['provider', id],
    queryFn: () => SupabaseService.getProviderById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useOffersByProvider = (providerId: string) => {
  return useQuery({
    queryKey: ['offers', 'provider', providerId],
    queryFn: () => SupabaseService.getOffersByProvider(providerId),
    enabled: !!providerId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useOffersByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['offers', 'category', categoryId],
    queryFn: () => SupabaseService.getOffersByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 2,
  });
};

export const useErrorLogs = () => {
  return useQuery({
    queryKey: ['errorLogs'],
    queryFn: SupabaseService.getErrorLogs,
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
  });
};

export const useResolveAllErrors = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: SupabaseService.resolveAllErrors,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['errorLogs'] });
    },
  });
};

export const useLogError = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ errorMessage, component }: { errorMessage: string; component: string }) =>
      SupabaseService.logError(errorMessage, component),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['errorLogs'] });
    },
  });
};
