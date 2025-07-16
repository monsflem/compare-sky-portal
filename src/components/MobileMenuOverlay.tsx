
import React from 'react';
import { UserPlus, Home, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import ThemeToggler from './ThemeToggler';

interface Service {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onCategoryClick: (slug: string) => void;
  onAboutClick: (section: string) => void;
  onMeldPaClick: () => void;
  onHomeClick: () => void;
  mobileAboutOpen: boolean;
  setMobileAboutOpen: (open: boolean) => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isOpen,
  onClose,
  services,
  onCategoryClick,
  onAboutClick,
  onMeldPaClick,
  onHomeClick,
  mobileAboutOpen,
  setMobileAboutOpen,
}) => {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  const handleCategoryClick = (slug: string) => {
    onCategoryClick(slug);
    onClose();
  };

  const handleAboutClick = (section: string) => {
    onAboutClick(section);
    onClose();
  };

  const handleMeldPaClick = () => {
    onMeldPaClick();
    onClose();
  };

  const handleHomeClick = () => {
    onHomeClick();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="xl:hidden fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" 
      onClick={handleBackdropClick}
    >
      <div 
        className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-md shadow-2xl border-b border-border h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <ScrollArea className="h-full">
          <div className="flex flex-col min-h-full">
            {/* Close button */}
            <div className="flex justify-end p-4 pt-6">
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-accent rounded-full text-card-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 py-6">
              {/* Services Section */}
              <div className="px-6 py-2">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 px-2">{t('nav.services')}</h3>
                <div className="space-y-2">
                  {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <button
                        key={service.slug}
                        onClick={() => handleCategoryClick(service.slug)}
                        className="flex items-center space-x-4 w-full px-4 py-4 text-base font-medium text-muted-foreground hover:bg-accent/80 hover:text-primary transition-colors rounded-lg border border-transparent hover:border-primary/20 backdrop-blur-sm"
                      >
                        <IconComponent className="w-6 h-6 flex-shrink-0" />
                        <span className="text-left">{service.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border/50 my-6 mx-6"></div>

              {/* About Section */}
              <div className="px-6 py-2">
                <Collapsible open={mobileAboutOpen} onOpenChange={setMobileAboutOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-4 text-base font-semibold text-card-foreground hover:bg-accent/80 hover:text-primary transition-colors rounded-lg border border-transparent hover:border-primary/20 backdrop-blur-sm">
                    {t('nav.about')}
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden">
                    <div className="space-y-2 mt-3">
                      <button 
                        onClick={() => handleAboutClick('om-prispilot')} 
                        className="block w-full text-left px-8 py-3 text-base text-muted-foreground hover:bg-accent/80 hover:text-primary transition-colors rounded-lg backdrop-blur-sm"
                      >
                        {t('nav.aboutPrisPilot')}
                      </button>
                      <button 
                        onClick={() => handleAboutClick('hvordan-det-fungerer')} 
                        className="block w-full text-left px-8 py-3 text-base text-muted-foreground hover:bg-accent/80 hover:text-primary transition-colors rounded-lg backdrop-blur-sm"
                      >
                        {t('nav.howItWorks')}
                      </button>
                      <button 
                        onClick={() => handleAboutClick('kontakt-oss')} 
                        className="block w-full text-left px-8 py-3 text-base text-muted-foreground hover:bg-accent/80 hover:text-primary transition-colors rounded-lg backdrop-blur-sm"
                      >
                        {t('nav.contact')}
                      </button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Blog Button */}
              <div className="px-6 py-2">
                <button 
                  onClick={() => handleAboutClick('blogg')} 
                  className="flex items-center w-full px-4 py-4 text-base font-semibold text-card-foreground hover:bg-accent/80 hover:text-primary transition-colors rounded-lg border border-transparent hover:border-primary/20 backdrop-blur-sm"
                >
                  {t('nav.blog')}
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-border/50 my-6 mx-6"></div>

              {/* Utilities Section */}
              <div className="px-6 py-2">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 px-2">{t('nav.settings')}</h3>
                <div className="space-y-3">
                  {/* Language Selector */}
                  <div className="flex items-center justify-between px-4 py-4 text-base font-medium text-card-foreground bg-accent/20 rounded-lg border border-border/30">
                    <span className="font-semibold">{t('nav.language')}</span>
                    <div className="flex-shrink-0">
                      <LanguageSelector isMobile={false} />
                    </div>
                  </div>

                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between px-4 py-4 text-base font-medium text-card-foreground bg-accent/20 rounded-lg border border-border/30">
                    <span className="font-semibold">{t('nav.theme')}</span>
                    <div className="flex-shrink-0">
                      <ThemeToggler showText={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons at Bottom */}
            <div className="px-6 py-6 border-t border-border bg-accent/80 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleHomeClick}
                  className="flex items-center justify-center gap-2 h-12 px-4 bg-card text-card-foreground border border-border hover:bg-accent hover:text-primary hover:border-primary transition-all duration-300 rounded-lg font-medium"
                >
                  <Home className="w-5 h-5" />
                  <span>{t('nav.home')}</span>
                </button>
                <button
                  onClick={handleMeldPaClick}
                  className="flex items-center justify-center gap-2 h-12 px-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-lg font-medium"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>{t('cta.signUp')}</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
