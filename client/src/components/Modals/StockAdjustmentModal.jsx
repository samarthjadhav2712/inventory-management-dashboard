import React, { useState } from 'react'; 
import { X } from 'lucide-react';

export function StockAdjustmentModal({ item, onClose, onSave }) {
  const [type, setType] = useState('IN'); 
  const [qty, setQty] = useState(1);
  const [targetLocation, setTargetLocation] = useState(item.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item.id, {
      itemName: item.name,
      type: type,
      quantity: Number(qty),
      location: type === 'TRANSFER' ? targetLocation : item.location,
      user: 'System Admin'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Adjust Stock: {item.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Movement Type Toggle */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Movement Type</label>
            <div className="grid grid-cols-3 gap-2">
              {['IN', 'OUT', 'TRANSFER'].map(t => (
                <button
                  key={t} type="button"
                  onClick={() => setType(t)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    type === t 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Quantity</label>
            <input 
              required type="number" min="1" 
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={qty} onChange={e => setQty(e.target.value)} 
            />
          </div>

          {type === 'TRANSFER' && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">New Location</label>
              <input 
                required type="text" 
                className="w-full border rounded-lg p-2.5 bg-blue-50/50 border-blue-100" 
                placeholder="Target Warehouse..." 
                value={targetLocation} onChange={e => setTargetLocation(e.target.value)} 
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 text-gray-600 font-semibold border rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
              Confirm {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}