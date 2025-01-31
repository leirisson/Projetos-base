import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { CheckoutForm } from './CheckoutForm';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    const price = 'price' in item.product ? item.product.price : 0;
    return sum + price * item.quantity;
  }, 0);

  const handleClose = () => {
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            {isCheckingOut ? 'Finalizar Pedido' : 'Carrinho'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {isCheckingOut ? (
            <CheckoutForm
              items={items}
              total={total}
              onClose={handleClose}
            />
          ) : items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Seu carrinho está vazio
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {'name' in item.product ? item.product.name : 'Hambúrguer Personalizado'}
                    </h3>
                    {item.notes && (
                      <p className="text-sm text-gray-500">{item.notes}</p>
                    )}
                    <div className="text-yellow-600 font-medium">
                      R$ {('price' in item.product ? item.product.price : 0).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isCheckingOut && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-lg">
                R$ {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setIsCheckingOut(true)}
              disabled={items.length === 0}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};