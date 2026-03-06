// @ts-nocheck
import { useState, useEffect } from 'react';
import { FileText, LayoutTemplate, ChevronRight, Check } from 'lucide-react';
import { useWakeLock } from '../hooks/useWakeLock';
import { useAutoSave, loadDraft, clearDraft } from '../hooks/useAutoSave';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface AIPFormProps {
    schoolId: number;
    schoolName: string;
}

const PROGRAM_LIST = [
    "CFSS", "DORP", "Early Registration/Oplan Balik Eskwela", "ALS (For school-based ALS)", "IPED",
    "Kindergarten Education", "Inclusive Education for LDS", "Learning Resource Materials Development and QA for LDS",
    "Adopt-a-School for LDS", "Alternative Delivery Modality for LDS", "Curriculum/Learning Area Programs",
    "Curricular Support Programs", "Reading Remediation", "Instructional Supervisory Program",
    "Continuing Professional Development for Teachers", "Learning Action Cells", "Learning Outcomes Assessment Program",
    "Learning Intervention Program", "Learning Materials Development and Quality Assurance Program",
    "Basic Education Research Program", "Learning Resource Centers Program", "Programs for SHS: Immersion",
    "National Certification", "SHS Tracking", "Child Protection Program", "Youth Development Program/SSG/SPG",
    "DRRM", "OK sa DepED", "Enhanced School Sports", "Guidance and Counseling Program"
].sort();

const PHASES = ["Planning", "Implementation", "Monitoring and Evaluation"];

import { FormSplashScreen } from './forms/shared/FormSplashScreen';
import { WizardFooter } from './forms/shared/WizardFooter';
import { FormSignatureBlock } from './forms/shared/FormSignatureBlock';
import { FormActionButtons } from './forms/shared/FormActionButtons';
import { DeleteConfirmModal } from './forms/shared/DeleteConfirmModal';

import { AIPProfileSection } from './forms/aip/AIPProfileSection';
import { AIPGoalsSection } from './forms/aip/AIPGoalsSection';
import { AIPActionPlanTable } from './forms/aip/AIPActionPlanTable';
import { AIPPrintLayout } from './forms/aip/AIPPrintLayout';

export default function AIPForm({ schoolId, schoolName }: AIPFormProps) {
    const DRAFT_KEY = `aip_draft_school_${schoolId}`;

    // Activate wake lock to keep screen on while filling forms
    useWakeLock();

    const [appMode, setAppMode] = useState<string>('splash');
    const [isMobile, setIsMobile] = useState(false);
    const currentYear = new Date().getFullYear();

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAddingActivity, setIsAddingActivity] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState<string | null>(null);

    // Form State — restore from localStorage draft if available
    const draft = loadDraft<any>(DRAFT_KEY);
    const [pillar, setPillar] = useState(draft?.pillar || "");
    const [depedProgram, setDepedProgram] = useState(draft?.depedProgram || "");
    const [sipTitle, setSipTitle] = useState(draft?.sipTitle || "");
    const [projectCoord, setProjectCoord] = useState(draft?.projectCoord || "");
    const [objectives, setObjectives] = useState(draft?.objectives || "");
    const [indicators, setIndicators] = useState(draft?.indicators || "");
    const [annualTarget, setAnnualTarget] = useState(draft?.annualTarget || "");

    // Activities — default budgetSource to "MOOE" for schools
    const defaultActivities = [
        { id: crypto.randomUUID(), phase: "Planning", name: "", period: "", persons: "", outputs: "", budgetAmount: "", budgetSource: "MOOE" },
        { id: crypto.randomUUID(), phase: "Implementation", name: "", period: "", persons: "", outputs: "", budgetAmount: "", budgetSource: "MOOE" },
        { id: crypto.randomUUID(), phase: "Monitoring and Evaluation", name: "", period: "", persons: "", outputs: "", budgetAmount: "", budgetSource: "MOOE" }
    ];
    const [activities, setActivities] = useState(draft?.activities || defaultActivities);
    const [expandedActivityId, setExpandedActivityId] = useState(activities[0]?.id);

    // Autosave all form state to localStorage every 2 seconds
    const formState = { pillar, depedProgram, sipTitle, projectCoord, objectives, indicators, annualTarget, activities };
    useAutoSave(DRAFT_KEY, formState);

    // Resize Listener
    useEffect(() => {
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

    const formatCurrency = (val) => {
        if (!val) return "";
        return `₱ ${parseFloat(val).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Handlers
    const handleAddActivity = () => {
        // Defaults to the last phase created
        const lastPhase = activities.length > 0 ? activities[activities.length - 1].phase : "Planning";
        handleAddActivityPhase(lastPhase);
    };

    const handleAddActivityPhase = (targetPhase) => {
        const newId = crypto.randomUUID();
        setActivities([...activities, { id: newId, phase: targetPhase, name: "", period: "", persons: "", outputs: "", budgetAmount: "", budgetSource: "MOOE" }]);
        setExpandedActivityId(newId);

        setIsAddingActivity(true);
        setTimeout(() => setIsAddingActivity(false), 1200);
    };

    const executeDelete = (id) => {
        const newActivities = activities.filter(a => a.id !== id);
        setActivities(newActivities);
        if (expandedActivityId === id && newActivities.length > 0) {
            setExpandedActivityId(newActivities[newActivities.length - 1].id);
        }
        setActivityToDelete(null);
    };

    const handleRemoveActivity = (id) => {
        const row = activities.find(a => a.id === id);
        const hasData = [row.name, row.period, row.persons, row.outputs, row.budgetAmount, row.budgetSource].some(val => String(val).trim() !== '');

        if (hasData) {
            setActivityToDelete(id);
        } else {
            executeDelete(id);
        }
    };

    const handleActivityChange = (id, field, value) => {
        setActivities(activities.map(a => a.id === id ? { ...a, [field]: value } : a));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const editSection = (stepNumber) => {
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
                fiscal_year: currentYear,
                pillar,
                deped_program: depedProgram,
                sip_title: sipTitle,
                project_coordinator: projectCoord,
                objectives,
                indicators,
                annual_target: annualTarget,
                status: 'submitted',
                activities: activities.map((a: any, i: number) => ({
                    phase: a.phase,
                    sort_order: i,
                    name: a.name,
                    period: a.period,
                    persons_involved: a.persons,
                    outputs: a.outputs,
                    budget_amount: a.budgetAmount || null,
                    budget_source: a.budgetSource || 'MOOE',
                })),
            };
            const res = await fetch(`${API_URL}/api/aip`, {
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

    // ==========================================
    // RENDER SPLASH SCREEN
    // ==========================================
    if (appMode === 'splash') {
        return (
            <FormSplashScreen
                title="Annual Implementation Plan"
                subtitle={`Strategic Planning and Development Tracking for ${currentYear}`}
                icon={<FileText size={32} strokeWidth={2} className="text-emerald-600" />}
                isMobile={isMobile}
                onSelectMode={(mode) => setAppMode(mode)}
            />
        );
    }

    // ==========================================
    // RENDER MAIN APPLICATION
    // ==========================================
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

            {/* MAIN CONTAINER */}
            <div className="container mx-auto max-w-5xl bg-white border border-slate-200 rounded-[2rem] p-6 md:p-12 shadow-xl print:hidden mb-12 relative z-10">

                {/* View Mode Toggle (Desktop Only) */}
                {!isMobile && (
                    <div className="absolute top-6 right-8 z-20">
                        <button
                            onClick={() => setAppMode(appMode === 'wizard' ? 'full' : 'wizard')}
                            className="text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm transition-colors flex items-center gap-1.5"
                        >
                            {appMode === 'wizard' ? (
                                <><LayoutTemplate size={12} strokeWidth={2.5} /> Switch to Full View</>
                            ) : (
                                <><ChevronRight size={12} strokeWidth={2.5} /> Switch to Wizard</>
                            )}
                        </button>
                    </div>
                )}

                {/* HEADER */}
                <div className="flex flex-col items-center justify-center mb-10 select-none text-center">
                    <div className="text-[11px] space-y-1 text-slate-500 font-bold uppercase tracking-[0.2em]">
                        <p>Republic of the Philippines</p>
                        <p className="text-slate-700">Department of Education</p>
                        <p>Negros Island Region</p>
                        <p>Division of Guihulngan City</p>
                    </div>
                    <div className="mt-8 flex flex-col items-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 pb-1 text-center">
                            Annual Implementation Plan
                        </h1>
                        <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-100 shadow-sm relative overflow-hidden">
                            <span>CY {currentYear}</span>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* WIZARD MODE: STEPPER & CARDS */}
                {/* ============================================================== */}
                {appMode === 'wizard' && (
                    <div className="mb-12 pt-6">
                        <div className="flex justify-between items-center max-w-2xl mx-auto px-4 relative">
                            <div className="absolute left-[10%] right-[10%] top-[14px] h-[2px] bg-slate-200 -z-0 hidden md:block rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 transition-all duration-300 ease-out" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
                            </div>
                            {[
                                { num: 1, label: "Alignment" },
                                { num: 2, label: "Targets" },
                                { num: 3, label: "Action Plan" },
                                { num: 4, label: "Review" }
                            ].map((step) => (
                                <div key={step.num} className="flex flex-col items-center gap-3 relative z-10 w-1/4">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs transition-colors ${currentStep === step.num ? 'bg-emerald-600 text-white shadow-md ring-4 ring-emerald-100' :
                                        currentStep > step.num ? 'bg-emerald-600 text-white ring-2 ring-white' : 'bg-white text-slate-400 border-2 border-slate-200'
                                        }`}>
                                        {currentStep > step.num ? (
                                            <Check size={16} strokeWidth={3} />
                                        ) : step.num}
                                    </div>
                                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${currentStep === step.num ? 'text-emerald-700' : 'text-slate-400'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="min-h-[300px]">
                        <AIPProfileSection
                            appMode={appMode as 'wizard' | 'full'}
                            currentStep={currentStep}
                            pillar={pillar}
                            setPillar={setPillar}
                            depedProgram={depedProgram}
                            setDepedProgram={setDepedProgram}
                            sipTitle={sipTitle}
                            setSipTitle={setSipTitle}
                            projectCoord={projectCoord}
                            setProjectCoord={setProjectCoord}
                        />

                        <AIPGoalsSection
                            appMode={appMode as 'wizard' | 'full'}
                            currentStep={currentStep}
                            objectives={objectives}
                            setObjectives={setObjectives}
                            indicators={indicators}
                            setIndicators={setIndicators}
                            annualTarget={annualTarget}
                            setAnnualTarget={setAnnualTarget}
                        />

                        <AIPActionPlanTable
                            appMode={appMode as 'wizard' | 'full'}
                            currentStep={currentStep}
                            activities={activities}
                            expandedActivityId={expandedActivityId}
                            setExpandedActivityId={setExpandedActivityId}
                            handleRemoveActivity={handleRemoveActivity}
                            handleActivityChange={handleActivityChange}
                            handleAddActivityPhase={handleAddActivityPhase}
                            formatCurrency={formatCurrency}
                        />

                        <FormSignatureBlock
                            appMode={appMode as 'wizard' | 'full'}
                            preparedBy={projectCoord}
                            preparedByLabel="Prepared by:"
                            preparedByTitle="Project Coordinator"
                            onPreparedByChange={setProjectCoord}
                            notedBy="DR. ENRIQUE Q. RETES, EdD"
                            notedByLabel="Noted:"
                            notedByTitle="Chief Education Supervisor"
                        />
                    </div>

                    {appMode === 'wizard' && (
                        <WizardFooter
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            onPrev={prevStep}
                            onNext={nextStep}
                        />
                    )}
                </form>
            </div>

            {/* ========================================= */}
            {/* PRINT LAYOUT & ON-SCREEN DOCUMENT PREVIEW */}
            {/* ========================================= */}
            <AIPPrintLayout
                appMode={appMode as 'wizard' | 'full'}
                currentStep={currentStep}
                currentYear={currentYear}
                pillar={pillar}
                depedProgram={depedProgram}
                sipTitle={sipTitle}
                projectCoord={projectCoord}
                objectives={objectives}
                indicators={indicators}
                annualTarget={annualTarget}
                activities={activities}
                editSection={editSection}
            />

            {/* ========================================= */}
            {/* FINAL ACTION BUTTONS (Below Preview/Full Form) */}
            {/* ========================================= */}
            <FormActionButtons
                isSubmitted={isSubmitted}
                isSubmitting={isSubmitting}
                onConfirmSubmit={handleConfirmSubmit}
                onPrint={() => window.print()}
            />

            {/* ========================================= */}
            {/* CUSTOM DELETE CONFIRMATION MODAL          */}
            {/* ========================================= */}
            <DeleteConfirmModal
                isOpen={!!activityToDelete}
                title="Delete Activity?"
                message="This activity card contains data. Are you sure you want to permanently remove it?"
                onCancel={() => setActivityToDelete(null)}
                onConfirm={() => executeDelete(activityToDelete)}
            />
        </div>
    );
}
