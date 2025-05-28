
import React from 'react';
import Layout from '../components/Layout';
import CategoryCard from '../components/CategoryCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">{t.hero.title}</h1>
            <p className="text-xl text-slate-200 mb-8">{t.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">{t.categories.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.categories.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              title={t.categories.insurance.title}
              description={t.categories.insurance.description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              }
              link="/categories/insurance"
              providers={['NAF', 'Tryg', 'Gjensidige']}
            />
            
            <CategoryCard 
              title={t.categories.electricity.title}
              description={t.categories.electricity.description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 16v.8c0 1.12-.912 2.116-2.023 2.2H8.023C6.912 19 6 17.919 6 16.8V16"></path>
                  <path d="M12 4v10"></path>
                  <path d="M8 9l4 5 4-5"></path>
                </svg>
              }
              link="/categories/electricity"
              providers={['Tibber', 'Fortum', 'NorgesEnergi']}
            />
            
            <CategoryCard 
              title={t.categories.mobile.title}
              description={t.categories.mobile.description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12" y2="18"></line>
                </svg>
              }
              link="/categories/mobile"
              providers={['Telenor', 'Telia', 'ICE']}
            />
            
            <CategoryCard 
              title={t.categories.loans.title}
              description={t.categories.loans.description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              }
              link="/categories/loans"
              providers={['DNB', 'Nordea', 'Sbanken']}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">{t.howItWorks.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  <span className="font-bold text-lg">1</span>
                </div>
                <CardTitle className="text-center">{t.howItWorks.step1.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t.howItWorks.step1.description}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  <span className="font-bold text-lg">2</span>
                </div>
                <CardTitle className="text-center">{t.howItWorks.step2.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t.howItWorks.step2.description}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  <span className="font-bold text-lg">3</span>
                </div>
                <CardTitle className="text-center">{t.howItWorks.step3.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t.howItWorks.step3.description}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section bg-slate-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">{t.trust.title}</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">{t.trust.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.trust.trusted.title}</h3>
              <p className="text-slate-300">{t.trust.trusted.description}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 18a4 4 0 0 1-8 0"></path>
                  <path d="M8 18V6a4 4 0 0 1 8 0v12"></path>
                  <path d="M2 9h4"></path>
                  <path d="M2 15h4"></path>
                  <path d="M18 9h4"></path>
                  <path d="M18 15h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.trust.unbiased.title}</h3>
              <p className="text-slate-300">{t.trust.unbiased.description}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <circle cx="12" cy="5" r="2"></circle>
                  <path d="M12 7v4"></path>
                  <line x1="8" y1="16" x2="16" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.trust.free.title}</h3>
              <p className="text-slate-300">{t.trust.free.description}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
