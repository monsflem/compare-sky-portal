
import React from 'react';
import InsuranceCategoryIcons from '@/components/category/InsuranceCategoryIcons';
import TVCategoryIcons from '@/components/category/TVCategoryIcons';
import MobilCategoryIcons from '@/components/category/MobilCategoryIcons';
import InternetCategoryIcons from '@/components/category/InternetCategoryIcons';
import StromCategoryIcons from '@/components/category/StromCategoryIcons';
import LoanCategoryIcons from '@/components/category/LoanCategoryIcons';
import BoligalarmCategoryIcons from '@/components/category/BoligalarmCategoryIcons';
import HandverkereCategoryIcons from '@/components/category/HandverkereCategoryIcons';
import RenholdCategoryIcons from '@/components/category/RenholdCategoryIcons';

interface CategoryIconsRendererProps {
  kategori: string;
  selectedInsuranceCategory: string | null;
  setSelectedInsuranceCategory: (category: string | null) => void;
  selectedTVCategory: string | null;
  setSelectedTVCategory: (category: string | null) => void;
  selectedMobilCategory: string | null;
  setSelectedMobilCategory: (category: string | null) => void;
  selectedInternetCategory: string | null;
  setSelectedInternetCategory: (category: string | null) => void;
  selectedStromCategory: string | null;
  setSelectedStromCategory: (category: string | null) => void;
  selectedLoanCategory: string | null;
  setSelectedLoanCategory: (category: string | null) => void;
  selectedBoligalarmCategory: string | null;
  setSelectedBoligalarmCategory: (category: string | null) => void;
  selectedHandverkereCategory: string | null;
  setSelectedHandverkereCategory: (category: string | null) => void;
  selectedRenholdCategory: string | null;
  setSelectedRenholdCategory: (category: string | null) => void;
}

const CategoryIconsRenderer = ({
  kategori,
  selectedInsuranceCategory,
  setSelectedInsuranceCategory,
  selectedTVCategory,
  setSelectedTVCategory,
  selectedMobilCategory,
  setSelectedMobilCategory,
  selectedInternetCategory,
  setSelectedInternetCategory,
  selectedStromCategory,
  setSelectedStromCategory,
  selectedLoanCategory,
  setSelectedLoanCategory,
  selectedBoligalarmCategory,
  setSelectedBoligalarmCategory,
  selectedHandverkereCategory,
  setSelectedHandverkereCategory,
  selectedRenholdCategory,
  setSelectedRenholdCategory,
}: CategoryIconsRendererProps) => {
  
  // Debug logging for strom category to track prop propagation
  if (kategori === 'strom') {
    console.log('⚡ CategoryIconsRenderer - strom category rendered with selectedStromCategory:', selectedStromCategory);
  }

  switch (kategori) {
    case 'forsikring':
      return (
        <InsuranceCategoryIcons
          selectedCategory={selectedInsuranceCategory}
          onCategoryChange={setSelectedInsuranceCategory}
        />
      );
    case 'tv-pakker':
      return (
        <TVCategoryIcons
          selectedCategory={selectedTVCategory}
          onCategoryChange={setSelectedTVCategory}
        />
      );
    case 'mobil':
      return (
        <MobilCategoryIcons
          selectedCategory={selectedMobilCategory}
          onCategoryChange={setSelectedMobilCategory}
        />
      );
    case 'internett':
      return (
        <InternetCategoryIcons
          selectedCategory={selectedInternetCategory}
          onCategoryChange={setSelectedInternetCategory}
        />
      );
    case 'strom':
      return (
        <StromCategoryIcons
          key={`strom-icons-${selectedStromCategory || 'all'}`} // Enhanced key to force re-render
          selectedCategory={selectedStromCategory}
          onCategoryChange={setSelectedStromCategory}
        />
      );
    case 'lan':
      return (
        <LoanCategoryIcons
          selectedCategory={selectedLoanCategory}
          onCategoryChange={setSelectedLoanCategory}
        />
      );
    case 'boligalarm':
      return (
        <BoligalarmCategoryIcons
          selectedCategory={selectedBoligalarmCategory}
          onCategoryChange={setSelectedBoligalarmCategory}
        />
      );
    case 'handverkere':
      return (
        <HandverkereCategoryIcons
          selectedCategory={selectedHandverkereCategory}
          onCategoryChange={setSelectedHandverkereCategory}
        />
      );
    case 'renhold':
      return (
        <RenholdCategoryIcons
          selectedCategory={selectedRenholdCategory}
          onCategoryChange={setSelectedRenholdCategory}
        />
      );
    default:
      return null;
  }
};

export default CategoryIconsRenderer;
