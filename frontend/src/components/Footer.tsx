const Footer = () => {
    return (
        <footer className="footer">
            <div className="foot-inner">
                <div className="f-logo">
                    <img src="/DepEd_Seal.webp" alt="DepEd Seal" />
                    <div className="f-div"></div>
                    <img src="/Division_Logo.webp" alt="Division Logo" />
                </div>
                <p className="f-title">DepEd Guihulngan City Division</p>
                <p className="f-sub">
                    Schools Division Office · Guihulngan City, Negros Oriental
                    <br />
                    PIR & AIP Management System
                </p>
                <p className="f-copy">
                    © 2026 Department of Education – Guihulngan City Schools Division Office. All rights reserved. ·
                    Republic of the Philippines · Matatag · Bata · Bansa
                </p>
            </div>
        </footer>
    );
};

export default Footer;
