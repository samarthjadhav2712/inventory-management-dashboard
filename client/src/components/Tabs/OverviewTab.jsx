import React, { useState } from 'react';
import { 
  Pencil, Trash2, ArrowRightLeft, Check, X, 
  Package, BarChart3, AlertTriangle, TrendingUp 
} from 'lucide-react';

// Stat Card Component
function StatCard({ title, value, icon: Icon, iconColor, bgColor, borderColor }) {
  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div>
          <Icon size={32} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

export function OverviewTab({ totalItems, lowStockItems, inventory, useAPI, onDelete, onEdit , onStockAdjust}) {
  const [deletingId, setDeletingId] = useState(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Units" value={totalItems} icon={Package} iconColor="text-blue-500" bgColor="bg-blue-50" borderColor="border-blue-200" />
        <StatCard title="Active SKUs" value={inventory.length} icon={BarChart3} iconColor="text-green-500" bgColor="bg-green-50" borderColor="border-green-200" />
        <StatCard title="Low Stock" value={lowStockItems.length} icon={AlertTriangle} iconColor="text-red-500" bgColor="bg-red-50" borderColor="border-red-200" />
        <StatCard title="Categories" value={new Set(inventory.map(i => i.category)).size} icon={TrendingUp} iconColor="text-purple-500" bgColor="bg-purple-50" borderColor="border-purple-200" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Inventory Items</h3>
          {!useAPI && <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Read-Only Mode</span>}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase">
                <th className="px-6 py-3">Item Details</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Stock Status</th>
                <th className="px-6 py-3">Price</th>
                {useAPI && <th className="px-6 py-3 text-right">Actions</th>}
              </tr>
            </thead>
           {/* Remove any spaces between the > and the { */}
<tbody className="divide-y divide-gray-100">
  {inventory.length > 0 ? (
    <>
      {inventory.map((item) => (
        <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
          <td className="px-6 py-4">
            <div className="text-sm font-bold text-gray-900">{item.name}</div>
            <div className="text-xs text-gray-500">{item.location}</div>
          </td>
          <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
          <td className="px-6 py-4">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
              item.quantity < item.minStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {item.quantity} units
            </span>
          </td>
          <td className="px-6 py-4 text-sm font-semibold text-gray-700">${item.price}</td>
          
          {useAPI && (
            <td className="px-6 py-4 text-right">
              {deletingId === item.id ? (
                <div className="flex justify-end items-center gap-2">
                  <button onClick={() => { onDelete(item.id); setDeletingId(null); }} className="p-1.5 bg-red-600 text-white rounded-md"><Check size={14} /></button>
                  <button onClick={() => setDeletingId(null)} className="p-1.5 bg-gray-200 rounded-md"><X size={14} /></button>
                </div>
              ) : (
                <div className="flex justify-end gap-1">
                  <button 
                    onClick={() => onStockAdjust(item)} 
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                    title="Move Stock (IN/OUT/TRANSFER)"
                  >
                    <ArrowRightLeft size={18} />
                  </button>
                  <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><Pencil size={18} /></button>
                  <button onClick={() => setDeletingId(item.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"><Trash2 size={18} /></button>
                </div>
              )}
            </td>
          )}
        </tr>
      ))}
    </> 
  ) : (
    <tr>
      <td colSpan={useAPI ? 5 : 4} className="px-6 py-12 text-center text-gray-500 font-medium">
        No items found matching your search.
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}