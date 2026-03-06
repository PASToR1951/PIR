import React from 'react';

interface WizardFooterProps {
    currentStep: number;
    totalSteps: number;
    prevStep: () => void;
    nextStep: () => void;
    canSkip?: boolean;
    onSkip?: () => void;
    skipLabel?: string;
    nextLabel?: string;
}

export const WizardFooter: React.FC<WizardFooterProps> = ({
    currentStep,
    totalSteps,
    prevStep,
    nextStep,
    canSkip = false,
    onSkip,
    skipLabel = "Skip to Review",
    nextLabel = "Continue"
}) => {
    return (
        <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center">
            <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`group relative inline-flex h-12 items-center justify-center rounded-xl px-6 font-medium transition-colors gap-2 ${currentStep === 1
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 bg-white shadow-sm border border-slate-200 hover:bg-slate-50 active:scale-95'
                    }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Back
            </button>

            {currentStep < totalSteps && (
                <div className="flex items-center gap-3">
                    {canSkip && onSkip && (
                        <button
                            type="button"
                            onClick={onSkip}
                            className="text-sm font-medium text-slate-400 hover:text-slate-600 px-3 transition-colors hidden sm:block"
                        >
                            {skipLabel}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={nextStep}
                        className="group relative inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-8 font-bold text-white shadow-md transition-colors active:scale-95 hover:bg-slate-800 gap-2"
                    >
                        {nextLabel}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            )}
        </div>
    );
};
