import React from 'react';
import { Provider } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Clock } from 'lucide-react';
import { getCategorySpecificUrl, formatPriceWithFreshness } from '../utils/providerUrls';

interface ProviderDetailProps {
  provider: Provider;
}

const ProviderDetail = ({ provider }: ProviderDetailProps) => {
  const handleAffiliateClick = () => {
    console.log(`Clicked on ${provider.name} affiliate link from detail page for ${provider.category}`);
    
    toast.success(`Redirecting you to ${provider.name}'s ${provider.category} section...`);
    
    setTimeout(() => {
      const categoryUrl = getCategorySpecificUrl(provider, provider.category);
      window.open(categoryUrl, '_blank');
    }, 500);
  };

  const renderFeatures = () => {
    const { features, category } = provider;
    
    switch (category) {
      case 'insurance':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Coverage</h4>
              <ul className="space-y-2">
                {features.roadside && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Roadside assistance</li>}
                {features.theft && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Theft coverage</li>}
                {features.accident && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Accident coverage</li>}
                {features.international && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> International coverage</li>}
                {features.bonusProtection && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Bonus protection</li>}
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Details</h4>
              <ul className="space-y-2">
                <li><span className="font-medium">Deductible:</span> {features.deductible} NOK</li>
                <li><span className="font-medium">Updated:</span> {new Date(provider.updatedAt).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        );
        
      case 'electricity':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="space-y-2">
                {features.smartApp && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Smart app</li>}
                {features.renewableEnergy && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 100% renewable energy</li>}
                {features.realTimePricing && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Real-time pricing</li>}
                {features.noBindingPeriod && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> No binding period</li>}
                {features.smartHomeIntegration && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Smart home integration</li>}
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Details</h4>
              <ul className="space-y-2">
                <li><span className="font-medium">Price:</span> {provider.price} {provider.priceUnit}</li>
                <li><span className="font-medium">Updated:</span> {new Date(provider.updatedAt).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        );
        
      case 'mobile':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Plan Details</h4>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Data: {features.data}</li>
                {features.unlimitedCalls && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited calls</li>}
                {features.unlimitedTexts && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited texts</li>}
                {features.freeRoaming && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Free EU/EEA roaming</li>}
                {features['5G'] && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 5G network</li>}
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Additional Benefits</h4>
              <ul className="space-y-2">
                {features.familyDiscount && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Family discount available</li>}
                <li><span className="font-medium">Price:</span> {provider.price} {provider.priceUnit}</li>
                <li><span className="font-medium">Updated:</span> {new Date(provider.updatedAt).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        );
        
      case 'loans':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Loan Types</h4>
              <ul className="space-y-2">
                {features.mortgage && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Mortgage loans</li>}
                {features.personal && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Personal loans</li>}
                {features.carLoan && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Car loans</li>}
                {features.studentLoan && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Student loans</li>}
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Terms & Conditions</h4>
              <ul className="space-y-2">
                {features.fixedRate && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Fixed rate option</li>}
                {features.flexibleTerms && <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Flexible terms</li>}
                <li><span className="font-medium">Interest Rate:</span> {provider.price}{provider.priceUnit}</li>
                <li><span className="font-medium">Updated:</span> {new Date(provider.updatedAt).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        );
        
      default:
        return <p>No feature details available</p>;
    }
  };

  const { priceText, freshnessIndicator } = formatPriceWithFreshness(provider);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
          <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-center h-[80px] w-[120px] mb-4 md:mb-0 md:mr-6">
            <img 
              src={provider.logo} 
              alt={`${provider.name} logo`} 
              className="max-h-[60px] max-w-[100px]" 
            />
          </div>
          <div>
            <h1 className="text-3xl font-montserrat font-bold">{provider.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(provider.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-slate-600">{provider.rating} / 5</span>
            </div>
          </div>
        </div>
        <Button 
          size="lg"
          className="bg-sky-600 hover:bg-sky-700 md:w-auto w-full"
          onClick={handleAffiliateClick}
        >
          Visit {provider.category.charAt(0).toUpperCase() + provider.category.slice(1)} Section
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About {provider.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 mb-6">{provider.description}</p>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <span className="font-medium text-slate-900">Price:</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl text-sky-600 font-semibold">{priceText}</span>
                {provider.isLivePrice && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {freshnessIndicator}
                  </Badge>
                )}
              </div>
            </div>
            <div className="bg-sky-50 text-sky-800 px-3 py-1 rounded-full text-sm">
              Last updated: {new Date(provider.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features & Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          {renderFeatures()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 text-slate-500">
            <p>User reviews coming soon!</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button 
          size="lg"
          className="bg-sky-600 hover:bg-sky-700"
          onClick={handleAffiliateClick}
        >
          Get a Quote from {provider.name}
        </Button>
      </div>
    </div>
  );
};

export default ProviderDetail;
