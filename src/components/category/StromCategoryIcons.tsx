
import React, { useEffect, useMemo } from 'react';
import { Zap, Lock, Leaf, Briefcase, Home, Mountain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StromCategoryIconsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const StromCategoryIcons: React.FC<StromCategoryIconsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { t } = useLanguage();

  console.log('⚡ StromCategoryIcons rendered with selectedCategory:', selectedCategory);

  useEffect(() => {
    console.log('⚡ StromCategoryIcons useEffect - selectedCategory changed to:', selectedCategory);
  }, [selectedCategory]);

  const categories = useMemo(() => [
    {
      id: 'all',
      label: t('power.contractTypes.all'),
      icon: null,
      description: t('electricity.allDescription')
    },
    {
      id: 'spot',
      label: t('power.contractTypes.spot'),
      icon: Zap,
      description: t('electricity.spotDescription')
    },
    {
      id: 'fast',
      label: t('power.contractTypes.fixed'),
      icon: Lock,
      description: t('electricity.fixedDescription')
    },
    {
      id: 'variabel',
      label: t('power.contractTypes.variable'),
      icon: Zap,
      description: t('electricity.variableDescription')
    },
    {
      id: 'gronn',
      label: t('power.contractTypes.green'),
      icon: Leaf,
      description: t('electricity.greenDescription')
    },
    {
      id: 'bolig',
      label: t('power.contractTypes.residential'),
      icon: Home,
      description: t('electricity.residentialDescription')
    },
    {
      id: 'hytte',
      label: t('power.contractTypes.cabin'),
      icon: Mountain,
      description: t('electricity.cabinDescription')
    },
    {
      id: 'bedrift',
      label: t('electricity.business'),
      icon: Briefcase,
      description: t('electricity.businessDescription')
    }
  ], [t]);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t('electricity.selectCategory')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const isSelected = useMemo(() => {
            const selected = selectedCategory === category.id || (selectedCategory === null && category.id === 'all');
            console.log('⚡ Category', category.id, 'isSelected:', selected, 'selectedCategory:', selectedCategory);
            return selected;
          }, [selectedCategory, category.id]);
          
          const IconComponent = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => {
                console.log('⚡ StromCategoryIcons button clicked:', category.id, 'current selectedCategory:', selectedCategory);
                const newCategory = category.id === 'all' ? null : category.id;
                console.log('⚡ Calling onCategoryChange with:', newCategory);
                onCategoryChange(newCategory);
              }}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 group
                hover:scale-105 hover:shadow-lg
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20' 
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

export default StromCategoryIcons;
