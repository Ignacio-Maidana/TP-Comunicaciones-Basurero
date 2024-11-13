import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Container.css';

const Container = ({ placa }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/details/${placa.id}`);
  };

  const handleResetClick = async () => {
    // Lógica para restablecer el porcentaje de llenado a 0
    await fetch(`http://localhost:4000/api/placa/${placa.id}/reset`, {
      method: 'POST',
    });
    // Actualizar la página después de restablecer
    window.location.reload();
  };

  // Obtener el registro más reciente (debería ser el único en el array después de los cambios)
  const ultimoRegistro = placa.registros && placa.registros.length > 0 ? placa.registros[0] : null;
  const porcentajeLlenado = ultimoRegistro ? ultimoRegistro.porcentaje : 0;
  
  return (
    <div className="containerCard">
      <h3>Contenedor N° {placa.id}</h3>
      <p>Porcentaje de llenado: {porcentajeLlenado.toFixed(2)}%</p>
      <div className="containerButtons">
        <button className="buttonDetails" onClick={handleDetailsClick}>
          Mostrar detalles
        </button>
        <button className="buttonReset" onClick={handleResetClick}>
          Restablecer
        </button>
      </div>
    </div>
  );
};

export default Container;