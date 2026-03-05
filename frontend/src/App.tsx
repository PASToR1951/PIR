import { useState, useMemo, useEffect } from 'react';
import './index.css';



interface School {
    id: number;
    name: string;
    level: string;
    cluster: number;
}

export default function App() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeLevel, setActiveLevel] = useState('all');
    const [activeCluster, setActiveCluster] = useState('all');
    const [searchQ, setSearchQ] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    const sElemCount = useMemo(() => schools.filter(s => s.level === 'Elementary').length, [schools]);
    const sSecCount = useMemo(() => schools.filter(s => s.level === 'Secondary').length, [schools]);
    const clusters = useMemo(() => [...new Set(schools.map(s => s.cluster))].sort((a, b) => a - b), [schools]);

    useEffect(() => {
        fetch("http://localhost:8000/api/schools")
            .then(res => res.json())
            .then(data => {
                setSchools(data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch schools", err);
                setLoading(false);
            });
    }, []);

    const filteredSchools = useMemo(() => {
        const q = searchQ.toLowerCase().trim();
        return schools.filter(s =>
            (activeLevel === 'all' || s.level === activeLevel) &&
            (activeCluster === 'all' || s.cluster === parseInt(activeCluster)) &&
            (!q || s.name.toLowerCase().includes(q))
        );
    }, [activeLevel, activeCluster, searchQ, schools]);

    const handleProceed = () => {
        if (selectedSchool) {
            alert(`Selected:\n${selectedSchool.name}\n${selectedSchool.level} · Cluster ${selectedSchool.cluster}\n\nSystem access coming soon.`);
        }
    };

    return (
        <>
            <div className="flag-strip"></div>

            {/* ══════════════ HERO ══════════════════════════════ */}
            <section className="hero" id="home">
                <div className="hero-bg"></div>
                <div className="hero-ov"></div>

                <div className="hero-inner">
                    <div className="logo-row">
                        <div className="logo-ring"><img src="/DepEd_Seal.webp" alt="DepEd Seal" /></div>
                        <div className="logo-div"></div>
                        <div className="logo-ring"><img src="/Division_Logo.webp" alt="Division Logo" /></div>
                    </div>

                    <div className="badge"><span className="badge-dot"></span>Republic of the Philippines · Department of Education
                    </div>

                    <p className="hero-dept">Schools Division Office — Guihulngan City</p>
                    <h1 className="hero-title">DepEd Guihulngan<br />City Division</h1>
                    <p className="hero-sub">PIR &amp; AIP System</p>
                    <p className="hero-desc">
                        A unified platform for the <strong>Performance Indicators Report (PIR)</strong> and
                        <strong>Annual Implementation Plan (AIP)</strong> — select your school below to get started.
                    </p>

                    <div className="btn-row">
                        <a href="#select-school" className="btn btn-primary">🏫 Select Your School</a>
                        <a href="#about" className="btn btn-pink">📋 About the SDO</a>
                    </div>
                </div>

                <div className="scroll-ind">
                    <div className="scroll-mouse">
                        <div className="scroll-whl"></div>
                    </div>
                    <span>Scroll</span>
                </div>
            </section>

            {/* ══════════════ STATS BAR ══════════════════════════ */}
            <div className="stats-bar">
                <div className="stat"><span className="stat-n">{loading ? '...' : schools.length}</span><span className="stat-l">Total Schools</span></div>
                <div className="stat"><span className="stat-n">{sElemCount}</span><span className="stat-l">Elementary</span></div>
                <div className="stat"><span className="stat-n">{sSecCount}</span><span className="stat-l">Secondary</span></div>
                <div className="stat"><span className="stat-n">{clusters.length}</span><span className="stat-l">Clusters</span></div>
            </div>

            {/* ══════════════ SCHOOL SELECTOR ════════════════════ */}
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
                                type="text"
                                id="schoolSearch"
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
                                filteredSchools.map((s, idx) => {
                                    const isElem = s.level === 'Elementary';
                                    const cls = isElem ? 'elem' : 'sec';
                                    const tag = isElem ? 'Elem' : 'Sec';
                                    const isSelected = selectedSchool?.name === s.name;

                                    return (
                                        <div
                                            key={`${s.name}-${idx}`}
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
                            <button className="btn-proceed" onClick={handleProceed}>Proceed →</button>
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

            {/* ══════════════ ABOUT ══════════════════════════════ */}
            <section className="about-section" id="about">
                <div className="about-grid">
                    <div className="photo-frame">
                        <img src="/SDO_Facade.webp" alt="Schools Division Office Guihulngan City" />
                        <div className="photo-cap">Schools Division Office — Guihulngan City</div>
                    </div>
                    <div>
                        <p className="eyebrow" style={{ textAlign: 'left' }}>About the SDO</p>
                        <h2 className="sec-title" style={{ textAlign: 'left', fontSize: 'clamp(1.45rem,3vw,2.1rem)', marginBottom: '.7rem' }}>
                            Guihulngan City Division
                        </h2>
                        <p className="sec-lead" style={{ textAlign: 'left', margin: '0 0 1.6rem', maxWidth: '100%' }}>
                            Committed to providing quality, accessible, and relevant basic education to every learner in
                            Guihulngan City, Negros Oriental.
                        </p>
                        <ul className="check-list">
                            <li>Implements DepEd programs aligned with national and regional priorities</li>
                            <li>Monitors and evaluates school-level performance and outcomes</li>
                            <li>Supports principals and school heads through capacity-building programs</li>
                            <li>Ensures timely submission of PIR and AIP compliance documents</li>
                            <li>Advances the MATATAG agenda for quality basic education</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ══════════════ FOOTER ═════════════════════════════ */}
            <footer>
                <div className="footer-logos">
                    <img src="/DepEd_Seal.webp" alt="DepEd Seal" className="flogo" />
                    <img src="/Division_Logo.webp" alt="Division Logo" className="flogo" />
                </div>
                <p className="footer-title">DepEd Guihulngan City Division</p>
                <p className="footer-meta">Schools Division Office · Guihulngan City, Negros Oriental<br />PIR &amp; AIP Management System</p>
                <hr className="fdiv" />
                <p className="footer-copy">© 2026 Department of Education – Guihulngan City Schools Division Office. All rights reserved. · Republic of the Philippines · Matatag · Bata · Bansa</p>
            </footer>

            <div className="flag-strip"></div>
        </>
    );
}
