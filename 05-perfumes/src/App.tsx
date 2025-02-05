import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { products } from './data/products';
import { CartItem, Product, Order } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    fragrance: '',
    minPrice: '',
    maxPrice: ''
  });

  const addToCart = (product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (productId: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeCartItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const handleCompleteOrder = async (orderData: Order) => {
    // Format WhatsApp message
    const message = `*Novo Pedido - Zeen Perfumes*\n\n` +
      `*Cliente:* ${orderData.customer.name}\n` +
      `*Telefone:* ${orderData.customer.phone}\n` +
      `*Endereço:* ${orderData.customer.address}\n\n` +
      `*Itens:*\n${orderData.items.map(item => 
        `- ${item.product.name} (${item.quantity}x) - ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(item.product.price * item.quantity)}`
      ).join('\n')}\n\n` +
      `*Total:* ${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(orderData.total)}\n\n` +
      `*Forma de Pagamento:* ${
        orderData.payment.method === 'pix' ? 'PIX' :
        orderData.payment.method === 'credit' ? `Cartão de Crédito (${orderData.payment.installments}x)` :
        orderData.payment.method === 'debit' ? 'Cartão de Débito' :
        'Dinheiro' + (orderData.payment.needChange ? ` (Troco para ${orderData.payment.changeFor})` : '')
      }\n\n` +
      (orderData.observations ? `*Observações:* ${orderData.observations}\n\n` : '');

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5592993129862?text=${encodedMessage}`; // Replace with actual number

    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');

    // Clear cart and close checkout
    setCartItems([]);
    setShowCheckout(false);
  };

  const filteredProducts = products.filter(product => {
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.fragrance && product.fragrance !== filters.fragrance) return false;
    if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Descubra sua fragrância ideal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa coleção exclusiva de perfumes premium, cuidadosamente selecionados para 
            expressar sua personalidade única.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="">Todas as marcas</option>
                <option value="Zeen">Zeen</option>
                <option value="Zeen Premium">Zeen Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fragrância</label>
              <select
                value={filters.fragrance}
                onChange={(e) => setFilters({ ...filters, fragrance: e.target.value })}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="">Todas as fragrâncias</option>
                <option value="Woody">Amadeirado</option>
                <option value="Fresh">Fresh</option>
                <option value="Floral">Floral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço mínimo</label>
              <input
                type="number"
                placeholder="R$ 0,00"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço máximo</label>
              <input
                type="number"
                placeholder="R$ 1000,00"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </main>

      {/* Cart Modal */}
      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveItem={removeCartItem}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          items={cartItems}
          onClose={() => setShowCheckout(false)}
          onCompleteOrder={handleCompleteOrder}
        />
      )}
    </div>
  );
}

export default App;