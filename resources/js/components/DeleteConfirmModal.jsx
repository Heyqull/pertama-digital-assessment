import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            <div className="relative bg-white border border-slate-100 rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    Delete Article?
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    Are you sure you want to delete this article? This action is permanent and cannot be undone.
                </p>

                <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-slate-200 hover:border-slate-300 rounded-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition-all bg-white shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-full py-2.5 text-xs font-bold shadow-md shadow-red-500/10 hover:shadow-red-500/20 transition-all"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
