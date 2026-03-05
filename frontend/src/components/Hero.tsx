import { BackgroundLines } from "./ui/background-lines";

const Hero = () => {
    return (
        <section className="relative min-h-screen" id="home">
            <BackgroundLines
                containerClassName="!h-screen bg-transparent"
                className="flex flex-col items-center justify-center w-full px-4"
            >
                <div className="hero-inner text-center">
                    <div className="logo-row">
                        <div className="logo-ring">
                            <img src="/DepEd_Seal.webp" alt="DepEd Seal" />
                        </div>
                        <div className="logo-div"></div>
                        <div className="logo-ring">
                            <img src="/Division_Logo.webp" alt="Division Logo" />
                        </div>
                    </div>

                    <div className="badge">
                        <span className="badge-dot"></span>Republic of the Philippines · Department of Education
                    </div>

                    <p className="hero-dept">Schools Division Office — Guihulngan City</p>
                    <h1 className="hero-title">
                        DepEd Guihulngan
                        <br />
                        City Division
                    </h1>
                    <p className="hero-sub">PIR & AIP System</p>
                    <p className="hero-desc">
                        A unified platform for the <strong>Performance Indicators Report (PIR)</strong> and{" "}
                        <strong>Annual Implementation Plan (AIP)</strong> — select your school below to get started.
                    </p>

                    <div className="btn-row">
                        <a href="#select-school" className="btn btn-primary">
                            🏫 Select Your School
                        </a>
                        <a href="#about" className="btn btn-pink">
                            📋 About the SDO
                        </a>
                    </div>
                </div>
            </BackgroundLines>

            <div className="scroll-ind">
                <div className="scroll-mouse">
                    <div className="scroll-whl"></div>
                </div>
                <span>Scroll</span>
            </div>
        </section>
    );
};

export default Hero;
