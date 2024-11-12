import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import Levels from '../components/Levels';
import Container from '../components/Container';

const TrashControl = () => {
  const [placas, setPlacas] = useState([]);

  const fetchPlacas = useCallback(async () => {
    const response = await fetch('http://localhost:4000/api/placa');
    const data = await response.json();
    setPlacas(data);
  }, []);

  useEffect(() => {
    fetchPlacas();
    const interval = setInterval(fetchPlacas, 10000); // Actualizar cada 10 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [fetchPlacas]);

  return (
    <div>
      <Header />
      <Greeting />
      <Levels />
      {placas.map((placa) => (
        <Container key={placa.id} placa={placa} />
      ))}
    </div>
  );
};

export default TrashControl;