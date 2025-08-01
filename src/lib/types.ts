export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  reorderThreshold: number;
  supplier: string;
  expirationDate?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  categories: string[];
}
