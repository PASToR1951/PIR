import React from 'react';
import { Target } from 'lucide-react';
import { TextareaAuto } from '../shared/FormInputs';

interface AIPGoalsSectionProps {
    appMode: 'wizard' | 'full';
    currentStep: number;
    objectives: string;
    setObjectives: (value: string) => void;
    indicators: string;
    setIndicators: (value: string) => void;
    annualTarget: string;
    setAnnualTarget: (value: string) => void;
}

export const AIPGoalsSection: React.FC<AIPGoalsSectionProps> = ({
    appMode,
    currentStep,
    objectives,
    setObjectives,
    indicators,
    setIndicators,
    annualTarget,
    setAnnualTarget,
}) => {
    return (
        <div className={`${(appMode === 'full' || currentStep === 2) ? 'block' : 'hidden'} mb-6`}>
            <div className="mb-6 flex items-center gap-3">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                    <Target size={16} strokeWidth={2.5} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Goals & Targets</h2>
                    {appMode === 'wizard' && <p className="text-xs text-slate-500 font-medium mt-0.5">Specify objectives, measurable indicators, and targets.</p>}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 w-full group relative z-10">
                    <label className="text-xs font-semibold text-slate-600 select-none group-focus-within:text-emerald-600 transition-colors">Objective/s</label>
                    <TextareaAuto
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-800 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] shadow-sm"
                        placeholder="List primary objectives..."
                        value={objectives}
                        onChange={(e: any) => setObjectives(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="text-xs font-semibold text-slate-600 select-none group-focus-within:text-emerald-600 transition-colors">Performance Indicator/s (OVI)</label>
                        <TextareaAuto
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-800 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] shadow-sm"
                            placeholder="Measurable indicators..."
                            value={indicators}
                            onChange={(e: any) => setIndicators(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="text-xs font-semibold text-slate-600 select-none group-focus-within:text-emerald-600 transition-colors">Annual Target</label>
                        <TextareaAuto
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-800 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] shadow-sm"
                            placeholder="State your annual target..."
                            value={annualTarget}
                            onChange={(e: any) => setAnnualTarget(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
