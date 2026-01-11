-- Create Database
CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- Inventory Table
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  minStock INT NOT NULL DEFAULT 10,
  location VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Movement Logs Table
CREATE TABLE movements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itemName VARCHAR(255) NOT NULL,
  type ENUM('IN', 'OUT', 'TRANSFER') NOT NULL,
  quantity INT NOT NULL,
  location VARCHAR(200) NOT NULL,
  date DATE NOT NULL DEFAULT (CURRENT_DATE),
  user VARCHAR(100) NOT NULL,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Sample Inventory Data
INSERT INTO inventory (name, category, quantity, minStock, location, price) VALUES
('Laptop Dell XPS', 'Electronics', 45, 20, 'Warehouse A', 1200.00),
('Office Chair', 'Furniture', 12, 15, 'Warehouse B', 150.00),
('Wireless Mouse', 'Electronics', 150, 50, 'Warehouse A', 25.00),
('Standing Desk', 'Furniture', 8, 10, 'Warehouse B', 450.00),
('USB-C Cable', 'Accessories', 200, 100, 'Warehouse C', 15.00),
('Monitor 27"', 'Electronics', 30, 25, 'Warehouse A', 300.00),
('Keyboard Mechanical', 'Electronics', 5, 20, 'Warehouse A', 120.00),
('Desk Lamp', 'Accessories', 40, 30, 'Warehouse C', 35.00);

-- Insert Sample Movement Data
INSERT INTO movements (itemName, type, quantity, location, date, user) VALUES
('Laptop Dell XPS', 'IN', 20, 'Warehouse A', '2026-01-08', 'John Doe'),
('Office Chair', 'OUT', 5, 'Warehouse B', '2026-01-08', 'Jane Smith'),
('Wireless Mouse', 'IN', 50, 'Warehouse A', '2026-01-07', 'Mike Johnson'),
('Standing Desk', 'TRANSFER', 3, 'Warehouse B → A', '2026-01-07', 'Sarah Williams'),
('USB-C Cable', 'IN', 100, 'Warehouse C', '2026-01-06', 'John Doe'),
('Monitor 27"', 'OUT', 10, 'Warehouse A', '2026-01-06', 'Jane Smith'),
('Keyboard Mechanical', 'OUT', 15, 'Warehouse A', '2026-01-05', 'Mike Johnson'),
('Desk Lamp', 'IN', 20, 'Warehouse C', '2026-01-05', 'Sarah Williams');