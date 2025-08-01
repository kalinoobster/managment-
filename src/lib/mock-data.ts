import type { Product, Supplier, Sale, Order } from './types';

export const mockProducts: Product[] = [
  { id: 'PROD001', name: 'Organic Apples', category: 'Fruits', stock: 150, reorderThreshold: 50, supplier: 'FreshFarms Inc.', expirationDate: '2024-12-31', price: 2.50, cost: 1.50 },
  { id: 'PROD002', name: 'Whole Wheat Bread', category: 'Bakery', stock: 80, reorderThreshold: 30, supplier: 'Bakery Co.', expirationDate: '2024-11-15', price: 4.00, cost: 2.00 },
  { id: 'PROD003', name: 'Free-Range Eggs', category: 'Dairy & Eggs', stock: 200, reorderThreshold: 75, supplier: 'Happy Hens', expirationDate: '2024-11-20', price: 5.00, cost: 3.00 },
  { id: 'PROD004', name: 'Cheddar Cheese', category: 'Dairy & Eggs', stock: 45, reorderThreshold: 50, supplier: 'Cheese Masters', expirationDate: '2025-01-20', price: 7.50, cost: 4.50 },
  { id: 'PROD005', name: 'Lean Ground Beef', category: 'Meat', stock: 90, reorderThreshold: 40, supplier: 'Butcher Bros', expirationDate: '2024-11-10', price: 10.00, cost: 6.00 },
  { id: 'PROD006', name: 'Salmon Fillet', category: 'Seafood', stock: 35, reorderThreshold: 20, supplier: 'Ocean Fresh', expirationDate: '2024-11-08', price: 15.00, cost: 10.00 },
  { id: 'PROD007', name: 'Broccoli', category: 'Vegetables', stock: 120, reorderThreshold: 60, supplier: 'GreenGrocers', expirationDate: '2024-11-12', price: 1.50, cost: 0.75 },
  { id: 'PROD008', name: 'Organic Milk', category: 'Dairy & Eggs', stock: 60, reorderThreshold: 30, supplier: 'Happy Hens', expirationDate: '2024-11-25', price: 3.50, cost: 2.20 },
  { id: 'PROD009', name: 'Sourdough Bread', category: 'Bakery', stock: 25, reorderThreshold: 30, supplier: 'Bakery Co.', expirationDate: '2024-11-14', price: 4.50, cost: 2.50 },
  { id: 'PROD010', name: 'Chicken Breast', category: 'Meat', stock: 100, reorderThreshold: 50, supplier: 'Butcher Bros', expirationDate: '2024-11-09', price: 8.00, cost: 5.00 },
  { id: 'PROD011', name: 'Banana', category: 'Fruits', stock: 200, reorderThreshold: 80, supplier: 'FreshFarms Inc.', expirationDate: '2024-11-10', price: 0.79, cost: 0.40 },
  { id: 'PROD012', name: 'Potato Chips', category: 'Snacks', stock: 300, reorderThreshold: 100, supplier: 'Snack Masters', expirationDate: '2025-03-01', price: 3.00, cost: 1.20 },
  { id: 'PROD013', name: 'Cola', category: 'Beverages', stock: 250, reorderThreshold: 100, supplier: 'Drink Corp', expirationDate: '2025-06-01', price: 1.50, cost: 0.60 },
  { id: 'PROD014', name: 'Cleaning Spray', category: 'Others', stock: 75, reorderThreshold: 25, supplier: 'Clean Co', expirationDate: '2026-01-01', price: 5.00, cost: 2.50 },
  { id: 'PROD015', name: 'Paper Towels', category: 'Others', stock: 15, reorderThreshold: 40, supplier: 'Clean Co', expirationDate: '2026-01-01', price: 2.00, cost: 1.00 },
];

export const mockSuppliers: Supplier[] = [
  { id: 'SUP001', name: 'FreshFarms Inc.', contactPerson: 'John Appleseed', email: 'john@freshfarms.com', phone: '555-0101', categories: ['Fruits', 'Vegetables'] },
  { id: 'SUP002', name: 'Bakery Co.', contactPerson: 'Jane Dough', email: 'jane@bakeryco.com', phone: '555-0102', categories: ['Bakery'] },
  { id: 'SUP003', name: 'Happy Hens', contactPerson: 'Peter Pan', email: 'pete@happyhens.com', phone: '555-0103', categories: ['Dairy & Eggs'] },
  { id: 'SUP004', name: 'Cheese Masters', contactPerson: 'Anne Brie', email: 'anne@cheesemasters.com', phone: '555-0104', categories: ['Dairy & Eggs'] },
  { id: 'SUP005', name: 'Butcher Bros', contactPerson: 'Tom Hardy', email: 'tom@butcherbros.com', phone: '555-0105', categories: ['Meat'] },
  { id: 'SUP006', name: 'Ocean Fresh', contactPerson: 'Sandy Shore', email: 'sandy@oceanfresh.com', phone: '555-0106', categories: ['Seafood'] },
  { id: 'SUP007', name: 'GreenGrocers', contactPerson: 'Holly Green', email: 'holly@greengrocers.com', phone: '555-0107', categories: ['Vegetables'] },
  { id: 'SUP008', name: 'Snack Masters', contactPerson: 'Chip Dell', email: 'chip@snackmasters.com', phone: '555-0108', categories: ['Snacks'] },
  { id: 'SUP009', name: 'Drink Corp', contactPerson: 'Fizzy Pop', email: 'fizzy@drinkcorp.com', phone: '555-0109', categories: ['Beverages'] },
  { id: 'SUP010', name: 'Clean Co', contactPerson: 'Squeaky Clean', email: 'squeaky@cleanco.com', phone: '555-0110', categories: ['Others'] },
];

const today = new Date();
const lastMonth = new Date();
lastMonth.setMonth(today.getMonth() - 1);
const lastYear = new Date();
lastYear.setFullYear(today.getFullYear() - 1);


export const mockSales: Sale[] = [
    { id: 'SALE001', customerName: 'John Doe', productName: 'Organic Apples', date: today.toISOString().split('T')[0], quantity: 5, price: 2.50, total: 12.50 },
    { id: 'SALE002', customerName: 'Jane Smith', productName: 'Whole Wheat Bread', date: today.toISOString().split('T')[0], quantity: 2, price: 4.00, total: 8.00 },
    { id: 'SALE003', customerName: 'Mike Johnson', productName: 'Free-Range Eggs', date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 1, price: 5.00, total: 5.00 },
    { id: 'SALE004', customerName: 'Emily Davis', productName: 'Cheddar Cheese', date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 1, price: 7.50, total: 7.50 },
    { id: 'SALE005', customerName: 'Chris Brown', productName: 'Lean Ground Beef', date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 2, price: 10.00, total: 20.00 },
    { id: 'SALE006', customerName: 'John Doe', productName: 'Salmon Fillet', date: lastMonth.toISOString().split('T')[0], quantity: 1, price: 15.00, total: 15.00 },
    { id: 'SALE007', customerName: 'Jessica White', productName: 'Broccoli', date: lastMonth.toISOString().split('T')[0], quantity: 3, price: 1.50, total: 4.50 },
    { id: 'SALE008', customerName: 'David Wilson', productName: 'Organic Milk', date: new Date(lastMonth.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 4, price: 3.50, total: 14.00 },
    { id: 'SALE009', customerName: 'Sarah Miller', productName: 'Sourdough Bread', date: new Date(lastMonth.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 2, price: 4.50, total: 9.00 },
    { id: 'SALE010', customerName: 'Robert Garcia', productName: 'Chicken Breast', date: lastYear.toISOString().split('T')[0], quantity: 5, price: 8.00, total: 40.00 },
    { id: 'SALE011', customerName: 'Patricia Martinez', productName: 'Banana', date: new Date(lastYear.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 12, price: 0.79, total: 9.48 },
    { id: 'SALE012', customerName: 'Linda Rodriguez', productName: 'Potato Chips', date: new Date(lastYear.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 10, price: 3.00, total: 30.00 },
    { id: 'SALE013', customerName: 'James Hernandez', productName: 'Cola', date: new Date(lastYear.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 24, price: 1.50, total: 36.00 },
    { id: 'SALE014', customerName: 'Mary Lopez', productName: 'Cleaning Spray', date: new Date(lastYear.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], quantity: 2, price: 5.00, total: 10.00 },
];

export const mockOrders: Order[] = [
  { id: "ORD001", customerName: "John Doe", date: today.toISOString().split('T')[0], total: 150.0, status: "Delivered", productName: 'Organic Apples', quantity: 60, price: 2.50, cost: 1.50 },
  { id: "ORD002", customerName: "Jane Smith", date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], total: 75.5, status: "Shipped", productName: 'Whole Wheat Bread', quantity: 19, price: 4.00, cost: 2.00 },
  { id: "ORD003", customerName: "Mike Johnson", date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], total: 220.0, status: "Processing", productName: 'Free-Range Eggs', quantity: 44, price: 5.00, cost: 3.00 },
  { id: "ORD004", customerName: "Emily Davis", date: lastMonth.toISOString().split('T')[0], total: 35.0, status: "Delivered", productName: 'Cheddar Cheese', quantity: 5, price: 7.50, cost: 4.50 },
  { id: "ORD005", customerName: "Chris Brown", date: lastMonth.toISOString().split('T')[0], total: 12.0, status: "Cancelled", productName: 'Lean Ground Beef', quantity: 1, price: 10.00, cost: 6.00 },
  { id: "ORD006", customerName: "Patricia Martinez", date: new Date(lastMonth.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], total: 45.0, status: "Shipped", productName: 'Sourdough Bread', quantity: 10, price: 4.50, cost: 2.50 },
  { id: "ORD007", customerName: "Robert Garcia", date: new Date(lastMonth.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], total: 80.0, status: "Delivered", productName: 'Chicken Breast', quantity: 10, price: 8.00, cost: 5.00 },
  { id: "ORD008", customerName: "Linda Rodriguez", date: lastYear.toISOString().split('T')[0], total: 300.0, status: "Delivered", productName: 'Potato Chips', quantity: 100, price: 3.00, cost: 1.20 },
  { id: "ORD009", customerName: "James Hernandez", date: new Date(lastYear.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], total: 75.0, status: "Processing", productName: 'Cola', quantity: 50, price: 1.50, cost: 0.60 },
  { id: "ORD010", customerName: "Mary Lopez", date: new Date(lastYear.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], total: 100.0, status: "Cancelled", productName: 'Paper Towels', quantity: 50, price: 2.00, cost: 1.00 },
];
