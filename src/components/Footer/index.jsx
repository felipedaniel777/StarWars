import React from 'react';
import './Footer.sass';
import LogoFooter from '../../assets/img/logoFooter.png';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-text">
                STARUARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos reservados
            </div>
            <div className="divider"></div>
            <img src={LogoFooter} alt="Logo da Empresa" className="company-logo" />
        </footer>
    );
};

export default Footer;
