// src/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper to handle response status
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server Error: ${response.status}`);
  }
  return response.json();
};

export const api = {
  getInventory: () => 
    fetch(`${API_BASE_URL}/inventory`).then(handleResponse),

  getInventoryItem: (id) => 
    fetch(`${API_BASE_URL}/inventory/${id}`).then(handleResponse),
  
  getMovements: () => 
    fetch(`${API_BASE_URL}/inventory/movements`).then(handleResponse),
  
  getStats: () => 
    fetch(`${API_BASE_URL}/dashboard/stats`).then(handleResponse),
  
  addItem: (data) => 
    fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),

    deleteItem: (id) => 
    fetch(`${API_BASE_URL}/inventory/${id}`, { method: 'DELETE' }).then(handleResponse),
    
  updateItem: (id, data) => 
    fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),

    addMovement: (data) => 
    fetch(`${API_BASE_URL}/inventory/movements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),

    adjustStock: (itemId, data) => 
    fetch(`${API_BASE_URL}/inventory/adjust/${itemId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
};