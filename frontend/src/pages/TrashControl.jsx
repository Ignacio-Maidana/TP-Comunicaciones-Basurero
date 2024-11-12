import React, { useState, useEffect } from 'react';
import '../styles/TrashControl.css';
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import Container from '../components/Container';
import Popup from '../components/PopUp';
import Levels from '../components/Levels';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TrashControl = ({ addContainer, deleteContainer, updateContainer, containers }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [fechas, setFechas] = useState([]);
  const [porcentajes, setPorcentajes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedContainer) {
      fetchData(selectedContainer.sensorId);
    }
  }, [selectedContainer]);

  const fetchData = async (sensorId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bins?sensorId=${sensorId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      const cada4Fechas = sortedData
        .filter((_, index) => index % 4 === 0)
        .map(item => new Date(item.fecha).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }));
      
      const cada4Porcentajes = sortedData
        .filter((_, index) => index % 4 === 0)
        .map(item => Math.min(item.porcentajeLlenado, 100));

      setFechas(cada4Fechas.slice(-12));
      setPorcentajes(cada4Porcentajes.slice(-12));
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const handleDetailsClick = (container) => {
    setSelectedContainer(container);
    navigate(`/container/${container.id}`, { state: { container } });
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setSelectedContainer(null);
    }
  };

  const handleSubmit = (tipo, ubicacion, sensorId) => {
    if (selectedContainer) {
      updateContainer(tipo, ubicacion, sensorId, selectedContainer.id);
    } else {
      addContainer(tipo, ubicacion, sensorId);
    }
    togglePopup();
  };

  const data = {
    labels: fechas,
    datasets: [
      {
        label: 'Tendencia del llenado (%)',
        data: porcentajes,
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <>
      <Header />
      <div className="containerMain">
        <div className="buttons">
          <Greeting />
        </div>
        <div className="levels">
          <Levels />
        </div>
        <div className="addContainer">
          <h2>Basureros Activos</h2>
          <button onClick={togglePopup}>Agregar basurero</button>
        </div>
        <Popup
          show={showPopup}
          handleClose={togglePopup}
          handleSubmit={handleSubmit}
          selectedContainer={selectedContainer}
        />
        <Container
          selectContainer={setSelectedContainer}
          deleteContainer={deleteContainer}
          containers={containers}
          handleDetailsClick={handleDetailsClick}
        />
        {selectedContainer && (
          <div style={{ width: '80%', maxWidth: '800px', margin: '20px auto' }}>
            <Line data={data} options={options} />
          </div>
        )}
      </div>
    </>
  );
};

export default TrashControl;
