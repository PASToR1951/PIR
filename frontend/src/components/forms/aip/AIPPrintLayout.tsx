import React from 'react';
import { PHASES } from './AIPActionPlanTable';
import { Edit2 } from 'lucide-react';

interface AIPPrintLayoutProps {
    appMode: 'wizard' | 'full';
    currentStep: number;
    currentYear: number;
    pillar: string;
    depedProgram: string;
    sipTitle: string;
    projectCoord: string;
    objectives: string;
    indicators: string;
    annualTarget: string;
    activities: any[];
    editSection: (step: number) => void;
}

export const AIPPrintLayout: React.FC<AIPPrintLayoutProps> = ({
    appMode,
    currentStep,
    currentYear,
    pillar,
    depedProgram,
    sipTitle,
    projectCoord,
    objectives,
    indicators,
    annualTarget,
    activities,
    editSection
}) => {
    return (
        <div className={`print:block print:p-0 print:shadow-none print:m-0 print:bg-transparent ${appMode === 'wizard' && currentStep === 4 ? 'block container mx-auto max-w-[210mm] bg-white text-black shadow-md border border-slate-200 p-8 md:p-12 mb-12 relative' : 'hidden'} ${appMode === 'full' ? 'print:block hidden' : ''}`}>

            {/* Print Header */}
            <div className="text-center mb-8 font-serif print-reset">
                <h1 className="text-lg font-bold uppercase underline decoration-2 underline-offset-4 tracking-wide">ANNUAL IMPLEMENTATION PLAN FOR {currentYear}</h1>
            </div>

            {/* Print Section: Profile & Goals */}
            <div
                onClick={() => editSection(1)}
                className={`mb-6 relative group rounded-xl p-4 -mx-4 transition-colors print:hover:bg-transparent print:p-0 print:mx-0 print:rounded-none print-reset ${appMode === 'wizard' ? 'cursor-pointer hover:bg-emerald-50/50' : ''}`}
            >
                {appMode === 'wizard' && (
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md print:hidden flex items-center gap-1.5 z-10 pointer-events-none">
                        <Edit2 size={12} strokeWidth={2.5} />
                        Edit Section
                    </div>
                )}
                <div className="text-[12px] space-y-1">
                    <div className="flex border-b border-dotted border-black pb-1">
                        <span className="font-bold w-[25%]">Pillar/Strategic Direction:</span>
                        <span className="w-[75%]">{pillar || "\u00A0"}</span>
                    </div>
                    <div className="flex border-b border-dotted border-black pb-1">
                        <span className="font-bold w-[25%]">DepEd Program Aligned:</span>
                        <span className="w-[75%]">{depedProgram || "\u00A0"}</span>
                    </div>
                    <div className="flex border-b border-dotted border-black pb-1">
                        <span className="font-bold w-[25%]">School Improvement Project/Title:</span>
                        <span className="w-[45%]">{sipTitle || "\u00A0"}</span>
                        <span className="font-bold w-[10%]">Project Coord:</span>
                        <span className="w-[20%]">{projectCoord || "\u00A0"}</span>
                    </div>

                    <div onClick={(e) => { e.stopPropagation(); editSection(2); }} className={`pt-2 ${appMode === 'wizard' ? 'cursor-pointer hover:bg-emerald-100/50 -mx-2 px-2 py-1 rounded transition-colors print:hover:bg-transparent print:p-0 print:mx-0 print:rounded-none' : ''}`}>
                        <div className="flex border-b border-dotted border-black pb-1">
                            <span className="font-bold w-[25%] align-top">Objective/s:</span>
                            <span className="w-[75%] whitespace-pre-wrap">{objectives || "\u00A0"}</span>
                        </div>
                        <div className="flex border-b border-dotted border-black pb-1">
                            <span className="font-bold w-[25%] align-top">Performance Indicator/s (OVI):</span>
                            <span className="w-[45%] whitespace-pre-wrap">{indicators || "\u00A0"}</span>
                            <span className="font-bold w-[10%] align-top">Annual Target:</span>
                            <span className="w-[20%] whitespace-pre-wrap">{annualTarget || "\u00A0"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Section: Activities */}
            <div
                onClick={() => editSection(3)}
                className={`mb-4 relative group rounded-xl p-4 -mx-4 transition-colors print:hover:bg-transparent print:p-0 print:mx-0 print:rounded-none print-reset ${appMode === 'wizard' ? 'cursor-pointer hover:bg-emerald-50/50' : ''}`}
            >
                {appMode === 'wizard' && (
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md print:hidden flex items-center gap-1.5 z-10 pointer-events-none">
                        <Edit2 size={12} strokeWidth={2.5} />
                        Edit Section
                    </div>
                )}
                <table className="w-full border-collapse border border-black text-[11px] table-fixed">
                    <thead>
                        <tr className="text-center font-bold bg-slate-100 print:bg-transparent">
                            <th rowSpan={2} className="border border-black p-1 w-[28%]">SCHOOL IMPROVEMENT PROJECT ACTIVITIES</th>
                            <th rowSpan={2} className="border border-black p-1 w-[12%]">Sched. for the year</th>
                            <th rowSpan={2} className="border border-black p-1 w-[15%]">Persons Involved</th>
                            <th rowSpan={2} className="border border-black p-1 w-[20%]">Outputs</th>
                            <th colSpan={2} className="border border-black p-1 w-[25%]">Budgetary Requirements</th>
                        </tr>
                        <tr className="text-center font-bold bg-slate-100 print:bg-transparent">
                            <th className="border border-black p-0.5">Amount</th>
                            <th className="border border-black p-0.5">Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PHASES.map((phase, pIdx) => {
                            const phaseActivities = activities.filter(a => a.phase === phase);
                            if (phaseActivities.length === 0) return null;

                            return (
                                <React.Fragment key={phase}>
                                    <tr>
                                        <td colSpan={6} className="border border-black p-1 font-bold text-[10px] uppercase bg-slate-50 print:bg-transparent">
                                            {pIdx + 1}. {phase}
                                        </td>
                                    </tr>
                                    {phaseActivities.map((act, aIdx) => (
                                        <tr key={act.id}>
                                            <td className="border border-black p-1 align-top whitespace-pre-wrap"><span className="font-bold mr-1">{pIdx + 1}.{aIdx + 1}</span> {act.name}</td>
                                            <td className="border border-black p-1 text-center align-top">{act.period}</td>
                                            <td className="border border-black p-1 text-center align-top">{act.persons}</td>
                                            <td className="border border-black p-1 text-center align-top whitespace-pre-wrap">{act.outputs}</td>
                                            <td className="border border-black p-1 text-center align-top">{act.budgetAmount}</td>
                                            <td className="border border-black p-1 text-center align-top">{act.budgetSource}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Print Signatures */}
            <div
                onClick={() => editSection(4)}
                className={`page-break-inside-avoid relative group rounded-xl p-4 -mx-4 transition-colors print:hover:bg-transparent print:p-0 print:mx-0 print:rounded-none mt-8 mb-4 print-reset ${appMode === 'wizard' ? 'cursor-pointer hover:bg-emerald-50/50' : ''}`}
            >
                {appMode === 'wizard' && (
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md print:hidden flex items-center gap-1.5 z-10 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                        Edit Section
                    </div>
                )}
                <div className="grid grid-cols-2 gap-16">
                    <div className="text-center">
                        <p className="text-sm text-left mb-8 font-medium">Prepared by:</p>
                        <div className="border-b border-black font-bold uppercase text-sm pb-1 min-h-[24px]">
                            {projectCoord}
                        </div>
                        <p className="text-xs mt-1 font-medium">Project Coordinator</p>
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
