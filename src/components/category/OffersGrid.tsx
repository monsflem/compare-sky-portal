
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { House, Car, CreditCard, ArrowRightLeft } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import ImageWithFallback from '@/components/ImageWithFallback';

interface Offer {
  id: string | number;
  provider?: string;
  supplier_name?: string;
  operator?: string;
  product_name?: string;
  plan?: string;
  package_name?: string;
  monthly_rate?: number;
  price?: number;
  monthly_price?: number;
  monthly_premium?: number;
  monthly_payment?: string;
  price_nok?: number;
  effective_rate?: string;
  logo_url?: string;
  url?: string;
  data_gb?: number;
  data_included_mb?: number;
  speed?: number;
  channels_count?: number;
  contract_length?: string;
  insurance_type?: string;
  loan_type?: string;
  plan_type?: string;
  type?: string;
  coverage_amount?: number;
  deductible?: number;
  features?: string[];
}

interface OffersGridProps {
  offers: Offer[];
  onGetQuote: (offer: Offer) => void;
  onProviderClick: (providerName: string) => void;
  loading?: boolean;
  category?: string;
}

const OffersGrid: React.FC<OffersGridProps> = ({ offers, onGetQuote, onProviderClick, loading = false, category }) => {
  const { t } = useLanguage();
  // Get icon for loan type
  const getLoanTypeIcon = (loanType: string) => {
    switch (loanType) {
      case 'Boliglån':
        return <House className="w-6 h-6 text-white" />;
      case 'Billån':
        return <Car className="w-6 h-6 text-white" />;
      case 'Forbrukslån':
        return <CreditCard className="w-6 h-6 text-white" />;
      case 'Refinansieringslån':
        return <ArrowRightLeft className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  // Get gradient for loan type
  const getLoanTypeGradient = (loanType: string) => {
    switch (loanType) {
      case 'Boliglån':
        return 'from-green-500 to-teal-600';
      case 'Billån':
        return 'from-orange-500 to-red-600';
      case 'Forbrukslån':
        return 'from-purple-500 to-pink-600';
      case 'Refinansieringslån':
        return 'from-indigo-500 to-blue-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  const getProviderName = (offer: Offer) => {
    const rawName = offer.provider || offer.supplier_name || offer.operator || 'Leverandør';
    
    // For loans, use aggressive shortening
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
    
    // For other categories, use the original cleaning logic
    let cleanName = rawName;
    
    // Remove everything after comma, hyphen with space, or parenthesis
    cleanName = cleanName
      .split(',')[0] // Everything before first comma
      .split(' - ')[0] // Everything before first " - "
      .split('(')[0] // Everything before first parenthesis
      .trim();
    
    // Remove specific trailing suffixes
    cleanName = cleanName
      .replace(/\s*AB\s*\(publ\).*$/gi, '') // Remove "AB (publ)" and everything after
      .replace(/\s*\(publ\).*$/gi, '') // Remove "(publ)" and everything after
      .replace(/\s*AB\s*NUF$/gi, '') // Remove "AB NUF"
      .replace(/\s*NUF$/gi, '') // Remove "NUF"
      .replace(/\s*ASA$/gi, '') // Remove "ASA"
      .replace(/\s*AB$/gi, '') // Remove "AB"
      .replace(/\s*ABP$/gi, '') // Remove "ABP"
      .replace(/,?\s*FILIAL\s*I\s*NORGE$/gi, '') // Remove "FILIAL I NORGE"
      .replace(/,?\s*Norway\s*Branch$/gi, '') // Remove "Norway Branch"
      .trim();
    
    return cleanName;
  };

  const getProductName = (offer: Offer) => {
    const rawProduct = offer.product_name || offer.plan || offer.package_name || offer.loan_type || 'Produkt';
    // Return the exact loan type from database without auto-categorizing
    if (offer.loan_type) {
      return offer.loan_type;
    }
    return rawProduct;
  };

  const getPrice = (offer: Offer) => {
    // For bank loans - show only effective rate
    if (offer.type === 'bank' && offer.effective_rate) {
      return offer.effective_rate;
    }
    return offer.monthly_rate || offer.price || offer.monthly_price || offer.monthly_premium || offer.price_nok || 0;
  };

  const getPriceUnit = (offer: Offer) => {
    if (offer.type === 'power') return 'øre/kWh';
    if (offer.type === 'bank') return '';
    return 'kr/mnd';
  };

  const formatPrice = (price: number | string, unit: string, offer?: Offer) => {
    if (typeof price === 'string') {
      // For bank offers, show "[prosent]% rente på lånet"
      if (unit === '' && offer?.type === 'bank') {
        const cleanRate = price.replace(/%/g, '');
        return `${cleanRate}% rente på lånet`;
      }
      // For bank offers, ensure % is shown
      if (unit === '') {
        return price.includes('%') ? price : `${price}%`;
      }
      return price;
    }
    if (price === 0) return t('offer.contactForPrice');
    return `${price} ${unit}`;
  };

  const formatDataAmount = (offer: Offer) => {
    // Handle mobile data display - both 0 and -1 mean unlimited
    if (offer.data_gb !== undefined) {
      if (offer.data_gb === 0 || offer.data_gb === -1) {
        return t('offer.unlimited');
      }
      return `${offer.data_gb} GB`;
    }
    
    if (offer.data_included_mb !== undefined) {
      if (offer.data_included_mb === 0 || offer.data_included_mb === -1) {
        return t('offer.unlimited');
      }
      return `${(offer.data_included_mb / 1000).toFixed(1)} GB`;
    }
    
    return null;
  };

  const renderAdditionalInfo = (offer: Offer) => {
    // For bank loans, show minimal additional info
    if (offer.type === 'bank') {
      return (
        <div className="space-y-2">
          {/* Show additional provider-specific info */}
          {offer.provider && offer.provider !== getProviderName(offer) && (
            <div className="text-center">
              <span className="text-xs text-muted-foreground italic">
                {offer.provider.includes('%') ? 'Spesialtilbud' : 
                 offer.provider.includes('Grønt') ? 'Miljøvennlig' : 
                 offer.provider.includes('Kred') ? 'Kredittvurdering' : ''}
              </span>
            </div>
          )}
        </div>
      );
    }

    switch (offer.type) {
      case 'mobile':
        const dataAmount = formatDataAmount(offer);
        return (
          <div className="space-y-2">
            {dataAmount && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('offer.data')}</span>
                <span className="text-sm font-semibold text-foreground">{dataAmount}</span>
              </div>
            )}
          </div>
        );
      
      case 'internet':
        return (
          <div className="space-y-2">
            {offer.speed && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('offer.speed')}</span>
                <span className="text-sm font-semibold text-foreground">{offer.speed} Mbps</span>
              </div>
            )}
          </div>
        );
      
      case 'tv':
        return (
          <div className="space-y-2">
            {offer.channels_count && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('offer.channels')}</span>
                <span className="text-sm font-semibold text-foreground">{offer.channels_count}</span>
              </div>
            )}
          </div>
        );
      
      case 'insurance':
        return (
          <div className="space-y-2">
            {offer.coverage_amount && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('offer.coverage')}</span>
                <span className="text-sm font-semibold text-foreground">{offer.coverage_amount.toLocaleString()} kr</span>
              </div>
            )}
            {offer.deductible !== undefined && offer.deductible > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('offer.deductible')}</span>
                <span className="text-sm font-semibold text-foreground">{offer.deductible.toLocaleString()} kr</span>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner message={t('offer.loadingOffers')} size="lg" className="py-16" />;
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{t('offer.noOffersFound')}</p>
      </div>
    );
  }

  // Special styling for loan cards (larger and more prominent)
  const isLoanCategory = category === 'lan';
  const gridCols = isLoanCategory ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {offers.map((offer) => (
        <Card 
          key={offer.id} 
          className={`
            hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary bg-card transform hover:scale-105 h-full flex flex-col
            ${isLoanCategory ? 'min-h-[400px]' : 'min-h-[350px]'}
          `}
        >
          <CardHeader className={`pb-4 ${isLoanCategory ? 'pb-6' : ''}`}>
            {/* Special layout for bank loans */}
            {offer.type === 'bank' ? (
              <div className="space-y-4">
                {/* Top section: SVG icon left, loan type right - left-to-right flow */}
                <div className="flex items-center justify-start gap-3">
                  {offer.loan_type === 'Boliglån' && <House className="w-6 h-6 text-green-600" />}
                  {offer.loan_type === 'Billån' && <Car className="w-6 h-6 text-blue-600" />}
                  {offer.loan_type === 'Forbrukslån' && <CreditCard className="w-6 h-6 text-green-600" />}
                  {offer.loan_type === 'Refinansieringslån' && <ArrowRightLeft className="w-6 h-6 text-blue-600" />}
                  {!offer.loan_type && <CreditCard className="w-6 h-6 text-green-600" />}
                  <span className="text-sm font-semibold text-muted-foreground">{offer.loan_type || 'Lån'}</span>
                </div>

                {/* Logo and provider name - centered with logo above name */}
                <div 
                  className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform py-3 bg-accent rounded-lg border border-border"
                  onClick={() => onProviderClick(getProviderName(offer))}
                >
                  {offer.logo_url ? (
                    <ImageWithFallback
                      src={offer.logo_url}
                      alt={getProviderName(offer)}
                    />
                  ) : null}
                  <span className="text-base font-semibold text-foreground text-center">{getProviderName(offer)}</span>
                </div>
              </div>
            ) : (
              /* Original layout for non-bank offers */
              <div>
                <div 
                  className="flex flex-col items-center justify-center mb-4 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onProviderClick(getProviderName(offer))}
                >
                  {offer.logo_url ? (
                    <ImageWithFallback
                      src={offer.logo_url}
                      alt={getProviderName(offer)}
                      className="mb-2"
                    />
                  ) : null}
                  <div className="text-center">
                    <span className={`font-bold ${isLoanCategory ? 'text-xl' : 'text-lg'} ${offer.logo_url ? '' : 'hidden'}`}>
                      {getProviderName(offer)}
                    </span>
                    <span className={`font-bold ${isLoanCategory ? 'text-xl' : 'text-lg'} text-center ${offer.logo_url ? 'hidden' : ''}`}>
                      {getProviderName(offer)}
                    </span>
                  </div>
                </div>
                
                {/* Show loan type for bank loans with special styling */}
                <CardTitle className={`${isLoanCategory ? 'text-xl' : 'text-lg'} text-center font-semibold text-foreground flex items-center justify-center gap-3`}>
                  {offer.type === 'bank' && offer.loan_type && (
                    <div className={`bg-gradient-to-r ${getLoanTypeGradient(offer.loan_type)} p-2 rounded-lg shadow-md`}>
                      {getLoanTypeIcon(offer.loan_type)}
                    </div>
                  )}
                  {getProductName(offer)}
                </CardTitle>
              </div>
            )}
          </CardHeader>
          
          <CardContent className={`flex-1 flex flex-col justify-between space-y-4 ${isLoanCategory ? 'space-y-6' : ''}`}>
            {/* Price Display */}
            <div className={`text-center border-b pb-4 ${isLoanCategory ? 'pb-6' : ''}`}>
                {offer.type === 'bank' ? (
                  /* Special rate display for bank loans */
                  <div className="space-y-3">
                    {/* Main rate display - prominent green/blue styling */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
                      <div className="text-4xl font-bold text-green-600 mb-1">
                        {offer.effective_rate?.includes('%') ? offer.effective_rate : `${offer.effective_rate || '0'}%`}
                      </div>
                      <div className="text-sm text-green-700 font-medium">{t('offer.effectiveRate')}</div>
                    </div>
                  </div>
                ) : (
                /* Original price display for other offers */
                 <div>
                   <div className={`${isLoanCategory ? 'text-3xl' : 'text-2xl'} font-bold text-primary mb-1`}>
                     {formatPrice(getPrice(offer), getPriceUnit(offer), offer)}
                   </div>
                  
                  {/* Additional info for all offers */}
                  {renderAdditionalInfo(offer)}
                </div>
              )}
            </div>

            {/* Additional badges */}
            <div className="flex justify-center gap-2 flex-wrap">
              {/* Special badges for bank loans */}
              {offer.type === 'bank' && (
                <>
                  {offer.provider && offer.provider.includes('%') && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      Spesialtilbud
                    </Badge>
                  )}
                  {offer.provider && offer.provider.includes('Grønt') && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      Miljøvennlig
                    </Badge>
                  )}
                   {offer.provider && offer.provider.includes('Kredit') && (
                     <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                       Kredittvurdering
                     </Badge>
                   )}
                </>
              )}
              
              {/* Original badges for non-bank offers */}
              {offer.type !== 'bank' && (
                <>
                  {offer.contract_length && (
                    <Badge variant="secondary" className="text-xs">
                      {offer.contract_length}
                    </Badge>
                  )}
                  {offer.plan_type && (
                    <Badge variant="secondary" className="text-xs">
                      {offer.plan_type}
                    </Badge>
                  )}
                  {offer.features && offer.features.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {offer.features.length} funksjoner
                    </Badge>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-2 ${isLoanCategory ? 'pt-6' : 'pt-4'}`}>
              <Button 
                onClick={() => onGetQuote(offer)} 
                className={`
                  flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                  ${isLoanCategory ? 'py-3 text-lg' : 'py-2'}
                `}
              >
                {t('offer.getQuote')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OffersGrid;
