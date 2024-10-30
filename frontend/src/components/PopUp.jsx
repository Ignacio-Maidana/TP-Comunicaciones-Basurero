import React, { useState, useEffect } from 'react';
import '../styles/PopUp.css'

const Popup = ({ show, handleClose, handleSubmit, selectedContainer }) => {
    const [containerType, setContainerType] = useState('');
    const [containerLocation, setContainerLocation] = useState('');

    useEffect(() => {
        if (selectedContainer) {
            // Usar los nombres de propiedades correctos del backend
            setContainerType(selectedContainer.tipo || '');
            setContainerLocation(selectedContainer.ubicacion || '');
        } else {
            setContainerType('');
            setContainerLocation('');
        }
    }, [selectedContainer]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!containerType || !containerLocation) {
            alert('Por favor selecciona tanto el tipo como la ubicación del contenedor.');
            return;
        }

        // Enviar los datos con los nombres de propiedades correctos
        handleSubmit(containerType, containerLocation);
        
        // Limpiar el formulario
        setContainerType('');
        setContainerLocation('');
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
                                onChange={(e) => setContainerType(e.target.value)}
                            >
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