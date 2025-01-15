import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Sandwich, Coffee, Pizza, IceCream } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  icon: React.ReactNode;
}

interface CartItem extends MenuItem {
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "X-Burger Especial",
      description: "Hambúrguer artesanal, queijo, alface, tomate e molho especial",
      price: 25.90,
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=500",
      category: "Lanches",
      icon: <Sandwich className="w-6 h-6" />
    },
    {
      id: 2,
      name: "Pizza Margherita",
      description: "Molho de tomate, mussarela, manjericão fresco",
      price: 45.90,
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=500",
      category: "Pizzas",
      icon: <Pizza className="w-6 h-6" />
    },
    {
      id: 3,
      name: "Café Gelado",
      description: "Café especial, leite cremoso e calda de chocolate",
      price: 12.90,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=500",
      category: "Bebidas",
      icon: <Coffee className="w-6 h-6" />
    },
    {
      id: 4,
      name: "Sundae de Chocolate",
      description: "Sorvete de baunilha, calda quente de chocolate, chantilly",
      price: 18.90,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=500",
      category: "Sobremesas",
      icon: <IceCream className="w-6 h-6" />
    },
  ];

  const addToCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === itemId);
      if (existingItem?.quantity === 1) {
        return currentCart.filter(item => item.id !== itemId);
      }
      return currentCart.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;

    const phoneNumber = "5592993129862"; // Substitua pelo número do WhatsApp do estabelecimento
    
    let message = "🛍️ *Novo Pedido*\n\n";
    
    // Adiciona cada item do carrinho
    cart.forEach(item => {
      message += `*${item.quantity}x ${item.name}*\n`;
      message += `R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    // Adiciona o total e forma de pagamento
    message += "------------------------\n";
    message += `*Total: R$ ${total.toFixed(2)}*\n`;
    message += `*Forma de Pagamento: ${
      paymentMethod === 'pix' ? 'PIX' :
      paymentMethod === 'card' ? 'Cartão' :
      paymentMethod === 'money' ? 'Dinheiro' : 'Não selecionado'
    }*\n\n`;
    
    // Solicita endereço
    message += "Por favor, confirme seu endereço de entrega:";
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abre o WhatsApp com a mensagem
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Cardápio Digital</h1>
          <p className="text-orange-100">Escolha seus lanches favoritos</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Menu Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      </div>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-orange-600">
                          R$ {item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Seu Pedido</h2>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          R$ {item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4 text-orange-600" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4 text-orange-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-orange-600">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Forma de Pagamento
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setPaymentMethod('pix')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          paymentMethod === 'pix'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        PIX
                      </button>
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          paymentMethod === 'card'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Cartão
                      </button>
                      <button
                        onClick={() => setPaymentMethod('money')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          paymentMethod === 'money'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Dinheiro
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={sendToWhatsApp}
                    className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Fazer Pedido pelo WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;