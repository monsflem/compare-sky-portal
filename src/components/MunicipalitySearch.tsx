
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { usePostalCodeLookup } from '@/hooks/usePostalCodeLookup';

interface MunicipalitySearchProps {
  municipalities: string[];
  selectedMunicipality: string;
  onMunicipalitySelect: (municipality: string) => void;
  placeholder?: string;
  className?: string;
}

const MunicipalitySearch: React.FC<MunicipalitySearchProps> = ({
  municipalities,
  selectedMunicipality,
  onMunicipalitySelect,
  placeholder = "Søk kommune eller postnummer...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedMunicipality || '');
  const [filteredMunicipalities, setFilteredMunicipalities] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPostalCode, setIsPostalCode] = useState(false);
  const { lookupPostalCode, loading: postalLoading } = usePostalCodeLookup();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFilteredMunicipalities([]);
      setShowDropdown(false);
      return;
    }

    // Check if input is a 4-digit postal code
    const isPostal = /^\d{4}$/.test(searchTerm);
    setIsPostalCode(isPostal);

    if (isPostal) {
      // Handle postal code lookup
      handlePostalCodeLookup(searchTerm);
    } else {
      // Filter municipalities by search term
      const filtered = municipalities.filter(municipality =>
        municipality.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10); // Limit results
      
      setFilteredMunicipalities(filtered);
      setShowDropdown(filtered.length > 0);
    }
  }, [searchTerm, municipalities]);

  const handlePostalCodeLookup = async (postalCode: string) => {
    const result = await lookupPostalCode(postalCode);
    if (result) {
      // Try to find matching municipality with multiple strategies
      let matchingMunicipality = municipalities.find(m => 
        m.toLowerCase().includes(result.municipality.toLowerCase()) ||
        result.municipality.toLowerCase().includes(m.toLowerCase()) ||
        m.toLowerCase().startsWith(result.municipality.toLowerCase())
      );
      
      // If no direct match, try with clean names (remove suffixes)
      if (!matchingMunicipality) {
        matchingMunicipality = municipalities.find(m => {
          const cleanM = m.split('-')[0].split('(')[0].trim().toLowerCase();
          const cleanResult = result.municipality.toLowerCase();
          return cleanM.includes(cleanResult) || cleanResult.includes(cleanM);
        });
      }
      
      if (matchingMunicipality) {
        setFilteredMunicipalities([matchingMunicipality]);
        setShowDropdown(true);
      } else {
        // Show the postal code result anyway as a suggestion
        setFilteredMunicipalities([result.municipality]);
        setShowDropdown(true);
      }
    } else {
      setFilteredMunicipalities([]);
      setShowDropdown(false);
    }
  };

  const handleMunicipalityClick = (municipality: string) => {
    setSearchTerm(municipality);
    setShowDropdown(false);
    // Trigger immediate data display
    onMunicipalitySelect(municipality);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== selectedMunicipality) {
      onMunicipalitySelect(''); // Clear selection when typing
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    } else if (e.key === 'Enter' && filteredMunicipalities.length === 1) {
      handleMunicipalityClick(filteredMunicipalities[0]);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => filteredMunicipalities.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className="pl-10 pr-4"
        />
        {postalLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          </div>
        )}
      </div>

      {showDropdown && filteredMunicipalities.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredMunicipalities.map((municipality, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2 transition-colors text-foreground"
              onClick={() => handleMunicipalityClick(municipality)}
            >
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{municipality}</span>
              {isPostalCode && (
                <span className="text-sm text-muted-foreground ml-auto">
                  ({searchTerm})
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MunicipalitySearch;
