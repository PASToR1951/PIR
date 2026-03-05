import { useMemo, useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface School {
    id: number;
    name: string;
    level: string;
    cluster: number;
}

interface StatsBarProps {
    schools: School[];
    loading: boolean;
}

/** Animate a number from 0 → target over `duration` ms */
const useCountUp = (target: number, inView: boolean, duration = 1400) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!inView || target === 0) { setValue(target); return; }
        let start: number | null = null;
        let raf: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            setValue(Math.round(eased * target));
            if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, inView, duration]);
    return value;
};

const statVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.12 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const StatsBar = ({ schools, loading }: StatsBarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const sElemCount = useMemo(() => schools.filter(s => s.level === 'Elementary').length, [schools]);
    const sSecCount = useMemo(() => schools.filter(s => s.level === 'Secondary').length, [schools]);
    const clustersCount = useMemo(() => [...new Set(schools.map(s => s.cluster))].length, [schools]);

    const totalAnim = useCountUp(schools.length, inView);
    const elemAnim = useCountUp(sElemCount, inView);
    const secAnim = useCountUp(sSecCount, inView);
    const clusterAnim = useCountUp(clustersCount, inView);

    const stats = [
        { label: 'Total Schools', value: totalAnim, i: 0 },
        { label: 'Elementary', value: elemAnim, i: 1 },
        { label: 'Secondary', value: secAnim, i: 2 },
        { label: 'Clusters', value: clusterAnim, i: 3 },
    ];

    return (
        <div className="stats-bar" ref={ref}>
            {stats.map(s => (
                <motion.div
                    key={s.label}
                    className="stat"
                    custom={s.i}
                    variants={statVariant}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <span className="stat-n">{loading ? '…' : s.value}</span>
                    <span className="stat-l">{s.label}</span>
                </motion.div>
            ))}
        </div>
    );
};

export default StatsBar;
