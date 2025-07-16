
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto bg-card shadow-2xl border-t-4 border-primary">
        <div className="p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-4 mb-4">
            <Cookie className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-card-foreground mb-2">
                {t('cookie.title')}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('cookie.content')}
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <Link 
                  to="/personvern" 
                  className="text-primary hover:text-primary/80 underline"
                >
                  {t('cookie.privacyPolicy')}
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link 
                  to="/vilkår" 
                  className="text-primary hover:text-primary/80 underline"
                >
                  {t('cookie.termsOfUse')}
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="border-border text-muted-foreground hover:bg-accent"
            >
              {t('cookie.decline')}
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t('cookie.accept')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;
