
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import QuoteForm from '@/components/QuoteForm';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ProviderCarousel from '@/components/ProviderCarousel';
import { 
  ElectricityIcon, 
  MobileIcon, 
  InsuranceIcon, 
  InternetIcon, 
  BankIcon, 
  SecurityIcon,
  TvIcon,
  HandverkerIcon,
  RenholdIcon,
  FormIcon,
  OfferIcon,
  PiggyBankIcon
} from '@/components/CategoryIcons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    {
      title: t('categories.strom.title'),
      slug: 'strom',
      description: t('categories.strom.description'),
      icon: <ElectricityIcon className="w-12 h-12 text-category-yellow dark:text-category-yellow-dark mb-4 mx-auto" />,
      color: 'bg-category-yellow-bg dark:bg-category-yellow-bg-dark border-category-yellow-border dark:border-category-yellow-border-dark'
    },
    {
      title: t('categories.mobil.title'),
      slug: 'mobil',
      description: t('categories.mobil.description'),
      icon: <MobileIcon className="w-12 h-12 text-category-blue dark:text-category-blue-dark mb-4 mx-auto" />,
      color: 'bg-category-blue-bg dark:bg-category-blue-bg-dark border-category-blue-border dark:border-category-blue-border-dark'
    },
    {
      title: t('categories.forsikring.title'),
      slug: 'forsikring',
      description: t('categories.forsikring.description'),
      icon: <InsuranceIcon className="w-12 h-12 text-category-green dark:text-category-green-dark mb-4 mx-auto" />,
      color: 'bg-category-green-bg dark:bg-category-green-bg-dark border-category-green-border dark:border-category-green-border-dark'
    },
    {
      title: t('categories.internett.title'),
      slug: 'internett',
      description: t('categories.internett.description'),
      icon: <InternetIcon className="w-12 h-12 text-category-purple dark:text-category-purple-dark mb-4 mx-auto" />,
      color: 'bg-category-purple-bg dark:bg-category-purple-bg-dark border-category-purple-border dark:border-category-purple-border-dark'
    },
    {
      title: t('categories.lan.title'),
      slug: 'lan',
      description: t('categories.lan.description'),
      icon: <BankIcon className="w-12 h-12 text-category-indigo dark:text-category-indigo-dark mb-4 mx-auto" />,
      color: 'bg-category-indigo-bg dark:bg-category-indigo-bg-dark border-category-indigo-border dark:border-category-indigo-border-dark'
    },
    {
      title: t('categories.boligalarm.title'),
      slug: 'boligalarm',
      description: t('categories.boligalarm.description'),
      icon: <SecurityIcon className="w-12 h-12 text-category-red dark:text-category-red-dark mb-4 mx-auto" />,
      color: 'bg-category-red-bg dark:bg-category-red-bg-dark border-category-red-border dark:border-category-red-border-dark'
    },
    {
      title: t('categories.tvPakker.title'),
      slug: 'tv-pakker',
      description: t('categories.tvPakker.description'),
      icon: <TvIcon className="w-12 h-12 text-category-orange dark:text-category-orange-dark mb-4 mx-auto" />,
      color: 'bg-category-orange-bg dark:bg-category-orange-bg-dark border-category-orange-border dark:border-category-orange-border-dark'
    },
    {
      title: t('categories.handverkere.title'),
      slug: 'handverkere',
      description: t('categories.handverkere.description'),
      icon: <HandverkerIcon className="w-12 h-12 text-category-amber dark:text-category-amber-dark mb-4 mx-auto" />,
      color: 'bg-category-amber-bg dark:bg-category-amber-bg-dark border-category-amber-border dark:border-category-amber-border-dark'
    },
    {
      title: t('categories.renhold.title'),
      slug: 'renhold',
      description: t('categories.renhold.description'),
      icon: <RenholdIcon className="w-12 h-12 text-category-cyan dark:text-category-cyan-dark mb-4 mx-auto" />,
      color: 'bg-category-cyan-bg dark:bg-category-cyan-bg-dark border-category-cyan-border dark:border-category-cyan-border-dark'
    }
  ];

  const handleCategoryClick = (slug: string) => {
    if (['strom', 'mobil', 'internett', 'forsikring', 'lan', 'boligalarm', 'tv-pakker','renhold','handverkere' ].includes(slug)) {
      navigate(`/${slug}`);
    } else {
      setShowQuoteForm(true);
    }
  };

  const handleProviderClick = (provider: any) => {
    // Navigate to the provider's category page
    if (provider.kategori) {
      navigate(`/${provider.kategori}`);
    }
  };

  const handleMeldPaClick = () => {
    setShowQuoteForm(true);
  };

  const handleGetStarted = () => {
    setShowQuoteForm(true);
  };

  return (
    <div className="min-h-screen">
      <Header onMeldPaClick={handleMeldPaClick} />
      
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        
        {/* Provider Carousel Section */}
        <section className="py-12 px-4 bg-background/80">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t('index.partners.title')}</h2>
              <p className="text-muted-foreground">{t('index.partners.subtitle')}</p>
            </div>
            
            <ProviderCarousel onProviderClick={handleProviderClick} />
          </div>
        </section>
        
        {/* Alle tjenester section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('index.services.title')}</h2>
              <p className="text-xl text-muted-foreground">{t('index.services.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.slug} className={`${category.color} rounded-xl border-2 p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105`}>
                  {category.icon}
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button 
                    onClick={() => handleCategoryClick(category.slug)}
                    variant="default"
                    className="w-full transition-all duration-300"
                  >
                    {t('index.services.viewPrices')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('howItWorks.title')}</h2>
              <p className="text-xl text-muted-foreground">{t('howItWorks.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <FormIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t('howItWorks.step1.title')}</h3>
                <p className="text-muted-foreground">{t('howItWorks.step1.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <OfferIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t('howItWorks.step2.title')}</h3>
                <p className="text-muted-foreground">{t('howItWorks.step2.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiggyBankIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t('howItWorks.step3.title')}</h3>
                <p className="text-muted-foreground">{t('howItWorks.step3.description')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showQuoteForm && (
        <QuoteForm 
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)} 
        />
      )}
    </div>
  );
};

export default Index;
