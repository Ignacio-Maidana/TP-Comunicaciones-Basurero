import React from 'react';
import logo from '../img/logo-utn-frsf.png';

const Header = () => {
    return(
        <header className="contenedorHeader">
            <div className="contenedorImagen">
                <img src={logo} alt="UTN Facultad Regional San Francisco"/>
            </div>
            <div className="contenedorTitulos">
                <h1>SmartBin</h1>
                <h3>Tu medidor de confianza</h3>
            </div>
        </header>
    )
}

export default Header;