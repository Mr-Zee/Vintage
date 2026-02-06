import React from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export default function Modal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'success' 
}) {
  if (!isOpen) return null;

  const config = {
    success: { icon: <CheckCircle2 className="text-emerald-500" size={48} />, btnClass: "bg-neutral-900 hover:bg-black" },
    error: { icon: <AlertCircle className="text-red-500" size={48} />, btnClass: "bg-red-600 hover:bg-red-700" },
    confirm: { icon: <HelpCircle className="text-amber-500" size={48} />, btnClass: "bg-neutral-900 hover:bg-black" }
  };

  const { icon, btnClass } = config[type] || config.success;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-neutral-100 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-neutral-400 hover:text-black transition">
            <X size={20} />
          </button>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-4">{icon}</div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
          <p className="text-neutral-500 mb-6 leading-relaxed">{message}</p>
          
          <div className="flex gap-3">
            {type === 'confirm' && (
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-neutral-100 text-neutral-600 rounded-xl font-bold hover:bg-neutral-200 transition"
              >
                Cancel
              </button>
            )}
            <button
              onClick={type === 'confirm' ? onConfirm : onClose}
              className={`flex-1 py-3 text-white rounded-xl font-bold transition ${btnClass}`}
            >
              {type === 'confirm' ? 'Confirm' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}