
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryHeaderProps {
  categoryName: string;
  onBackClick: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryName, onBackClick }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <Button
          onClick={onBackClick}
          variant="ghost"
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('navigation.backToOverview')}
        </Button>
        <h1 className="text-4xl font-bold capitalize">{categoryName}</h1>
        <p className="text-xl text-blue-100 mt-2">
          {t('navigation.compareAndFind')}
        </p>
      </div>
    </div>
  );
};

export default CategoryHeader;
