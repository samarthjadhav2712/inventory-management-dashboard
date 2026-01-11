# 📦 Inventory Management Dashboard

<div align="center">

**A professional full-stack inventory management system with real-time tracking, analytics, and reporting**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🌟 Overview

**StockSync** bridges a modern React frontend with a robust Node.js/MySQL backend. Features a unique **Dual-Mode** interface that toggles between **Static Preview** (demo data) and **Live API** (real database).

Perfect for warehouses, retail stores, and businesses needing real-time inventory visibility with comprehensive audit trails.

---

## ✨ Key Features

- ✅ **Smart CRUD Operations** - Add, edit, delete products with instant MySQL persistence
- 🔍 **Real-time Search** - Filter by name or category as you type
- 📊 **Stock Movements** - Track IN/OUT/TRANSFER with complete audit trails
- 🛡️ **Validation** - Prevents negative stock and invalid operations
- 📈 **Analytics** - Interactive Bar, Line, and Pie charts (Recharts)
- 📄 **PDF Export** - Generate professional reports with jsPDF
- 🔔 **Toast Notifications** - Sleek alerts for user feedback
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔄 **Dual Mode** - Toggle between static demo and live API

---

## 🛠️ Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, Recharts, Lucide React, jsPDF  
**Backend:** Node.js, Express.js, MySQL2, CORS, dotenv  
**Database:** MySQL 8.0+

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/samarthjadhav2712/inventory-management.git
cd inventory-management
```

#### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventory_db
PORT=5000
EOF

# Setup database
mysql -u root -p < database.sql

# Start server
npm start
```

#### 3. Frontend Setup
```bash
cd ../client
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF

# Start app
npm run dev
```

#### 4. Access Application
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

---

## 📁 Project Structure
```
inventory-management/
│
├── client/                          # Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── data/
│   │   │   │   └── StaticData.jsx   # Mock/Static data for demo mode
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx       # Top navigation bar
│   │   │   │   ├── Sidebar.jsx      # Side navigation menu
│   │   │   │   ├── Toast.jsx        # Notification component
│   │   │   │   └── Loading.jsx      # Loading spinner
│   │   │   ├── Modals/
│   │   │   │   ├── InventoryModal.jsx        # Add/Edit product form
│   │   │   │   └── StockAdjustmentModal.jsx  # Stock IN/OUT/TRANSFER form
│   │   │   └── Tabs/
│   │   │       ├── Overview.jsx     # Dashboard overview page
│   │   │       ├── Movements.jsx    # Stock movements page
│   │   │       └── Analytics.jsx    # Charts and analytics page
│   │   ├── utils/
│   │   │   ├── api.js               # API client (Axios/Fetch wrapper)
│   │   │   └── exportUtils.js       # PDF/CSV export logic
│   │   ├── App.jsx                  # Main application & state management
│   │   ├── main.jsx                 # React DOM entry point
│   │   └── index.css                # Global Tailwind CSS styles
│   ├── public/
│   │   └── vite.svg                 # Favicon
│   ├── .env                         # Environment variables
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── server/                          # Backend Application
│   ├── .env                         # Database credentials & port
│   ├── server.js                    # Express server & API routes
│   ├── database.sql                 # MySQL schema & sample data
│   ├── package.json                 # Backend dependencies
│   └── package-lock.json
│
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## 🔌 API Endpoints

### Inventory Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/inventory` | Fetch all inventory items |
| `POST` | `/api/inventory` | Add new item |
| `PUT` | `/api/inventory/:id` | Update existing item |
| `DELETE` | `/api/inventory/:id` | Delete item |
| `POST` | `/api/inventory/adjust/:id` | Adjust stock (IN/OUT/TRANSFER) |

### Movement Tracking

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/inventory/movements` | Fetch all movements |
| `POST` | `/api/inventory/movements` | Record new movement |

### Dashboard Statistics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/stats` | Get dashboard statistics |

## 🗄️ Database Schema

### `inventory` Table
```sql
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
```

### `movements` Table
```sql
CREATE TABLE movements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itemId INT NOT NULL,
  itemName VARCHAR(255) NOT NULL,
  type ENUM('IN', 'OUT', 'TRANSFER') NOT NULL,
  quantity INT NOT NULL,
  location VARCHAR(200) NOT NULL,
  fromLocation VARCHAR(100),
  toLocation VARCHAR(100),
  date DATE NOT NULL DEFAULT (CURRENT_DATE),
  user VARCHAR(100) NOT NULL,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (itemId) REFERENCES inventory(id) ON DELETE CASCADE,
  INDEX idx_type (type),
  INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 📊 Sample Data

- **8 inventory items** across 3 categories (Electronics, Furniture, Accessories)
- **8 movement records** showing IN/OUT/TRANSFER operations
- **7 months** of trend data for analytics

---

## 🎨 Features Walkthrough

### Adding Products
1. Click "Add Item" button
2. Fill in product details (name, category, quantity, etc.)
3. Save → instantly persists to MySQL

### Recording Movements
- **IN**: Receive stock (shipments, returns)
- **OUT**: Dispatch stock (sales, wastage) - validates sufficient stock
- **TRANSFER**: Move between warehouses

### Viewing Analytics
- Navigate to Analytics tab
- View Bar Chart (stock per category)
- View Line Chart (7-month trend)
- View Pie Chart (category distribution)

### Exporting Reports
1. Filter items using search
2. Click "Export to PDF"
3. Professional PDF downloads with timestamp

---

## 🔐 Security Features

- ✅ SQL injection prevention (parameterized queries)
- ✅ Environment variables for sensitive data
- ✅ CORS configuration
- ✅ Input validation (frontend + backend)
- ✅ Error handling without stack traces

---

## 📈 Performance Optimization

- Database connection pooling
- Indexed queries for fast lookups
- Client-side filtering (search)
- Memoized calculations
- Optimized re-renders

---

## 🚀 Deployment

The application is deployed across a specialized cloud stack to ensure scalability and high availability.

### **Architecture Overview**
* **Frontend**: Hosted on **Vercel** for fast global delivery.
* **Backend**: Hosted on **Render** as a managed Node.js Web Service.
* **Database**: Managed **MySQL** instance hosted on **Aiven**.

### **Live Links**
* **Live Dashboard**: [https://inventory-management-dashboard-s2bi.vercel.app](https://inventory-management-dashboard-s2bi.vercel.app)
* **API Endpoint**: [https://inventory-management-dashboard-8851.onrender.com/api](https://inventory-management-dashboard-8851.onrender.com/api)

---

## 👤 Author

**Samarth Jadhav**
- GitHub: [@samarthjadhav2712](https://github.com/samarthjadhav2712)
- Email: samarth10jadhav@gmail.com

