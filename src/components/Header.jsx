import React from 'react';
import logo from '../img/logo-utn-frsf.png';
import '../styles/Header.css';

const Header = () => {
    return(
        <header className="containerHeader">
            <div className="containerImage">
                <img src={logo} alt="UTN Facultad Regional San Francisco"/>
            </div>
            <div className="containerTittles">
                <h1>SmartBin</h1>
                <h3>Tu medidor de confianza</h3>
            </div>
        </header>
    )
}

export default Header;