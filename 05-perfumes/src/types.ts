export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  fragrance: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'pix' | 'credit' | 'debit' | 'cash';

export interface Order {
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: CartItem[];
  payment: {
    method: PaymentMethod;
    installments?: number;
    needChange?: boolean;
    changeFor?: number;
  };
  observations?: string;
  total: number;
}