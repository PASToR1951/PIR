import React from 'react';
import { Input, Select } from '../shared/FormInputs';

interface AIPProfileSectionProps {
    appMode: 'wizard' | 'full';
    currentStep: number;
    schoolName: string;
    pillar: string;
    setPillar: (value: string) => void;
    depedProgram: string;
    setDepedProgram: (value: string) => void;
    sipTitle: string;
    setSipTitle: (value: string) => void;
}

const PROGRAM_LIST = [
    "MATATAG Curriculum Implementation",
    "National Reading Program (NRP)",
    "National Mathematics Program (NMP)",
    "Catch-up Fridays",
    "National Learning Camp (NLC)",
    "Oplan Kalusugan (OK)",
    "School-Based Feeding Program (SBFP)",
    "Child Protection Program",
    "Disaster Risk Reduction and Management (DRRM)",
    "Gulayan sa Paaralan Program (GPP)",
    "WINS Program",
    "Early Language, Literacy, and Numeracy (ELLN)",
    "Special Education (SPED) Program",
    "Madrasah Education Program (MEP)",
    "Indigenous Peoples Education (IPEd)",
    "Alternative Learning System (ALS)",
    "Others (Specify in SIP Title)"
];

export const AIPProfileSection: React.FC<AIPProfileSectionProps> = ({
    appMode,
    currentStep,
    schoolName,
    pillar,
    setPillar,
    depedProgram,
    setDepedProgram,
    sipTitle,
    setSipTitle
}) => {
    return (
        <div className={`${(appMode === 'full' || currentStep === 1) ? 'block' : 'hidden'} mb-6`}>
            <div className="mb-6 flex items-center gap-3">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Strategic Alignment</h2>
                    {appMode === 'wizard' && <p className="text-xs text-slate-500 font-medium mt-0.5">Define the core strategic direction of the project.</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="relative z-10">
                    <Input
                        label="Pillar / Strategic Direction"
                        placeholder="Enter Strategic Direction..."
                        value={pillar}
                        onChange={(e: any) => setPillar(e.target.value)}
                    />
                </div>
                <div className="relative z-10">
                    <Select
                        label="DepEd Program Aligned"
                        options={PROGRAM_LIST}
                        value={depedProgram}
                        onChange={(e: any) => setDepedProgram(e.target.value)}
                    />
                </div>
                <div className="relative z-10">
                    <Input
                        label="School Improvement Project / Title"
                        placeholder="Enter SIP Title..."
                        value={sipTitle}
                        onChange={(e: any) => setSipTitle(e.target.value)}
                    />
                </div>
                <div className="relative z-10">
                    <Input
                        label="Project Coordinator"
                        placeholder="Name of Coordinator..."
                        value={projectCoord}
                        onChange={(e: any) => setProjectCoord(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
