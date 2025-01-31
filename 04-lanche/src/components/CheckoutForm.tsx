import React, { useState } from 'react';
import { CartItem, PaymentMethod } from '../types';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  onClose: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  items,
  total,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: '' as PaymentMethod,
    changeAmount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the order message for WhatsApp
    const itemsList = items
      .map((item) => {
        const productName = 'name' in item.product ? item.product.name : 'Hambúrguer Personalizado';
        return `${item.quantity}x ${productName} - R$ ${('price' in item.product ? item.product.price * item.quantity : 0).toFixed(2)}`;
      })
      .join('\n');

    const message = `*Novo Pedido - Zeen Lanches*\n\n` +
      `*Cliente:* ${formData.name}\n` +
      `*Endereço:* ${formData.address}\n\n` +
      `*Itens do Pedido:*\n${itemsList}\n\n` +
      `*Total:* R$ ${total.toFixed(2)}\n\n` +
      `*Forma de Pagamento:* ${formData.paymentMethod}` +
      (formData.paymentMethod === 'cash' && formData.changeAmount ? `\n*Troco para:* R$ ${formData.changeAmount}` : '');

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '+5592993129862'; // Replace with the actual WhatsApp number
    // const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B55${whatsappNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Endereço de Entrega
        </label>
        <textarea
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Forma de Pagamento
        </label>
        <select
          required
          value={formData.paymentMethod}
          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="">Selecione uma opção</option>
          <option value="pix">PIX</option>
          <option value="credit">Cartão de Crédito</option>
          <option value="debit">Cartão de Débito</option>
          <option value="cash">Dinheiro</option>
        </select>
      </div>

      {formData.paymentMethod === 'cash' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Troco para quanto?
          </label>
          <input
            type="number"
            min={total}
            step="0.01"
            required
            value={formData.changeAmount}
            onChange={(e) => setFormData({ ...formData, changeAmount: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold"
      >
        Enviar Pedido via WhatsApp
      </button>
    </form>
  );
};