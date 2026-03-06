import React from 'react';
import { ChevronRight, FileText } from 'lucide-react';

interface FormSplashScreenProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    isMobile: boolean;
    onSelectMode: (mode: 'wizard' | 'full') => void;
}

export const FormSplashScreen: React.FC<FormSplashScreenProps> = ({
    title,
    subtitle,
    icon,
    isMobile,
    onSelectMode
}) => {
    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
            {/* Aceternity Grid Background */}
            <div className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_110%)] pointer-events-none z-0"></div>

            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
                <div className="bg-white/90 border border-slate-200 rounded-[2rem] p-8 md:p-14 shadow-xl text-center max-w-lg w-full mx-auto ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 duration-700">
                    <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 shadow-inner border border-slate-100 bg-slate-50`}>
                        {icon}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 pb-2 mb-3">
                        {title}
                    </h1>
                    <p className="text-slate-500 font-medium mb-10 text-sm md:text-base px-4">
                        {subtitle}
                        {!isMobile && <span className="block mt-2 font-normal text-slate-400">Choose how you would like to complete your evaluation.</span>}
                    </p>

                    {isMobile ? (
                        <button
                            onClick={() => onSelectMode('wizard')}
                            className="w-full inline-flex h-14 items-center justify-center rounded-2xl bg-slate-900 px-8 font-bold text-white shadow-md hover:bg-slate-800 transition-colors active:scale-95 gap-3"
                        >
                            Start Wizard
                            <ChevronRight size={18} strokeWidth={2.5} />
                        </button>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => onSelectMode('wizard')}
                                className="group relative w-full inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-white border border-slate-200 px-6 text-sm font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-slate-100/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <ChevronRight size={16} strokeWidth={2.5} className="text-slate-500" />
                                        <span className="text-sm">Step-by-Step Wizard</span>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400">Guided, focused sections</span>
                                </div>
                            </button>

                            <button
                                onClick={() => onSelectMode('full')}
                                className="group relative w-full inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-white border border-slate-200 px-6 text-sm font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-slate-100/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <FileText size={16} strokeWidth={2} className="text-slate-500" />
                                        <span className="text-sm">Full Form View</span>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400">Classic paper layout</span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
