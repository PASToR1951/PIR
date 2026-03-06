import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
                <ChevronLeft size={16} strokeWidth={2.5} />
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
                        <ChevronRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            )}
        </div>
    );
};
