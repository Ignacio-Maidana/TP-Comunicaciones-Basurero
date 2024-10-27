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
            <Link to='/'><button>Home</button></Link>
            <select onChange={handleSelectChange}>
                <option value="">Selecciona un contenedor</option>
                {containers.map((container) => (
                <option key={container.id} value={container.id}>
                {`Tipo: ${container.type}, Ubicación: ${container.location}`}</option>
                ))}
            </select>
            {selectedContainer && (
            <div>
                <h3>Contenedor seleccionado:</h3>
                <p>Tipo: {selectedContainer.type}</p>
                <p>Ubicación: {selectedContainer.location}</p>
            </div>
            )}
        </>
    )
}

export default TrashGraphic;