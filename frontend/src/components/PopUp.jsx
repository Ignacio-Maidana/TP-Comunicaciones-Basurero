import React, { useState, useEffect } from 'react';
import '../styles/PopUp.css'

const Popup = ({ show, handleClose, handleSubmit, selectedContainer }) => {
    const [containerType, setContainerType] = useState('');
    const [containerLocation, setContainerLocation] = useState('');
    const [containerSensorId, setContainerSensorId] = useState('');

    useEffect(() => {
        if (selectedContainer) {
            setContainerType(selectedContainer.tipo || '');
            setContainerLocation(selectedContainer.ubicacion || '');
            setContainerSensorId(selectedContainer.sensorId || '');
        } else {
            setContainerType('');
            setContainerLocation('');
            setContainerSensorId('');
        }
    }, [selectedContainer]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!containerType || !containerLocation || !containerSensorId) {
            alert('Por favor completa todos los campos.');
            return;
        }

        handleSubmit(containerType, containerLocation, containerSensorId);
        
        setContainerType('');
        setContainerLocation('');
        setContainerSensorId('');
        handleClose();
    };

    return (
        show && (
            <div className={`popup ${show ? 'show' : ''}`}>
                <div className="popup-content">
                    <button className="close-button" onClick={handleClose}>X</button>
                    <h2>{selectedContainer ? 'Modificar Basurero' : 'Agregar Nuevo Basurero'}</h2>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Basurero:</label>
                            <select 
                                name="containerType" 
                                value={containerType} 
                                onChange={(e) => setContainerType(e.target.value)}>
                                <option value="">Seleccione una opción...</option>
                                <option value="Plasticos y Latas">Plasticos y Latas</option>
                                <option value="Papeles y Cartones">Papeles y Cartones</option>
                                <option value="Vidrio">Vidrio</option>
                                <option value="Orgánicos">Orgánicos</option>
                                <option value="Varios">Varios</option>
                            </select>
                        </div>
                        <div>
                            <label>Ubicación:</label>
                            <select 
                                name="containerLocation" 
                                value={containerLocation} 
                                onChange={(e) => setContainerLocation(e.target.value)}
                            >
                                <option value="">Seleccione una opción...</option>
                                <option value="Cafetería">Cafetería</option>
                                <option value="Entrada">Entrada</option>
                                <option value="4to Nivel">4to Nivel</option>
                                <option value="Baños">2do Piso - Baños</option>
                                <option value="UCES">2do Piso - UCES</option>
                            </select>
                        </div>
                        <div>
                            <label>Sensor ID:</label>
                            <input 
                                type="text" 
                                value={containerSensorId} 
                                onChange={(e) => setContainerSensorId(e.target.value)}
                                placeholder="ID del Sensor"
                            />
                        </div>
                        <button className='submit' type="submit">
                            {selectedContainer ? 'Guardar Cambios' : 'Agregar'}
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export default Popup;