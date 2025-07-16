
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, Home, UserPlus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import ThemeToggler from './ThemeToggler';
import ServiceHoverCard from './ServiceHoverCard';
import { getServiceFilters } from '@/config/ServiceFiltersConfig';

interface Service {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DesktopNavigationProps {
  services: Service[];
  onCategoryClick: (slug: string) => void;
  onAboutClick: (section: string) => void;
  activeDropdown: string | null;
  onDropdownToggle: (dropdown: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onHomeClick: () => void;
  onMeldPaClick: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  services,
  onCategoryClick,
  onAboutClick,
  activeDropdown,
  onDropdownToggle,
  dropdownRef,
  onHomeClick,
  onMeldPaClick,
}) => {
  const { t } = useLanguage();
  const [displayMode, setDisplayMode] = useState<'full' | 'compact' | 'icons' | 'minimal'>('full');
  const containerRef = useRef<HTMLDivElement>(null);

  // Improved collision detection - calculate based on actual service name lengths
  const checkCollision = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const availableWidth = container.clientWidth;
    
    // Calculate more accurate space needed based on service name lengths
    const servicesCount = services.length;
    
    // Calculate average character width and longest service name
    const longestServiceName = services.reduce((longest, service) => 
      service.name.length > longest.length ? service.name : longest, ""
    );
    
    // More realistic calculation: icon (20px) + gap (8px) + text (4px per char) + padding (24px) + margins
    const avgCharWidth = 4; // More realistic width per character in text-xs
    const longestTextWidth = longestServiceName.length * avgCharWidth;
    const serviceButtonWidth = 20 + 8 + longestTextWidth + 24; // icon + gap + text + padding
    const fullModeWidth = (servicesCount * Math.max(serviceButtonWidth, 90)) + 280; // Services + utilities with buffer for action buttons
    
    const iconModeWidth = (servicesCount * 44) + 280; // Icon-only buttons + utilities with buffer for action buttons
    
    console.log('Available width:', availableWidth, 'Full mode needed:', fullModeWidth, 'Icon mode needed:', iconModeWidth, 'Longest service:', longestServiceName);
    
    if (availableWidth >= fullModeWidth) {
      setDisplayMode('full');
    } else if (availableWidth >= iconModeWidth) {
      setDisplayMode('icons');
    } else {
      setDisplayMode('minimal');
    }
  }, [services]);

  useEffect(() => {
    checkCollision();
    const resizeObserver = new ResizeObserver(checkCollision);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [checkCollision]);

  const getServiceButtonClass = () => {
    const baseClass = "flex items-center bg-card/30 text-card-foreground border border-border/50 hover:bg-accent/60 hover:text-primary hover:border-primary/60 transition-all duration-300 rounded-lg font-medium text-sm";
    
    switch (displayMode) {
      case 'full':
        return `${baseClass} px-3 gap-2 h-10 whitespace-nowrap`;
      case 'icons':
        return `${baseClass} justify-center w-10 h-10`;
      case 'minimal':
        return `${baseClass} justify-center w-10 h-10`;
      default:
        return baseClass;
    }
  };

  const getUtilityButtonClass = () => {
    const baseClass = "flex items-center justify-center h-10 bg-card/30 text-card-foreground border border-border/50 hover:bg-accent/60 hover:text-primary hover:border-primary/60 transition-all duration-300 rounded-lg font-medium text-sm";
    
    switch (displayMode) {
      case 'full':
        return `${baseClass} px-3 gap-2 whitespace-nowrap`;
      case 'icons':
        return `${baseClass} px-2 gap-1 min-w-[80px]`;
      case 'minimal':
        return `${baseClass} w-10`;
      default:
        return baseClass;
    }
  };

  const getHomeButtonClass = () => {
    return "flex items-center justify-center h-10 w-10 bg-card/30 text-card-foreground border border-border/50 hover:bg-accent/60 hover:text-primary hover:border-primary/60 transition-all duration-300 rounded-lg";
  };

  return (
    <div ref={containerRef} className="flex items-center w-full gap-1 navbar-container">
      {/* Services - takes up available space */}
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {services.map((service) => {
          const IconComponent = service.icon;
          const serviceFilters = getServiceFilters(service.slug);
          
          return (
            <ServiceHoverCard
              key={service.slug}
              serviceName={service.name}
              serviceSlug={service.slug}
              filters={serviceFilters}
            >
              <button
                onClick={() => onCategoryClick(service.slug)}
                className={getServiceButtonClass()}
                title={service.name}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                {displayMode === 'full' && (
                  <span className="text-xs">
                    {service.name}
                  </span>
                )}
              </button>
            </ServiceHoverCard>
          );
        })}
      </div>
      
      {/* Utility Controls - fixed width, always on the right */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* About Dropdown */}
        {displayMode !== 'minimal' && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => onDropdownToggle('about')}
              className={getUtilityButtonClass()}
            >
              {(displayMode === 'full' || displayMode === 'icons') && (
                <span className="text-xs">{t('nav.more')}</span>
              )}
              <ChevronDown className="w-5 h-5 flex-shrink-0" />
            </button>
            <div className={`absolute top-full right-0 mt-2 w-48 bg-card/95 backdrop-blur-sm rounded-lg shadow-xl border border-border py-2 z-50 transition-all duration-200 ${activeDropdown === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <button 
                onClick={() => onAboutClick('om-prispilot')} 
                className="block w-full text-left px-4 py-3 text-sm text-card-foreground hover:bg-accent hover:text-primary transition-colors whitespace-nowrap"
              >
                {t('nav.aboutPrisPilot')}
              </button>
              <button 
                onClick={() => onAboutClick('hvordan-det-fungerer')} 
                className="block w-full text-left px-4 py-3 text-sm text-card-foreground hover:bg-accent hover:text-primary transition-colors whitespace-nowrap"
              >
                {t('nav.howItWorks')}
              </button>
              <button 
                onClick={() => onAboutClick('kontakt-oss')} 
                className="block w-full text-left px-4 py-3 text-sm text-card-foreground hover:bg-accent hover:text-primary transition-colors whitespace-nowrap"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
        )}

        {/* Blog Button */}
        {displayMode !== 'minimal' && (
          <button
            onClick={() => onAboutClick('blogg')}
            className={getUtilityButtonClass()}
          >
            {displayMode === 'full' && (
              <span className="text-xs">{t('nav.blog')}</span>
            )}
            {displayMode === 'icons' && (
              <span className="text-xs font-semibold">{t('nav.blog')}</span>
            )}
          </button>
        )}

        {/* Language Selector */}
        <LanguageSelector isMobile={displayMode === 'icons' || displayMode === 'minimal'} />

        {/* Theme Toggle */}
        <ThemeToggler />

        {/* Action Buttons - Home and Sign Up */}
        <div className="flex items-center gap-1 ml-2 border-l border-border pl-2">
          <button
            onClick={onHomeClick}
            title={t('nav.home')}
            className={getHomeButtonClass()}
          >
            <Home className="w-5 h-5" />
          </button>

          <button
            onClick={onMeldPaClick}
            title={t('cta.signUp')}
            className="flex items-center justify-center h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-lg"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavigation;
