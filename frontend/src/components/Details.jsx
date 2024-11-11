import React from "react";

const Details = ({ container }) => {
    return (
        <>
            <h2>Detalles</h2>
            <p>Ubicación: {container.ubicacion}</p>
            <p>Porcentaje exacto: {container.porcentaje}</p>
            <p>Peso: {container.peso}</p>
        </>
    );
};

export default Details