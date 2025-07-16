import React from 'react';
import { CreditCard, ArrowRightLeft, Home, Briefcase, Car } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoanCategoryIconsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categories = [
  {
    id: 'all',
    label: 'Alle',
    icon: null,
    description: 'Vis alle lånetilbud'
  },
  {
    id: 'forbrukslan',
    label: 'Usikrede lån',
    icon: CreditCard,
    description: 'Forbrukslån'
  },
  {
    id: 'refinansiering',
    label: 'Refinansiere gjeld',
    icon: ArrowRightLeft,
    description: 'Refinansiering'
  },
  {
    id: 'boliglan',
    label: 'Sikrede boliglån',
    icon: Home,
    description: 'Boliglån'
  },
  {
    id: 'billan',
    label: 'Billån',
    icon: Car,
    description: 'Kjøretøyfinansiering'
  }
];

const LoanCategoryIcons: React.FC<LoanCategoryIconsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { t } = useLanguage();
  
  const categoriesTranslated = [
    {
      id: 'all',
      label: t('loan.all'),
      icon: null,
      description: t('loan.showAllOffers')
    },
    {
      id: 'forbrukslan',
      label: t('loan.unsecuredLoans'),
      icon: CreditCard,
      description: t('loan.consumerLoan')
    },
    {
      id: 'refinansiering',
      label: t('loan.refinanceDebt'),
      icon: ArrowRightLeft,
      description: t('loan.refinancing')
    },
    {
      id: 'boliglan',
      label: t('loan.securedHomeLoan'),
      icon: Home,
      description: t('loan.homeLoan')
    },
    {
      id: 'billan',
      label: t('loan.carLoan'),
      icon: Car,
      description: t('loan.vehicleFinancing')
    }
  ];
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t('loan.selectCategory')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categoriesTranslated.map((category) => {
          const isSelected = selectedCategory === category.id || (selectedCategory === null && category.id === 'all');
          const IconComponent = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id === 'all' ? null : category.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 group
                hover:scale-105 hover:shadow-lg
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-md' 
                  : 'border-border bg-card hover:border-primary/50'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                {IconComponent ? (
                  <IconComponent 
                    className={`w-8 h-8 transition-colors ${
                      isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`} 
                  />
                ) : (
                  <div className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    isSelected ? 'border-primary bg-primary/20' : 'border-muted-foreground group-hover:border-primary'
                  }`} />
                )}
                <div className="text-center">
                  <div className={`font-semibold text-sm transition-colors ${
                    isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  }`}>
                    {category.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {category.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LoanCategoryIcons;