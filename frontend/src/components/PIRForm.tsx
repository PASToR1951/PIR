import { useState, useEffect } from 'react';
import { FileText, LayoutTemplate, ChevronRight, Check } from 'lucide-react';
import { useWakeLock } from '../hooks/useWakeLock';
import { useAutoSave, loadDraft, clearDraft } from '../hooks/useAutoSave';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface PIRFormProps {
    schoolId: number;
    schoolName: string;
}

import { FormSplashScreen } from './forms/shared/FormSplashScreen';
import { WizardFooter } from './forms/shared/WizardFooter';
import { FormSignatureBlock } from './forms/shared/FormSignatureBlock';
import { FormActionButtons } from './forms/shared/FormActionButtons';
import { DeleteConfirmModal } from './forms/shared/DeleteConfirmModal';

import { PIRProfileSection } from './forms/pir/PIRProfileSection';
import { PIRPerformanceTable } from './forms/pir/PIRPerformanceTable';
import { PIRFactorsSection, FACTOR_TYPES } from './forms/pir/PIRFactorsSection';
import { PIRPrintLayout } from './forms/pir/PIRPrintLayout';

export default function PIRForm({ schoolId, schoolName }: PIRFormProps) {
    const DRAFT_KEY = `pir_draft_school_${schoolId}`;

    useWakeLock();

    const [appMode, setAppMode] = useState<string>('splash');
    const [isMobile, setIsMobile] = useState(false);
    const [quarterString, setQuarterString] = useState("");

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const [activeFactorTab, setActiveFactorTab] = useState(FACTOR_TYPES[0]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAddingActivity, setIsAddingActivity] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState<string | null>(null);

    const draft = loadDraft<any>(DRAFT_KEY);
    const [program, setProgram] = useState(draft?.program || "");
    const [owner, setOwner] = useState(draft?.owner || "");
    const [fundSource, setFundSource] = useState(draft?.fundSource || "MOOE");
    const [rawBudget, setRawBudget] = useState(draft?.rawBudget || "");

    useEffect(() => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        if (month <= 2) setQuarterString(`1st Quarter CY ${year}`);
        else if (month <= 5) setQuarterString(`2nd Quarter CY ${year}`);
        else if (month <= 8) setQuarterString(`3rd Quarter CY ${year}`);
        else setQuarterString(`4th Quarter CY ${year}`);

        const checkMobile = () => {
            const mobileStatus = window.innerWidth < 768;
            setIsMobile(mobileStatus);
            if (mobileStatus && appMode === 'full') {
                setAppMode('wizard');
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [appMode]);

    const formatCurrency = (val: string) => {
        if (!val) return "";
        return `₱ ${parseFloat(val).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const [activities, setActivities] = useState(draft?.activities || [
        { id: crypto.randomUUID(), name: "", physTarget: "", finTarget: "", physAcc: "", finAcc: "", actions: "" }
    ]);
    const [expandedActivityId, setExpandedActivityId] = useState(activities[0]?.id || null);

    const initialFactors: Record<string, { facilitating: string; hindering: string }> = FACTOR_TYPES.reduce((acc: any, type) => {
        acc[type] = { facilitating: "", hindering: "" };
        return acc;
    }, {} as any);
    const [factors, setFactors] = useState(draft?.factors || initialFactors);

    const formState = { program, owner, fundSource, rawBudget, activities, factors };
    useAutoSave(DRAFT_KEY, formState);

    const handleAddActivity = () => {
        const newId = crypto.randomUUID();
        setActivities([...activities, { id: newId, name: "", physTarget: "", finTarget: "", physAcc: "", finAcc: "", actions: "" }]);
        setExpandedActivityId(newId);

        setIsAddingActivity(true);
        setTimeout(() => setIsAddingActivity(false), 1200);
    };

    const executeDelete = (id: string) => {
        const newActivities = activities.filter((a: any) => a.id !== id);
        setActivities(newActivities);
        if (expandedActivityId === id && newActivities.length > 0) {
            setExpandedActivityId(newActivities[newActivities.length - 1].id);
        }
        setActivityToDelete(null);
    };

    const handleRemoveActivity = (id: string) => {
        const row = activities.find((a: any) => a.id === id);
        if (row && [row.name, row.physTarget, row.finTarget, row.physAcc, row.finAcc, row.actions].some(val => String(val).trim() !== '')) {
            setActivityToDelete(id);
        } else {
            executeDelete(id);
        }
    };

    const handleActivityChange = (id: string, field: string, value: any) => {
        setActivities(activities.map((a: any) => a.id === id ? { ...a, [field]: value } : a));
    };

    const handleFactorChange = (type: string, category: 'facilitating' | 'hindering', value: string) => {
        setFactors({
            ...factors,
            [type]: { ...factors[type], [category]: value }
        });
    };

    const calculateGap = (targetStr: string | number, accStr: string | number) => {
        const target = parseFloat(targetStr as string) || 0;
        const acc = parseFloat(accStr as string) || 0;
        if (target > 0) {
            if (acc >= target) return 0;
            return ((acc - target) / target) * 100;
        }
        return 0;
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const editSection = (stepNumber: number) => {
        if (appMode === 'full') return;
        setCurrentStep(stepNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleConfirmSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const payload = {
                school_id: schoolId,
                program,
                quarter: quarterString,
                owner,
                budget: rawBudget || null,
                fund_source: fundSource || 'MOOE',
                status: 'submitted',
                activities: activities.map((a: any, i: number) => ({
                    sort_order: i,
                    name: a.name,
                    physical_target: a.physTarget || null,
                    financial_target: a.finTarget || null,
                    physical_accomplishment: a.physAcc || null,
                    financial_accomplishment: a.finAcc || null,
                    actions_to_address_gap: a.actions || null,
                })),
                factors: Object.entries(factors).map(([type, vals]: [string, any]) => ({
                    factor_type: type,
                    facilitating: vals.facilitating || null,
                    hindering: vals.hindering || null,
                })),
            };
            const res = await fetch(`${API_URL}/api/pir`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Submission failed');
            }
            clearDraft(DRAFT_KEY);
            setIsSubmitted(true);
        } catch (e: any) {
            alert(`Error: ${e.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (appMode === 'splash') {
        return (
            <FormSplashScreen
                title="Quarterly Performance Review"
                subtitle="Division Monitoring Evaluation and Adjustment"
                icon={<FileText size={32} strokeWidth={2} className="text-blue-600" />}
                isMobile={isMobile}
                onSelectMode={(mode) => setAppMode(mode)}
            />
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-4 md:py-12 text-slate-800 font-sans relative overflow-hidden print:py-0 print:bg-white print:text-black">

            {/* Aceternity Grid Background */}
            <div className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none z-0 print:hidden"></div>

            <style>{`
                @media print {
                    @page { margin: 1cm; }
                    body { background-color: white !important; color: black !important; }
                    .print-reset { background: transparent !important; color: black !important; border-color: black !important; }
                }
            `}</style>

            <div className="container mx-auto max-w-5xl bg-white border border-slate-200 rounded-[2rem] p-6 md:p-12 shadow-xl print:hidden mb-12 relative z-10">

                {!isMobile && (
                    <div className="absolute top-6 right-8 z-20">
                        <button
                            onClick={() => setAppMode(appMode === 'wizard' ? 'full' : 'wizard')}
                            className="text-xs font-semibold text-slate-500 hover:text-blue-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm transition-colors flex items-center gap-1.5"
                        >
                            {appMode === 'wizard' ? (
                                <><LayoutTemplate size={12} strokeWidth={2.5} /> Switch to Full View</>
                            ) : (
                                <><ChevronRight size={12} strokeWidth={2.5} /> Switch to Wizard</>
                            )}
                        </button>
                    </div>
                )}

                <div className="flex flex-col items-center justify-center mb-10 select-none text-center">
                    <div className="text-[11px] space-y-1 text-slate-500 font-bold uppercase tracking-[0.2em]">
                        <p>Republic of the Philippines</p>
                        <p className="text-slate-700">Department of Education</p>
                        <p>Negros Island Region</p>
                        <p>Division of Guihulngan City</p>
                    </div>
                    <div className="mt-8 flex flex-col items-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 pb-1">
                            Quarterly Performance Review
                        </h1>
                        <p className="text-sm md:text-base mt-2 text-slate-500 font-medium">Division Monitoring Evaluation and Adjustment</p>
                        <div className="mt-6 inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 shadow-sm relative overflow-hidden group">
                            <span className="relative">{quarterString}</span>
                        </div>
                    </div>
                </div>

                {appMode === 'wizard' && (
                    <div className="mb-12 pt-6">
                        <div className="flex justify-between items-center max-w-2xl mx-auto px-4 relative">
                            <div className="absolute left-[10%] right-[10%] top-[14px] h-[2px] bg-slate-200 -z-0 hidden md:block rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
                            </div>
                            {[
                                { num: 1, label: "Profile" },
                                { num: 2, label: "Activities" },
                                { num: 3, label: "Factors" },
                                { num: 4, label: "Review" }
                            ].map((step) => (
                                <div key={step.num} className="flex flex-col items-center gap-3 relative z-10 w-1/4">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs transition-colors ${currentStep === step.num ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100' :
                                        currentStep > step.num ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-white text-slate-400 border-2 border-slate-200'
                                        }`}>
                                        {currentStep > step.num ? (
                                            <Check size={16} strokeWidth={3} />
                                        ) : step.num}
                                    </div>
                                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${currentStep === step.num ? 'text-blue-700' : 'text-slate-400'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="min-h-[300px]">
                        <PIRProfileSection
                            appMode={appMode as 'wizard' | 'full'}
                            currentStep={currentStep}
                            schoolName={schoolName}
                            program={program}
                            setProgram={setProgram}
                            owner={owner}
                            setOwner={setOwner}
                            rawBudget={rawBudget}
                            setRawBudget={setRawBudget}
                            fundSource={fundSource}
                            setFundSource={setFundSource}
                            formatCurrency={formatCurrency}
                        />

                        <PIRPerformanceTable
                            appMode={appMode as 'wizard' | 'full'}
                            currentStep={currentStep}
                            activities={activities}
                            expandedActivityId={expandedActivityId}
                            setExpandedActivityId={setExpandedActivityId}
                            handleRemoveActivity={handleRemoveActivity}
                            handleActivityChange={handleActivityChange}
                            handleAddActivity={handleAddActivity}
                            isAddingActivity={isAddingActivity}
                            calculateGap={calculateGap}
                        />

                        <PIRFactorsSection
                            appMode={appMode as 'wizard' | 'full'}
                            currentStep={currentStep}
                            activeFactorTab={activeFactorTab}
                            setActiveFactorTab={setActiveFactorTab}
                            factors={factors}
                            handleFactorChange={handleFactorChange}
                        />

                        <FormSignatureBlock
                            appMode={appMode as 'wizard' | 'full'}
                            preparedBy={owner}
                            preparedByLabel="Prepared by:"
                            preparedByTitle="Program Owner"
                            onPreparedByChange={setOwner}
                            notedBy="DR. ENRIQUE Q. RETES, EdD"
                            notedByLabel="Noted:"
                            notedByTitle="Chief Education Supervisor"
                        />
                    </div>

                    {appMode === 'wizard' && (
                        <WizardFooter
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            prevStep={prevStep}
                            nextStep={() => {
                                if (currentStep === 3 && FACTOR_TYPES.indexOf(activeFactorTab) < FACTOR_TYPES.length - 1) {
                                    setActiveFactorTab(FACTOR_TYPES[FACTOR_TYPES.indexOf(activeFactorTab) + 1]);
                                } else {
                                    nextStep();
                                }
                            }}
                            canSkip={currentStep === 3 && FACTOR_TYPES.indexOf(activeFactorTab) < FACTOR_TYPES.length - 1}
                            onSkip={nextStep}
                            skipLabel="Skip to Review"
                            nextLabel={currentStep === 3 && FACTOR_TYPES.indexOf(activeFactorTab) < FACTOR_TYPES.length - 1 ? "Next Category" : "Continue"}
                        />
                    )}
                </form>
            </div>

            <PIRPrintLayout
                appMode={appMode as 'wizard' | 'full'}
                currentStep={currentStep}
                quarterString={quarterString}
                program={program}
                school={schoolName}
                owner={owner}
                rawBudget={rawBudget}
                fundSource={fundSource}
                activities={activities}
                factors={factors}
                formatCurrency={formatCurrency}
                calculateGap={calculateGap}
                editSection={editSection}
            />

            <FormActionButtons
                isSubmitted={isSubmitted}
                isSubmitting={isSubmitting}
                onConfirmSubmit={handleConfirmSubmit}
                onPrint={() => window.print()}
            />

            <DeleteConfirmModal
                isOpen={!!activityToDelete}
                title="Delete Activity?"
                message="This activity card contains data. Are you sure you want to permanently remove it?"
                onCancel={() => setActivityToDelete(null)}
                onConfirm={() => executeDelete(activityToDelete as string)}
            />
        </div>
    );
}
