import { motion } from "framer-motion";
import { AuroraBackground } from "./ui/aurora-background";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.15 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const Hero = () => {
    return (
        <section className="relative" id="home">
            <AuroraBackground className="w-full min-h-screen pt-16 pb-28 justify-center bg-[#060d2e] overflow-hidden">
                <motion.div
                    className="hero-inner text-center z-10 w-full max-w-[820px] px-6"
                    initial="hidden"
                    animate="visible"
                >
                    {/* Logos */}
                    <motion.div className="logo-row" custom={0} variants={fadeUp}>
                        <div className="logo-ring">
                            <img src="/DepEd_Seal.webp" alt="DepEd Seal" />
                        </div>
                        <div className="logo-div"></div>
                        <div className="logo-ring">
                            <img src="/Division_Logo.webp" alt="Division Logo" />
                        </div>
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-full px-5 py-1.5 mb-8"
                        custom={1}
                        variants={fadeUp}
                    >
                        <span className="w-[6px] h-[6px] rounded-full bg-pink-400 shadow-[0_0_8px_rgba(255,100,200,0.9)] animate-pulse"></span>
                        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-white/80">
                            Republic of the Philippines · Department of Education
                        </span>
                    </motion.div>

                    {/* Department */}
                    <motion.p
                        className="text-[clamp(0.7rem,1.6vw,0.82rem)] tracking-[0.22em] uppercase text-white/70 font-medium mb-2"
                        custom={2}
                        variants={fadeUp}
                    >
                        Schools Division Office — Guihulngan City
                    </motion.p>

                    {/* Title */}
                    <motion.h1
                        className="font-['Playfair_Display',serif] text-[clamp(2.2rem,5.5vw,3.9rem)] font-black leading-[1.06] text-white mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
                        custom={3}
                        variants={fadeUp}
                    >
                        DepEd Guihulngan
                        <br />
                        City Division
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-[clamp(1.1rem,2.6vw,1.4rem)] font-extrabold bg-gradient-to-r from-pink-200 via-white to-blue-200 bg-clip-text text-transparent mb-4 drop-shadow-lg"
                        custom={4}
                        variants={fadeUp}
                    >
                        PIR &amp; AIP System
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        className="text-[clamp(0.85rem,1.5vw,1rem)] text-white/75 max-w-[580px] mx-auto mb-8 leading-relaxed"
                        custom={5}
                        variants={fadeUp}
                    >
                        A unified platform for the <strong className="text-white/90">Performance Indicators Report (PIR)</strong> and{" "}
                        <strong className="text-white/90">Annual Implementation Plan (AIP)</strong> — select your school below to get started.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div className="btn-row" custom={6} variants={fadeUp}>
                        <a href="#select-school" className="btn btn-primary">
                            🏫 Select Your School
                        </a>
                        <a href="#about" className="btn btn-pink">
                            📋 About the SDO
                        </a>
                    </motion.div>
                </motion.div>
            </AuroraBackground>

            {/* Scroll indicator */}
            <motion.div
                className="scroll-ind"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <div className="scroll-mouse">
                    <div className="scroll-whl"></div>
                </div>
                <span>Scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;
