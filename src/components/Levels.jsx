import React from "react";

const Levels = () => {
    return(
        <div className="containerLevels">
            <h2>Niveles</h2>
            <ul>
                <li>Vacio: 0%</li>
                <li>Bajo: -25%</li>
                <li>Medio: 26% - 75%</li>
                <li>Medio Lleno : 76% - 99%</li>
                <li>Lleno: 100%</li>
            </ul>
        </div>
    )
}

export default Levels;