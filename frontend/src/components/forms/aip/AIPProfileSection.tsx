import React from 'react';
import { Gauge } from 'lucide-react';
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
    projectCoord: string;
    setProjectCoord: (value: string) => void;
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
    pillar,
    setPillar,
    depedProgram,
    setDepedProgram,
    sipTitle,
    setSipTitle,
    projectCoord,
    setProjectCoord
}) => {
    return (
        <div className={`${(appMode === 'full' || currentStep === 1) ? 'block' : 'hidden'} mb-6`}>
            <div className="mb-6 flex items-center gap-3">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                    <Gauge size={16} strokeWidth={2.5} />
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
