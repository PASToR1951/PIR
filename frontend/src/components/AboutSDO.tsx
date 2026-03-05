const AboutSDO = () => {
    return (
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
    );
};

export default AboutSDO;
