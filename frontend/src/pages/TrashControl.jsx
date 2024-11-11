import React, { useState, useEffect } from 'react';
import '../styles/TrashControl.css'
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import Container from '../components/Container';
import Popup from '../components/PopUp';
import Levels from '../components/Levels';
import { Link, useNavigate} from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TrashControl = ({addContainer, deleteContainer, updateContainer, containers}) => {
    const [estadoTacho, setEstadoTacho] = useState(0);
    const [fechas, setFechas] = useState([]);
    const [distancias, setDistancias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/bins/datos-sheet');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

                // Filtramos cada 4 registros
                const cada4Fechas = sortedData.filter((_, index) => index % 4 === 0).map(item =>
                    new Date(item.fecha).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })
                );
                const cada4Distancias = sortedData.filter((_, index) => index % 4 === 0).map(item =>
                    Math.min(Math.round((item.distancia_promedio / 32.7) * 100), 100)
                );

                // Seleccionamos los últimos 12
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
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Estado actual:</h2>
                <div style={{
                    position: 'relative',
                    width: '320px',
                    height: '400px',
                    margin: '0 auto'
                }}>
                    <img
                        src="tacho.png"
                        alt="Icono del tacho de basura"
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            height: `${estadoTacho}%`,
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            transition: 'height 0.3s ease'
                        }}
                    ></div>
                </div>
                <p>El tacho de basura se encuentra a un {estadoTacho}%</p>
            </div>
            <div style={{ width: '80%', maxWidth: '800px', margin: '20px auto' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default TrashControl;