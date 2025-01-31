import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};