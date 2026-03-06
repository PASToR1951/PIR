import React from 'react';
import { CheckCircle, Loader2, Save, Printer } from 'lucide-react';

interface FormActionButtonsProps {
    isSubmitted: boolean;
    isSubmitting: boolean;
    onConfirmSubmit: () => void;
    onPrint: () => void;
}

export const FormActionButtons: React.FC<FormActionButtonsProps> = ({
    isSubmitted,
    isSubmitting,
    onConfirmSubmit,
    onPrint
}) => {
    return (
        <div className="print:hidden container mx-auto max-w-[210mm] bg-white border border-slate-200 rounded-[2rem] p-8 mb-16 flex flex-col items-center justify-center text-center shadow-lg relative z-10">
            {isSubmitted ? (
                <div className="mb-6 px-6 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl font-bold flex items-center gap-3 shadow-sm">
                    <CheckCircle size={22} strokeWidth={3} />
                    Document Successfully Saved to Database!
                </div>
            ) : (
                <h3 className="text-slate-800 font-bold text-xl mb-6">Ready to finalize your document?</h3>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                    type="button"
                    onClick={onConfirmSubmit}
                    disabled={isSubmitted || isSubmitting}
                    className="inline-flex h-14 items-center justify-center rounded-2xl bg-slate-900 px-8 py-1 text-sm font-bold text-white transition-colors gap-3 hover:bg-slate-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto shadow-md"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin h-5 w-5 text-white" />
                    ) : (
                        <Save size={18} strokeWidth={2.5} />
                    )}
                    {isSubmitted ? "Submitted" : isSubmitting ? "Submitting..." : "Confirm & Submit"}
                </button>

                <button
                    type="button"
                    onClick={onPrint}
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white border-2 border-slate-200 px-8 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-colors active:scale-95 w-full sm:w-auto shadow-sm"
                >
                    <Printer size={18} strokeWidth={2.5} />
                    Print PDF
                </button>
            </div>
        </div>
    );
};
