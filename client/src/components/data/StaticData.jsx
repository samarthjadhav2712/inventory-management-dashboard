// Static JSON Data
export const STATIC_INVENTORY = [
  { id: 1, name: 'Laptop Dell XPS', category: 'Electronics', quantity: 45, minStock: 20, location: 'Warehouse A', price: 1200 },
  { id: 2, name: 'Office Chair', category: 'Furniture', quantity: 12, minStock: 15, location: 'Warehouse B', price: 150 },
  { id: 3, name: 'Wireless Mouse', category: 'Electronics', quantity: 150, minStock: 50, location: 'Warehouse A', price: 25 },
  { id: 4, name: 'Standing Desk', category: 'Furniture', quantity: 8, minStock: 10, location: 'Warehouse B', price: 450 },
  { id: 5, name: 'USB-C Cable', category: 'Accessories', quantity: 200, minStock: 100, location: 'Warehouse C', price: 15 },
  { id: 6, name: 'Monitor 27"', category: 'Electronics', quantity: 30, minStock: 25, location: 'Warehouse A', price: 300 },
  { id: 7, name: 'Keyboard Mechanical', category: 'Electronics', quantity: 5, minStock: 20, location: 'Warehouse A', price: 120 },
  { id: 8, name: 'Desk Lamp', category: 'Accessories', quantity: 40, minStock: 30, location: 'Warehouse C', price: 35 },
];

export const STATIC_MOVEMENTS = [
  { id: 1, itemName: 'Laptop Dell XPS', type: 'IN', quantity: 20, date: '2026-01-08', location: 'Warehouse A', user: 'John Doe' },
  { id: 2, itemName: 'Office Chair', type: 'OUT', quantity: 5, date: '2026-01-08', location: 'Warehouse B', user: 'Jane Smith' },
  { id: 3, itemName: 'Wireless Mouse', type: 'IN', quantity: 50, date: '2026-01-07', location: 'Warehouse A', user: 'Mike Johnson' },
  { id: 4, itemName: 'Standing Desk', type: 'TRANSFER', quantity: 3, date: '2026-01-07', location: 'Warehouse B → A', user: 'Sarah Williams' },
  { id: 5, itemName: 'USB-C Cable', type: 'IN', quantity: 100, date: '2026-01-06', location: 'Warehouse C', user: 'John Doe' },
  { id: 6, itemName: 'Monitor 27"', type: 'OUT', quantity: 10, date: '2026-01-06', location: 'Warehouse A', user: 'Jane Smith' },
  { id: 7, itemName: 'Keyboard Mechanical', type: 'OUT', quantity: 15, date: '2026-01-05', location: 'Warehouse A', user: 'Mike Johnson' },
  { id: 8, itemName: 'Desk Lamp', type: 'IN', quantity: 20, date: '2026-01-05', location: 'Warehouse C', user: 'Sarah Williams' },
];

export const TREND_DATA = [
  { month: 'Jul', stock: 320 },
  { month: 'Aug', stock: 380 },
  { month: 'Sep', stock: 350 },
  { month: 'Oct', stock: 420 },
  { month: 'Nov', stock: 390 },
  { month: 'Dec', stock: 450 },
  { month: 'Jan', stock: 490 },
];
