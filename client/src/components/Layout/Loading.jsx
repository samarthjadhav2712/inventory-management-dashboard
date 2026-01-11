import React from 'react'; 

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        {/* Inner Pulse Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <h3 className="mt-6 text-xl font-bold text-gray-800 tracking-tight">StockSync</h3>
      <p className="mt-2 text-gray-500 font-medium flex items-center gap-2">
        Synchronizing with MySQL
        <span className="flex gap-1">
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
        </span>
      </p>
    </div>
  );
}