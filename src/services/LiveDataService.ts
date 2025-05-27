
export interface LivePriceUpdate {
  providerId: string;
  price: number;
  lastUpdated: string;
  source: 'api' | 'scraping' | 'manual';
  confidence: number; // 0-100, how reliable the data is
  changePercent?: number; // percentage change from previous price
}

export interface ScrapingTarget {
  providerId: string;
  name: string;
  category: string;
  scrapeUrl: string;
  priceSelector: string;
  dataSelector?: string;
  lastScraped?: string;
  priority: 'high' | 'medium' | 'low';
  retryCount?: number;
  maxRetries?: number;
}

export interface ServiceStatus {
  isHealthy: boolean;
  lastCheck: string;
  errorCount: number;
  avgResponseTime: number;
}

export class LiveDataService {
  private static updateInterval: NodeJS.Timeout | null = null;
  private static isUpdating = false;
  private static lastPrices: Map<string, number> = new Map();
  private static serviceStatus: ServiceStatus = {
    isHealthy: true,
    lastCheck: new Date().toISOString(),
    errorCount: 0,
    avgResponseTime: 0
  };

  // Enhanced web scraping simulation with better error handling
  static async scrapeProviderData(target: ScrapingTarget): Promise<LivePriceUpdate | null> {
    const startTime = Date.now();
    console.log(`🕷️ Scraping data for ${target.name} from ${target.scrapeUrl}`);
    
    try {
      // Simulate network delay and potential failures
      const delay = 200 + Math.random() * 800;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Simulate occasional failures (5% chance)
      if (Math.random() < 0.05) {
        throw new Error(`Scraping failed for ${target.name}: Connection timeout`);
      }

      const basePrice = this.getBasePrice(target.providerId);
      const lastPrice = this.lastPrices.get(target.providerId) || basePrice;
      
      // More realistic price fluctuations based on category
      const volatility = this.getCategoryVolatility(target.category);
      const variation = (Math.random() - 0.5) * volatility;
      const newPrice = Math.round(lastPrice * (1 + variation));
      
      // Calculate change percentage
      const changePercent = ((newPrice - lastPrice) / lastPrice) * 100;
      
      // Store new price for next comparison
      this.lastPrices.set(target.providerId, newPrice);
      
      const endTime = Date.now();
      this.updateServiceMetrics(endTime - startTime, false);
      
      return {
        providerId: target.providerId,
        price: newPrice,
        lastUpdated: new Date().toISOString(),
        source: 'scraping',
        confidence: 85 + Math.random() * 10, // 85-95% confidence for scraping
        changePercent: Math.round(changePercent * 100) / 100
      };
    } catch (error) {
      console.error(`❌ Failed to scrape ${target.name}:`, error);
      this.updateServiceMetrics(Date.now() - startTime, true);
      
      // Return cached data with lower confidence if available
      const cachedPrice = this.lastPrices.get(target.providerId);
      if (cachedPrice) {
        return {
          providerId: target.providerId,
          price: cachedPrice,
          lastUpdated: new Date().toISOString(),
          source: 'manual',
          confidence: 30, // Low confidence for cached data
        };
      }
      
      return null;
    }
  }

  static async checkAPIAvailability(providerId: string): Promise<boolean> {
    // Enhanced API availability simulation
    const providersWithAPI = ['24', '22', '21']; // OneCall, Telia, Telenor
    const hasAPI = providersWithAPI.includes(providerId);
    
    if (hasAPI) {
      // Simulate API health check (90% uptime)
      return Math.random() > 0.1;
    }
    
    return false;
  }

  static async fetchFromAPI(providerId: string): Promise<LivePriceUpdate | null> {
    const startTime = Date.now();
    console.log(`🔗 Fetching API data for provider ${providerId}`);
    
    try {
      // Simulate API call with authentication and rate limiting
      const delay = 100 + Math.random() * 200;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Simulate occasional API errors (3% chance)
      if (Math.random() < 0.03) {
        throw new Error(`API error for provider ${providerId}: Rate limit exceeded`);
      }

      const basePrice = this.getBasePrice(providerId);
      const lastPrice = this.lastPrices.get(providerId) || basePrice;
      
      // API data has lower volatility (more stable)
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation for API data
      const newPrice = Math.round(lastPrice * (1 + variation));
      
      const changePercent = ((newPrice - lastPrice) / lastPrice) * 100;
      this.lastPrices.set(providerId, newPrice);
      
      const endTime = Date.now();
      this.updateServiceMetrics(endTime - startTime, false);
      
      return {
        providerId,
        price: newPrice,
        lastUpdated: new Date().toISOString(),
        source: 'api',
        confidence: 95 + Math.random() * 5, // 95-100% confidence for API data
        changePercent: Math.round(changePercent * 100) / 100
      };
    } catch (error) {
      console.error(`❌ API fetch failed for provider ${providerId}:`, error);
      this.updateServiceMetrics(Date.now() - startTime, true);
      return null;
    }
  }

  static async updateAllPrices(category: string = 'mobile'): Promise<LivePriceUpdate[]> {
    if (this.isUpdating) {
      console.log('⏳ Price update already in progress');
      return [];
    }

    this.isUpdating = true;
    const updateStartTime = Date.now();
    console.log(`🚀 Starting comprehensive price update for ${category} providers`);
    
    try {
      const targets = this.getScrapingTargets(category);
      const updates: LivePriceUpdate[] = [];
      const errors: string[] = [];

      // Process high priority targets first
      const sortedTargets = targets.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      for (const target of sortedTargets) {
        let update: LivePriceUpdate | null = null;
        
        try {
          // Try API first, fall back to scraping
          if (await this.checkAPIAvailability(target.providerId)) {
            console.log(`📡 Using API for ${target.name}`);
            update = await this.fetchFromAPI(target.providerId);
          }
          
          if (!update) {
            console.log(`🕷️ Falling back to scraping for ${target.name}`);
            update = await this.scrapeProviderData(target);
          }
          
          if (update) {
            updates.push(update);
            console.log(`✅ Updated ${target.name}: ${update.price} (${update.confidence}% confidence, ${update.source})`);
          } else {
            errors.push(`Failed to update ${target.name}`);
          }
        } catch (error) {
          console.error(`💥 Error updating ${target.name}:`, error);
          errors.push(`Error updating ${target.name}: ${error}`);
        }
      }

      const updateDuration = Date.now() - updateStartTime;
      console.log(`🎯 Price update completed in ${updateDuration}ms. Updated ${updates.length}/${targets.length} providers.`);
      
      if (errors.length > 0) {
        console.warn(`⚠️ Encountered ${errors.length} errors:`, errors);
      }

      // Update service health status
      this.serviceStatus.isHealthy = updates.length > 0;
      this.serviceStatus.lastCheck = new Date().toISOString();
      
      return updates;
    } finally {
      this.isUpdating = false;
    }
  }

  static startAutoUpdate(intervalMinutes: number = 15): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    console.log(`⏰ Starting intelligent auto-update every ${intervalMinutes} minutes`);
    this.updateInterval = setInterval(async () => {
      try {
        await this.updateAllPrices();
      } catch (error) {
        console.error('❌ Auto-update failed:', error);
      }
    }, intervalMinutes * 60 * 1000);
  }

  static stopAutoUpdate(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      console.log('⏹️ Auto-update stopped');
    }
  }

  static getServiceStatus(): ServiceStatus {
    return { ...this.serviceStatus };
  }

  private static updateServiceMetrics(responseTime: number, hadError: boolean): void {
    if (hadError) {
      this.serviceStatus.errorCount++;
    }
    
    // Calculate rolling average response time
    this.serviceStatus.avgResponseTime = 
      (this.serviceStatus.avgResponseTime + responseTime) / 2;
  }

  private static getCategoryVolatility(category: string): number {
    const volatilityMap: Record<string, number> = {
      mobile: 0.05,     // 5% volatility
      electricity: 0.08, // 8% volatility
      insurance: 0.03,   // 3% volatility
      loans: 0.02,       // 2% volatility
    };
    return volatilityMap[category] || 0.05;
  }

  private static getBasePrice(providerId: string): number {
    const basePrices: Record<string, number> = {
      // Mobile providers
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
      
      // Insurance providers (monthly premiums)
      '31': 450, // If Forsikring
      '32': 420, // Tryg
      '33': 380, // Gjensidige
      '34': 390, // Frende
      
      // Electricity providers (øre/kWh)
      '35': 85,  // Hafslund
      '36': 82,  // Tibber
      '37': 88,  // Fortum
      '38': 79,  // Fjordkraft
    };
    return basePrices[providerId] || 300;
  }

  private static getScrapingTargets(category: string): ScrapingTarget[] {
    const targets: Record<string, ScrapingTarget[]> = {
      mobile: [
        {
          providerId: '21',
          name: 'Telenor',
          category: 'mobile',
          scrapeUrl: 'https://www.telenor.no/mobil/abonnement',
          priceSelector: '.price-display',
          priority: 'high',
        },
        {
          providerId: '22',
          name: 'Telia',
          category: 'mobile',
          scrapeUrl: 'https://www.telia.no/mobil/abonnement',
          priceSelector: '.subscription-price',
          priority: 'high',
        },
        {
          providerId: '23',
          name: 'Ice',
          category: 'mobile',
          scrapeUrl: 'https://www.ice.no/abonnement',
          priceSelector: '.plan-price',
          priority: 'medium',
        },
        {
          providerId: '24',
          name: 'OneCall',
          category: 'mobile',
          scrapeUrl: 'https://www.onecall.no/mobil',
          priceSelector: '.price-box',
          priority: 'medium',
        },
        {
          providerId: '25',
          name: 'Talkmore',
          category: 'mobile',
          scrapeUrl: 'https://www.talkmore.no/abonnement',
          priceSelector: '.price-element',
          priority: 'low',
        },
      ],
      insurance: [
        {
          providerId: '31',
          name: 'If Forsikring',
          category: 'insurance',
          scrapeUrl: 'https://www.if.no/privat/bilforsikring',
          priceSelector: '.insurance-price',
          priority: 'high',
        },
        {
          providerId: '32',
          name: 'Tryg',
          category: 'insurance',
          scrapeUrl: 'https://www.tryg.no/bilforsikring',
          priceSelector: '.premium-price',
          priority: 'high',
        },
      ],
      electricity: [
        {
          providerId: '35',
          name: 'Hafslund',
          category: 'electricity',
          scrapeUrl: 'https://www.hafslund.no/stromavtale',
          priceSelector: '.electricity-price',
          priority: 'high',
        },
        {
          providerId: '36',
          name: 'Tibber',
          category: 'electricity',
          scrapeUrl: 'https://tibber.com/no/stromavtale',
          priceSelector: '.price-kwh',
          priority: 'high',
        },
      ],
    };

    return targets[category] || [];
  }
}
