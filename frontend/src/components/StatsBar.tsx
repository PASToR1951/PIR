import { useMemo } from 'react';

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

const StatsBar = ({ schools, loading }: StatsBarProps) => {
    const sElemCount = useMemo(() => schools.filter(s => s.level === 'Elementary').length, [schools]);
    const sSecCount = useMemo(() => schools.filter(s => s.level === 'Secondary').length, [schools]);
    const clustersCount = useMemo(() => [...new Set(schools.map(s => s.cluster))].length, [schools]);

    return (
        <div className="stats-bar">
            <div className="stat">
                <span className="stat-n">{loading ? '...' : schools.length}</span>
                <span className="stat-l">Total Schools</span>
            </div>
            <div className="stat">
                <span className="stat-n">{loading ? '...' : sElemCount}</span>
                <span className="stat-l">Elementary</span>
            </div>
            <div className="stat">
                <span className="stat-n">{loading ? '...' : sSecCount}</span>
                <span className="stat-l">Secondary</span>
            </div>
            <div className="stat">
                <span className="stat-n">{loading ? '...' : clustersCount}</span>
                <span className="stat-l">Clusters</span>
            </div>
        </div>
    );
};

export default StatsBar;
<EPHEMERAL_MESSAGE>
    <important_reminder>
        In the previous tool call, you attempted to create the file /home/ghost/PIR/frontend/src/components/Hero.tsx. This was done without first reading the directory /home/ghost/PIR/frontend/src/components or even checking if it exists. To avoid potential errors or duplicate work, you should ALWAYS list the directory contents before attempting to create new files in it.
    </important_reminder>
</EPHEMERAL_MESSAGE>
