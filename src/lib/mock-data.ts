import type { Product, Supplier, Sale, Order } from './types';

export const mockProducts: Product[] = [
  { id: 'PROD001', name: 'Organic Apples', category: 'Fruits', stock: 150, reorderThreshold: 50, supplier: 'FreshFarms Inc.', expirationDate: '2024-12-31', price: 2.50, cost: 1.50 },
  { id: 'PROD002', name: 'Whole Wheat Bread', category: 'Bakery', stock: 80, reorderThreshold: 30, supplier: 'Bakery Co.', expirationDate: '2024-11-15', price: 4.00, cost: 2.00 },
  { id: 'PROD003', name: 'Free-Range Eggs', category: 'Dairy & Eggs', stock: 200, reorderThreshold: 75, supplier: 'Happy Hens', expirationDate: '2024-11-20', price: 5.00, cost: 3.00 },
  { id: 'PROD004', name: 'Cheddar Cheese', category: 'Dairy & Eggs', stock: 45, reorderThreshold: 50, supplier: 'Cheese Masters', expirationDate: '2025-01-20', price: 7.50, cost: 4.50 },
  { id: 'PROD005', name: 'Lean Ground Beef', category: 'Meat', stock: 90, reorderThreshold: 40, supplier: 'Butcher Bros', expirationDate: '2024-11-10', price: 10.00, cost: 6.00 },
  { id: 'PROD006', name: 'Salmon Fillet', category: 'Seafood', stock: 35, reorderThreshold: 20, supplier: 'Ocean Fresh', expirationDate: '2024-11-08', price: 15.00, cost: 10.00 },
  { id: 'PROD007', name: 'Broccoli', category: 'Vegetables', stock: 120, reorderThreshold: 60, supplier: 'GreenGrocers', expirationDate: '2024-11-12', price: 1.50, cost: 0.75 },
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

export const mockSales: Sale[] = [
    { id: 'SALE001', customerName: 'John Doe', productName: 'Organic Apples', date: '2024-07-31', quantity: 5, price: 2.50, total: 12.50 },
    { id: 'SALE002', customerName: 'Jane Smith', productName: 'Whole Wheat Bread', date: '2024-07-31', quantity: 2, price: 4.00, total: 8.00 },
    { id: 'SALE003', customerName: 'Mike Johnson', productName: 'Free-Range Eggs', date: '2024-07-30', quantity: 1, price: 5.00, total: 5.00 },
    { id: 'SALE004', customerName: 'Emily Davis', productName: 'Cheddar Cheese', date: '2024-07-30', quantity: 1, price: 7.50, total: 7.50 },
    { id: 'SALE005', customerName: 'Chris Brown', productName: 'Lean Ground Beef', date: '2024-07-29', quantity: 2, price: 10.00, total: 20.00 },
    { id: 'SALE006', customerName: 'John Doe', productName: 'Salmon Fillet', date: '2024-07-29', quantity: 1, price: 15.00, total: 15.00 },
    { id: 'SALE007', customerName: 'Jessica White', productName: 'Broccoli', date: '2024-07-28', quantity: 3, price: 1.50, total: 4.50 },
];

export const mockOrders: Order[] = [
  { id: "ORD001", customerName: "John Doe", date: "2024-07-31", total: 150.0, status: "Delivered", productName: 'Organic Apples', quantity: 60, price: 2.50, cost: 1.50 },
  { id: "ORD002", customerName: "Jane Smith", date: "2024-07-30", total: 75.5, status: "Shipped", productName: 'Whole Wheat Bread', quantity: 19, price: 4.00, cost: 2.00 },
  { id: "ORD003", customerName: "Mike Johnson", date: "2024-07-29", total: 220.0, status: "Processing", productName: 'Free-Range Eggs', quantity: 44, price: 5.00, cost: 3.00 },
  { id: "ORD004", customerName: "Emily Davis", date: "2024-07-28", total: 35.0, status: "Delivered", productName: 'Cheddar Cheese', quantity: 5, price: 7.50, cost: 4.50 },
  { id: "ORD005", customerName: "Chris Brown", date: "2024-07-27", total: 12.0, status: "Cancelled", productName: 'Lean Ground Beef', quantity: 1, price: 10.00, cost: 6.00 },
];
