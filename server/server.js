const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // This allows the connection without a physical .pem certificate file
  }
});

// Connect to Database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL Database');
});

// ==================== API ROUTES ====================

// GET: Fetch all inventory items
app.get('/api/inventory', (req, res) => {
  const query = `
    SELECT 
      id, name, category, quantity, minStock, 
      location, price, lastUpdated 
    FROM inventory 
    ORDER BY id DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// GET: Fetch all inventory movements
app.get('/api/inventory/movements', (req, res) => {
  const query = `
    SELECT 
      id, itemName, type, quantity, 
      location, date, user 
    FROM movements 
    ORDER BY date DESC 
    LIMIT 50
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// GET: Dashboard statistics
app.get('/api/dashboard/stats', (req, res) => {
  const queries = {
    totalItems: 'SELECT SUM(quantity) as total FROM inventory',
    totalSKUs: 'SELECT COUNT(*) as count FROM inventory',
    lowStock: 'SELECT COUNT(*) as count FROM inventory WHERE quantity < minStock',
    categories: 'SELECT COUNT(DISTINCT category) as count FROM inventory'
  };
  
  const stats = {};
  let completed = 0;
  
  Object.keys(queries).forEach(key => {
    db.query(queries[key], (err, results) => {
      if (!err) {
        stats[key] = results[0];
      }
      completed++;
      if (completed === Object.keys(queries).length) {
        res.json(stats);
      }
    });
  });
});

// GET: Fetch single inventory item by ID
app.get('/api/inventory/:id', (req, res) => {
  const query = 'SELECT * FROM inventory WHERE id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(results[0]);
  });
});

// POST: Add new inventory item
app.post('/api/inventory', (req, res) => {
  const { name, category, quantity, minStock, location, price } = req.body;
  
  const query = `
    INSERT INTO inventory (name, category, quantity, minStock, location, price) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  db.query(query, [name, category, quantity, minStock, location, price], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'Item added successfully', 
      id: result.insertId 
    });
  });
});

// PUT: Update inventory item
app.put('/api/inventory/:id', (req, res) => {
  const { name, category, quantity, minStock, location, price } = req.body;
  
  const query = `
    UPDATE inventory 
    SET name = ?, category = ?, quantity = ?, minStock = ?, location = ?, price = ?
    WHERE id = ?
  `;
  
  db.query(query, [name, category, quantity, minStock, location, price, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully' });
  });
});

// DELETE: Remove inventory item
app.delete('/api/inventory/:id', (req, res) => {
  const query = 'DELETE FROM inventory WHERE id = ?';
  
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

// POST: Add inventory movement
app.post('/api/inventory/movements', (req, res) => {
  const { itemName, type, quantity, location, user } = req.body;
  
  const query = `
    INSERT INTO movements (itemName, type, quantity, location, user) 
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [itemName, type, quantity, location, user], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'Movement recorded successfully', 
      id: result.insertId 
    });
  });
});

app.post('/api/inventory/adjust/:id', (req, res) => {
  const itemId = req.params.id;
  const { itemName, type, quantity, location, user } = req.body;

  // Start a transaction to ensure both tables update together
  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message });

    // 1. Determine the math for the Inventory table
    let stockChange = 0;
    if (type === 'IN') stockChange = quantity;
    if (type === 'OUT') stockChange = -quantity;
    // Note: TRANSFER (stockChange = 0) only updates the 'location' column

    const updateInventoryQuery = `
      UPDATE inventory 
      SET quantity = quantity + ?, location = ? 
      WHERE id = ?
    `;

    db.query(updateInventoryQuery, [stockChange, location, itemId], (err, result) => {
      if (err) {
        return db.rollback(() => res.status(500).json({ error: err.message }));
      }

      // 2. Log the history in the Movements table
      const insertMovementQuery = `
        INSERT INTO movements (itemName, type, quantity, location, user, date) 
        VALUES (?, ?, ?, ?, ?, NOW())
      `;

      db.query(insertMovementQuery, [itemName, type, quantity, location, user], (err) => {
        if (err) {
          return db.rollback(() => res.status(500).json({ error: err.message }));
        }

        // 3. Commit the changes to the database
        db.commit((err) => {
          if (err) {
            return db.rollback(() => res.status(500).json({ error: err.message }));
          }
          res.json({ message: `Stock ${type} processed successfully` });
        });
      });
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});