
import React from 'react';
import CategoryPageHeader from './CategoryPageHeader';

interface ErrorStateProps {
  categoryName: string;
  error: string;
  onBackClick: () => void;
  onMeldPaClick: () => void;
  onRetry: () => void;
}

const ErrorState = ({ categoryName, error, onBackClick, onMeldPaClick, onRetry }: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryPageHeader 
        categoryName={categoryName}
        onBackClick={onBackClick}
        onMeldPaClick={onMeldPaClick}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Det oppstod en feil</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Prøv på nytt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
