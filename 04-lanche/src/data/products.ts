import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
    price: 25.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'burgers'
  },
  {
    id: '2',
    name: 'Onion Rings',
    description: 'Crispy golden onion rings with our house special sauce',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80',
    category: 'portions'
  },
  {
    id: '3',
    name: 'Milkshake',
    description: 'Creamy vanilla milkshake with whipped cream',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    category: 'drinks'
  },
  // Add more products as needed
];