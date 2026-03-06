import React from 'react';
import { Input, Select } from '../shared/FormInputs';

const PROGRAM_LIST = [
    "CFSS", "DORP", "Early Registration/Oplan Balik Eskwela", "ALS (For school-based ALS)", "IPED",
    "Kindergarten Education", "Inclusive Education for LDS", "Learning Resource Materials Development and QA for LDS",
    "Adopt-a-School for LDS", "Alternative Delivery Modality for LDS", "Curriculum/Learning Area Programs",
    "Curricular Support Programs", "Reading Remediation", "Instructional Supervisory Program",
    "Continuing Professional Development for Teachers", "Learning Action Cells", "Learning Outcomes Assessment Program",
    "Learning Intervention Program", "Learning Materials Development and Quality Assurance Program",
    "Basic Education Research Program", "Learning Resource Centers Program", "Programs for SHS: Immersion",
    "National Certification", "SHS Tracking", "Child Protection Program", "Youth Development Program/SSG/SPG",
    "DRRM", "OK sa DepED", "Enhanced School Sports", "Guidance and Counseling Program",
    "Mental Health and Psychosocial Support", "Fitness and Wellness", "Education in Emergencies (Alternative Delivery Modality)",
    "School-Based Management Program", "Client Feedback Program", "School Utilities and Services Maintenance Program",
    "School-Based Repair and Maintenance", "Fiscal Management", "Performance Management Program",
    "Procurement Management Program", "Adopt-a-School Program", "PTA Affairs Management", "Development Planning Program",
    "Program Implementation Review", "PRAISE/Rewards and Incentives", "EBEIS, LIS, School Information Management Program",
    "Crucial Resources Inventory Program", "Office Management (incl. Records) and Housekeeping Program",
    "Advocacy, Info Education and Communications Program"
].sort();

interface PIRProfileSectionProps {
    appMode: 'wizard' | 'full';
    currentStep: number;
    schoolName: string;
    program: string;
    setProgram: (value: string) => void;
    owner: string;
    setOwner: (value: string) => void;
    rawBudget: string;
    setRawBudget: (value: string) => void;
    fundSource: string;
    setFundSource: (value: string) => void;
    formatCurrency: (value: string) => string;
}

export const PIRProfileSection: React.FC<PIRProfileSectionProps> = ({
    appMode,
    currentStep,
    schoolName,
    program,
    setProgram,
    owner,
    setOwner,
    rawBudget,
    setRawBudget,
    fundSource,
    setFundSource,
    formatCurrency
}) => {
    const [isBudgetFocused, setIsBudgetFocused] = React.useState(false);
    const displayBudget = isBudgetFocused ? rawBudget : formatCurrency(rawBudget);

    return (
        <div className={`${(appMode === 'full' || currentStep === 1) ? 'block' : 'hidden'} ${appMode === 'full' ? 'mb-12' : 'mb-6'}`}>
            <div className="mb-6 flex items-center gap-3">
                <div className="p-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Program Profile</h2>
                    {appMode === 'wizard' && <p className="text-xs text-slate-500 font-medium mt-0.5">Define the fundamental details of the program being evaluated.</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="relative z-10">
                    <Select
                        label="Program Name"
                        placeholder="Select Program"
                        options={PROGRAM_LIST}
                        value={program}
                        onChange={(e: any) => setProgram(e.target.value)}
                    />
                </div>
                <div className="relative z-10">
                    <Input
                        label="School"
                        value={schoolName}
                        readOnly
                    />
                </div>
                <div className="relative z-10">
                    <Input
                        label="Program Owner"
                        placeholder="Name of owner"
                        value={owner}
                        onChange={(e: any) => setOwner(e.target.value)}
                    />
                </div>
                <div className="relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Budget"
                            placeholder="₱ 0.00"
                            inputMode="decimal"
                            value={displayBudget}
                            onFocus={() => setIsBudgetFocused(true)}
                            onBlur={() => setIsBudgetFocused(false)}
                            onChange={(e: any) => setRawBudget(e.target.value.replace(/[^0-9.]/g, ''))}
                        />
                        <Select
                            label="Fund Source"
                            placeholder="Select Source"
                            options={["MOOE", "SARO"]}
                            value={fundSource}
                            onChange={(e: any) => setFundSource(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
