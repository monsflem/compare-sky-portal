
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Provider } from '../types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { ChevronUp, ChevronDown, ExternalLink, Clock } from 'lucide-react';
import { getCategorySpecificUrl, formatPriceWithFreshness } from '../utils/providerUrls';

interface ComparisonTableProps {
  providers: Provider[];
  category: string;
}

const ComparisonTable = ({ providers, category }: ComparisonTableProps) => {
  const [sortKey, setSortKey] = useState<keyof Provider>('price');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const sortedProviders = [...providers].sort((a, b) => {
    if (sortKey === 'price') {
      return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortKey === 'rating') {
      return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    } else if (sortKey === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const handleSort = (key: keyof Provider) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleAffiliateClick = (provider: Provider) => {
    console.log(`Clicked on ${provider.name} affiliate link for ${category} category`);
    
    toast.success(`Redirecting you to ${provider.name}'s ${category} section...`);
    
    setTimeout(() => {
      const categoryUrl = getCategorySpecificUrl(provider, category as any);
      window.open(categoryUrl, '_blank');
    }, 500);
  };

  const getSortIcon = (key: keyof Provider) => {
    if (sortKey !== key) return null;
    return sortDirection === 'asc' 
      ? <ChevronUp className="inline ml-1 h-4 w-4" /> 
      : <ChevronDown className="inline ml-1 h-4 w-4" />;
  };

  const getFeaturesForCategory = (provider: Provider) => {
    const { features } = provider;
    
    switch (category) {
      case 'insurance':
        return (
          <ul className="text-sm space-y-1">
            {features.roadside && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Roadside assistance</li>}
            {features.theft && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Theft coverage</li>}
            {features.accident && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Accident coverage</li>}
            {features.international && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> International coverage</li>}
            <li className="flex items-center"><span className="font-medium mr-1">Deductible:</span> {features.deductible} NOK</li>
          </ul>
        );
        
      case 'electricity':
        return (
          <ul className="text-sm space-y-1">
            {features.smartApp && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Smart app</li>}
            {features.renewableEnergy && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> 100% renewable energy</li>}
            {features.realTimePricing && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Real-time pricing</li>}
            {features.noBindingPeriod && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> No binding period</li>}
          </ul>
        );
        
      case 'mobile':
        return (
          <ul className="text-sm space-y-1">
            <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Data: {features.data}</li>
            {features.unlimitedCalls && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Unlimited calls</li>}
            {features.unlimitedTexts && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Unlimited texts</li>}
            {features.freeRoaming && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Free EU/EEA roaming</li>}
            {features["5G"] && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> 5G network</li>}
          </ul>
        );
        
      case 'loans':
        return (
          <ul className="text-sm space-y-1">
            {features.mortgage && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Mortgage loans</li>}
            {features.personal && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Personal loans</li>}
            {features.carLoan && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Car loans</li>}
            {features.studentLoan && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Student loans</li>}
            {features.fixedRate && <li className="flex items-center"><span className="text-green-500 mr-1">✓</span> Fixed rate option</li>}
          </ul>
        );
        
      default:
        return <p>No feature details available</p>;
    }
  };

  const formatPrice = (provider: Provider) => {
    const { priceText, freshnessIndicator } = formatPriceWithFreshness(provider);
    return { priceText, freshnessIndicator };
  };

  // Mobile card view for smaller screens
  const renderMobileCard = (provider: Provider) => {
    const { priceText, freshnessIndicator } = formatPrice(provider);
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-slate-100">
        <div className="flex items-center mb-3">
          <div className="w-[60px] h-[40px] flex items-center justify-center bg-gray-100 rounded mr-3">
            <img 
              src={provider.logo} 
              alt={`${provider.name} logo`} 
              className="max-w-[50px] max-h-[30px] object-contain" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${provider.name}&background=random&color=fff`;
              }}
            />
          </div>
          <div>
            <Link to={`/providers/${provider.id}`} className="font-semibold text-slate-900 hover:text-sky-600">
              {provider.name}
            </Link>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="bg-sky-50 text-sky-800">
                {provider.rating} ★
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-lg font-semibold text-sky-600">{priceText}</div>
            {provider.isLivePrice && (
              <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {freshnessIndicator}
              </Badge>
            )}
          </div>
          <div className="mt-2">
            {getFeaturesForCategory(provider)}
          </div>
        </div>
        
        <Button 
          className="w-full bg-sky-600 hover:bg-sky-700 mt-2 flex items-center justify-center"
          onClick={() => handleAffiliateClick(provider)}
        >
          Visit {category.charAt(0).toUpperCase() + category.slice(1)} Section <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <>
      {/* Mobile view (card layout) */}
      <div className="md:hidden space-y-4">
        {sortedProviders.map((provider) => renderMobileCard(provider))}
      </div>
      
      {/* Desktop view (table layout) */}
      <div className="hidden md:block overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Provider</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-sky-600" 
                onClick={() => handleSort('price')}
              >
                Live Price {getSortIcon('price')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-sky-600"
                onClick={() => handleSort('rating')}
              >
                Rating {getSortIcon('rating')}
              </TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProviders.map((provider) => {
              const { priceText, freshnessIndicator } = formatPrice(provider);
              
              return (
                <TableRow key={provider.id} className="animate-fade-in">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="w-[60px] h-[40px] flex items-center justify-center bg-gray-100 rounded mr-3">
                        <img 
                          src={provider.logo} 
                          alt={`${provider.name} logo`} 
                          className="max-w-[50px] max-h-[30px] object-contain" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${provider.name}&background=random&color=fff`;
                          }}
                        />
                      </div>
                      <Link to={`/providers/${provider.id}`} className="hover:text-sky-600 font-semibold">
                        {provider.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{priceText}</span>
                      {provider.isLivePrice && (
                        <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs flex items-center gap-1 w-fit mt-1">
                          <Clock className="h-3 w-3" />
                          {freshnessIndicator}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-amber-50 text-amber-800">
                        <span className="font-medium mr-1">{provider.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{getFeaturesForCategory(provider)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      className="bg-sky-600 hover:bg-sky-700"
                      onClick={() => handleAffiliateClick(provider)}
                    >
                      Visit {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ComparisonTable;
