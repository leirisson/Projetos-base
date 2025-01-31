import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-64">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};