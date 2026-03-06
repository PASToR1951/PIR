import React from 'react';
import { FACTOR_TYPES } from './PIRFactorsSection';
import { Edit2 } from 'lucide-react';

interface PIRPrintLayoutProps {
    appMode: 'wizard' | 'full';
    currentStep: number;
    quarterString: string;
    program: string;
    school: string;
    owner: string;
    rawBudget: string;
    fundSource: string;
    activities: any[];
    factors: Record<string, { facilitating: string; hindering: string }>;
    formatCurrency: (val: string) => string;
    calculateGap: (targetStr: string, accStr: string) => number;
    editSection: (step: number) => void;
}

export const PIRPrintLayout: React.FC<PIRPrintLayoutProps> = ({
    appMode,
    currentStep,
    quarterString,
    program,
    school,
    owner,
    rawBudget,
    fundSource,
    activities,
    factors,
    formatCurrency,
    calculateGap,
    editSection
}) => {
    return (
        <div className={`print:block print:p-0 print:shadow-none print:m-0 print:bg-transparent ${appMode === 'wizard' && currentStep === 4 ? 'block container mx-auto max-w-[210mm] bg-white text-black shadow-md border border-slate-200 p-8 md:p-12 mb-12 relative' : 'hidden'} ${appMode === 'full' ? 'print:block hidden' : ''}`}>

            {/* Print Header */}
            <div className="text-center mb-8 font-serif print-reset">
                <p className="text-sm">Republic of the Philippines</p>
                <p className="text-sm font-bold">Department of Education</p>
                <p className="text-sm">NEGROS ISLAND REGION</p>
                <p className="text-sm">Division of Guihulngan City</p>
                <br />
                <h1 className="text-lg font-bold uppercase underline decoration-2 underline-offset-4 tracking-wide">Quarterly Performance Implementation Review (QPIR)</h1>
                <p className="text-sm mt-1 italic">Quarterly Division Monitoring Evaluation and Adjustment</p>
                <p className="text-base font-bold mt-2">{quarterString}</p>
            </div>

            {/* Print Section A */}
            <div
                onClick={() => editSection(1)}
                className={`mb-4 relative group rounded-xl p-4 -mx-4 transition-colors print:hover:bg-transparent print:p-0 print:mx-0 print:rounded-none print-reset ${appMode === 'wizard' ? 'cursor-pointer hover:bg-slate-50' : ''}`}
            >
                {appMode === 'wizard' && (
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md print:hidden flex items-center gap-1.5 z-10 pointer-events-none">
                        <Edit2 size={12} strokeWidth={2.5} />
                        Edit Section
                    </div>
                )}
                <div className="border-b-2 border-black pb-4">
                    <h2 className="font-bold text-base mb-3 uppercase tracking-wide">A. Program Profile</h2>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                        <div className="flex border-b border-black pb-1">
                            <span className="font-bold w-1/3">Program:</span>
                            <span className="w-2/3">{program || "\u00A0"}</span>
                        </div>
                        <div className="flex border-b border-black pb-1">
                            <span className="font-bold w-1/3">School:</span>
                            <span className="w-2/3">{school || "\u00A0"}</span>
                        </div>
                        <div className="flex border-b border-black pb-1">
                            <span className="font-bold w-1/3">Owner:</span>
                            <span className="w-2/3">{owner || "\u00A0"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex border-b border-black pb-1">
                                <span className="font-bold w-1/2">Budget:</span>
                                <span className="w-1/2">{formatCurrency(rawBudget) || "\u00A0"}</span>
                            </div>
                            <div className="flex border-b border-black pb-1">
                                <span className="font-bold w-1/2">Source:</span>
                                <span className="w-1/2">{fundSource || "\u00A0"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Section C */}
            <div
                onClick={() => editSection(2)}
                className={`mb-4 relative group rounded-xl p-4 -mx-4 transition-colors print:hover:bg-transparent print:p-0 print:mx-0 print:rounded-none print-reset ${appMode === 'wizard' ? 'cursor-pointer hover:bg-slate-50' : ''}`}
            >
                {appMode === 'wizard' && (
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md print:hidden flex items-center gap-1.5 z-10 pointer-events-none">
                        <Edit2 size={12} strokeWidth={2.5} />
                        Edit Section
                    </div>
                )}
                <div className="pb-2">
                    <h2 className="font-bold text-base mb-2 uppercase tracking-wide">C. Quarterly Monitoring Evaluation & Adjustment</h2>
                    <table className="w-full border-collapse text-[11px] border border-black table-fixed">
                        <thead>
                            <tr className="text-center font-bold bg-slate-100 print:bg-transparent">
                                <th rowSpan={2} className="border border-black p-2 w-[22%]">Activity</th>
                                <th colSpan={2} className="border border-black p-1">Target</th>
                                <th colSpan={2} className="border border-black p-1">Accomplished</th>
                                <th colSpan={2} className="border border-black p-1">Gap (%)</th>
                                <th rowSpan={2} className="border border-black p-2 w-[22%]">Actions</th>
                            </tr>
                            <tr className="text-center font-bold bg-slate-100 print:bg-transparent">
                                <th className="border border-black p-1 w-[8%]">Phys</th>
                                <th className="border border-black p-1 w-[8%]">Fin</th>
                                <th className="border border-black p-1 w-[8%]">Phys</th>
                                <th className="border border-black p-1 w-[8%]">Fin</th>
                                <th className="border border-black p-1 w-[8%]">Phys</th>
                                <th className="border border-black p-1 w-[8%]">Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((act) => {
                                const physGap = calculateGap(act.physTarget, act.physAcc);
                                const finGap = calculateGap(act.finTarget, act.finAcc);
                                return (
                                    <tr key={act.id}>
                                        <td className="border border-black p-2 whitespace-pre-wrap align-top">{act.name}</td>
                                        <td className="border border-black p-1 text-center align-top">{act.physTarget}</td>
                                        <td className="border border-black p-1 text-center align-top">{act.finTarget}</td>
                                        <td className="border border-black p-1 text-center align-top">{act.physAcc}</td>
                                        <td className="border border-black p-1 text-center align-top">{act.finAcc}</td>
                                        <td className="border border-black p-1 text-center font-bold align-top" style={{ color: physGap < 0 ? 'red' : 'inherit' }}>{physGap.toFixed(2)}%</td>
                                        <td className="border border-black p-1 text-center font-bold align-top" style={{ color: finGap < 0 ? 'red' : 'inherit' }}>{finGap.toFixed(2)}%</td>
                                        <td className="border border-black p-2 whitespace-pre-wrap align-top">{act.actions}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Print Section D */}
            <div
                onClick={() => editSection(3)}
                className={`mb-4 page-break-inside-avoid relative group rounded-xl p-4 -mx-4 transition-colors print:hover:bg-transparent print:p-0 print:mx-0 print:rounded-none print-reset ${appMode === 'wizard' ? 'cursor-pointer hover:bg-slate-50' : ''}`}
            >
                {appMode === 'wizard' && (
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md print:hidden flex items-center gap-1.5 z-10 pointer-events-none">
                        <Edit2 size={12} strokeWidth={2.5} />
                        Edit Section
                    </div>
                )}
                <div>
                    <h2 className="font-bold text-base mb-2 uppercase tracking-wide">D. Facilitating and Hindering Factors</h2>
                    <div className="border border-black text-xs">
                        <div className="grid grid-cols-2 font-bold text-center border-b border-black bg-slate-100 print:bg-transparent">
                            <div className="p-2 border-r border-black">Facilitating Factors</div>
                            <div className="p-2">Hindering Factors</div>
                        </div>
                        {FACTOR_TYPES.map((type, idx) => (
                            <div key={type} className={`grid grid-cols-2 ${idx !== FACTOR_TYPES.length - 1 ? 'border-b border-black' : ''}`}>
                                <div className="p-2 border-r border-black relative pt-5 min-h-[40px]">
                                    <span className="text-[9px] font-bold uppercase text-slate-500 absolute top-1 left-2 tracking-widest print:text-black">{type}</span>
                                    <div className="whitespace-pre-wrap leading-tight">{factors[type].facilitating}</div>
                                </div>
                                <div className="p-2 relative pt-5 min-h-[40px]">
                                    <span className="text-[9px] font-bold uppercase text-slate-500 absolute top-1 left-2 tracking-widest print:text-black">{type}</span>
                                    <div className="whitespace-pre-wrap leading-tight">{factors[type].hindering}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Print Signatures */}
            <div
                onClick={() => editSection(4)}
                className={`page-break-inside-avoid relative group rounded-xl p-4 -mx-4 transition-colors print:hover:bg-transparent print:p-0 print:mx-0 print:rounded-none mt-4 mb-4 print-reset ${appMode === 'wizard' ? 'cursor-pointer hover:bg-slate-50' : ''}`}
            >
                {appMode === 'wizard' && (
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md print:hidden flex items-center gap-1.5 z-10 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                        Edit Section
                    </div>
                )}
                <div className="grid grid-cols-2 gap-16 mt-8">
                    <div className="text-center">
                        <p className="text-sm text-left mb-8 font-medium">Prepared by:</p>
                        <div className="border-b border-black font-bold uppercase text-sm pb-1 min-h-[24px]">
                            {owner}
                        </div>
                        <p className="text-xs mt-1 font-medium">Program Owner</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-left mb-8 font-medium">Noted:</p>
                        <div className="border-b border-black font-bold uppercase text-sm pb-1 min-h-[24px]">
                            DR. ENRIQUE Q. RETES, EdD
                        </div>
                        <p className="text-xs mt-1 font-medium">Chief Education Supervisor</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
