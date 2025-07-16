import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, MapPin, Clock, Home, Mountain, Leaf, TrendingUp } from 'lucide-react';
import { PowerOffer, calculateMonthlyCost, getDisplayPrice, formatConsumption, getContractBadgeColor, categorizeOffer } from '@/utils/powerUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import ImageWithFallback from '@/components/ImageWithFallback';

interface PowerOfferCardProps {
  offer: PowerOffer;
  annualConsumption: number;
  onGetQuote: (offer: PowerOffer) => void;
  onProviderClick: (providerName: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'spot': return <TrendingUp className="w-4 h-4 text-blue-600" />;
    case 'fast': return <Zap className="w-4 h-4 text-green-600" />;
    case 'grønn': return <Leaf className="w-4 h-4 text-green-600" />;
    case 'bolig': return <Home className="w-4 h-4 text-purple-600" />;
    case 'hytte': return <Mountain className="w-4 h-4 text-amber-600" />;
    default: return <Clock className="w-4 h-4 text-gray-600" />;
  }
};

const PowerOfferCard: React.FC<PowerOfferCardProps> = ({
  offer,
  annualConsumption,
  onGetQuote,
  onProviderClick
}) => {
  const { t } = useLanguage();
  const monthlyCost = calculateMonthlyCost(offer, annualConsumption);
  const displayPrice = getDisplayPrice(offer);
  const category = categorizeOffer(offer);
  
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300 bg-card">
      <CardHeader className="pb-4">
        {/* Provider Logo and Name */}
        <div 
          className="flex items-center justify-center mb-4 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onProviderClick(offer.supplier_name)}
        >
          {offer.logo_url ? (
            <ImageWithFallback
              src={offer.logo_url}
              alt={offer.supplier_name}
            />
          ) : null}
          <span className={`font-bold text-lg text-center ${offer.logo_url ? 'hidden' : ''}`}>
            {offer.supplier_name}
          </span>
        </div>
        
        <CardTitle className="text-lg text-center font-semibold text-foreground">
          {offer.product_name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Price Display */}
        <div className="text-center border-b pb-4">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {monthlyCost} {t('offer.monthly')}
          </div>
          <div className="text-sm text-muted-foreground">
            {t('power.estimated')}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-muted-foreground flex items-center gap-1">
              <Zap className="w-4 h-4" />
              {t('offer.markup')}
            </span>
            <span className="font-semibold text-blue-600 text-base">
              {displayPrice.toFixed(1)} øre/kWh
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {t('offer.municipality')}
            </span>
            <span className="text-base font-semibold">
              {offer.municipality_name}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {t('offer.type')}
            </span>
            <Badge className={`text-sm ${getContractBadgeColor(category)}`}>
              <span className="flex items-center gap-1">
                {getCategoryIcon(category)}
                {offer.contract_length || category}
              </span>
            </Badge>
          </div>

          {offer.additional_fees && offer.additional_fees > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                {t('offer.additionalFees')}
              </span>
              <span className="text-sm font-semibold text-orange-600">
                {offer.additional_fees} kr
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={() => onGetQuote(offer)} 
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105"
          >
            {t('offer.switchNow')}
          </Button>
        </div>

        {/* Calculation Info */}
        <div className="bg-muted rounded-lg p-3 mt-4">
          <div className="text-xs text-muted-foreground text-center">
            {t('offer.calculatedFor')} {formatConsumption(annualConsumption)} {t('offer.annualConsumption')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerOfferCard;