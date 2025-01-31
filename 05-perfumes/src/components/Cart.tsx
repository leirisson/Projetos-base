import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, change: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Carrinho</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Seu carrinho está vazio</p>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex items-center mb-4 p-2 border-b">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.product.price)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="p-1"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="p-1"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="ml-auto text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(total)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-black text-white py-3 rounded-lg disabled:bg-gray-300"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};