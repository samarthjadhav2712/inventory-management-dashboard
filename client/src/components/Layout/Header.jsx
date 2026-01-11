import React, { useState, useEffect } from 'react'; 
import { Search, Plus, Download } from 'lucide-react';
import jsPDF from 'jspdf'; 
import autoTable from 'jspdf-autotable'; 

// Header Component
export function Header({ useAPI, setUseAPI, onAddClick , searchTerm, setSearchTerm, inventory}) {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); 
  }, []);

  const handleExport = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('StockSync Inventory Report', 14, 22);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);


  const columns = ["ID", "Item Name", "Category", "Quantity", "Price", "Location"];
  
  
  const rows = inventory.map(item => [
    item.id,
    item.name,
    item.category,
    item.quantity,
    `$${item.price}`,
    item.location
  ]);


  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 35,
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] }, 
  });

  doc.save('Inventory_Report.pdf');
};

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-6 flex-1">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          {useAPI ? (
            <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-85"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live API
            </span>
          ) : (
            <span className="animate-pulse bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full border border-yellow-200 font-medium">
              Static Mode
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-1">Real-time inventory insights</p>
      </div>

      {/* SEARCH INPUT */}
        <div className="relative max-w-md w-full ml-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by item name or category..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      </div>

      <div className="flex items-center gap-6">
        {/* ADD PRODUCT BUTTON */}
        {useAPI && (
        <div className="flex gap-2">
              {/* EXPORT BUTTON */}
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                <Download size={18} />
                Export PDF
              </button>

              <button onClick={onAddClick} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md font-medium">
                <Plus size={18} /> Add Product
              </button>
            </div>
        )}

        <div className="flex items-center gap-4 border-l pl-6">
          {/* API TOGGLE */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={useAPI} 
              onChange={(e) => setUseAPI(e.target.checked)} 
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
            />
            <span className="text-sm text-gray-600 font-medium group-hover:text-blue-600 transition-colors">Use API</span>
          </label>

          {/* THE UPDATED DATE/TIME SECTION */}
          <div className="text-right min-w-[140px]">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">System Time</p>
            <p className="text-sm font-mono font-semibold text-gray-700">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <p className="text-[10px] text-gray-500">
              {currentTime.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}