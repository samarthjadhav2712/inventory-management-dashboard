import React, { useEffect } from 'react'; 
import { AlertTriangle, Check, X } from 'lucide-react'; 


export function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = type === 'error' 
    ? 'bg-red-50 border-red-200 text-red-800' 
    : 'bg-green-50 border-green-200 text-green-800';

  const Icon = type === 'error' ? AlertTriangle : Check;

  return (
    <div className={`fixed top-2 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl animate-in slide-in-from-top-10 duration-300 z-[100] min-w-[320px] ${styles}`}>
      <div className={`p-1.5 rounded-full ${type === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
        <Icon size={20} className={type === 'error' ? 'text-red-600' : 'text-green-600'} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold leading-none">{type === 'error' ? 'Action Blocked' : 'Success'}</p>
        <p className="text-xs font-medium mt-1 opacity-90">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full transition-colors">
        <X size={18} className="opacity-50" />
      </button>
    </div>
  );
}
