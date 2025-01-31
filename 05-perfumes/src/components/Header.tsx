import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4 lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Zeen Perfumes</h1>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Home</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Perfumes</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Brands</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">About</a></li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Search className="h-6 w-6 text-gray-600" />
            <button
              onClick={onCartClick}
              className="relative p-2"
            >
              <ShoppingBag className="h-6 w-6 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};