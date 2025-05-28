
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4">
              Pris<span className="text-blue-400">pilot</span>
            </h3>
            <p className="text-slate-300 text-sm">
              {t.footer.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">{t.footer.categories}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/categories/insurance" className="hover:text-blue-400 transition-colors">{t.nav.insurance}</Link></li>
              <li><Link to="/categories/electricity" className="hover:text-blue-400 transition-colors">{t.nav.electricity}</Link></li>
              <li><Link to="/categories/mobile" className="hover:text-blue-400 transition-colors">{t.nav.mobile}</Link></li>
              <li><Link to="/categories/loans" className="hover:text-blue-400 transition-colors">{t.nav.loans}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">{t.footer.company}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">{t.footer.about}</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">{t.footer.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors">{t.footer.terms}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">{t.footer.contact}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">{t.footer.connect}</h4>
            <div className="flex space-x-4 text-slate-300">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {currentYear} Prispilot. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
