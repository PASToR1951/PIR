import { useState, useEffect } from 'react';
import './index.css';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import SchoolSelector from './components/SchoolSelector';
import AboutSDO from './components/AboutSDO';
import Footer from './components/Footer';
import AIPForm from './components/AIPForm';
import PIRForm from './components/PIRForm';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface School {
    id: number;
    name: string;
    level: string;
    cluster: number;
}

export default function App() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => setCurrentPath(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        fetch(`${API_BASE}/api/schools`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setSchools(data);
                } else {
                    console.error("API returned unexpected data shape:", data);
                    setSchools([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch schools", err);
                setLoading(false);
            });
    }, []);

    // Hash Routing Logic
    const pathParts = currentPath.split('?')[0];
    const queryParams = new URLSearchParams(currentPath.split('?')[1] || "");
    const schoolIdParam = parseInt(queryParams.get('school') || "0");
    const schoolNameParam = queryParams.get('name') || "Unknown School";

    if (pathParts === '#/aip/new') {
        return <AIPForm schoolId={schoolIdParam} schoolName={schoolNameParam} />;
    }

    if (pathParts === '#/pir/new') {
        return <PIRForm schoolId={schoolIdParam} schoolName={schoolNameParam} />;
    }

    return (
        <>
            <div className="flag-strip"></div>
            <Hero />
            <StatsBar schools={schools} loading={loading} />
            <SchoolSelector schools={schools} loading={loading} />
            <AboutSDO />
            <Footer />
            <div className="flag-strip"></div>
        </>
    );
}
