import type { Product, Supplier } from './types';

export const mockProducts: Product[] = [
  { id: 'PROD001', name: 'Organic Apples', category: 'Fruits', stock: 150, reorderThreshold: 50, supplier: 'FreshFarms Inc.', expirationDate: '2024-12-31' },
  { id: 'PROD002', name: 'Whole Wheat Bread', category: 'Bakery', stock: 80, reorderThreshold: 30, supplier: 'Bakery Co.', expirationDate: '2024-11-15' },
  { id: 'PROD003', name: 'Free-Range Eggs', category: 'Dairy & Eggs', stock: 200, reorderThreshold: 75, supplier: 'Happy Hens', expirationDate: '2024-11-20' },
  { id: 'PROD004', name: 'Cheddar Cheese', category: 'Dairy & Eggs', stock: 45, reorderThreshold: 50, supplier: 'Cheese Masters', expirationDate: '2025-01-20' },
  { id: 'PROD005', name: 'Lean Ground Beef', category: 'Meat', stock: 90, reorderThreshold: 40, supplier: 'Butcher Bros', expirationDate: '2024-11-10' },
  { id: 'PROD006', name: 'Salmon Fillet', category: 'Seafood', stock: 35, reorderThreshold: 20, supplier: 'Ocean Fresh', expirationDate: '2024-11-08' },
  { id: 'PROD007', name: 'Broccoli', category: 'Vegetables', stock: 120, reorderThreshold: 60, supplier: 'GreenGrocers', expirationDate: '2024-11-12' },
];

export const mockSuppliers: Supplier[] = [
  { id: 'SUP001', name: 'FreshFarms Inc.', contactPerson: 'John Appleseed', email: 'john@freshfarms.com', phone: '555-0101', categories: ['Fruits', 'Vegetables'] },
  { id: 'SUP002', name: 'Bakery Co.', contactPerson: 'Jane Dough', email: 'jane@bakeryco.com', phone: '555-0102', categories: ['Bakery'] },
  { id: 'SUP003', name: 'Happy Hens', contactPerson: 'Peter Pan', email: 'pete@happyhens.com', phone: '555-0103', categories: ['Dairy & Eggs'] },
  { id: 'SUP004', name: 'Cheese Masters', contactPerson: 'Anne Brie', email: 'anne@cheesemasters.com', phone: '555-0104', categories: ['Dairy & Eggs'] },
  { id: 'SUP005', name: 'Butcher Bros', contactPerson: 'Tom Hardy', email: 'tom@butcherbros.com', phone: '555-0105', categories: ['Meat'] },
  { id: 'SUP006', name: 'Ocean Fresh', contactPerson: 'Sandy Shore', email: 'sandy@oceanfresh.com', phone: '555-0106', categories: ['Seafood'] },
  { id: 'SUP007', name: 'GreenGrocers', contactPerson: 'Holly Green', email: 'holly@greengrocers.com', phone: '555-0107', categories: ['Vegetables'] },
];
