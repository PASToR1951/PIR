import { useState, useEffect } from 'react';
import './index.css';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import SchoolSelector from './components/SchoolSelector';
import AboutSDO from './components/AboutSDO';
import Footer from './components/Footer';

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
