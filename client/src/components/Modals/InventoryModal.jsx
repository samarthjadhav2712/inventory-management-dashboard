import React, { useState } from 'react'; 
import { X } from 'lucide-react'; 

export function InventoryModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState(
    item || { name: '', category: 'Electronics', quantity: 0, minStock: 10, location: '', price: 0 }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800">{item ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
            <input required type="text" className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select className="w-full border rounded-lg p-2.5" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option>Electronics</option><option>Furniture</option><option>Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
              <input required type="number" className="w-full border rounded-lg p-2.5" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
              <input required type="number" className="w-full border rounded-lg p-2.5" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Min. Stock</label>
              <input required type="number" className="w-full border rounded-lg p-2.5" value={formData.minStock} onChange={e => setFormData({...formData, minStock: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Warehouse Location</label>
            <input required type="text" className="w-full border rounded-lg p-2.5" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-600 font-semibold border rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
              {item ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}