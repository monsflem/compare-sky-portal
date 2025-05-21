
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ComparisonTable from '../components/ComparisonTable';
import { Category } from '../types';
import { getProvidersByCategory } from '../data/mockProviders';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const getCategoryTitle = (category: string): string => {
  switch (category) {
    case 'insurance':
      return 'Insurance Providers';
    case 'electricity':
      return 'Electricity Providers';
    case 'mobile':
      return 'Mobile Plan Providers';
    case 'loans':
      return 'Loan Providers';
    default:
      return 'Service Providers';
  }
};

const getCategoryDescription = (category: string): string => {
  switch (category) {
    case 'insurance':
      return 'Compare insurance providers to find the best coverage at competitive rates. Our comparison includes car, home, travel, and life insurance options.';
    case 'electricity':
      return 'Find the best electricity rates and providers with transparent pricing. Compare fixed and variable rates, renewable energy options, and more.';
    case 'mobile':
      return 'Compare mobile plans and find the best coverage for your needs. Our comparison includes data packages, calling minutes, and additional features.';
    case 'loans':
      return 'Find the best loan rates and terms from Norway\'s leading banks. Compare mortgage, personal, car, and student loan options.';
    default:
      return 'Compare service providers to find the best options for your needs.';
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  // Validate category and get providers
  const validCategory = ['insurance', 'electricity', 'mobile', 'loans'].includes(category || '') 
    ? (category as Category) 
    : null;
    
  const providers = validCategory ? getProvidersByCategory(validCategory) : [];
  
  const title = validCategory ? getCategoryTitle(validCategory) : 'Category Not Found';
  const description = validCategory ? getCategoryDescription(validCategory) : '';

  if (!validCategory) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <Alert variant="destructive">
            <AlertTitle>Invalid Category</AlertTitle>
            <AlertDescription>
              The category you requested does not exist. Please select a valid category from the navigation menu.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-900 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-slate-300 max-w-3xl">{description}</p>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Compare {title}</h2>
          <ComparisonTable providers={providers} category={validCategory} />
        </div>
        
        <div className="mt-12 bg-slate-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How to Choose the Right {validCategory.charAt(0).toUpperCase() + validCategory.slice(1)} Provider</h2>
          
          {validCategory === 'insurance' && (
            <div className="space-y-4">
              <p>When comparing insurance providers, consider these important factors:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Coverage options and limits</li>
                <li>Deductible amounts</li>
                <li>Premium costs and payment options</li>
                <li>Claims process and customer satisfaction ratings</li>
                <li>Additional benefits like roadside assistance or international coverage</li>
              </ul>
            </div>
          )}
          
          {validCategory === 'electricity' && (
            <div className="space-y-4">
              <p>When comparing electricity providers, consider these important factors:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fixed vs. variable rate plans</li>
                <li>Price per kWh and any additional fees</li>
                <li>Renewable energy options</li>
                <li>Contract terms and binding periods</li>
                <li>Smart home integration and usage monitoring tools</li>
              </ul>
            </div>
          )}
          
          {validCategory === 'mobile' && (
            <div className="space-y-4">
              <p>When comparing mobile plan providers, consider these important factors:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data allowance and speed</li>
                <li>Call and text message limits</li>
                <li>Network coverage in your area</li>
                <li>Contract length and early termination fees</li>
                <li>International roaming options and 5G availability</li>
              </ul>
            </div>
          )}
          
          {validCategory === 'loans' && (
            <div className="space-y-4">
              <p>When comparing loan providers, consider these important factors:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Interest rates (fixed vs. variable)</li>
                <li>Loan terms and repayment options</li>
                <li>Fees (origination, early repayment, late payment)</li>
                <li>Eligibility requirements</li>
                <li>Customer service quality and digital banking features</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
