import { motion } from "framer-motion";

const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 } },
};

const AboutSDO = () => {
    return (
        <section className="about-section" id="about">
            {/* Gradient accent line */}
            <div className="h-[3px] bg-gradient-to-r from-blue-600 via-pink-500 to-blue-400 mb-0 -mt-[1px]"></div>

            <div className="about-grid" style={{ paddingTop: "3rem" }}>
                <motion.div
                    className="photo-frame"
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <img src="/SDO_Facade.webp" alt="Schools Division Office Guihulngan City" />
                    <div className="photo-cap">Schools Division Office — Guihulngan City</div>
                </motion.div>

                <motion.div
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
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
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSDO;
