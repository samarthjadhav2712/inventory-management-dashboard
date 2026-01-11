import React, { useState, useEffect } from 'react';
import { STATIC_INVENTORY, STATIC_MOVEMENTS, TREND_DATA } from './components/data/StaticData';

import {Sidebar} from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Toast } from './components/Layout/Toast';
import {LoadingScreen} from './components/Layout/Loading'

import { OverviewTab } from './components/Tabs/OverviewTab';
import { MovementsTab } from './components/Tabs/MovementsTab';
import { AnalyticsTab } from './components/Tabs/AnalyticsTab';

import { InventoryModal } from './components/Modals/InventoryModal';
import { StockAdjustmentModal } from './components/Modals/StockAdjustmentModal';

import { api } from './utils/api';

// Main Dashboard Component
export default function InventoryDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [inventory, setInventory] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useAPI, setUseAPI] = useState(false);
  

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editingItem, setEditingItem] = useState(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false); 
  const [adjustingItem, setAdjustingItem] = useState(null);

  const [toast, setToast] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [useAPI]);

  const fetchData = async () => {
    setLoading(true);
    if (useAPI) {
      try {
        const invData = await api.getInventory();
        const movData = await api.getMovements();
        setInventory(invData);
        setMovements(movData);
      } catch (error) {
        setInventory(STATIC_INVENTORY);
        setMovements(STATIC_MOVEMENTS);
      } finally { setLoading(false); }
    } else {
      setTimeout(() => {
        setInventory(STATIC_INVENTORY);
        setMovements(STATIC_MOVEMENTS);
        setLoading(false); 
      }, 500);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteItem(id);
      fetchData();
    } catch (error) { console.error("Delete failed:", error); }
  };

  const handleSave = async (formData) => {
    try {
      if (editingItem) {
        await api.updateItem(editingItem.id, formData);
      } else {
        await api.addItem(formData);
        const movementData = {
          itemName: formData.name,
          type: 'IN',
          quantity: formData.quantity,
          location: formData.location,
          user: 'System Admin'
        };
        await api.addMovement(movementData); 
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Save failed: " + error.message);
    }
  };

  const showToast = (message, type = 'success') => {
  setToast({ message, type });
};

const handleStockAdjustment = async (itemId, adjustmentData) => {
  const item = inventory.find(i => i.id === itemId);
  
  if (adjustmentData.type === 'OUT' && adjustmentData.quantity > item.quantity) {
    showToast(`Insufficient stock! ${item.name} only has ${item.quantity} units available.`, 'error');
    return;
  }

  try {
    await api.adjustStock(itemId, adjustmentData);
    setIsStockModalOpen(false);
    showToast(`Successfully processed ${adjustmentData.type} for ${item.name}`);
    fetchData(); 
  } catch (error) {
    showToast("Server error: Unable to process adjustment", 'error');
  }
};

const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter(item => item.quantity < item.minStock);
  const categoryData = getCategoryData(inventory);
  const pieData = getPieData(inventory);

  if (loading) return <LoadingScreen/>; 

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <Header useAPI={useAPI} setUseAPI={setUseAPI} onAddClick={handleAddNew} searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} inventory={filteredInventory}/>
        <div className="p-6">
          {activeTab === 'overview' && (
            <OverviewTab 
              totalItems={totalItems}
              lowStockItems={lowStockItems}
              inventory={filteredInventory}
              categoryData={categoryData}
              useAPI={useAPI}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onStockAdjust={(item) => {
                setAdjustingItem(item);
                setIsStockModalOpen(true);
              }}
            />
          )}
          {activeTab === 'movements' && <MovementsTab movements={movements} />}
          {activeTab === 'analytics' && <AnalyticsTab categoryData={categoryData} trendData={TREND_DATA} pieData={pieData} />}
        </div>
      </div>

      {/* MODAL 1: ADD/EDIT */}
      {isModalOpen && (
        <InventoryModal 
          item={editingItem} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
        />
      )}

      {/* MODAL 2: IN/OUT/TRANSFER (Stock Adjustment) */}
      {isStockModalOpen && (
        <StockAdjustmentModal 
          item={adjustingItem} 
          onClose={() => setIsStockModalOpen(false)} 
          onSave={handleStockAdjustment} 
        />
      )}

      {toast && (
    <Toast 
      message={toast.message} 
      type={toast.type} 
      onClose={() => setToast(null)} 
    />
  )}
    </div>
  );
}

// Helper Functions
export function getCategoryData(inventory) {
  const categories = {};
  
  inventory.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = { quantity: 0, value: 0, skus: 0 };
    }
    categories[item.category].quantity += item.quantity;
    categories[item.category].value += item.quantity * item.price;
    categories[item.category].skus += 1;
  });

  return Object.entries(categories).map(([category, data]) => ({
    category,
    ...data
  }));
}

export function getPieData(inventory) {
  const categoryData = getCategoryData(inventory);
  return categoryData.map(item => ({
    name: item.category,
    value: item.quantity
  }));
}