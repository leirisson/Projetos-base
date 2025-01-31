import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CategoryFilter } from './components/CategoryFilter';
import { CartModal } from './components/CartModal';
import { products } from './data/products';
import { Category, Product, CartItem } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => 'id' in item.product && item.product.id === product.id);
      
      if (existingItem) {
        return prev.map((item) =>
          'id' in item.product && item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { id: crypto.randomUUID(), product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;