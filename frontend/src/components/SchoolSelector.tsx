import { useState, useMemo } from 'react';

interface School {
    id: number;
    name: string;
    level: string;
    cluster: number;
}

interface SchoolSelectorProps {
    schools: School[];
    loading: boolean;
}

const SchoolSelector = ({ schools, loading }: SchoolSelectorProps) => {
    const [activeLevel, setActiveLevel] = useState('all');
    const [activeCluster, setActiveCluster] = useState('all');
    const [searchQ, setSearchQ] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    const clusters = useMemo(() => [...new Set(schools.map(s => s.cluster))].sort((a, b) => a - b), [schools]);

    const filteredSchools = useMemo(() => {
        const q = searchQ.toLowerCase().trim();
        return schools.filter(s =>
            (activeLevel === 'all' || s.level === activeLevel) &&
            (activeCluster === 'all' || s.cluster === parseInt(activeCluster)) &&
            (!q || s.name.toLowerCase().includes(q))
        );
    }, [activeLevel, activeCluster, searchQ, schools]);

    const handleProceedAIP = () => {
        if (selectedSchool) {
            window.location.hash = `#/aip/new?school=${selectedSchool.id}&name=${encodeURIComponent(selectedSchool.name)}`;
        }
    };

    const handleProceedPIR = () => {
        if (selectedSchool) {
            window.location.hash = `#/pir/new?school=${selectedSchool.id}&name=${encodeURIComponent(selectedSchool.name)}`;
        }
    };

    return (
        <section className="selector-section" id="select-school">
            <div className="section-inner">
                <p className="eyebrow">School Selector</p>
                <h2 className="sec-title">Select Your School</h2>
                <p className="sec-lead">
                    Choose your school from the list below. Filter by level or cluster, or type to search by name.
                </p>

                <div className="sel-card">
                    {/* Level filter */}
                    <div className="filter-row">
                        <span className="filter-label">Level:</span>
                        <button
                            className={`fpill ${activeLevel === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveLevel('all')}
                        >
                            All Schools
                        </button>
                        <button
                            className={`fpill elem ${activeLevel === 'Elementary' ? 'active elem' : ''}`}
                            onClick={() => setActiveLevel('Elementary')}
                        >
                            🟢 Elementary
                        </button>
                        <button
                            className={`fpill sec ${activeLevel === 'Secondary' ? 'active sec' : ''}`}
                            onClick={() => setActiveLevel('Secondary')}
                        >
                            🩷 Secondary
                        </button>
                    </div>

                    {/* Cluster filter */}
                    <div className="cluster-row">
                        <button
                            className={`cpill ${activeCluster === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveCluster('all')}
                        >
                            All Clusters
                        </button>
                        {clusters.map(c => (
                            <button
                                key={c}
                                className={`cpill ${activeCluster === String(c) ? 'active' : ''}`}
                                onClick={() => setActiveCluster(String(c))}
                            >
                                Cluster {c}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="search-wrap">
                        <span className="search-icon">🔍</span>
                        <input
                            id="schoolSearch"
                            type="text"
                            placeholder="Type to search a school…"
                            autoComplete="off"
                            value={searchQ}
                            onChange={(e) => setSearchQ(e.target.value)}
                        />
                        {searchQ && (
                            <button className="search-clear show" onClick={() => setSearchQ('')} title="Clear">✕</button>
                        )}
                    </div>

                    {/* Count */}
                    <div className="dropdown-header">
                        <span className="dropdown-count">
                            Showing <strong>{filteredSchools.length}</strong> of <strong>{schools.length}</strong> schools
                        </span>
                    </div>

                    {/* List */}
                    <div className="school-list">
                        {loading ? (
                            <div className="no-results">Loading schools...</div>
                        ) : filteredSchools.length === 0 ? (
                            <div className="no-results">No schools match the current filters.</div>
                        ) : (
                            filteredSchools.map((s) => {
                                const isElem = s.level === 'Elementary';
                                const cls = isElem ? 'elem' : 'sec';
                                const tag = isElem ? 'Elem' : 'Sec';
                                const isSelected = selectedSchool?.id === s.id;

                                return (
                                    <div
                                        key={s.id}
                                        className={`school-opt ${isSelected ? 'selected' : ''}`}
                                        onClick={() => setSelectedSchool(s)}
                                    >
                                        <div className={`sdot ${cls}`}></div>
                                        <span className="sname">{s.name}</span>
                                        <span className={`stag ${cls}`}>{tag}</span>
                                        <span className="scluster">C{s.cluster}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Selected display */}
                    <div className={`selected-display ${selectedSchool ? 'show' : ''}`}>
                        <span className="sel-icon">🏫</span>
                        <div className="sel-info">
                            <div className="sel-school-name">{selectedSchool?.name || '—'}</div>
                            <div className="sel-meta">
                                {selectedSchool ? `${selectedSchool.level} School · Cluster ${selectedSchool.cluster}` : '—'}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="btn-proceed" style={{ backgroundColor: '#10b981' }} onClick={handleProceedAIP}>Start AIP →</button>
                            <button className="btn-proceed" onClick={handleProceedPIR}>Start PIR →</button>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="legend">
                        <div className="leg">
                            <div className="sdot elem"></div> Elementary
                        </div>
                        <div className="leg">
                            <div className="sdot sec"></div> Secondary
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SchoolSelector;
