
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProviderDetail from '../components/ProviderDetail';
import { getProviderById } from '../data/mockProviders';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProviderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const provider = id ? getProviderById(id) : null;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!provider) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <Alert variant="destructive">
            <AlertTitle>Provider Not Found</AlertTitle>
            <AlertDescription>
              The provider you requested does not exist. Please return to the category page to select a valid provider.
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <button 
              onClick={() => navigate(-1)} 
              className="btn-secondary"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate(`/categories/${provider.category}`)} 
            className="text-sky-600 hover:text-sky-800 flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to {provider.category.charAt(0).toUpperCase() + provider.category.slice(1)} Comparison
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProviderDetail provider={provider} />
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDetailPage;
