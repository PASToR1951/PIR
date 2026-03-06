import React from 'react';

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
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
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    )}
                    {isSubmitted ? "Submitted" : isSubmitting ? "Submitting..." : "Confirm & Submit"}
                </button>

                <button
                    type="button"
                    onClick={onPrint}
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white border-2 border-slate-200 px-8 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-colors active:scale-95 w-full sm:w-auto shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    Print PDF
                </button>
            </div>
        </div>
    );
};
