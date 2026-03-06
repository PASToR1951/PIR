import React from 'react';
import { LineChart, Trash2, ChevronDown, ChevronUp, X, Edit2, Plus } from 'lucide-react';
import { TextareaAuto } from '../shared/FormInputs';

interface PIRPerformanceTableProps {
    appMode: 'wizard' | 'full';
    currentStep: number;
    activities: any[];
    expandedActivityId: string | null;
    setExpandedActivityId: (id: string | null) => void;
    handleRemoveActivity: (id: string) => void;
    handleActivityChange: (id: string, field: string, value: any) => void;
    handleAddActivity: () => void;
    isAddingActivity: boolean;
    calculateGap: (targetStr: string | number, accStr: string | number) => number;
}

export const PIRPerformanceTable: React.FC<PIRPerformanceTableProps> = ({
    appMode,
    currentStep,
    activities,
    expandedActivityId,
    setExpandedActivityId,
    handleRemoveActivity,
    handleActivityChange,
    handleAddActivity,
    isAddingActivity,
    calculateGap
}) => {
    return (
        <React.Fragment>
            {/* WIZARD ONLY: ACTIVITY CARDS (Step 2) */}
            {appMode === 'wizard' && (
                <div className={`${currentStep === 2 ? 'block' : 'hidden'} mb-6`}>
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg">
                                <LineChart size={16} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Monitoring Evaluation</h2>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">Record activities, targets, and actual accomplishments.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {activities.map((act, index) => {
                            const physGap = calculateGap(act.physTarget, act.physAcc);
                            const finGap = calculateGap(act.finTarget, act.finAcc);
                            const isExpanded = expandedActivityId === act.id;

                            if (!isExpanded) {
                                // COMPACT CARD VIEW
                                return (
                                    <div
                                        key={act.id}
                                        onClick={() => setExpandedActivityId(act.id)}
                                        className="relative group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-colors cursor-pointer flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4 overflow-hidden pr-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                <span className="font-bold text-sm">{index + 1}</span>
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-sm font-bold text-slate-800 truncate">
                                                    {act.name || <span className="text-slate-400 italic font-normal">Untitled Activity...</span>}
                                                </span>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">
                                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                        Physical Gap: <span className={physGap < 0 ? 'text-red-500' : 'text-emerald-500'}>{physGap.toFixed(2)}%</span>
                                                    </span>
                                                    <span className="text-slate-300 hidden sm:block">|</span>
                                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                        Financial Gap: <span className={finGap < 0 ? 'text-red-500' : 'text-emerald-500'}>{finGap.toFixed(2)}%</span>
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
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                <ChevronDown size={18} strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // EXPANDED CARD VIEW
                            return (
                                <div key={act.id} className="relative group bg-white border-2 border-blue-200 rounded-3xl shadow-md overflow-hidden ring-4 ring-blue-50">
                                    <div
                                        onClick={() => setExpandedActivityId(null)}
                                        className="flex items-center justify-between p-5 md:px-8 bg-slate-50/80 hover:bg-blue-50/50 transition-colors border-b border-slate-100 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
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
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full text-blue-600 bg-blue-100 transition-colors">
                                                <ChevronUp size={18} strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 flex flex-col gap-6">
                                        <div>
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Activity Name / Description</label>
                                            <TextareaAuto
                                                placeholder="Describe the activity here..."
                                                className="w-full text-lg font-semibold text-slate-800 placeholder:text-slate-300 border-b border-transparent focus:border-blue-500 transition-colors py-1"
                                                value={act.name}
                                                onChange={(e: any) => handleActivityChange(act.id, 'name', e.target.value)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                            <div className="flex flex-col gap-4">
                                                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    Physical Targets
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm focus-within:border-blue-300 transition-colors group/input">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 group-focus-within/input:text-blue-600">Target</label>
                                                        <input type="number" inputMode="decimal" className="w-full bg-transparent outline-none font-mono text-base font-semibold text-slate-800" placeholder="0" value={act.physTarget} onChange={(e) => handleActivityChange(act.id, 'physTarget', e.target.value.replace(/[^0-9.]/g, ''))} />
                                                    </div>
                                                    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm focus-within:border-blue-300 transition-colors group/input">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 group-focus-within/input:text-blue-600">Accomplished</label>
                                                        <input type="number" inputMode="decimal" className="w-full bg-transparent outline-none font-mono text-base font-semibold text-slate-800" placeholder="0" value={act.physAcc} onChange={(e) => handleActivityChange(act.id, 'physAcc', e.target.value.replace(/[^0-9.]/g, ''))} />
                                                    </div>
                                                </div>
                                                <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl border ${physGap < 0 ? 'bg-red-50 border-red-100' : 'bg-slate-100 border-slate-200'}`}>
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Physical Gap</span>
                                                    <span className={`font-mono text-sm font-bold ${physGap < 0 ? 'text-red-600' : 'text-slate-600'}`}>{physGap.toFixed(2)}%</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 relative">
                                                <div className="hidden md:block absolute -left-3 top-2 bottom-2 w-px bg-slate-200"></div>
                                                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                    Financial Targets
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm focus-within:border-emerald-300 transition-colors group/input">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 group-focus-within/input:text-emerald-600">Target</label>
                                                        <input type="number" inputMode="decimal" className="w-full bg-transparent outline-none font-mono text-base font-semibold text-slate-800" placeholder="0" value={act.finTarget} onChange={(e) => handleActivityChange(act.id, 'finTarget', e.target.value.replace(/[^0-9.]/g, ''))} />
                                                    </div>
                                                    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm focus-within:border-emerald-300 transition-colors group/input">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 group-focus-within/input:text-emerald-600">Accomplished</label>
                                                        <input type="number" inputMode="decimal" className="w-full bg-transparent outline-none font-mono text-base font-semibold text-slate-800" placeholder="0" value={act.finAcc} onChange={(e) => handleActivityChange(act.id, 'finAcc', e.target.value.replace(/[^0-9.]/g, ''))} />
                                                    </div>
                                                </div>
                                                <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl border ${finGap < 0 ? 'bg-red-50 border-red-100' : 'bg-slate-100 border-slate-200'}`}>
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Financial Gap</span>
                                                    <span className={`font-mono text-sm font-bold ${finGap < 0 ? 'text-red-600' : 'text-slate-600'}`}>{finGap.toFixed(2)}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-50 transition-colors">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                                                <Edit2 size={12} strokeWidth={3} />
                                                Actions to Address Gap
                                            </label>
                                            <TextareaAuto
                                                placeholder="What steps will be taken?"
                                                className="w-full text-sm font-medium text-slate-700 min-h-[40px]"
                                                value={act.actions}
                                                onChange={(e: any) => handleActivityChange(act.id, 'actions', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            type="button"
                            onClick={handleAddActivity}
                            className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl px-8 font-bold shadow-sm border-2 active:scale-95 transition-colors gap-2 ${isAddingActivity
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-white text-blue-600 border-blue-100 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                        >
                            {isAddingActivity ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Activity Added!
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    Add Another Activity
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* FULL MODE ONLY: INTERACTIVE ACTIVITIES TABLE */}
            {appMode === 'full' && (
                <div className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg">
                                <LineChart size={16} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Monitoring Evaluation & Adjustment</h2>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-visible overflow-x-auto pb-4">
                        <table className="w-full min-w-[1000px] border-collapse border border-black text-sm">
                            <thead>
                                <tr className="text-center select-none bg-white">
                                    <th rowSpan={2} className="border border-black p-2 w-[30%] text-xs font-bold text-black uppercase tracking-wider align-middle">Activity Name</th>
                                    <th colSpan={2} className="border border-black p-2 text-xs font-bold text-black uppercase tracking-wider align-middle">Target</th>
                                    <th colSpan={2} className="border border-black p-2 text-xs font-bold text-black uppercase tracking-wider align-middle">Accomplishment</th>
                                    <th colSpan={2} className="border border-black p-2 text-xs font-bold text-black uppercase tracking-wider align-middle">Gap (%)</th>
                                    <th rowSpan={2} className="border border-black p-2 w-[20%] text-xs font-bold text-black uppercase tracking-wider align-middle">Actions to Address Gap</th>
                                    <th rowSpan={2} className="border-none bg-white w-10"></th>
                                </tr>
                                <tr className="text-center select-none bg-white">
                                    <th className="border border-black p-2 text-[10px] font-bold text-black uppercase tracking-widest">Physical</th>
                                    <th className="border border-black p-2 text-[10px] font-bold text-black uppercase tracking-widest">Financial</th>
                                    <th className="border border-black p-2 text-[10px] font-bold text-black uppercase tracking-widest">Physical</th>
                                    <th className="border border-black p-2 text-[10px] font-bold text-black uppercase tracking-widest">Financial</th>
                                    <th className="border border-black p-2 text-[10px] font-bold text-black uppercase tracking-widest">Physical</th>
                                    <th className="border border-black p-2 text-[10px] font-bold text-black uppercase tracking-widest">Financial</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {activities.map((act) => {
                                    const physGap = calculateGap(act.physTarget, act.physAcc);
                                    const finGap = calculateGap(act.finTarget, act.finAcc);

                                    return (
                                        <tr key={act.id} className="group border border-black hover:bg-slate-50 transition-colors">
                                            <td className="border border-black p-1 align-top">
                                                <TextareaAuto placeholder="Describe activity..." className="font-medium text-black w-full bg-transparent p-1 focus:outline-none placeholder:text-slate-300 print:placeholder:text-transparent" value={act.name} onChange={(e: any) => handleActivityChange(act.id, 'name', e.target.value)} />
                                            </td>
                                            <td className="border border-black p-1 align-top">
                                                <input type="number" inputMode="decimal" className="w-full text-center outline-none font-mono text-sm font-semibold text-black bg-transparent p-1 placeholder:text-slate-300 print:placeholder:text-transparent mt-0.5" value={act.physTarget} onChange={(e) => handleActivityChange(act.id, 'physTarget', e.target.value.replace(/[^0-9.]/g, ''))} />
                                            </td>
                                            <td className="border border-black p-1 align-top">
                                                <input type="number" inputMode="decimal" className="w-full text-center outline-none font-mono text-sm font-semibold text-black bg-transparent p-1 placeholder:text-slate-300 print:placeholder:text-transparent mt-0.5" value={act.finTarget} onChange={(e) => handleActivityChange(act.id, 'finTarget', e.target.value.replace(/[^0-9.]/g, ''))} />
                                            </td>
                                            <td className="border border-black p-1 align-top">
                                                <input type="number" inputMode="decimal" className="w-full text-center outline-none font-mono text-sm font-semibold text-black bg-transparent p-1 placeholder:text-slate-300 print:placeholder:text-transparent mt-0.5" value={act.physAcc} onChange={(e) => handleActivityChange(act.id, 'physAcc', e.target.value.replace(/[^0-9.]/g, ''))} />
                                            </td>
                                            <td className="border border-black p-1 align-top">
                                                <input type="number" inputMode="decimal" className="w-full text-center outline-none font-mono text-sm font-semibold text-black bg-transparent p-1 placeholder:text-slate-300 print:placeholder:text-transparent mt-0.5" value={act.finAcc} onChange={(e) => handleActivityChange(act.id, 'finAcc', e.target.value.replace(/[^0-9.]/g, ''))} />
                                            </td>
                                            <td className="border border-black p-1 align-top bg-slate-50">
                                                <input type="text" readOnly tabIndex={-1} className="w-full text-center outline-none font-mono text-sm font-bold bg-transparent select-none pointer-events-none mt-0.5" style={{ color: physGap < 0 ? '#ef4444' : 'inherit' }} value={`${physGap.toFixed(2)}%`} />
                                            </td>
                                            <td className="border border-black p-1 align-top bg-slate-50">
                                                <input type="text" readOnly tabIndex={-1} className="w-full text-center outline-none font-mono text-sm font-bold bg-transparent select-none pointer-events-none mt-0.5" style={{ color: finGap < 0 ? '#ef4444' : 'inherit' }} value={`${finGap.toFixed(2)}%`} />
                                            </td>
                                            <td className="border border-black p-1 align-top">
                                                <TextareaAuto placeholder="Actions..." className="font-medium text-black w-full bg-transparent p-1 focus:outline-none placeholder:text-slate-300 print:placeholder:text-transparent" value={act.actions} onChange={(e: any) => handleActivityChange(act.id, 'actions', e.target.value)} />
                                            </td>
                                            <td className="border-none p-0 w-0 relative bg-white">
                                                {activities.length > 1 && (
                                                    <button type="button" onClick={() => handleRemoveActivity(act.id)} className="absolute -right-12 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm hover:border-red-200 hover:text-red-500 hover:bg-red-50 focus:outline-none transition-colors z-10 opacity-0 group-hover:opacity-100 print:hidden" title="Delete Row">
                                                        <X size={14} strokeWidth={2.5} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {/* Add Activity Button Row */}
                                <tr className="border-none bg-white group transition-colors print:hidden">
                                    <td colSpan={9} className="p-2 border-none">
                                        <button type="button" onClick={handleAddActivity} className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50/50 hover:bg-blue-100/50 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 active:scale-95 origin-left">
                                            <Plus size={14} strokeWidth={2.5} />
                                            Add Another Activity
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
