import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FormSignatureBlockProps {
    appMode: 'wizard' | 'full';
    preparedBy: string;
    preparedByLabel: string;
    preparedByTitle: string;
    onPreparedByChange: (value: string) => void;
    notedBy: string;
    notedByLabel: string;
    notedByTitle: string;
    icon?: React.ReactNode;
}

export const FormSignatureBlock: React.FC<FormSignatureBlockProps> = ({
    appMode,
    preparedBy,
    preparedByLabel,
    preparedByTitle,
    onPreparedByChange,
    notedBy,
    notedByLabel,
    notedByTitle,
    icon
}) => {
    return (
        <div>
            <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="p-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl">
                    {icon || <ShieldCheck size={20} strokeWidth={2.5} />}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Finalize Document</h2>
                    {appMode === 'wizard' && <p className="text-sm text-slate-500 font-medium mt-0.5">Review signatures and submit. Scroll down to preview the printable layout.</p>}
                </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-2 relative overflow-hidden">
                <svg className="absolute inset-0 h-full w-full opacity-30 stroke-slate-200 mask-image:linear-gradient(to_bottom,transparent,black)" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="diagonal-lines" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="20" strokeWidth="2"></line></pattern></defs><rect width="100%" height="100%" fill="url(#diagonal-lines)"></rect></svg>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
                    <div className="flex flex-col">
                        <p className="text-xs text-left mb-8 select-none text-slate-500 font-bold uppercase tracking-widest">{preparedByLabel}</p>
                        <input
                            type="text"
                            className="w-full border-b-2 border-slate-200 focus:border-slate-500 transition-colors text-center font-black uppercase text-lg outline-none bg-transparent pb-2 text-slate-800 placeholder:text-slate-300"
                            placeholder="NAME"
                            value={preparedBy}
                            onChange={(e) => onPreparedByChange(e.target.value)}
                        />
                        <p className="text-xs mt-3 select-none text-slate-500 text-center font-semibold uppercase tracking-widest">{preparedByTitle}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-left mb-8 select-none text-slate-500 font-bold uppercase tracking-widest">{notedByLabel}</p>
                        <input
                            type="text"
                            className="w-full border-b-2 border-slate-200 text-center font-black uppercase text-lg pointer-events-none select-none bg-transparent pb-2 text-slate-800"
                            value={notedBy}
                            readOnly
                            tabIndex={-1}
                        />
                        <p className="text-xs mt-3 select-none text-slate-500 text-center font-semibold uppercase tracking-widest">{notedByTitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
