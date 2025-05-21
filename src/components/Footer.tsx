
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4">Skygruppen<span className="text-sky-400">Compare</span></h3>
            <p className="text-slate-300 text-sm">
              Find and compare the best providers for insurance, electricity, mobile plans, and loans in Norway.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Categories</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/categories/insurance" className="hover:text-sky-400 transition-colors">Insurance</Link></li>
              <li><Link to="/categories/electricity" className="hover:text-sky-400 transition-colors">Electricity</Link></li>
              <li><Link to="/categories/mobile" className="hover:text-sky-400 transition-colors">Mobile</Link></li>
              <li><Link to="/categories/loans" className="hover:text-sky-400 transition-colors">Loans</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/about" className="hover:text-sky-400 transition-colors">About Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-sky-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Connect</h4>
            <div className="flex space-x-4 text-slate-300">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {currentYear} Skygruppen Compare Smart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
