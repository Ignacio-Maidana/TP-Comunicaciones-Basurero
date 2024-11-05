import React, { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const TrashGraphic = ({ containers }) => {
    const [selectedContainer, setSelectedContainer] = useState(null);

    const handleSelectChange = (e) => {
        const selectedContainerId = e.target.value;
        const container = containers.find(
            container => container.id === parseInt(selectedContainerId)
        );
        setSelectedContainer(container);
    };

    return (
        <>
            <Header/>
            <Link to='/'><button>🏠</button></Link><br/>
            <select onChange={handleSelectChange}>
                <option value="">Selecciona un contenedor</option>
                {containers.map((container) => (
                    <option key={container.id} value={container.id}>
                        {`Tipo: ${container.tipo}, Ubicación: ${container.ubicacion}`}
                    </option>
                ))}
            </select>
            {selectedContainer && (
                <div>
                    <h3>Contenedor seleccionado:</h3>
                    <p>Tipo: {selectedContainer.tipo}</p>
                    <p>Ubicación: {selectedContainer.ubicacion}</p>
                    <p>Estado: {selectedContainer.estado || 'No especificado'}</p>
                    <p>Distancia: {selectedContainer.distancia || 'No especificada'}</p>
                    <p>Kg Estimados: {selectedContainer.kg_estimados || 'No especificados'}</p>
                    <p>Basura Recolectada: {selectedContainer.basura_recolectada || 'No especificada'}</p>
                </div>
            )}
        </>
    )
}

export default TrashGraphic;