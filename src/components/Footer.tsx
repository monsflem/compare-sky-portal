
import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneIcon } from '@/components/CategoryIcons';
import { useLanguage } from '@/contexts/LanguageContext';
import { Zap, Wifi, Smartphone, Tv, Shield, CreditCard, Home, Brush, Hammer, FileText, Lock, Info, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-muted text-foreground py-12 mt-16 border-t border-border shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                <PlaneIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">PrisPilot</span>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                {t('footer.description')}
              </p>
              <p>
                {t('footer.help')}
              </p>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">{t('footer.services')}</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/kategori/strom" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <Zap className="w-4 h-4" />
                {t('footer.electricity')}
              </Link>
              <Link to="/kategori/internet" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <Wifi className="w-4 h-4" />
                {t('footer.internet')}
              </Link>
              <Link to="/kategori/mobil" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <Smartphone className="w-4 h-4" />
                {t('footer.mobile')}
              </Link>
              <Link to="/kategori/tv" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <Tv className="w-4 h-4" />
                {t('footer.tv')}
              </Link>
              <Link to="/kategori/forsikring" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <Shield className="w-4 h-4" />
                {t('footer.insurance')}
              </Link>
              <Link to="/kategori/lan" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <CreditCard className="w-4 h-4" />
                {t('footer.loans')}
              </Link>
              <Link to="/kategori/boligalarm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <Home className="w-4 h-4" />
                {t('footer.alarm')}
              </Link>
              <Link to="/kategori/renhold" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <Brush className="w-4 h-4" />
                {t('footer.cleaning')}
              </Link>
              <Link to="/kategori/handverkere" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                <Hammer className="w-4 h-4" />
                {t('footer.handymen')}
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/personvern" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                  <Lock className="w-4 h-4" />
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/vilkår" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                  <FileText className="w-4 h-4" />
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/om-prispilot" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                  <Info className="w-4 h-4" />
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/kontakt-oss" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                  <Phone className="w-4 h-4" />
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">{t('footer.personalHelp')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
