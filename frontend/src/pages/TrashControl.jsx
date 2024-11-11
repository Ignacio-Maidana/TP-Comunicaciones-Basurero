import React, { useState, useEffect } from 'react';
import '../styles/TrashControl.css';
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import Container from '../components/Container';
import Popup from '../components/PopUp';
import Levels from '../components/Levels';
import { Link, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TrashControl = ({ addContainer, deleteContainer, updateContainer, containers }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [estadoTacho, setEstadoTacho] = useState(0);
  const [fechas, setFechas] = useState([]);
  const [distancias, setDistancias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bins');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        const cada4Fechas = sortedData.filter((_, index) => index % 4 === 0).map(item =>
          new Date(item.fecha).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })
        );
        const cada4Distancias = sortedData.filter((_, index) => index % 4 === 0).map(item =>
          Math.min(Math.round((item.distancia / 32.7) * 100), 100)
        );

        const fechasSeleccionadas = cada4Fechas.slice(-12);
        const distanciasSeleccionadas = cada4Distancias.slice(-12);

        setFechas(fechasSeleccionadas);
        setDistancias(distanciasSeleccionadas);

        if (distanciasSeleccionadas.length > 0) {
          setEstadoTacho(distanciasSeleccionadas[distanciasSeleccionadas.length - 1]);
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (container) => {
    navigate(`/container/${container.id}`, { state: { container } });
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setSelectedContainer(null);
    }
  };

  const selectContainer = (container) => {
    setSelectedContainer(container);
    setShowPopup(true);
  };

  const handleSubmit = (tipo, ubicacion) => {
    if (selectedContainer) {
      updateContainer(tipo, ubicacion, selectedContainer.id);
    } else {
      addContainer(tipo, ubicacion);
    }
    togglePopup();
  };

  const data = {
    labels: fechas,
    datasets: [
      {
        label: 'Tendencia del llenado (%)',
        data: distancias,
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
          <Link to='/graphs'><button>Gráficos</button></Link>
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
          selectContainer={selectContainer}
          deleteContainer={deleteContainer}
          containers={containers}
          handleDetailsClick={handleDetailsClick}
        />
        <div style={{ width: '80%', maxWidth: '800px', margin: '20px auto' }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default TrashControl;