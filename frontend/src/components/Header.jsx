import React from 'react';
import logo from '../img/logo-utn-frsf.png';
import logoProyecto from '../img/logoProyecto.png';
import '../styles/Header.css';

const Header = () => {
    return(
        <header className="containerHeader">
            <div className="containerImage">
                <img src={logo} alt="UTN Facultad Regional San Francisco"/>
            </div>
            <div className="containerTittles">
                <div className="containerLogo">
                    <img src={logoProyecto} alt="logo" />
                </div>
                <div className="titles">
                    <h1>SmartBin</h1>
                    <h3>Tu medidor de confianza</h3>
                </div>
            </div>
        </header>
    )
}

export default Header;