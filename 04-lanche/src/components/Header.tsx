import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

interface HeaderProps {
  onCartClick: () => void;
  cartItemsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, cartItemsCount }) => {
  return (
    <header className="bg-black py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Menu className="text-yellow-400 h-8 w-8 mr-4 lg:hidden" />
          <h1 className="text-yellow-400 text-3xl font-bold">Zeen Lanches</h1>
        </div>
        <button
          onClick={onCartClick}
          className="relative text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};