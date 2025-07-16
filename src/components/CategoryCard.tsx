
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, onClick }) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="bg-card text-card-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-border hover:border-primary p-6 text-center group" 
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-6 text-foreground">{t(title as any) || title}</h3>
      <Button 
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        variant="default"
        className="w-full transition-all duration-300"
      >
        {t('category.viewPrices')}
      </Button>
    </div>
  );
};

export default CategoryCard;
