
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
}

export type AppView = 'home' | 'cart' | 'checkout' | 'payment' | 'success' | 'auth';

export enum PaymentMethod {
  COD = 'Cash on Delivery',
  CARD = 'Credit/Debit Card',
  UPI = 'UPI Payment',
  NET_BANKING = 'Net Banking'
}
