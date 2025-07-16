
import React, { useState, useEffect } from 'react';
import { Search, User, Phone, Building, UserCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileAnimation from '@/components/MobileAnimation';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [userType, setUserType] = useState<'privat' | 'bedrift'>('privat');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkIfDataExists();
  }, []);

  const checkIfDataExists = async () => {
    try {
      // Check if any of the main tables have data
      const checks = await Promise.allSettled([
        supabase.from('mobile_plans').select('id').limit(1),
        supabase.from('power_deals').select('id').limit(1),
        supabase.from('internet_plans').select('id').limit(1),
        supabase.from('insurance_plans').select('id').limit(1),
        supabase.from('bank_plans').select('id').limit(1),
        supabase.from('home_security_plans').select('id').limit(1),
        supabase.from('tv_packages').select('id').limit(1)
      ]);

      const hasAnyData = checks.some(result => {
        if (result.status === 'fulfilled' && result.value.data) {
          return result.value.data.length > 0;
        }
        return false;
      });

      setHasData(hasAnyData);
    } catch (error) {
      console.error('Error checking data:', error);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !phone) {
      toast({
        title: "Fyll ut alle felt",
        description: "Vennligst fyll ut navn og telefonnummer",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, just show success message since leads table doesn't exist yet
      toast({
        title: "Vi kontakter deg innen 24 timer helt gratis!",
        description: "Takk for registreringen. Du vil høre fra oss snart.",
      });

      // Reset form
      setFullName('');
      setPhone('');
      setUserType('privat');

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Noe gikk galt",
        description: "Kunne ikke sende inn skjemaet. Prøv igjen senere.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      try {
        // Search across all available tables
        const searches = await Promise.allSettled([
          supabase.from('mobile_plans').select('*').ilike('operator', `%${term}%`).limit(3),
          supabase.from('internet_plans').select('*').ilike('provider', `%${term}%`).limit(3),
          supabase.from('insurance_plans').select('*').ilike('provider', `%${term}%`).limit(3),
          supabase.from('bank_plans').select('*').ilike('provider', `%${term}%`).limit(3),
          supabase.from('home_security_plans').select('*').ilike('provider', `%${term}%`).limit(3),
          supabase.from('tv_packages').select('*').ilike('provider', `%${term}%`).limit(3)
        ]);

        const allResults: any[] = [];
        
        searches.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value.data) {
            const categoryMap = ['mobil', 'internett', 'forsikring', 'lan', 'boligalarm', 'tv-pakker'];
            result.value.data.forEach((item: any) => {
              allResults.push({
                ...item,
                kategori: categoryMap[index],
                navn: item.operator || item.provider || item.supplier_name || 'Ukjent'
              });
            });
          }
        });

        console.log('Search results:', allResults);
        setSearchResults(allResults);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
    } else {
      setShowResults(false);
    }
  };

  const handleProviderClick = (provider: any) => {
    if (provider.kategori) {
      navigate(`/${provider.kategori}`);
    }
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <section 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://cdn.dribbble.com/userupload/24036225/file/original-be157b83dd27c363d436c4aab861a5d3.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundColor: '#1e1b4b',
        backgroundAttachment: 'scroll'
      }}
    >
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center pt-24 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[200px_2fr_1fr] xl:grid-cols-[280px_2fr_1fr] gap-6 lg:gap-16 xl:gap-20 items-center">
          {/* Mobile Animation - First column on large screens */}
          <div className="hidden lg:flex justify-center items-center">
            <MobileAnimation />
          </div>
          {/* Left side - Hero text */}
          <div className="text-white space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-sm font-medium">{t('hero.trust.free')}</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-sm font-medium">{t('hero.trust.nobinding')}</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-sm font-medium">{t('hero.trust.secure')}</span>
              </div>
            </div>
            
            {/* Search field - only show if data exists */}
            {!loading && hasData && (
              <div className="relative mb-8">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500 z-10" />
                <Input
                  type="text"
                  placeholder={t('hero.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 py-3 text-lg bg-background/90 backdrop-blur-sm border-0 shadow-lg text-foreground placeholder:text-muted-foreground"
                />
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-sm rounded-lg shadow-xl border border-border z-50">
                    {searchResults.map((result, index) => (
                      <div 
                        key={`${result.kategori}-${result.id || index}`} 
                        className="p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0 flex items-center gap-3"
                        onClick={() => handleProviderClick(result)}
                      >
                        {result.logo_url && (
                          <img
                            src={result.logo_url}
                            alt={result.navn}
                            className="w-8 h-8 object-contain flex-shrink-0"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{result.navn}</div>
                          <div className="text-sm text-muted-foreground capitalize">{result.kategori}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side - Registration form */}
          <div className="bg-card/20 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-border/30">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{t('hero.form.title')}</h3>
              <p className="text-white/80 text-sm">
                {t('hero.form.subtitle')}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-base font-semibold text-white mb-4 block flex items-center">
                  <UserCheck className="mr-2 h-5 w-5" />
                  {t('hero.form.usertype')}
                </Label>
                <ToggleGroup 
                  type="single" 
                  value={userType} 
                  onValueChange={(value) => value && setUserType(value as 'privat' | 'bedrift')}
                  className="grid w-full grid-cols-2 bg-card/10 backdrop-blur-sm rounded-lg p-1 border border-border/20"
                >
                  <ToggleGroupItem 
                    value="privat" 
                    className="flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-md data-[state=off]:text-foreground hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">{t('hero.form.private')}</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="bedrift" 
                    className="flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-md data-[state=off]:text-foreground hover:bg-accent"
                  >
                    <Building className="h-4 w-4" />
                    <span className="font-medium">{t('hero.form.business')}</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div>
                <Label htmlFor="fullName" className="text-base font-semibold text-white flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {t('hero.form.name')}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('hero.form.name')}
                  required
                  className="mt-2 py-3 text-lg bg-background/90 backdrop-blur-sm border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold text-white flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('hero.form.phone')}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+47 123 45 678"
                  required
                  className="mt-2 py-3 text-lg bg-background/90 backdrop-blur-sm border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                variant="default"
                className="w-full py-4 text-lg font-semibold rounded-lg shadow-lg transform transition hover:scale-105"
              >
                {isSubmitting ? t('hero.form.submitting') : t('hero.form.submit')}
              </Button>

              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {t('hero.form.consent')}{' '}
                <Link to="/vilkår" className="text-primary hover:underline">{t('hero.form.terms')}</Link>
                {' '}og{' '}
                <Link to="/personvern" className="text-primary hover:underline">{t('hero.form.privacy')}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
