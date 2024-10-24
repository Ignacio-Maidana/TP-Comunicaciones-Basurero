import React, { useState, useEffect } from 'react';
import '../styles/PopUp.css'


const Popup = ({ show, handleClose, handleSubmit, selectedContainer }) => {

    const [containerType, setContainerType] = useState('');
    const [containerLocation, setContainerLocation] = useState('');

    useEffect(() => {
        if (selectedContainer) {
            setContainerType(selectedContainer.type);
            setContainerLocation(selectedContainer.location);
        } else {
            setContainerType('');
            setContainerLocation('');
        }
    }, [selectedContainer]);
    

    // Función para manejar el envío del formulario
    const onSubmit = (e) => {
        e.preventDefault();
        if (!containerType || !containerLocation) {
            alert('Por favor selecciona tanto el tipo como la ubicación del contenedor.');
            return; // Evitamos el envío si la validación falla
        }
        handleSubmit(containerType, containerLocation);
        setContainerType('');
        setContainerLocation('');
        handleClose();
    };

    return (
        show && (
        <div className={`popup ${show ? 'show' : ''}`}>
        <div className="popup-content">
            <button className="close-button" onClick={handleClose}>X</button>
            <h2>Agregar Nuevo Basurero</h2>
            <form onSubmit={onSubmit}>
            <div>
                <label>Basurero:</label>
                <select name="containerType" value={containerType} onChange={(e)=>{setContainerType(e.target.value)}}>
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
                <select name="containerLocation" value={containerLocation} onChange={(e)=>{setContainerLocation(e.target.value)}}>
                    <option value="">Seleccione una opción...</option>
                    <option value="Cafetería">Cafetería</option>
                    <option value="Entrada">Entrada</option>
                    <option value="4to Nivel">4to Nivel</option>
                    <option value="Baños">2do Piso - Baños</option>
                    <option value="UCES">2do Piso - UCES</option>
                </select>
            </div>
            <button className='submit' type="submit">Agregar</button>
            </form>
        </div>
        </div>
        )
    );
};

export default Popup;

