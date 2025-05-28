
import { supabase } from '@/integrations/supabase/client';
import { Category, Provider, Offer, UserProfile, UserFavorite } from '@/types/supabase';

export class SupabaseService {
  
  // Categories
  static async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('name_en');
    
    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
    
    return data;
  }

  // Providers
  static async getProviders(): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      console.error('Error fetching providers:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getProvidersByCategory(categoryId: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      console.error('Error fetching providers by category:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getProviderById(id: string): Promise<Provider | null> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('provider_id', id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching provider:', error);
      throw error;
    }
    
    return data;
  }

  // Offers
  static async getOffersByProvider(providerId: string): Promise<Offer[]> {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('provider_id', providerId)
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('price');
    
    if (error) {
      console.error('Error fetching offers:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getOffersByCategory(categoryId: string): Promise<(Offer & { provider: Provider })[]> {
    const { data, error } = await supabase
      .from('offers')
      .select(`
        *,
        provider:providers!inner(*)
      `)
      .eq('providers.category_id', categoryId)
      .eq('is_active', true)
      .eq('providers.is_active', true)
      .order('is_featured', { ascending: false })
      .order('price');
    
    if (error) {
      console.error('Error fetching offers by category:', error);
      throw error;
    }
    
    return data || [];
  }

  // User Profiles
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
    
    return data;
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
    
    return data;
  }

  // User Favorites
  static async getUserFavorites(userId: string): Promise<UserFavorite[]> {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching user favorites:', error);
      throw error;
    }
    
    return data || [];
  }

  static async addFavorite(userId: string, providerId?: string, offerId?: string): Promise<UserFavorite | null> {
    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: userId,
        provider_id: providerId,
        offer_id: offerId
      })
      .select()
      .maybeSingle();
    
    if (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
    
    return data;
  }

  static async removeFavorite(userId: string, providerId?: string, offerId?: string): Promise<void> {
    let query = supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId);

    if (providerId) {
      query = query.eq('provider_id', providerId);
    }
    if (offerId) {
      query = query.eq('offer_id', offerId);
    }

    const { error } = await query;
    
    if (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  // Error Logs
  static async getErrorLogs() {
    const { data, error } = await supabase
      .from('error_logs')
      .select('*')
      .order('occurred_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching error logs:', error);
      throw error;
    }
    
    return data || [];
  }

  static async logError(errorMessage: string, component: string): Promise<void> {
    const { error } = await supabase
      .from('error_logs')
      .insert({
        error_message: errorMessage,
        component: component,
        resolved: false,
        retry_count: 0
      });
    
    if (error) {
      console.error('Error logging error:', error);
    }
  }

  static async resolveAllErrors(): Promise<void> {
    const { error } = await supabase
      .from('error_logs')
      .update({ resolved: true })
      .eq('resolved', false);
    
    if (error) {
      console.error('Error resolving errors:', error);
      throw error;
    }
  }
}
