
export interface LivePriceUpdate {
  providerId: string;
  price: number;
  lastUpdated: string;
  source: 'api' | 'scraping' | 'manual';
}

export interface ScrapingTarget {
  providerId: string;
  name: string;
  category: string;
  scrapeUrl: string;
  priceSelector: string;
  dataSelector?: string;
  lastScraped?: string;
}

export class LiveDataService {
  private static updateInterval: NodeJS.Timeout | null = null;
  private static isUpdating = false;

  // Mock web scraping for Norwegian mobile providers
  static async scrapeProviderData(target: ScrapingTarget): Promise<LivePriceUpdate | null> {
    console.log(`Scraping data for ${target.name} from ${target.scrapeUrl}`);
    
    try {
      // Simulate realistic price fluctuations
      const basePrice = this.getBasePrice(target.providerId);
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const newPrice = Math.round(basePrice * (1 + variation));
      
      // Simulate scraping delay
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      return {
        providerId: target.providerId,
        price: newPrice,
        lastUpdated: new Date().toISOString(),
        source: 'scraping'
      };
    } catch (error) {
      console.error(`Failed to scrape ${target.name}:`, error);
      return null;
    }
  }

  static async checkAPIAvailability(providerId: string): Promise<boolean> {
    // Mock API availability check
    const providersWithAPI = ['24', '22']; // OneCall and Telia have mock APIs
    return providersWithAPI.includes(providerId);
  }

  static async fetchFromAPI(providerId: string): Promise<LivePriceUpdate | null> {
    console.log(`Fetching API data for provider ${providerId}`);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
      
      const basePrice = this.getBasePrice(providerId);
      const variation = (Math.random() - 0.5) * 0.05; // ±2.5% variation for API data
      const newPrice = Math.round(basePrice * (1 + variation));
      
      return {
        providerId,
        price: newPrice,
        lastUpdated: new Date().toISOString(),
        source: 'api'
      };
    } catch (error) {
      console.error(`API fetch failed for provider ${providerId}:`, error);
      return null;
    }
  }

  static async updateAllPrices(category: string = 'mobile'): Promise<LivePriceUpdate[]> {
    if (this.isUpdating) {
      console.log('Price update already in progress');
      return [];
    }

    this.isUpdating = true;
    console.log(`Starting price update for ${category} providers`);
    
    try {
      const targets = this.getScrapingTargets(category);
      const updates: LivePriceUpdate[] = [];

      for (const target of targets) {
        let update: LivePriceUpdate | null = null;
        
        // Try API first, fall back to scraping
        if (await this.checkAPIAvailability(target.providerId)) {
          update = await this.fetchFromAPI(target.providerId);
        }
        
        if (!update) {
          update = await this.scrapeProviderData(target);
        }
        
        if (update) {
          updates.push(update);
        }
      }

      console.log(`Price update completed. Updated ${updates.length} providers.`);
      return updates;
    } finally {
      this.isUpdating = false;
    }
  }

  static startAutoUpdate(intervalMinutes: number = 15): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    console.log(`Starting auto-update every ${intervalMinutes} minutes`);
    this.updateInterval = setInterval(async () => {
      await this.updateAllPrices();
    }, intervalMinutes * 60 * 1000);
  }

  static stopAutoUpdate(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      console.log('Auto-update stopped');
    }
  }

  private static getBasePrice(providerId: string): number {
    const basePrices: Record<string, number> = {
      '21': 399, // Telenor
      '22': 379, // Telia
      '23': 299, // Ice
      '24': 329, // OneCall
      '25': 279, // Talkmore
      '26': 249, // Chili Mobil
      '27': 239, // Happybytes
      '28': 229, // MyCall
      '29': 319, // Release
      '30': 269, // Nortel
    };
    return basePrices[providerId] || 300;
  }

  private static getScrapingTargets(category: string): ScrapingTarget[] {
    if (category !== 'mobile') return [];

    return [
      {
        providerId: '21',
        name: 'Telenor',
        category: 'mobile',
        scrapeUrl: 'https://www.telenor.no/mobil/abonnement',
        priceSelector: '.price-display',
      },
      {
        providerId: '22',
        name: 'Telia',
        category: 'mobile',
        scrapeUrl: 'https://www.telia.no/mobil/abonnement',
        priceSelector: '.subscription-price',
      },
      {
        providerId: '23',
        name: 'Ice',
        category: 'mobile',
        scrapeUrl: 'https://www.ice.no/abonnement',
        priceSelector: '.plan-price',
      },
      {
        providerId: '24',
        name: 'OneCall',
        category: 'mobile',
        scrapeUrl: 'https://www.onecall.no/mobil',
        priceSelector: '.price-box',
      },
      {
        providerId: '25',
        name: 'Talkmore',
        category: 'mobile',
        scrapeUrl: 'https://www.talkmore.no/abonnement',
        priceSelector: '.price-element',
      },
    ];
  }
}
