
import React from 'react';
import { Hammer, Wrench, Zap, Home, Paintbrush } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HandverkereCategoryIconsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const getCategories = (t: (key: string) => string) => [
  {
    id: 'all',
    label: t('handworkmen.all'),
    icon: null,
    description: t('handworkmen.allDescription')
  },
  {
    id: 'renovation',
    label: t('handworkmen.renovation'),
    icon: Hammer,
    description: t('handworkmen.renovationDescription')
  },
  {
    id: 'repair',
    label: t('handworkmen.repair'),
    icon: Wrench,
    description: t('handworkmen.repairDescription')
  },
  {
    id: 'electrical',
    label: t('handworkmen.electrical'),
    icon: Zap,
    description: t('handworkmen.electricalDescription')
  },
  {
    id: 'plumbing',
    label: t('handworkmen.plumbing'),
    icon: Home,
    description: t('handworkmen.plumbingDescription')
  },
  {
    id: 'painting',
    label: t('handworkmen.painting'),
    icon: Paintbrush,
    description: t('handworkmen.paintingDescription')
  }
];

const HandverkereCategoryIcons: React.FC<HandverkereCategoryIconsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { t } = useLanguage();
  const categories = getCategories(t);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t('handworkmen.selectCategory')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {categories.map((category) => {
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

export default HandverkereCategoryIcons;
