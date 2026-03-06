import React from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp, X, Plus } from 'lucide-react';
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
                                <Edit2 size={16} strokeWidth={2.5} />
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
                                                    <Trash2 size={16} strokeWidth={2.5} />
                                                </button>
                                            )}
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                                <ChevronDown size={18} strokeWidth={2.5} />
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
                                                    <X size={16} strokeWidth={2} />
                                                </button>
                                            )}
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full text-emerald-600 bg-emerald-100 transition-colors">
                                                <ChevronUp size={18} strokeWidth={2.5} />
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
                                <Edit2 size={16} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Action Plan & Budget</h2>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-visible overflow-x-auto pb-4">
                        <table className="w-full min-w-[1000px] border-collapse border border-black text-sm">
                            <thead>
                                <tr className="text-center select-none bg-white">
                                    <th rowSpan={2} className="border border-black p-2 w-[30%] text-xs font-bold text-black uppercase tracking-wider align-middle">Activities to be Conducted</th>
                                    <th rowSpan={2} className="border border-black p-2 w-[15%] text-xs font-bold text-black uppercase tracking-wider align-middle">Implementation Period</th>
                                    <th rowSpan={2} className="border border-black p-2 w-[15%] text-xs font-bold text-black uppercase tracking-wider align-middle">Persons Involved</th>
                                    <th rowSpan={2} className="border border-black p-2 w-[15%] text-xs font-bold text-black uppercase tracking-wider align-middle">Outputs</th>
                                    <th colSpan={2} className="border border-black p-2 w-[20%] text-xs font-bold text-black uppercase tracking-wider align-middle">Budgetary Requirement</th>
                                    <th rowSpan={2} className="border-none bg-white w-10"></th>
                                </tr>
                                <tr className="text-center select-none bg-white">
                                    <th className="border border-black p-2 text-[10px] font-bold text-black uppercase tracking-widest">Amount</th>
                                    <th className="border border-black p-2 text-[10px] font-bold text-black uppercase tracking-widest">Source</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {PHASES.map((phase, pIdx) => {
                                    const phaseActivities = activities.filter(a => a.phase === phase);
                                    return (
                                        <React.Fragment key={phase}>
                                            {/* Phase Header Row */}
                                            <tr className="bg-slate-200 border border-black">
                                                <td colSpan={6} className="p-2 font-bold text-black text-xs uppercase tracking-wider border border-black">
                                                    {pIdx + 1}. {phase}
                                                </td>
                                                <td className="border-none bg-white"></td>
                                            </tr>

                                            {/* Activity Rows for this Phase */}
                                            {phaseActivities.map((act, aIdx) => (
                                                <tr key={act.id} className="group border border-black bg-white hover:bg-slate-50 transition-colors">
                                                    <td className="border border-black p-1 align-top">
                                                        <div className="flex gap-1 items-start w-full">
                                                            <span className="font-bold text-black text-xs mt-1 shrink-0 select-none pl-1">{pIdx + 1}.{aIdx + 1}</span>
                                                            <TextareaAuto placeholder="Describe activity..." className="font-medium text-black w-full bg-transparent p-1 focus:outline-none placeholder:text-slate-300 print:placeholder:text-transparent" value={act.name} onChange={(e: any) => handleActivityChange(act.id, 'name', e.target.value)} />
                                                        </div>
                                                    </td>
                                                    <td className="border border-black p-1 align-top">
                                                        <TextareaAuto placeholder="e.g. Jan-Mar" className="font-medium text-black w-full bg-transparent p-1 text-center focus:outline-none placeholder:text-slate-300 print:placeholder:text-transparent" value={act.period} onChange={(e: any) => handleActivityChange(act.id, 'period', e.target.value)} />
                                                    </td>
                                                    <td className="border border-black p-1 align-top">
                                                        <TextareaAuto placeholder="e.g. Teachers" className="font-medium text-black w-full bg-transparent p-1 text-center focus:outline-none placeholder:text-slate-300 print:placeholder:text-transparent" value={act.persons} onChange={(e: any) => handleActivityChange(act.id, 'persons', e.target.value)} />
                                                    </td>
                                                    <td className="border border-black p-1 align-top">
                                                        <TextareaAuto placeholder="Expected output" className="font-medium text-black w-full bg-transparent p-1 text-center focus:outline-none placeholder:text-slate-300 print:placeholder:text-transparent" value={act.outputs} onChange={(e: any) => handleActivityChange(act.id, 'outputs', e.target.value)} />
                                                    </td>
                                                    <td className="border border-black p-1 align-top">
                                                        <input type="text" inputMode="decimal" className="w-full text-center outline-none font-mono text-sm font-semibold text-black bg-transparent p-1 placeholder:text-slate-300 print:placeholder:text-transparent mt-0.5" placeholder="0" value={act.budgetAmount} onChange={(e) => handleActivityChange(act.id, 'budgetAmount', e.target.value.replace(/[^0-9.]/g, ''))} />
                                                    </td>
                                                    <td className="border border-black p-1 align-top">
                                                        <input type="text" className="w-full text-center outline-none text-sm font-medium text-black bg-transparent p-1 placeholder:text-slate-300 print:placeholder:text-transparent mt-0.5" placeholder="Source" value={act.budgetSource} onChange={(e) => handleActivityChange(act.id, 'budgetSource', e.target.value)} />
                                                    </td>
                                                    <td className="border-none p-0 w-0 relative bg-white">
                                                        {activities.length > 1 && (
                                                            <button type="button" onClick={() => handleRemoveActivity(act.id)} className="absolute -right-12 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm hover:border-red-200 hover:text-red-500 hover:bg-red-50 focus:outline-none transition-colors z-10 opacity-0 group-hover:opacity-100 print:hidden" title="Delete Row">
                                                                <X size={14} strokeWidth={2.5} />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}

                                            {/* Add Activity Button explicitly for this Phase */}
                                            <tr className="border-none bg-white group transition-colors print:hidden">
                                                <td colSpan={7} className="p-2 border-none">
                                                    <button type="button" onClick={() => handleAddActivityPhase(phase)} className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50/50 hover:bg-blue-100/50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 active:scale-95 origin-left">
                                                        <Plus size={14} strokeWidth={2.5} />
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
            )}
        </React.Fragment>
    );
};
