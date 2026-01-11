import React from 'react'; 
import { BarChart3, TrendingUp, Package } from 'lucide-react';

// Sidebar Component
export function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'movements', label: 'Movements', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: Package },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Package className="text-blue-400" size={28} />
          <h1 className="text-2xl font-bold">StockSync</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1">Inventory Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          <p className="mt-1">© 2026 StockSync </p>
        </div>
      </div>
    </div>
  );
}