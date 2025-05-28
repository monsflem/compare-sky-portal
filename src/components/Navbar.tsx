
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-montserrat font-bold text-slate-900">
              Pris<span className="text-blue-600">pilot</span>
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link to="/" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
            {t.nav.home}
          </Link>
          <Link to="/categories/insurance" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
            {t.nav.insurance}
          </Link>
          <Link to="/categories/electricity" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
            {t.nav.electricity}
          </Link>
          <Link to="/categories/mobile" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
            {t.nav.mobile}
          </Link>
          <Link to="/categories/loans" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
            {t.nav.loans}
          </Link>
          <Link to="/contact" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
            {t.nav.contact}
          </Link>
          <LanguageSelector />
          <Link to="/admin" className="ml-4 btn-primary">
            {t.nav.login}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="text-slate-800 hover:text-slate-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container-custom px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>
              {t.nav.home}
            </Link>
            <Link to="/categories/insurance" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>
              {t.nav.insurance}
            </Link>
            <Link to="/categories/electricity" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>
              {t.nav.electricity}
            </Link>
            <Link to="/categories/mobile" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>
              {t.nav.mobile}
            </Link>
            <Link to="/categories/loans" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>
              {t.nav.loans}
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>
              {t.nav.contact}
            </Link>
            <div className="px-3 py-2">
              <LanguageSelector />
            </div>
            <Link to="/admin" className="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-md" onClick={toggleMenu}>
              {t.nav.login}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
