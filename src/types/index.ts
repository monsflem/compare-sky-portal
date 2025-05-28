
// Re-export Supabase types for backward compatibility
export type {
  Category,
  Provider,
  Offer,
  UserProfile,
  UserFavorite,
  ComparisonSession,
  AdminLog,
  ErrorLog,
  PriceHistory
} from './supabase';

// Legacy types for backward compatibility
export interface LegacyProvider {
  id: string;
  name: string;
  category: 'insurance' | 'electricity' | 'mobile' | 'loans';
  logo: string;
  price: number;
  priceUnit: string;
  rating: number;
  description: string;
  features: Record<string, any>;
  url: string;
  categoryUrls: {
    insurance?: string;
    electricity?: string;
    mobile?: string;
    loans?: string;
  };
  priceLastUpdated: string;
  isLivePrice: boolean;
  updatedAt: string;
}

export interface AffiliateClick {
  id: string;
  providerId: string;
  providerName: string;
  category: string;
  timestamp: string;
  referrer: string;
}

export type CategorySlug = 'insurance' | 'electricity' | 'mobile' | 'loans';
