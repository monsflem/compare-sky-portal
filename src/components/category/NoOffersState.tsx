
import React from 'react';

interface NoOffersStateProps {
  onShowQuoteForm: () => void;
}

const NoOffersState = ({ onShowQuoteForm }: NoOffersStateProps) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingen tilbud tilgjengelig</h2>
      <p className="text-gray-600 mb-6">Vi har ikke tilbud for denne tjenesten ennå, men du kan melde deg på for å få tilbud.</p>
      <button
        onClick={onShowQuoteForm}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Meld deg på for tilbud
      </button>
    </div>
  );
};

export default NoOffersState;
