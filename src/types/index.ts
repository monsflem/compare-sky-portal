
export interface Provider {
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

export interface ErrorLog {
  id: string;
  message: string;
  source: string;
  stackTrace: string;
  isResolved: boolean;
  createdAt: string;
  resolvedAt: string | null;
}

export interface AffiliateClick {
  id: string;
  providerId: string;
  providerName: string;
  category: string;
  timestamp: string;
  referrer: string;
}

export type Category = 'insurance' | 'electricity' | 'mobile' | 'loans';
