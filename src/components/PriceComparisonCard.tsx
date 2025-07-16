
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, House, Car, CreditCard, ArrowRightLeft } from 'lucide-react';

interface BaseOffer {
  id: string | number;
  provider?: string;
  operator?: string;
  supplier_name?: string;
  logo_url?: string;
  url?: string;
}

interface MobileOffer extends BaseOffer {
  type: 'mobile';
  product_name: string;
  price_nok: number;
  data_included_mb: number;
  data_gb?: number;
  minutes_included: number;
  sms_included: number;
  is_unlimited_talk?: boolean;
  is_unlimited_sms?: boolean;
}

interface PowerOffer extends BaseOffer {
  type: 'power';
  product_name: string;
  price: number;
  price_unit: string;
  contract_length: string;
  municipality_name: string;
  additional_fees?: number;
  total_price?: number;
}

interface InternetOffer extends BaseOffer {
  type: 'internet';
  plan: string;
  price: number;
  speed: number;
}

interface InsuranceOffer extends BaseOffer {
  type: 'insurance';
  product_name: string;
  insurance_type: string;
  monthly_premium: number;
  deductible?: number;
  coverage_amount?: number;
  features?: string[];
}

interface BankOffer extends BaseOffer {
  type: 'bank';
  loan_type: string;
  monthly_payment: string;
  effective_rate: string;
}

interface SecurityOffer extends BaseOffer {
  type: 'security';
  product_name: string;
  plan_type: string;
  monthly_price: number;
  setup_fee?: number;
  equipment_included?: string[];
  monitoring_24_7?: boolean;
  app_control?: boolean;
}

type Offer = MobileOffer | PowerOffer | InternetOffer | InsuranceOffer | BankOffer | SecurityOffer;

interface PriceComparisonCardProps {
  offer: Offer;
  onGetQuote?: (offer: Offer) => void;
  onProviderClick?: (providerName: string) => void;
}

const getProviderName = (offer: Offer): string => {
  const rawName = offer.provider || offer.operator || offer.supplier_name || 'Ukjent leverandør';
  
  // For bank loans, use aggressive shortening
  if (offer.type === 'bank') {
    let cleanName = rawName;
    
    // Handle specific well-known banks first
    if (cleanName.toLowerCase().includes('nordea')) return 'Nordea';
    if (cleanName.toLowerCase().includes('dnb')) return 'DNB';
    if (cleanName.toLowerCase().includes('sparebank 1')) return 'SpareBank 1';
    if (cleanName.toLowerCase().includes('storebrand bank')) return 'Storebrand';
    if (cleanName.toLowerCase().includes('kredittbanken')) return 'Kredittbanken';
    if (cleanName.toLowerCase().includes('bank norwegian')) return 'Bank Norwegian';
    if (cleanName.toLowerCase().includes('lea bank')) return 'Lea Bank';
    if (cleanName.toLowerCase().includes('komplett bank')) return 'Komplett Bank';
    if (cleanName.toLowerCase().includes('santander')) return 'Santander';
    if (cleanName.toLowerCase().includes('monobank')) return 'Monobank';
    
    // Generic aggressive cleaning for other banks
    cleanName = cleanName
      .split(',')[0] // Everything before first comma
      .split(' - ')[0] // Everything before first " - "
      .split('(')[0] // Everything before first parenthesis
      .split('/')[0] // Everything before first slash
      .trim();
    
    // Remove all corporate suffixes aggressively
    cleanName = cleanName
      .replace(/\s*AB\s*\(publ\).*$/gi, '')
      .replace(/\s*\(publ\).*$/gi, '')
      .replace(/\s*AB\s*NUF$/gi, '')
      .replace(/\s*NUF$/gi, '')
      .replace(/\s*ASA$/gi, '')
      .replace(/\s*AB$/gi, '')
      .replace(/\s*ABP$/gi, '')
      .replace(/,?\s*FILIAL\s*I\s*NORGE$/gi, '')
      .replace(/,?\s*Norway\s*Branch$/gi, '')
      .replace(/\s*en\s*filial\s*av.*$/gi, '')
      .replace(/\s*del\s*av.*$/gi, '')
      .trim();
    
    // If still too long, take first word only (max 12 characters)
    if (cleanName.length > 12) {
      cleanName = cleanName.split(' ')[0];
    }
    
    return cleanName;
  }
  
  // For other offer types, use original logic
  let cleanName = rawName;
  
  cleanName = cleanName
    .split(',')[0]
    .split(' - ')[0]
    .split('(')[0]
    .trim();
  
  cleanName = cleanName
    .replace(/\s*AB\s*\(publ\).*$/gi, '')
    .replace(/\s*\(publ\).*$/gi, '')
    .replace(/\s*AB\s*NUF$/gi, '')
    .replace(/\s*NUF$/gi, '')
    .replace(/\s*ASA$/gi, '')
    .replace(/\s*AB$/gi, '')
    .replace(/\s*ABP$/gi, '')
    .replace(/,?\s*FILIAL\s*I\s*NORGE$/gi, '')
    .replace(/,?\s*Norway\s*Branch$/gi, '')
    .trim();
  
  return cleanName;
};

const formatPrice = (price: number | string, unit?: string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (unit) {
    return `${numPrice.toFixed(2)} ${unit}`;
  }
  return `${numPrice.toFixed(0)} kr`;
};

const PriceComparisonCard: React.FC<PriceComparisonCardProps> = ({ offer, onGetQuote, onProviderClick }) => {
  const providerName = getProviderName(offer);

  const handleProviderClick = () => {
    console.log('Card provider click:', providerName);
    if (onProviderClick) {
      onProviderClick(providerName);
    }
  };

  const renderOfferDetails = () => {
    switch (offer.type) {
      case 'mobile':
        const dataDisplay = offer.data_included_mb === -1 ? 'Ubegrenset' : 
                           offer.data_gb ? `${offer.data_gb} GB` : `${offer.data_included_mb} MB`;
        
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-2xl text-blue-600">{formatPrice(offer.price_nok)}/mnd</span>
              <Badge variant="secondary" className="text-lg px-3 py-1 bg-blue-100 text-blue-800">
                {dataDisplay}
              </Badge>
            </div>
            <div className="bg-accent p-3 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Samtaler:</span>
                <span className="text-sm font-semibold text-card-foreground">
                  {offer.is_unlimited_talk ? 'Ubegrenset' : `${offer.minutes_included} min`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">SMS:</span>
                <span className="text-sm font-semibold text-card-foreground">
                  {offer.is_unlimited_sms ? 'Ubegrenset' : `${offer.sms_included} stk`}
                </span>
              </div>
            </div>
          </div>
        );
      
      case 'power':
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-2xl text-green-600">{formatPrice(offer.price, offer.price_unit)}</span>
              <Badge variant="secondary" className="text-lg px-3 py-1 bg-green-100 text-green-800">
                {offer.contract_length}
              </Badge>
            </div>
            <div className="bg-accent p-3 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Kommune:</span>
                <span className="text-sm font-semibold text-card-foreground">{offer.municipality_name}</span>
              </div>
              {offer.additional_fees && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Tilleggsavgifter:</span>
                  <span className="text-sm font-semibold text-card-foreground">{formatPrice(offer.additional_fees)}</span>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'internet':
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-2xl text-purple-600">{formatPrice(offer.price)}/mnd</span>
              <Badge variant="secondary" className="text-lg px-3 py-1 bg-purple-100 text-purple-800">
                {offer.speed} Mbps
              </Badge>
            </div>
            <div className="bg-accent p-3 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">Plan:</span>
                <span className="text-sm font-semibold text-card-foreground">{offer.plan}</span>
              </div>
            </div>
          </div>
        );
      
      case 'insurance':
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-2xl text-orange-600">{formatPrice(offer.monthly_premium)}/mnd</span>
              <Badge variant="secondary" className="text-lg px-3 py-1 bg-orange-100 text-orange-800">
                {offer.insurance_type}
              </Badge>
            </div>
            <div className="bg-accent p-3 rounded-lg space-y-2">
              {offer.deductible && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Egenandel:</span>
                  <span className="text-sm font-semibold text-card-foreground">{formatPrice(offer.deductible)}</span>
                </div>
              )}
              {offer.coverage_amount && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Dekning:</span>
                  <span className="text-sm font-semibold text-card-foreground">{formatPrice(offer.coverage_amount)}</span>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'bank':
        const effectiveRate = offer.effective_rate;
        let cleanRate = '0';
        let displayRate = '0%';
        
        if (effectiveRate) {
          cleanRate = effectiveRate.replace(/%/g, '');
          const rateNumber = parseFloat(cleanRate);
          if (!isNaN(rateNumber)) {
            displayRate = `${rateNumber}%`;
          }
        }

        const getLoanIcon = () => {
          switch (offer.loan_type) {
            case 'Boliglån':
              return <House className="w-6 h-6 text-green-600" />;
            case 'Billån':
              return <Car className="w-6 h-6 text-blue-600" />;
            case 'Forbrukslån':
              return <CreditCard className="w-6 h-6 text-green-600" />;
            case 'Refinansieringslån':
              return <ArrowRightLeft className="w-6 h-6 text-blue-600" />;
            default:
              return <CreditCard className="w-6 h-6 text-green-600" />;
          }
        };
        
        return (
          <div className="space-y-4">
            {/* Top section: SVG icon left, loan type right - left-to-right flow */}
            <div className="flex items-center justify-start gap-3">
              {getLoanIcon()}
              <span className="text-sm font-semibold text-gray-700">{offer.loan_type || 'Lån'}</span>
            </div>

            {/* Logo and provider name - centered with logo above name */}
            <div 
              className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform py-3 bg-accent rounded-lg border border-border"
              onClick={handleProviderClick}
            >
              {offer.logo_url ? (
                <img 
                  src={offer.logo_url} 
                  alt={providerName}
                  className="h-20 w-auto max-w-48 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : null}
              <span className="text-base font-semibold text-card-foreground text-center">{providerName}</span>
            </div>

            {/* Main rate display - prominent green/blue styling */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-1">{displayRate}</div>
              <div className="text-sm text-green-700 font-medium">effektiv rente</div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-2xl text-indigo-600">{formatPrice(offer.monthly_price)}/mnd</span>
              <Badge variant="secondary" className="text-lg px-3 py-1 bg-indigo-100 text-indigo-800">
                {offer.plan_type}
              </Badge>
            </div>
            <div className="bg-accent p-3 rounded-lg space-y-2">
              {offer.setup_fee && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Oppstartskostnad:</span>
                  <span className="text-sm font-semibold text-card-foreground">{formatPrice(offer.setup_fee)}</span>
                </div>
              )}
              {offer.monitoring_24_7 && (
                <div className="flex items-center">
                  <span className="text-sm font-medium text-green-600">✓ 24/7 overvåking</span>
                </div>
              )}
              {offer.app_control && (
                <div className="flex items-center">
                  <span className="text-sm font-medium text-green-600">✓ App-styring</span>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 flex flex-col bg-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center justify-center mb-4">
          <div 
            className="cursor-pointer hover:scale-110 transition-transform flex flex-col items-center justify-center p-2 rounded-lg bg-white hover:bg-white/90 border border-gray-200 shadow-sm"
            onClick={handleProviderClick}
          >
            {offer.logo_url ? (
              <img 
                src={offer.logo_url} 
                alt={providerName}
                className="h-20 w-auto max-w-48 object-contain mb-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className="text-center">
              <span className={`font-bold text-xl text-card-foreground ${offer.logo_url ? '' : 'hidden'}`}>
                {providerName}
              </span>
              <span className={`font-bold text-xl text-center text-card-foreground ${offer.logo_url ? 'hidden' : ''}`}>
                {providerName}
              </span>
            </div>
          </div>
        </div>
        <CardTitle className="text-lg text-center font-semibold text-card-foreground">
          {'product_name' in offer ? offer.product_name : 
           'plan' in offer ? offer.plan : 
           'loan_type' in offer ? (
             offer.loan_type.toLowerCase().includes('refinansiering') 
               ? 'Refinansiering' 
               : 'Forbrukslån'
           ) : 'Tilbud'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        {renderOfferDetails()}
        
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={() => onGetQuote?.(offer)} 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
          >
            Få tilbud
          </Button>
          {offer.url && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.open(offer.url, '_blank')}
              className="hover:bg-accent border-border"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceComparisonCard;
