
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import PowerOfferCard from './PowerOfferCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PowerOffer } from '@/utils/powerUtils';

interface PowerOffersListProps {
  offers: PowerOffer[];
  annualConsumption: number;
  onGetQuote: (offer: PowerOffer) => void;
  onProviderClick: (providerName: string) => void;
  loading: boolean;
  hasSearched: boolean;
  showFilteredResults: boolean;
  onShowAllOffers: () => void;
  totalOffersCount: number;
}

const PowerOffersList: React.FC<PowerOffersListProps> = ({
  offers,
  annualConsumption,
  onGetQuote,
  onProviderClick,
  loading,
  hasSearched,
  showFilteredResults,
  onShowAllOffers,
  totalOffersCount
}) => {
  if (loading) {
    return (
      <LoadingSpinner 
        message="Finner de beste strømavtalene for deg..." 
        size="lg"
        className="py-16"
      />
    );
  }

  if (!hasSearched) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-green-600" />
        {showFilteredResults ? 'Filtrerte tilbud' : 'Tilbud'}
      </h2>

      {offers.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600 text-lg">
            Ingen tilbud funnet for dine valgte kriterier.
            Prøv å endre søkekriteriene eller velg en annen kommune.
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <PowerOfferCard
                key={offer.id}
                offer={offer}
                annualConsumption={annualConsumption}
                onGetQuote={onGetQuote}
                onProviderClick={onProviderClick}
              />
            ))}
          </div>

          {!hasSearched && totalOffersCount > offers.length && (
            <div className="text-center mt-8">
              <Button 
                onClick={onShowAllOffers}
                variant="outline"
                className="px-8 py-3 text-lg"
              >
                Vis alle {totalOffersCount} tilbud
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PowerOffersList;
