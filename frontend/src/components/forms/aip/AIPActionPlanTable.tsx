import React from 'react';
import { Input, Select, TextareaAuto } from '../shared/FormInputs';

export const PHASES = [
    "PLANNING",
    "IMPLEMENTATION",
    "MONITORING AND EVALUATION"
];

interface AIPActionPlanTableProps {
    appMode: 'wizard' | 'full';
    currentStep: number;
    activities: any[];
    expandedActivityId: string | null;
    setExpandedActivityId: (id: string | null) => void;
    handleRemoveActivity: (id: string) => void;
    handleActivityChange: (id: string, field: string, value: any) => void;
    handleAddActivityPhase: (phase: string) => void;
    formatCurrency: (amount: string | number) => string;
}

export const AIPActionPlanTable: React.FC<AIPActionPlanTableProps> = ({
    appMode,
    currentStep,
    activities,
    expandedActivityId,
    setExpandedActivityId,
    handleRemoveActivity,
    handleActivityChange,
    handleAddActivityPhase,
    formatCurrency
}) => {
    return (
        <React.Fragment>
            {/* WIZARD ONLY: ACTIVITIES (Step 3) */}
            {appMode === 'wizard' && (
                <div className={`${currentStep === 3 ? 'block' : 'hidden'} mb-6`}>
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Action Plan & Budget</h2>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">Detail the activities categorized by Planning, Implementation, and M&E.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {activities.map((act, index) => {
                            const isExpanded = expandedActivityId === act.id;

                            if (!isExpanded) {
                                // COMPACT CARD VIEW
                                return (
                                    <div
                                        key={act.id}
                                        onClick={() => setExpandedActivityId(act.id)}
                                        className="relative group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-emerald-300 transition-colors cursor-pointer flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4 overflow-hidden pr-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                                <span className="font-bold text-sm">{index + 1}</span>
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-sm font-bold text-slate-800 truncate flex items-center gap-2">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] uppercase tracking-wider">{act.phase}</span>
                                                    {act.name || <span className="text-slate-400 italic font-normal">Untitled Activity...</span>}
                                                </span>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">
                                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                        Period: <span className="text-slate-700">{act.period || '--'}</span>
                                                    </span>
                                                    <span className="text-slate-300 hidden sm:block">|</span>
                                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                        Budget: <span className="text-emerald-600">{act.budgetAmount ? formatCurrency(act.budgetAmount) : '--'}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {activities.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); handleRemoveActivity(act.id); }}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                                </button>
                                            )}
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // EXPANDED CARD VIEW
                            return (
                                <div key={act.id} className="relative group bg-white border-2 border-emerald-200 rounded-3xl shadow-md overflow-hidden ring-4 ring-emerald-50">
                                    <div
                                        onClick={() => setExpandedActivityId(null)}
                                        className="flex items-center justify-between p-5 md:px-8 bg-slate-50/80 hover:bg-emerald-50/50 transition-colors border-b border-slate-100 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
                                                <span className="font-bold text-xs">{index + 1}</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Editing Activity</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {activities.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); handleRemoveActivity(act.id); }}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    title="Remove Activity"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </button>
                                            )}
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full text-emerald-600 bg-emerald-100 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 flex flex-col gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                                            <Select
                                                label="Phase / Category"
                                                options={PHASES}
                                                value={act.phase}
                                                onChange={(e: any) => handleActivityChange(act.id, 'phase', e.target.value)}
                                            />
                                            <Input
                                                label="Activity Name"
                                                placeholder="Describe the activity..."
                                                value={act.name}
                                                onChange={(e: any) => handleActivityChange(act.id, 'name', e.target.value)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Implementation Period"
                                                placeholder="e.g. Jan - March"
                                                value={act.period}
                                                onChange={(e: any) => handleActivityChange(act.id, 'period', e.target.value)}
                                            />
                                            <Input
                                                label="Persons Involved"
                                                placeholder="Teachers, Staff..."
                                                value={act.persons}
                                                onChange={(e: any) => handleActivityChange(act.id, 'persons', e.target.value)}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5 w-full group">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest select-none group-focus-within:text-emerald-600 transition-colors">Outputs</label>
                                            <TextareaAuto
                                                className="w-full bg-white border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-xl px-4 py-3 text-sm text-slate-800 shadow-sm"
                                                placeholder="Expected outputs..."
                                                value={act.outputs}
                                                onChange={(e: any) => handleActivityChange(act.id, 'outputs', e.target.value)}
                                            />
                                        </div>

                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col gap-4">
                                            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                Budgetary Requirements
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm focus-within:border-emerald-300 transition-colors group/input">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 group-focus-within/input:text-emerald-600">Amount</label>
                                                    <input type="text" inputMode="decimal" className="w-full bg-transparent outline-none font-mono text-base font-semibold text-slate-800" placeholder="₱ 0.00" value={act.budgetAmount} onChange={(e) => handleActivityChange(act.id, 'budgetAmount', e.target.value.replace(/[^0-9.]/g, ''))} />
                                                </div>
                                                <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm focus-within:border-emerald-300 transition-colors group/input">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 group-focus-within/input:text-emerald-600">Source</label>
                                                    <input type="text" className="w-full bg-transparent outline-none font-sans text-sm font-semibold text-slate-800 mt-1" placeholder="e.g. MOOE" value={act.budgetSource} onChange={(e) => handleActivityChange(act.id, 'budgetSource', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* FULL MODE ONLY: INTERACTIVE ACTIVITIES TABLE */}
            {appMode === 'full' && (
                <div className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Action Plan & Budget</h2>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-visible overflow-x-auto pb-4">
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden min-w-[1000px]">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="text-left select-none bg-slate-50 border-b border-slate-200">
                                        <th rowSpan={2} className="border-r border-slate-200 p-3 w-[30%] text-xs font-bold text-slate-700 uppercase tracking-wider">Activities to be Conducted</th>
                                        <th rowSpan={2} className="border-r border-slate-200 p-3 w-[15%] text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Implementation Period</th>
                                        <th rowSpan={2} className="border-r border-slate-200 p-3 w-[15%] text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Persons Involved</th>
                                        <th rowSpan={2} className="border-r border-slate-200 p-3 w-[15%] text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Outputs</th>
                                        <th colSpan={2} className="border-b border-slate-200 p-3 w-[20%] text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Budgetary Requirement</th>
                                        <th rowSpan={2} className="border-none w-10"></th>
                                    </tr>
                                    <tr className="text-center select-none bg-slate-50 border-b border-slate-200">
                                        <th className="border-r border-slate-200 p-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Amount</th>
                                        <th className="p-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Source</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {PHASES.map((phase, pIdx) => {
                                        const phaseActivities = activities.filter(a => a.phase === phase);
                                        return (
                                            <React.Fragment key={phase}>
                                                {/* Phase Header Row */}
                                                <tr className="bg-emerald-50/30 border-b border-slate-100">
                                                    <td colSpan={7} className="p-3 font-bold text-emerald-800 text-xs uppercase tracking-wider">
                                                        {pIdx + 1}. {phase}
                                                    </td>
                                                </tr>

                                                {/* Activity Rows for this Phase */}
                                                {phaseActivities.map((act, aIdx) => (
                                                    <tr key={act.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100">
                                                        <td className="border-r border-slate-100 p-2 align-top">
                                                            <div className="flex gap-2 items-start w-full">
                                                                <span className="font-bold text-slate-400 text-xs mt-2.5 shrink-0 select-none pl-1">{pIdx + 1}.{aIdx + 1}</span>
                                                                <TextareaAuto placeholder="Describe activity..." className="font-medium text-slate-700 w-full bg-transparent p-2 focus:bg-white border border-transparent focus:border-slate-300 focus:ring-2 focus:ring-emerald-500/20 rounded-lg transition-all" value={act.name} onChange={(e: any) => handleActivityChange(act.id, 'name', e.target.value)} />
                                                            </div>
                                                        </td>
                                                        <td className="border-r border-slate-100 p-2 align-top">
                                                            <TextareaAuto placeholder="e.g. Jan-Mar" className="font-medium text-slate-700 w-full bg-transparent p-2 text-center focus:bg-white border border-transparent focus:border-slate-300 focus:ring-2 focus:ring-emerald-500/20 rounded-lg transition-all" value={act.period} onChange={(e: any) => handleActivityChange(act.id, 'period', e.target.value)} />
                                                        </td>
                                                        <td className="border-r border-slate-100 p-2 align-top">
                                                            <TextareaAuto placeholder="e.g. Teachers" className="font-medium text-slate-700 w-full bg-transparent p-2 text-center focus:bg-white border border-transparent focus:border-slate-300 focus:ring-2 focus:ring-emerald-500/20 rounded-lg transition-all" value={act.persons} onChange={(e: any) => handleActivityChange(act.id, 'persons', e.target.value)} />
                                                        </td>
                                                        <td className="border-r border-slate-100 p-2 align-top">
                                                            <TextareaAuto placeholder="Expected output" className="font-medium text-slate-700 w-full bg-transparent p-2 text-center focus:bg-white border border-transparent focus:border-slate-300 focus:ring-2 focus:ring-emerald-500/20 rounded-lg transition-all" value={act.outputs} onChange={(e: any) => handleActivityChange(act.id, 'outputs', e.target.value)} />
                                                        </td>
                                                        <td className="border-r border-slate-100 p-2 align-top">
                                                            <input type="text" inputMode="decimal" className="w-full text-center outline-none font-mono text-sm font-semibold text-slate-700 bg-transparent focus:bg-white border border-transparent focus:border-slate-300 focus:ring-2 focus:ring-emerald-500/20 rounded-lg p-2 transition-all mt-0.5" placeholder="0" value={act.budgetAmount} onChange={(e) => handleActivityChange(act.id, 'budgetAmount', e.target.value.replace(/[^0-9.]/g, ''))} />
                                                        </td>
                                                        <td className="border-r border-slate-100 p-2 align-top">
                                                            <input type="text" className="w-full text-center outline-none text-sm font-medium text-slate-700 bg-transparent focus:bg-white border border-transparent focus:border-slate-300 focus:ring-2 focus:ring-emerald-500/20 rounded-lg p-2 transition-all mt-0.5" placeholder="Source" value={act.budgetSource} onChange={(e) => handleActivityChange(act.id, 'budgetSource', e.target.value)} />
                                                        </td>
                                                        <td className="border-none p-0 w-0 relative bg-white">
                                                            {activities.length > 1 && (
                                                                <button type="button" onClick={() => handleRemoveActivity(act.id)} className="absolute -right-12 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm hover:border-red-200 hover:text-red-500 hover:bg-red-50 focus:outline-none transition-colors z-10 opacity-0 group-hover:opacity-100" title="Delete Row">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}

                                                {/* Add Activity Button explicitly for this Phase */}
                                                <tr className="border-b border-slate-200 bg-white group transition-colors">
                                                    <td colSpan={7} className="p-3">
                                                        <button type="button" onClick={() => handleAddActivityPhase(phase)} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 active:scale-95 origin-left">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                            Add Activity to {phase}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
