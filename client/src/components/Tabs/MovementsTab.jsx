import React from 'react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  ArrowRightLeft, 
  Package 
} from 'lucide-react';

// Movements Tab Component
export function MovementsTab({ movements }) {
  const getMovementIcon = (type) => {
    switch(type) {
      case 'IN': return { Icon: ArrowUpCircle, color: 'text-green-500' };
      case 'OUT': return { Icon: ArrowDownCircle, color: 'text-red-500' };
      case 'TRANSFER': return { Icon: ArrowRightLeft, color: 'text-blue-500' };
      default: return { Icon: Package, color: 'text-gray-500' };
    }
  };

  const getMovementBadgeColor = (type) => {
    switch(type) {
      case 'IN': return 'bg-green-100 text-green-800';
      case 'OUT': return 'bg-red-100 text-red-800';
      case 'TRANSFER': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedMovements = [...movements].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (dateB !== dateA) {
      return dateB - dateA;
    }
  
    return b.id - a.id;
  });

  return (
    <div>
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Inventory Movements</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedMovements.map((movement) => {
                const { Icon, color } = getMovementIcon(movement.type);
                return (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Icon size={20} className={color} />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMovementBadgeColor(movement.type)}`}>
                          {movement.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{movement.itemName}</td>
                    <td className="px-6 py-4 text-gray-600">{movement.quantity}</td>
                    <td className="px-6 py-4 text-gray-600">{movement.location}</td>
                    <td className="px-6 py-4 text-gray-600">
                    {new Date(movement.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                    <td className="px-6 py-4 text-gray-600">{movement.user}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}