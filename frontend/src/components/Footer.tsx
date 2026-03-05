

const Footer = () => {
    return (
        <footer className="footer">
            {/* Gradient top border */}
            <div className="h-[3px] bg-gradient-to-r from-blue-500 via-pink-500 to-blue-400 -mt-[1px]"></div>

            <div className="foot-inner">
                {/* Top: 3-column layout */}
                <div className="f-grid">
                    {/* Col 1 — Branding */}
                    <div className="f-col">
                        <div className="f-logo">
                            <img src="/DepEd_Seal.webp" alt="DepEd Seal" />
                            <div className="f-div"></div>
                            <img src="/Division_Logo.webp" alt="Division Logo" />
                        </div>
                        <p className="f-title">DepEd Guihulngan City Division</p>
                        <p className="f-sub-text">
                            Schools Division Office · Guihulngan City, Negros Oriental
                        </p>
                    </div>

                    {/* Col 2 — Quick Links */}
                    <div className="f-col">
                        <p className="f-col-heading">Quick Links</p>
                        <a href="#home" className="f-link">Home</a>
                        <a href="#select-school" className="f-link">School Selector</a>
                        <a href="#about" className="f-link">About the SDO</a>
                    </div>

                    {/* Col 3 — System Info */}
                    <div className="f-col">
                        <p className="f-col-heading">System</p>
                        <p className="f-sub-text">PIR &amp; AIP Management System</p>
                        <p className="f-sub-text">Version 1.0 · 2026</p>
                        <p className="f-sub-text">Matatag · Bata · Bansa</p>
                    </div>
                </div>

                {/* Bottom */}
                <p className="f-copy">
                    © 2026 Department of Education – Guihulngan City Schools Division Office. All rights reserved. ·
                    Republic of the Philippines
                </p>
            </div>
        </footer>
    );
};

export default Footer;
