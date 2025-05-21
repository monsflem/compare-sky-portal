
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-montserrat font-bold text-slate-900">Skygruppen<span className="text-sky-600">Compare</span></span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center">
          <Link to="/" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600">Home</Link>
          <Link to="/categories/insurance" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600">Insurance</Link>
          <Link to="/categories/electricity" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600">Electricity</Link>
          <Link to="/categories/mobile" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600">Mobile</Link>
          <Link to="/categories/loans" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600">Loans</Link>
          <Link to="/admin" className="ml-4 btn-primary">Admin</Link>
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
            <Link to="/" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>Home</Link>
            <Link to="/categories/insurance" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>Insurance</Link>
            <Link to="/categories/electricity" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>Electricity</Link>
            <Link to="/categories/mobile" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>Mobile</Link>
            <Link to="/categories/loans" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md" onClick={toggleMenu}>Loans</Link>
            <Link to="/admin" className="block px-3 py-2 text-base font-medium text-sky-600 hover:bg-sky-50 rounded-md" onClick={toggleMenu}>Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
