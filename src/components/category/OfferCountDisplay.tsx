
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface OfferCountDisplayProps {
  filteredOffersCount: number;
  totalOffersCount: number;
}

const OfferCountDisplay = ({ filteredOffersCount, totalOffersCount }: OfferCountDisplayProps) => {
  const { t } = useLanguage();
  if (totalOffersCount === 0) return null;

  return (
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent to-accent/50 border border-border rounded-lg px-4 py-2">
      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
        {filteredOffersCount}
      </div>
      <div>
        <p className="text-foreground font-medium text-sm">
          {filteredOffersCount} {t('filters.offersFound')}
        </p>
        {filteredOffersCount !== totalOffersCount && (
          <p className="text-muted-foreground text-xs">
            av totalt {totalOffersCount} tilgjengelige
          </p>
        )}
      </div>
    </div>
  );
};

export default OfferCountDisplay;
