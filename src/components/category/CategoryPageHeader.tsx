
import React from 'react';
import Header from '@/components/Header';
import CategoryHeader from '@/components/category/CategoryHeader';

interface CategoryPageHeaderProps {
  categoryName: string;
  onBackClick: () => void;
  onMeldPaClick: () => void;
}

const CategoryPageHeader = ({ categoryName, onBackClick, onMeldPaClick }: CategoryPageHeaderProps) => {
  return (
    <>
      <Header onMeldPaClick={onMeldPaClick} />
      <main className="pt-20">
        <CategoryHeader 
          categoryName={categoryName}
          onBackClick={onBackClick}
        />
      </main>
    </>
  );
};

export default CategoryPageHeader;
