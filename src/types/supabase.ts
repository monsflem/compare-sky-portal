
export interface Category {
  id: string;
  name_no: string;
  name_en: string;
  slug: string;
  description_no?: string;
  description_en?: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Provider {
  provider_id: string;
  name: string;
  slug?: string;
  logo_url?: string;
  website_url: string;
  description?: string;
  description_no?: string;
  description_en?: string;
  affiliate_url?: string;
  category_id?: string;
  contact_email?: string;
  contact_phone?: string;
  is_active?: boolean;
  rating?: number;
  review_count?: number;
  created_at: string;
  last_updated: string;
}

export interface Offer {
  id: string;
  provider_id: string;
  title_no: string;
  title_en: string;
  description_no?: string;
  description_en?: string;
  price?: number;
  price_unit?: string;
  features?: any;
  is_featured?: boolean;
  is_active?: boolean;
  valid_from?: string;
  valid_until?: string;
  external_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PriceHistory {
  id: string;
  offer_id: string;
  price: number;
  price_unit?: string;
  recorded_at: string;
}

export interface UserProfile {
  user_id: string;
  email?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  preferred_language?: string;
  is_admin?: boolean;
  favorites?: any;
  settings?: any;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  provider_id?: string;
  offer_id?: string;
  created_at: string;
}

export interface ComparisonSession {
  id: string;
  user_id?: string;
  category_id: string;
  session_data?: any;
  created_at: string;
}

export interface AdminLog {
  id: string;
  admin_id?: string;
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: any;
  new_values?: any;
  created_at: string;
}

export interface ErrorLog {
  log_id: string;
  error_message: string;
  component: string;
  occurred_at: string;
  resolved?: boolean;
  retry_count?: number;
}
