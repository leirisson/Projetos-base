export type Category = 'burgers' | 'portions' | 'drinks' | 'desserts';

export type BreadType = 'traditional' | 'brioche' | 'australian' | 'no-bread';
export type MeatType = 'beef' | 'chicken' | 'vegetarian';
export type CheeseType = 'cheddar' | 'american' | 'mozzarella' | 'gorgonzola' | 'no-cheese';
export type Extra = 'bacon' | 'caramelized-onion' | 'egg' | 'lettuce' | 'tomato';
export type SauceType = 'barbecue' | 'special-mayo' | 'mustard' | 'ketchup' | 'house-special';
export type PaymentMethod = 'pix' | 'credit' | 'debit' | 'cash';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
}

export interface CustomBurger {
  bread: BreadType;
  meat: MeatType;
  cheese: CheeseType;
  extras: Extra[];
  sauces: SauceType[];
}

export interface CartItem {
  id: string;
  product: Product | CustomBurger;
  quantity: number;
  notes?: string;
}

export interface Order {
  items: CartItem[];
  customerName: string;
  paymentMethod: PaymentMethod;
  address: string;
  change?: number;
  total: number;
}