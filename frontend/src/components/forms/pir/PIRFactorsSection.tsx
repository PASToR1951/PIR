import React from 'react';
import { TextareaAuto } from '../shared/FormInputs';
import { Wand2 } from 'lucide-react';

export const FACTOR_TYPES = ["Institutional", "Technical", "Infrastructure", "Learning Resources", "Environmental", "Others"];

interface PIRFactorsSectionProps {
    appMode: 'wizard' | 'full';
    currentStep: number;
    activeFactorTab: string;
    setActiveFactorTab: (tab: string) => void;
    factors: Record<string, { facilitating: string; hindering: string }>;
    handleFactorChange: (type: string, category: 'facilitating' | 'hindering', value: string) => void;
}

export const PIRFactorsSection: React.FC<PIRFactorsSectionProps> = ({
    appMode,
    currentStep,
    activeFactorTab,
    setActiveFactorTab,
    factors,
    handleFactorChange
}) => {
    return (
        <>
            {/* WIZARD ONLY: FACTORS TABS (Step 3) */}
            {appMode === 'wizard' && (
                <div className={`${currentStep === 3 ? 'block' : 'hidden'}`}>
                    <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-4">
                        <div className="p-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl">
                            <Wand2 size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Facilitating & Hindering Factors</h2>
                            <p className="text-sm text-slate-500 font-medium mt-0.5">Select a category to detail internal and external factors.</p>
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                        {FACTOR_TYPES.map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setActiveFactorTab(type)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-colors border ${activeFactorTab === type
                                    ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-800 shadow-sm'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="flex flex-col gap-4 relative z-10">
                            <label className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                                Facilitating Factors
                            </label>
                            <TextareaAuto
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-medium text-slate-700 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-colors min-h-[160px]"
                                placeholder={`Enter positive factors for ${activeFactorTab}...`}
                                value={factors[activeFactorTab].facilitating}
                                onChange={(e: any) => handleFactorChange(activeFactorTab, 'facilitating', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-4 relative z-10">
                            <label className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                                Hindering Factors
                            </label>
                            <TextareaAuto
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-medium text-slate-700 focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-colors min-h-[160px]"
                                placeholder={`Enter challenges for ${activeFactorTab}...`}
                                value={factors[activeFactorTab].hindering}
                                onChange={(e: any) => handleFactorChange(activeFactorTab, 'hindering', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* FULL MODE ONLY: INTERACTIVE FACTORS GRID */}
            {appMode === 'full' && (
                <div className="mb-16">
                    <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl">
                            <Wand2 size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Facilitating & Hindering Factors</h2>
                        </div>
                    </div>

                    <div className="overflow-x-auto pb-2">
                        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden min-w-[600px]">
                            <div className="grid grid-cols-2 bg-slate-50 border-b-2 border-slate-300 font-bold text-center text-sm uppercase tracking-wider">
                                <div className="p-3 border-r border-slate-300 text-emerald-700">Facilitating Factors</div>
                                <div className="p-3 text-rose-700">Hindering Factors</div>
                            </div>

                            {FACTOR_TYPES.map((type, idx) => (
                                <div key={type} className={`grid grid-cols-2 bg-white ${idx !== FACTOR_TYPES.length - 1 ? 'border-b border-slate-200' : ''}`}>
                                    <div className="p-4 border-r border-slate-300 relative group hover:bg-slate-50/50 transition-colors">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 absolute top-3 left-4">{type}</span>
                                        <TextareaAuto
                                            className="mt-5 w-full text-sm font-medium text-slate-700 bg-transparent p-1 focus:bg-white border border-transparent focus:border-slate-300 rounded min-h-[40px]"
                                            value={factors[type].facilitating}
                                            onChange={(e: any) => handleFactorChange(type, 'facilitating', e.target.value)}
                                        />
                                    </div>
                                    <div className="p-4 relative group hover:bg-slate-50/50 transition-colors">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 absolute top-3 left-4">{type}</span>
                                        <TextareaAuto
                                            className="mt-5 w-full text-sm font-medium text-slate-700 bg-transparent p-1 focus:bg-white border border-transparent focus:border-slate-300 rounded min-h-[40px]"
                                            value={factors[type].hindering}
                                            onChange={(e: any) => handleFactorChange(type, 'hindering', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
