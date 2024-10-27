import React from "react";

const Details = ({container}) => {
    return (
        <>
            <h2>Detalles</h2>
            <p>Ubicacion: {container.location}</p>
            <p>Porcentaje exacto: {container.percent}</p>
            <p>Peso: {container.weight}</p>
        </>
    )
}

export default Details