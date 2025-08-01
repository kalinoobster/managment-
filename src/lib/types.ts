export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  reorderThreshold: number;
  supplier: string;
  expirationDate?: string;
  price: number;
  cost: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  categories: string[];
}

export interface Sale {
  id: string;
  customerName: string;
  productName: string;
  date: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  productName: string;
  quantity: number;
  price: number;
  cost: number;
}
