import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem, PaymentMethod } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onClose: () => void;
  onCompleteOrder: (orderData: any) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, onClose, onCompleteOrder }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: '' as PaymentMethod,
    installments: 1,
    needChange: false,
    changeFor: 0,
    observations: ''
  });

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteOrder({
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      },
      items,
      payment: {
        method: formData.paymentMethod,
        installments: formData.installments,
        needChange: formData.needChange,
        changeFor: formData.changeFor
      },
      observations: formData.observations,
      total
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Checkout</h2>
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <input
                    type="tel"
                    required
                    className="w-full p-2 border rounded"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Endereço</label>
                  <textarea
                    required
                    className="w-full p-2 border rounded"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-black text-white py-3 rounded-lg mt-4"
                >
                  Continuar
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Forma de Pagamento</label>
                  <div className="space-y-2">
                    {['pix', 'credit', 'debit', 'cash'].map((method) => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                          className="mr-2"
                        />
                        {method === 'pix' && 'PIX'}
                        {method === 'credit' && 'Cartão de Crédito'}
                        {method === 'debit' && 'Cartão de Débito'}
                        {method === 'cash' && 'Dinheiro'}
                      </label>
                    ))}
                  </div>
                </div>

                {formData.paymentMethod === 'credit' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Parcelas</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={formData.installments}
                      onChange={(e) => setFormData({ ...formData, installments: Number(e.target.value) })}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                        <option key={n} value={n}>
                          {n}x de {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(total / n)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {formData.paymentMethod === 'cash' && (
                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={formData.needChange}
                        onChange={(e) => setFormData({ ...formData, needChange: e.target.checked })}
                        className="mr-2"
                      />
                      Precisa de troco?
                    </label>
                    {formData.needChange && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Troco para quanto?</label>
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          value={formData.changeFor}
                          onChange={(e) => setFormData({ ...formData, changeFor: Number(e.target.value) })}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Observações</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={formData.observations}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  />
                </div>

                <div className="flex justify-between items-center py-4 border-t mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded-lg"
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};