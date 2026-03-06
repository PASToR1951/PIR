import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    onCancel,
    onConfirm,
    title = "Delete Activity?",
    message = "This activity contains data. Are you sure you want to permanently remove it?"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm print:hidden">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-5">
                    <Trash2 size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">{message}</p>
                <div className="flex gap-3 w-full">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-3.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-sm shadow-red-500/20 transition-colors active:scale-95"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
