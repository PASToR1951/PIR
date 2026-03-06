import { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const TextareaAuto = ({ className, ...props }: any) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = ref.current.scrollHeight + 'px';
        }
    }, [props.value]);

    return (
        <textarea
            ref={ref}
            className={`resize-none overflow-hidden ${className || ''}`}
            rows={1}
            {...props}
        />
    );
};

export const Input = ({ label, ...props }: any) => (
    <div className="flex flex-col gap-1.5 w-full group">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest select-none group-focus-within:text-blue-600 transition-colors">{label}</label>
        <input
            className="w-full bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl px-4 py-3 text-sm text-slate-800 shadow-sm"
            {...props}
        />
    </div>
);

export const Select = ({ label, options, ...props }: any) => (
    <div className="flex flex-col gap-1.5 w-full group">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest select-none group-focus-within:text-blue-600 transition-colors">{label}</label>
        <div className="relative">
            <select
                className="w-full bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl pl-4 pr-10 py-3 text-sm text-slate-800 appearance-none shadow-sm font-medium"
                {...props}
            >
                <option value="" disabled>Select {label}</option>
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <ChevronDown size={16} strokeWidth={2.5} />
            </div>
        </div>
    </div>
);
