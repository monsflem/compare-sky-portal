
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
import { toast } from 'sonner';

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
    // This will be replaced with an actual API call to log clicks
    console.log(`Clicked on ${provider.name} affiliate link`);
    
    // Show a toast notification
    toast.success(`Redirecting you to ${provider.name}...`);
    
    // In a real implementation, we would log the click to the database
    // and then redirect the user
    setTimeout(() => {
      // Add the ref parameter to the URL
      const affiliateUrl = provider.url + (provider.url.includes('?') ? '&' : '?') + 'ref=skycompare';
      window.open(affiliateUrl, '_blank');
    }, 500);
  };

  const getSortIcon = (key: keyof Provider) => {
    if (sortKey !== key) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  const getFeaturesForCategory = (provider: Provider) => {
    const { features } = provider;
    
    switch (category) {
      case 'insurance':
        return (
          <ul className="text-sm">
            {features.roadside && <li>✓ Roadside assistance</li>}
            {features.theft && <li>✓ Theft coverage</li>}
            {features.accident && <li>✓ Accident coverage</li>}
            {features.international && <li>✓ International coverage</li>}
            <li>Deductible: {features.deductible} NOK</li>
          </ul>
        );
        
      case 'electricity':
        return (
          <ul className="text-sm">
            {features.smartApp && <li>✓ Smart app</li>}
            {features.renewableEnergy && <li>✓ 100% renewable energy</li>}
            {features.realTimePricing && <li>✓ Real-time pricing</li>}
            {features.noBindingPeriod && <li>✓ No binding period</li>}
          </ul>
        );
        
      case 'mobile':
        return (
          <ul className="text-sm">
            <li>✓ Data: {features.data}</li>
            {features.unlimitedCalls && <li>✓ Unlimited calls</li>}
            {features.unlimitedTexts && <li>✓ Unlimited texts</li>}
            {features.freeRoaming && <li>✓ Free EU/EEA roaming</li>}
            {features['5G'] && <li>✓ 5G network</li>}
          </ul>
        );
        
      case 'loans':
        return (
          <ul className="text-sm">
            {features.mortgage && <li>✓ Mortgage loans</li>}
            {features.personal && <li>✓ Personal loans</li>}
            {features.carLoan && <li>✓ Car loans</li>}
            {features.studentLoan && <li>✓ Student loans</li>}
            {features.fixedRate && <li>✓ Fixed rate option</li>}
          </ul>
        );
        
      default:
        return <p>No feature details available</p>;
    }
  };

  const formatPrice = (provider: Provider) => {
    return `${provider.price} ${provider.priceUnit}`;
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Provider</TableHead>
            <TableHead 
              className="cursor-pointer hover:text-sky-600" 
              onClick={() => handleSort('price')}
            >
              Price{getSortIcon('price')}
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:text-sky-600"
              onClick={() => handleSort('rating')}
            >
              Rating{getSortIcon('rating')}
            </TableHead>
            <TableHead>Features</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProviders.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col items-center sm:flex-row sm:items-start">
                  <div className="w-[60px] h-[40px] flex items-center justify-center bg-gray-100 rounded mr-2 mb-2 sm:mb-0">
                    <img 
                      src={provider.logo} 
                      alt={`${provider.name} logo`} 
                      className="max-w-[50px] max-h-[30px]" 
                    />
                  </div>
                  <Link to={`/providers/${provider.id}`} className="hover:text-sky-600 font-medium">
                    {provider.name}
                  </Link>
                </div>
              </TableCell>
              <TableCell>{formatPrice(provider)}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="font-medium mr-1">{provider.rating}</span>
                  <div className="text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(provider.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell>{getFeaturesForCategory(provider)}</TableCell>
              <TableCell className="text-right">
                <Button 
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={() => handleAffiliateClick(provider)}
                >
                  Visit Provider
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
