import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: { value: Category; label: string }[] = [
    { value: 'burgers', label: 'Hambúrgueres' },
    { value: 'portions', label: 'Porções' },
    { value: 'drinks', label: 'Bebidas' },
    { value: 'desserts', label: 'Sobremesas' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full ${
          selectedCategory === null
            ? 'bg-yellow-400 text-black'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelectCategory(category.value)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category.value
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};